import { useEffect, useState } from "react";
import defaultAvatar from "../assets/user-default.jpg";
import { changePasswordAPI, getUserInfo } from "../api/api";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModel";
import { FaUserEdit } from "react-icons/fa";

function Profile() {
    //   const [user] = useState({
    //     name: "Virat Kohali",
    //     email: "v@gmail.com",
    //     mobile: "9876543210",
    //     role: "Employee",
    //     imgPath: "/uploads/users/1782580503543weather.png",
    //   });

    const [user, setUser] = useState([])
    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    async function fetchData() {
        const data = await getUserInfo()
        const { loggedUser } = data;   // get looggedUser object
        setUser(loggedUser)
    }

    useEffect(() => {
        fetchData()
    }, [])


    const profileImage =
        user?.imgPath && user.imgPath.trim() !== ""
            ? `${user.imgPath}`
            : defaultAvatar;

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

        // console.log(password);
        try {
            const id = user.id;
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
        <div className="container mt-5">
            <div className="row">
                {/* Profile */}
                <div className="col-md-5">
                    <div className="card shadow">
                        <FaUserEdit style={{marginLeft:"485px",fontSize:"25px",marginTop:"10px"}} />
                        <div className="card-body text-center">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="rounded-circle mb-3"
                                width="120"
                                height="120"
                            />

                            <h4>{user.name}</h4>
                            <p>{user.role}</p>

                            <hr />

                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>

                            <p>
                                <strong> Mobile: </strong> {user.contactNumber}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Change Password */}
                <div className="col-md-6">
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
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
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
            </div>
        </div>
    );
}

export default Profile