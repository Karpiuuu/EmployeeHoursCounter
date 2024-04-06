import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

import Logo from '../assets/Logo_rozowe.webp'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard');
      setIsAuthenticated(true);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Nieprawidłowa nazwa użytkownika lub hasło');
      } else {
        setError('Wystąpił błąd podczas logowania. Spróbuj ponownie.');
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#F5F5F5]">
      
      <img src={Logo} alt="" />
      <p className='text-[#3E3E3E] text-4xl py-4 font-bold'>Zaloguj się!</p>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-[20%]" onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Nazwa użytkownika
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Nazwa użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Hasło
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button className="flex w-[100%] justify-center bg-[#BA73D9] hover:bg-[#E10E71] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Zaloguj się
          </button>
        </div>
        {error && <p className="text-red-500 text-xs italic pt-4">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
