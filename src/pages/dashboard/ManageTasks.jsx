import { useEffect, useState } from 'react';
import api from '../../utils/api';

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Tasks</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Workers Needed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payable Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completion Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No tasks found</td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task._id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{task.task_title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{task.buyer_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{task.required_workers}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{task.payable_amount} Coins</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(task.completion_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete Task
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTasks;

