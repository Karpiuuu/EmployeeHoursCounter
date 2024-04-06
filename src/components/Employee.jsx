import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';

function Employee() {
  const [task, setTask] = useState('');
  const { setIsAuthenticated, remainingTime, resetTimer } = useAuth();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);


  const userId = decoded.id;

  //WORK-SESSION

  const [isWorking, setIsWorking] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const handleStartWork = () => {
    setIsWorking(true);
    setStartTime(new Date().toISOString());
  }


  const handleEndWork = async () => {
    const endTime = new Date().toISOString();
    setIsWorking(false);
    try {
      await axios.post('http://localhost:3001/api/work-session', {
        userId: userId,
        taskDescription: task,
        startTime: startTime,
        endTime: endTime,
      });
      alert("Sesja pracy zakończona i zapisana");
    } catch (error) {
      console.error("Błąd podczas zapisywana sesji pracy:", error);
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/home');
  };

  const handleResetTimer = () => {
    resetTimer();
  }


  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Panel Pracownika</h1>
      {!isWorking && (
        <button onClick={handleStartWork} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        Rozpocznij pracę
        </button>
      )}
      {isWorking && (
        <>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Opisz swoje dzisiejsze zadania"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            disabled={!isWorking}
          />
        </form>
        <button onClick={handleEndWork} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
          Zakończ pracę
        </button>
      </>
      )}
    
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
          Wyloguj się
      </button>
      {remainingTime > 0 && (
        <p className='font-bold'>
          Automatyczne wylogowanie za: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </p>
      )}
      <button onClick={handleResetTimer} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4">
        Resetuj
      </button>
    </div>
  );
}

export default Employee;
