import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import BasicLayout from './layouts/BasicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import HowItWorks from './pages/HowItWorks';
import PrivateRoute from './components/PrivateRoute';
import WorkerHome from './pages/dashboard/WorkerHome';
import BuyerHome from './pages/dashboard/BuyerHome';
import AdminHome from './pages/dashboard/AdminHome';
import TaskList from './pages/dashboard/TaskList';
import TaskDetails from './pages/dashboard/TaskDetails';
import MySubmissions from './pages/dashboard/MySubmissions';
import Withdrawals from './pages/dashboard/Withdrawals';
import AddTask from './pages/dashboard/AddTask';
import MyTasks from './pages/dashboard/MyTasks';
import TaskReview from './pages/dashboard/TaskReview';
import PurchaseCoin from './pages/dashboard/PurchaseCoin';
import PaymentHistory from './pages/dashboard/PaymentHistory';
import WithdrawRequests from './pages/dashboard/WithdrawRequests';
import ManageUsers from './pages/dashboard/ManageUsers';
import ManageTasks from './pages/dashboard/ManageTasks';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<BasicLayout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="about" element={<About />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="how-it-works" element={<HowItWorks />} />
                    </Route>

                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <DashboardLayout />
                            </PrivateRoute>
                        }
                    >
                        <Route path="worker-home" element={<PrivateRoute allowedRoles={['worker']}><WorkerHome /></PrivateRoute>} />
                        <Route path="task-list" element={<PrivateRoute allowedRoles={['worker']}><TaskList /></PrivateRoute>} />
                        <Route path="task-details/:id" element={<PrivateRoute allowedRoles={['worker']}><TaskDetails /></PrivateRoute>} />
                        <Route path="my-submissions" element={<PrivateRoute allowedRoles={['worker']}><MySubmissions /></PrivateRoute>} />
                        <Route path="withdrawals" element={<PrivateRoute allowedRoles={['worker']}><Withdrawals /></PrivateRoute>} />
                        <Route path="buyer-home" element={<PrivateRoute allowedRoles={['buyer']}><BuyerHome /></PrivateRoute>} />
                        <Route path="add-task" element={<PrivateRoute allowedRoles={['buyer']}><AddTask /></PrivateRoute>} />
                        <Route path="my-tasks" element={<PrivateRoute allowedRoles={['buyer']}><MyTasks /></PrivateRoute>} />
                        <Route path="task-review" element={<PrivateRoute allowedRoles={['buyer']}><TaskReview /></PrivateRoute>} />
                        <Route path="purchase-coin" element={<PrivateRoute allowedRoles={['buyer']}><PurchaseCoin /></PrivateRoute>} />
                        <Route path="payment-history" element={<PrivateRoute allowedRoles={['buyer']}><PaymentHistory /></PrivateRoute>} />
                        <Route path="admin-home" element={<PrivateRoute allowedRoles={['admin']}><AdminHome /></PrivateRoute>} />
                        <Route path="withdraw-requests" element={<PrivateRoute allowedRoles={['admin']}><WithdrawRequests /></PrivateRoute>} />
                        <Route path="manage-users" element={<PrivateRoute allowedRoles={['admin']}><ManageUsers /></PrivateRoute>} />
                        <Route path="manage-tasks" element={<PrivateRoute allowedRoles={['admin']}><ManageTasks /></PrivateRoute>} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
