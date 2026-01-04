import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { uploadImageToImgBB } from '../../utils/imgbb';

const AddTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    task_title: '',
    task_detail: '',
    required_workers: '',
    payable_amount: '',
    completion_date: '',
    submission_info: '',
    task_image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let taskImageUrl = formData.task_image_url;

    // Upload image if file is selected
    if (imageFile) {
      setUploadingImage(true);
      try {
        taskImageUrl = await uploadImageToImgBB(imageFile);
      } catch (error) {
        setError('Failed to upload image. Please try again or use a URL.');
        setLoading(false);
        setUploadingImage(false);
        return;
      }
      setUploadingImage(false);
    }

    try {
      await api.post('/tasks', { ...formData, task_image_url: taskImageUrl });
      navigate('/dashboard/my-tasks');
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message?.includes('Coin')) {
        alert('Not available Coin. Purchase Coin');
        navigate('/dashboard/purchase-coin');
      } else {
        setError(error.response?.data?.message || 'Failed to create task');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Task</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="task_title" className="block text-sm font-medium text-gray-700 mb-2">
              Task Title
            </label>
            <input
              type="text"
              id="task_title"
              name="task_title"
              value={formData.task_title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="task_detail" className="block text-sm font-medium text-gray-700 mb-2">
              Task Detail
            </label>
            <textarea
              id="task_detail"
              name="task_detail"
              value={formData.task_detail}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="required_workers" className="block text-sm font-medium text-gray-700 mb-2">
                Required Workers
              </label>
              <input
                type="number"
                id="required_workers"
                name="required_workers"
                value={formData.required_workers}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="payable_amount" className="block text-sm font-medium text-gray-700 mb-2">
                Payable Amount (Coins)
              </label>
              <input
                type="number"
                id="payable_amount"
                name="payable_amount"
                value={formData.payable_amount}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="completion_date" className="block text-sm font-medium text-gray-700 mb-2">
              Completion Date
            </label>
            <input
              type="date"
              id="completion_date"
              name="completion_date"
              value={formData.completion_date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="submission_info" className="block text-sm font-medium text-gray-700 mb-2">
              Submission Info
            </label>
            <textarea
              id="submission_info"
              name="submission_info"
              value={formData.submission_info}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="task_image_file" className="block text-sm font-medium text-gray-700 mb-2">
              Task Image (Optional)
            </label>
            <input
              type="file"
              id="task_image_file"
              name="task_image_file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="mt-1 text-xs text-gray-500">Or enter URL below</p>
            <input
              type="url"
              id="task_image_url"
              name="task_image_url"
              value={formData.task_image_url}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadingImage ? 'Uploading Image...' : loading ? 'Creating Task...' : 'Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

