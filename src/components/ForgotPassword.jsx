import React, { useState } from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { sendOTP, verifyOTP } from "../api/api";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();

    try {
      const res = await sendOTP( email );
      // console.log('***',email)
      toast.success(res.msg || "OTP sent successfully");
      setOtpSent(true);

    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to send OTP");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      const res = await verifyOTP(email,otp);

      toast.success(res.msg || "OTP verified successfully");

      navigate("/change-password", {
        state: {
          email,
        },
      });

    } catch (error) {
      toast.error(error.response?.data?.msg || "Invalid OTP");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3>Forgot Password</h3>
            </div>

            <div className="card-body">
              <form
                onSubmit={otpSent ? handleVerifyOTP : handleSendOTP}
              >
                <div className="mb-3">
                  {/* <label>Email</label> */}

                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={otpSent}
                      required
                    />
                  </div>
                </div>

                {otpSent && (
                  <div className="mb-3">
                    <label>OTP</label>

                    <div className="input-group">
                      <span className="input-group-text">
                        <FaKey />
                      </span>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>
                )}

                <button className="btn btn-primary w-100">
                  {otpSent ? "Verify OTP" : "Send OTP"}
                </button>
              </form>

              {otpSent && (
                <button
                  className="btn btn-link w-100 mt-2"
                  onClick={handleSendOTP}
                >
                  Resend OTP
                </button>
              )}

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

export default ForgetPassword;