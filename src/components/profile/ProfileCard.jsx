import defaultAvatar from "../../assets/user-default.jpg";
import { FaUserEdit } from "react-icons/fa";

function ProfileCard({ user, onEdit }) {

    const profileImage = user?.imgPath
        ? user.imgPath
        : defaultAvatar;

    return (

        <div className="card border-0 shadow-lg rounded-4">

            <div
                className="rounded-top-4"
                style={{
                    height: "130px",
                    background: "linear-gradient(135deg,#667eea,#764ba2)"
                }}
            >

                <div className="text-end p-3">

                    <button
                        className="btn btn-light rounded-circle"
                        onClick={onEdit}
                    >

                        <FaUserEdit />

                    </button>

                </div>

            </div>

            <div className="text-center">

                <img
                    src={profileImage}
                    alt=""
                    className="rounded-circle border border-4 border-white shadow"
                    style={{
                        width: "140px",
                        height: "140px",
                        marginTop: "-70px",
                        objectFit: "cover"
                    }}
                />

                <h3 className="mt-3">{user.name}</h3>

                <span className="badge bg-primary">
                    {user.role}
                </span>

            </div>

            <div className="card-body">

                <hr />

                <div className="mb-3">

                    <label className="text-secondary">
                        Email
                    </label>

                    <h6>{user.email}</h6>

                </div>

                <div className="mb-3">

                    <label className="text-secondary">
                        Mobile
                    </label>

                    <h6>{user.contactNumber}</h6>

                </div>

                <div>

                    <label className="text-secondary">
                        Department
                    </label>

                    <h6>{user.department}</h6>

                </div>

            </div>

        </div>

    )

}

export default ProfileCard;