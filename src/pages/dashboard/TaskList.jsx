import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks/available');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Tasks</h1>

      {tasks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg">No available tasks at the moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {task.task_image_url && (
                <img 
                  src={task.task_image_url} 
                  alt={task.task_title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{task.task_title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.task_detail}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Buyer:</span>
                    <span className="font-medium">{task.buyer_name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payable:</span>
                    <span className="font-medium text-indigo-600">{task.payable_amount} Coins</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Workers Needed:</span>
                    <span className="font-medium">{task.required_workers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Deadline:</span>
                    <span className="font-medium">
                      {new Date(task.completion_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/dashboard/task-details/${task._id}`}
                  className="block w-full text-center bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;

