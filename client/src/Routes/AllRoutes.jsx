import React from 'react'
import { Route, Routes } from "react-router-dom";
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import Dashboard from '../Pages/Dashboard';
import UserBlogs from '../Pages/UserBlogs';
import PrivateRoute from './PrivateRoute';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/userblog' element={<PrivateRoute><UserBlogs /></PrivateRoute>} />
        </Routes>
    )
}

export default AllRoutes
