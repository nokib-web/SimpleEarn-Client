import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [submissionDetails, setSubmissionDetails] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
        setError('Failed to load task details');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submissionDetails.trim()) {
      setError('Please provide submission details');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.post('/submissions', {
        task_id: id,
        submission_details: submissionDetails
      });
      navigate('/dashboard/my-submissions');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit task');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!task) {
    return <div className="text-center py-8 text-red-600">Task not found</div>;
  }

  return (
    <div>
      <button
        onClick={() => navigate('/dashboard/task-list')}
        className="mb-4 text-indigo-600 hover:text-indigo-800"
      >
        ← Back to Task List
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        {task.task_image_url && (
          <img 
            src={task.task_image_url} 
            alt={task.task_title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{task.task_title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-gray-600">Buyer:</span>
              <span className="ml-2 font-medium">{task.buyer_name}</span>
            </div>
            <div>
              <span className="text-gray-600">Payable Amount:</span>
              <span className="ml-2 font-medium text-indigo-600">{task.payable_amount} Coins</span>
            </div>
            <div>
              <span className="text-gray-600">Workers Needed:</span>
              <span className="ml-2 font-medium">{task.required_workers}</span>
            </div>
            <div>
              <span className="text-gray-600">Completion Date:</span>
              <span className="ml-2 font-medium">
                {new Date(task.completion_date).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Task Details</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{task.task_detail}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Submission Info</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{task.submission_info}</p>
          </div>
        </div>
      </div>

      {/* Submission Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Submit Task</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="submission_details" className="block text-sm font-medium text-gray-700 mb-2">
              Submission Details
            </label>
            <textarea
              id="submission_details"
              value={submissionDetails}
              onChange={(e) => setSubmissionDetails(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your submission details here..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting || task.required_workers === 0}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : task.required_workers === 0 ? 'Task Full' : 'Submit Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;

