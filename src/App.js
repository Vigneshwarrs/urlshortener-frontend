import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Dashboard from './components/Dashboard/Dashboard';
import LogIn from './components/Auth/LogIn';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/login' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/' element={<Navigate to='/login' />} />
      </Routes>
    </div>
  );
}

export default App;
