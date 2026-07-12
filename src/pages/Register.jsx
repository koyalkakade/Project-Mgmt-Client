import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imgPath, setImage] = useState(null);

  const { loading, error, registrationStatus } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      payload.append("contactNumber", formData.contactNumber);

      if (imgPath) {
        payload.append("imgPath", imgPath);
      }

      const result = await dispatch(registerUser(payload));
      if (registrationStatus === "success") {
        toast.success("Registration successful");
      }

      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
      }

    } catch (error) {
      toast.error(error || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3>Register</h3>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter name"
                    />
                  </div>
                </div>

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
                      value={formData.email}
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
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label>Contact Number</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaPhone />
                    </span>
                    <input
                      type="text"
                      name="contactNumber"
                      className="form-control"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="Enter 10 digit number"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label>Profile Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <button className="btn btn-primary w-100" disabled={loading}>
                   {loading ? "Registering..." : "Register"}
                </button>
                 
              </form>

              <p className="text-center mt-3">
                Already have account? <Link to="/">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;