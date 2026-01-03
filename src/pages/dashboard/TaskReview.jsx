import { useEffect, useState } from 'react';
import api from '../../utils/api';

const TaskReview = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await api.get('/submissions/buyer/pending');
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  const handleApprove = async (submissionId) => {
    try {
      await api.patch(`/submissions/${submissionId}/approve`);
      setShowModal(false);
      fetchSubmissions();
    } catch (error) {
      console.error('Error approving submission:', error);
      alert('Failed to approve submission');
    }
  };

  const handleReject = async (submissionId) => {
    if (!window.confirm('Are you sure you want to reject this submission?')) {
      return;
    }

    try {
      await api.patch(`/submissions/${submissionId}/reject`);
      setShowModal(false);
      fetchSubmissions();
    } catch (error) {
      console.error('Error rejecting submission:', error);
      alert('Failed to reject submission');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Task To Review</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Worker Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payable Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No pending submissions</td>
                </tr>
              ) : (
                submissions.map((submission) => (
                  <tr key={submission._id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{submission.worker_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{submission.task_title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{submission.payable_amount} Coins</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleViewSubmission(submission)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        View Submission
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Submission Details</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <span className="font-semibold">Worker:</span> {selectedSubmission.worker_name}
              </div>
              <div>
                <span className="font-semibold">Task:</span> {selectedSubmission.task_title}
              </div>
              <div>
                <span className="font-semibold">Payable Amount:</span> {selectedSubmission.payable_amount} Coins
              </div>
              <div>
                <span className="font-semibold">Submission Details:</span>
                <div className="mt-2 p-4 bg-gray-50 rounded-md whitespace-pre-wrap">
                  {selectedSubmission.submission_details}
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => handleApprove(selectedSubmission._id)}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(selectedSubmission._id)}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskReview;

