import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
    FaTasks,
    FaUser,
    FaUsers,
    FaPlusCircle,
    FaHome,
    FaSignOutAlt,
} from "react-icons/fa";
import { getUserInfo } from '../api/api';

const Asidebar = () => {
    // const [user, setUser] = useState()
    const [menus, setmenus] = useState([])

    const navigate = useNavigate();



    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const userMenus = [
        { title: "Dashboard", path: "/dashboard", icon: <FaHome /> },
        { title: "My Tasks", path: "/my-tasks", icon: <FaTasks /> },
        { title: "Profile", path: "/profile", icon: <FaUser /> },
    ];

    const adminMenus = [
        { title: "Dashboard", path: "/dashboard", icon: <FaHome /> },
        { title: "All Tasks", path: "all-tasks", icon: <FaTasks /> },
        { title: "Create Task", path: "create-task", icon: <FaPlusCircle /> },
        { title: "My Tasks", path: "/my-tasks", icon: <FaTasks /> },
        { title: "Users", path: "/users", icon: <FaUsers /> },
         { title: "Assign Task", path: "/assign-task", icon: <FaTasks /> },
        { title: "Profile", path: "/profile", icon: <FaUser /> },
    ];

    async function fetchData() {
        const data = await getUserInfo()
        // console.log('user-info', data.loggedUser)
        //   setUser(data.loggedUser)
        const { loggedUser } = data; 
        //  console.log('loggeduser', loggedUser)  // get looggedUser object
        const { role } = loggedUser;
        //   const role=data
        // console.log(role)
        const menus1 = role === "admin" ? adminMenus : userMenus;
        //   const menus1 = user?.role === "admin" ? adminMenus : userMenus;
        setmenus(menus1)
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className="d-flex">
            <aside
                className="bg-dark text-white p-3"
                style={{ width: "240px", minHeight: "120vh" }}
            >
                <h5 className="mb-4">Menu</h5>

                {menus.map((menu, index) => (
                    <Link
                        key={index}
                        to={`/dashboard/${menu.path}`}
                        className="d-flex align-items-center gap-2 text-white text-decoration-none mb-3"
                    >
                        {menu.icon}
                        <span>{menu.title}</span>
                    </Link>
                ))}
            </aside>
        </div>
    )
}

export default Asidebar