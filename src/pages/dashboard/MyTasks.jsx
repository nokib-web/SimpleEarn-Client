import { useEffect, useState } from 'react';
import api from '../../utils/api';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [updateData, setUpdateData] = useState({
    task_title: '',
    task_detail: '',
    submission_info: ''
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks/buyer/my-tasks');
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

  const handleUpdate = (task) => {
    setEditingTask(task._id);
    setUpdateData({
      task_title: task.task_title,
      task_detail: task.task_detail,
      submission_info: task.submission_info
    });
  };

  const handleUpdateSubmit = async (taskId) => {
    try {
      await api.patch(`/tasks/${taskId}`, updateData);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };

  const handleCancelUpdate = () => {
    setEditingTask(null);
    setUpdateData({ task_title: '', task_detail: '', submission_info: '' });
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Detail</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Workers Needed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payable Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completion Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No tasks yet</td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task._id}>
                    <td className="px-6 py-4">
                      {editingTask === task._id ? (
                        <input
                          type="text"
                          value={updateData.task_title}
                          onChange={(e) => setUpdateData({ ...updateData, task_title: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900">{task.task_title}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingTask === task._id ? (
                        <textarea
                          value={updateData.task_detail}
                          onChange={(e) => setUpdateData({ ...updateData, task_detail: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          rows={2}
                        />
                      ) : (
                        <div className="text-sm text-gray-500 max-w-xs truncate">{task.task_detail}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{task.required_workers}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{task.payable_amount} Coins</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(task.completion_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {editingTask === task._id ? (
                        <div className="space-x-2">
                          <button
                            onClick={() => handleUpdateSubmit(task._id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelUpdate}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="space-x-2">
                          <button
                            onClick={() => handleUpdate(task)}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      )}
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

export default MyTasks;

