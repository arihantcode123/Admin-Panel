import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { BsChatSquareFill } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { useAuth } from '../../store/auth';
import { Navigate } from 'react-router-dom';

export default function AdminLayout() {
    const {user,isLoading}=useAuth();
    console.log("admin layout",user);

    if(isLoading){
        return <h1>Loading...</h1>
    }

    if(!user.isAdmin){
        return <Navigate to='/'/>
    }
    
  return (
    <>
        <header>
            <div className='container'>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/admin/users"> <FaUser /> Users</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/contacts"><BsChatSquareFill/> Contacts</NavLink>
                        </li>
                        <li>
                            <NavLink to="/service"><CiViewList/> Services</NavLink>
                        </li>
                        <li>
                            <NavLink to="/"><FaHome/> Home</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <Outlet/>
    </>
  )
}
