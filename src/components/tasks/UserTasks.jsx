import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllUsers, getUserProfile, updateProfileStatusRole } from "../../api/api";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getAssignTaskByUser } from "../../api/assignTask";
import { FaEdit } from "react-icons/fa";

const UserTasks = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState("");
    const [users, setUsers] = useState([]);
    
    const [userProfile,setUserProfile]=useState()
    const [activeView, setActiveView] = useState("tasks");
    const [showModal, setShowModal] = useState(false);
    const [SelectedModelUser, setSelectedModelUser] = useState(null)

    const handleSubmit = async () => {
        try {
            console.log(selectedUser)
            const res = await getAssignTaskByUser(selectedUser);
            const taskArray = res.data;
           // const data = taskArray.map(({ task_id }) => task_id);
           // console.log(data);
            setTasks(taskArray);
        } catch (error) {
            toast.error("This user have not assign task");
        }
    };
    const fetchUsers = async () => {
        try {
            const res = await getAllUsers();
            setUsers(res.allUsers);
        } catch (error) {
            toast.error("Failed to fetch users");
        }
    };

    const showProfile = async () => {
        try {
            const res = await getUserProfile(selectedUser);
            setUserProfile(res.userData);
            console.log(res.userData)
        } catch (error) {
            toast.error("Failed to fetch user profile");
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const openModal = (user) => {
        setSelectedModelUser({ ...user });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedModelUser(null);
    };

    const handleProfileUpdate = async () => {
        try {
            console.log(SelectedModelUser,'update')
            await updateProfileStatusRole(SelectedModelUser._id, {
                status: SelectedModelUser.status,
                role: SelectedModelUser.role
            });

            toast.success("Profile updated successfully");
            closeModal();
           showProfile();
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    const tasksPerPage = 10;
    const lastIndex = currentPage * tasksPerPage;
    const firstIndex = lastIndex - tasksPerPage;

    let currentTasks = 0, totalPages = 0;
    if (activeView === "tasks") {
        totalPages = Math.ceil(tasks.length / tasksPerPage);
        currentTasks = tasks.slice(firstIndex, lastIndex);
    }
    else {
        totalPages = Math.ceil(users.length / tasksPerPage);
        currentTasks = users.slice(firstIndex, lastIndex);
    }


    return (
        <div className="container-fluid mt-4">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Users Tasks</h4>
                </div>

                <div className="card-body">
                    {/* Top Filter Navbar */}
                    <div className="row mb-4 g-3">
                        <div className="col-md-8 col-sm-10 d-flex ">
                            <div>
                                <select
                                    className="form-select"
                                    value={selectedUser}
                                    onChange={(e) =>
                                        setSelectedUser(e.target.value)
                                    }
                                >
                                    <option value="">
                                        Select User
                                    </option>

                                    {users?.map((user) => (
                                        <option
                                            key={user._id}
                                            value={user._id}
                                        >
                                            {user.name} ({user.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <button className="btn btn-primary ms-2" onClick={() => { setActiveView("tasks"); handleSubmit(); }}>
                                    Show Tasks
                                </button>
                                <button className="btn btn-primary ms-2" onClick={() => { setActiveView("profile");showProfile() }}>
                                    Profile
                                </button>
                            </div>
                        </div>


                    </div>

                    {/* Task Table */}
                    {activeView === "tasks" && (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Project Title</th>
                                        <th>Task Title</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Created At</th>
                                        {/* <th>End Date</th> */}
                                    </tr>
                                </thead>

                                <tbody>
                                    {currentTasks.length > 0 ? (
                                        currentTasks.map((task, i) => (
                                            <tr key={i + 1}>
                                                <td>{i + 1}</td>
                                                <td>{task.task_id.project_ID.title}</td>
                                                <td>{task.task_id.title}</td>
                                                <td>{task.task_id.description}</td>
                                                <td>
                                                    <span
                                                        className={
                                                            task.task_id.status === "Completed"
                                                                ? "badge bg-success"
                                                                : task.task_id.status === "Inprogress"
                                                                    ? "badge bg-warning text-dark"
                                                                    : "badge bg-danger"
                                                        }
                                                    >
                                                        {task.task_id.status}
                                                    </span>
                                                </td>
                                                <td>{task.createdAt?.split("T")[0]}</td>
                                                {/* <td>{task.startDate?.split("T")[0]}</td> */}
                                                {/* <td>{task.endDate?.split("T")[0]}</td> */}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center">
                                                No tasks found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeView === "profile" && (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>No.</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Contact Number</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Update</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {userProfile  && (                                       
                                            <tr>
                                                <td>{ 1}</td>
                                                <td>{userProfile.name}</td>
                                                <td>{userProfile.email}</td>
                                                <td>{userProfile.contactNumber}</td>
                                                <td>{userProfile.role}</td>
                                                <td>
                                                    <span
                                                        className={
                                                            userProfile.status === "active"
                                                                ? "badge bg-success" : "badge bg-danger"
                                                        }
                                                    >
                                                        {userProfile.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-warning me-2"
                                                        onClick={() =>
                                                            openModal(userProfile)
                                                        }
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                </td>
                                                <Modal show={showModal} onHide={closeModal} centered>
                                                    <Modal.Header closeButton className=" bg-primary text-white">
                                                        <Modal.Title>Update Task Status</Modal.Title>
                                                    </Modal.Header>

                                                    <Modal.Body>
                                                        {SelectedModelUser && (
                                                            <>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Name</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={SelectedModelUser.name}
                                                                        readOnly
                                                                    />
                                                                </div>

                                                                <div className="mb-3">
                                                                    <label className="form-label">Email</label>
                                                                    <input type="text"
                                                                        className="form-control"
                                                                        value={SelectedModelUser.email}
                                                                        readOnly
                                                                    />
                                                                </div>

                                                                <div className="mb-3">
                                                                    <label className="form-label">Contact Number</label>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        value={SelectedModelUser.contactNumber}
                                                                        readOnly
                                                                    />
                                                                </div>

                                                                <div className="mb-3">
                                                                    <label className="form-label">Role</label>
                                                                    <select
                                                                        className="form-select"
                                                                        value={SelectedModelUser.role}
                                                                        onChange={(e) =>
                                                                            setSelectedModelUser({
                                                                                ...SelectedModelUser,
                                                                                role: e.target.value,
                                                                            })
                                                                        }
                                                                    >
                                                                        <option value="user">User</option>
                                                                        <option value="admin">Admin</option>
                                                                        <option value="hod">HOD</option>
                                                                    </select>
                                                                </div>

                                                                <div className="mb-3">
                                                                    <label className="form-label">Status</label>
                                                                    <select
                                                                        className="form-select"
                                                                        value={SelectedModelUser.status}
                                                                        onChange={(e) =>
                                                                            setSelectedModelUser({
                                                                                ...SelectedModelUser,
                                                                                status: e.target.value,
                                                                            })
                                                                        }
                                                                    >
                                                                        <option value="active">Active</option>
                                                                        <option value="inactive">Inactive</option>
                                                                    </select>
                                                                </div>
                                                            </>
                                                        )}
                                                    </Modal.Body>

                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={closeModal}>
                                                            Cancel
                                                        </Button>

                                                        <Button variant="primary" onClick={handleProfileUpdate}>
                                                            Update
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </tr>
                                      
                                    ) }
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li
                                className={`page-item ${currentPage === 1 ? "disabled" : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    Previous
                                </button>
                            </li>

                            {[...Array(totalPages)].map((_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1 ? "active" : ""
                                        }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}

                            <li
                                className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default UserTasks