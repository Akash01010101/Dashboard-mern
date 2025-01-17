// src/components/AdminLogin.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminForm = () => {
    const [authToken, setAuthToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 const nav = useNavigate();
 const handlenav = (path) => {
    nav(path);
 }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://3w-backend-production.up.railway.app/api/login', {
        username,
        password,
      });

      const { token } = response.data;
      setAuthToken(token);
      localStorage.setItem('authToken', token);
      alert('Login successful');
      handlenav("/admin");
    } catch (error) {
      setError('Invalid credentials');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
      <p>Test Credentials: <div>username:'testadmin'</div> <div> password:'testadmin'</div></p>
      <button className='w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500' onClick={()=>{handlenav("/")}}>Create a User</button>
    </div>
  );
};

export default AdminForm;
