import React, { useState } from 'react'
import ConfirmationModal from "../ConfirmationModel";
import { changePasswordAPI } from '../../api/api';
import { toast } from 'react-toastify';


const ChangePasswordCard = ({ user }) => {

    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const handleChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setShowPasswordConfirm(true);
    };

    const changePassword = async () => {
        if (password.newPassword == "") {
            alert("Please Enter Passwords.. ");
            return;
        }
        if (password.newPassword !== password.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        //console.log(user._id,password);
        try {
            const id = user._id;
            const pass = password.newPassword;
            const res = await changePasswordAPI(id, pass);
            toast.success(res.msg);
            setPassword({
                newPassword: "",
                confirmPassword: "",
            });
        }
        catch (error) {
            toast.error(
                error.response?.data?.msg || "Something went wrong"
            );
        }
        setShowPasswordConfirm(false);
    };

    return (

        <div>
            <div className="card shadow">
                <div className="card-header">
                    <h4>Change Password</h4>
                </div>

                <div className="card-body">
                    <form onSubmit={handleChangePassword}>
                        <div className="mb-3">
                            <label>New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="newPassword"
                                value={password.newPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                value={password.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <button className="btn btn-primary">
                            Change Password
                        </button>
                        <ConfirmationModal
                            show={showPasswordConfirm}
                            title="Change Password"
                            message="Are you sure you want to change your password?"
                            confirmText="Change"
                            onConfirm={changePassword}
                            onCancel={() => setShowPasswordConfirm(false)}
                        />
                    </form>

                </div>
            </div>
        </div>
    )
}

export default ChangePasswordCard