import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './pages/Layout'
import CreateUpdateTask from './components/tasks/CreateUpdateTask'
import AllTasks from './components/tasks/AllTasks'
import Dashboard from './pages/Dashboard'
import MyTask from './components/tasks/MyTask'
import UserTasks from './components/tasks/UserTasks'
import Profile from './components/profile/Profile'
import ForgotPassword from './components/ForgotPassword'
import ChangePassword from './components/ChangePassword'
import { getUserInfo } from "./redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AssignTask from './components/tasks/AssignTask'

function App() {
  const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(getUserInfo());
        }
    }, [token, dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" />

      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/change-password" element={<ChangePassword />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute ><Layout /></ProtectedRoute>} >
          <Route index path='dashboard' element={<Dashboard />} />
          <Route path="create-task" element={<CreateUpdateTask />} />
          <Route path="edit-task/:ID" element={<CreateUpdateTask />} />
          <Route path="all-tasks" element={<AllTasks />}></Route>
          <Route path="my-tasks" element={<MyTask />}></Route>
          <Route path="users" element={<UserTasks />}></Route>
            <Route path="assign-task" element={<AssignTask />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App