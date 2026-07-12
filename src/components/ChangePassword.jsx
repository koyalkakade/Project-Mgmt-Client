import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { changePassword } from "../api/api";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Email received from Verify OTP page
  const email = location.state?.email || "";

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Invalid request. Please verify OTP again.");
      navigate("/forget-password");
      return;
    }

    if (passwordData.password !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await changePassword({
        email,
        password: passwordData.password,
      });

      toast.success(res.message || "Password changed successfully");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-header bg-success text-white text-center">
              <h3>Change Password</h3>
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
                      className="form-control"
                      value={email}
                      readOnly
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label>New Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter new password"
                      value={passwordData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label>Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm new password"
                      value={passwordData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button className="btn btn-success w-100">
                  Change Password
                </button>
              </form>

              <p className="text-center mt-3">
                <Link to="/">Back to Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;