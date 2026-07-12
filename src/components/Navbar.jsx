import React, { useEffect, useState } from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../api/api";
import defaultAvatar from "../assets/user-default.jpg";

const Navbar = () => {
 const [user, setUser] = useState([])
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/");
  };

  async function fetchData(){
    const data = await getUserInfo()
       const { loggedUser } = data;   // get looggedUser object
    // console.log('user-info-navbar', data.loggedUser)
    // setUser(data.loggedUser)
    setUser(loggedUser)
  }

  useEffect(()=>{
    fetchData()
  },[])

   const profileImage =
          user?.imgPath && user.imgPath.trim() !== ""
              ? `${user.imgPath}`
              : defaultAvatar;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container-fluid">
        
        {/* Left Side */}
        <span className="navbar-brand fw-bold fs-4">
          TaskMGMT
        </span>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-3 text-white">
          <span>
            {/* <FaUserCircle size={22} className="me-2" /> */}
             <img
                                src={profileImage}
                                alt="Profile"
                                className="rounded-circle me-2"
                                width="30"
                                height="30"
                            />
           {/* {user}*/} {user?.name} 
          </span>

          <button
            className="btn btn-light btn-sm"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-1" />
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;