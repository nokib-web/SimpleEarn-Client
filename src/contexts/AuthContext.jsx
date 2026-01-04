import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        localStorage.setItem('token', token);

        try {
          const response = await api.get('/auth/me');
          setUserData(response.data.user);
          setUser(firebaseUser);
        } catch (error) {
          console.error('Error fetching user data in onAuthStateChanged:', error);
          // If we're not in the middle of login/register, and user is 404, then sign out
          // For now, let's just log it and let the specific login/register functions handle state
          if (error.response?.status === 404) {
            console.warn('User not found in DB, waiting for registration if applicable');
          } else {
            setUser(null);
            setUserData(null);
            localStorage.removeItem('token');
          }
        }
      } else {
        setUser(null);
        setUserData(null);
        localStorage.removeItem('token');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email, password, name, photoURL, role) => {
    try {
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);

      // Register in backend
      await api.post('/auth/register', {
        name,
        email,
        photoURL,
        role
      });

      // Fetch user data
      const response = await api.get('/auth/me');
      setUserData(response.data.user);
      setUser(userCredential.user);

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);

      const response = await api.get('/auth/me');
      setUserData(response.data.user);
      setUser(userCredential.user);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);

      let currentData = null;
      try {
        const response = await api.get('/auth/me');
        currentData = response.data.user;
      } catch (error) {
        if (error.response?.status === 404) {
          // New user, register as worker
          await api.post('/auth/register', {
            name: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            role: 'worker'
          });
          const response = await api.get('/auth/me');
          currentData = response.data.user;
        } else {
          throw error;
        }
      }

      setUserData(currentData);
      setUser(result.user);
      return { success: true };
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const refetchUserData = async () => {
    try {
      const response = await api.get('/auth/me');
      setUserData(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error('Error refetching user data:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    user,
    userData,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    refetchUserData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

