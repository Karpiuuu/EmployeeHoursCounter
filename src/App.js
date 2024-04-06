import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NoPage from "./pages/NoPage";

import { PrivateRoute } from './routes/PrivateRoute';

import CounterMyAdmin from "./pages/CounterMyAdmin";
import EmployeeDashboard from "./pages/EmployeeDashboard";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Home Page and Index */}
          <Route index elemet={<LoginPage />}/>
          <Route path="/home" element={<LoginPage/>}/>
          <Route path="/admin" element={<CounterMyAdmin />} />
          <Route path="/dashboard" element={
          <PrivateRoute>
            <EmployeeDashboard />
          </PrivateRoute>
        } />
          {/* API */}
          {/* Other Pages */}
          <Route path="/register" element={<RegisterPage />}/>
          {/* 404 */}
          <Route path="*" element={<NoPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
