import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axios.get('https://3w-backend-production.up.railway.app/api/submission', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAuthenticated(true);
        setSubmissions(response.data.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        setIsAuthenticated(false);
      }
    };

    fetchSubmissions();
    const newSocket = io('https://3w-backend-production.up.railway.app/', {
      transports: ['websocket','polling'], 
      reconnectionAttempts: 5, 
    });
    setSocket(newSocket);
    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server:", newSocket.id);
    });
    newSocket.on('new_submission', (newSubmission) => {
      setSubmissions((prevSubmissions) => [...prevSubmissions, newSubmission]);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (!isAuthenticated) {
    return <p className="text-red-500 text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Social Media Handle</th>
              <th className="p-4">Images</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id} className="border-b">
                <td className="p-4">{submission.name}</td>
                <td className="p-4">{submission.socialmedia}</td>
                <td className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {submission.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt="uploaded"
                          className="w-full h-24 object-cover rounded-lg shadow-md border border-gray-200 cursor-pointer"
                          onClick={() => handleImageClick(image)}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                          <button
                            onClick={() => handleImageClick(image)}
                            className="text-white font-bold text-sm"
                          >
                            View Full Image
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-screen object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-white text-black font-bold text-lg rounded-full px-3 py-1"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
