import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadForm = () => {
  const [name, setName] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialmedia', socialMedia);
    Array.from(images).forEach((image) => {
      formData.append('images', image);
    });
    try {
       await axios.post('https://3w-backend-production.up.railway.app/api/submission', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Submission successful');
    } catch (error) {
      alert('Submission failed');
      console.error(error);
    }
  };


  const handlenav = (path) => {
    nav(path);
  }
  const nav = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-700">Social Media Handle</label>
          <input
            type="text"
            value={socialMedia}
            onChange={(e) => setSocialMedia(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-700">Upload Images</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
      <button className='w-full py-3 mt-10 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500' onClick={()=>{handlenav("adminform")}}>Login as Admin</button>
    </div>
  );
};

export default UploadForm;

