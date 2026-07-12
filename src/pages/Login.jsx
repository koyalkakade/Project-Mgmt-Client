import React, { useState } from "react";
// import { loginUser } from "../api/api";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getUserInfo } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();

        const { loading, error } = useSelector((state) => state.auth);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
         const result = await dispatch(loginUser(loginData));

        if (result.meta.requestStatus === "fulfilled") {
            await dispatch(getUserInfo());
            navigate("/dashboard/dashboard");
        }
    } catch (error) {
      toast.error(error || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-header bg-success text-white text-center">
              <h3>Login</h3>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={loginData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={loginData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                    />
                  </div>
                </div>

                <button className="btn btn-success w-100" disabled={loading}>
                   {loading ? "Logging in..." : "Login"}
                </button>
              </form>
              <p className="mt-3" style={{ marginLeft: "370px" }}>
                <Link to="/forgot-password">Forget Password</Link>
              </p>
              <p className="text-center mt-3">
                Don&apos;t have account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;