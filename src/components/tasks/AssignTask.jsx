import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTasks, FaUsers } from "react-icons/fa";
import { getAllTASKS } from "../../api/taskAPI";
import { getAllUsers } from "../../api/api";
import { assignTaskToUsers } from "../../api/assignTask";

const AssignTask = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    const [selectedTask, setSelectedTask] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        fetchTasks();
        fetchUsers();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await getAllTASKS();
            setTasks(res.tasks);
        } catch (err) {
            toast.error("Unable to load tasks");
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await getAllUsers();
            setUsers(res.allUsers);
        } catch (err) {
            toast.error("Unable to load users");
        }
    };

    const handleUserSelect = (id) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
        } else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedTask) {
            return toast.error("Please select a task");
        }

        if (selectedUsers.length === 0) {
            return toast.error("Please select at least one user");
        }

        try {
            const payload = {
                task_id: selectedTask,
                user_ids: selectedUsers,
            };

            const res = await assignTaskToUsers(payload);

            toast.success(res.msg);

            setSelectedTask("");
            setSelectedUsers([]);
        } catch (err) {
            toast.error(err.response?.data?.msg || "Assignment failed");
        }
    };

    const USERS_PER_PAGE = 10;

    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastUser = currentPage * USERS_PER_PAGE;
    const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;

    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

    return (
        <div className="container mt-4">
            <div className="card shadow">

                <div className="card-header bg-primary text-white">
                    <h4>
                        <FaTasks className="me-2" />
                        Assign Task
                    </h4>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        {/* Task Dropdown */}

                        <div className="row mb-4">

                            <div className="col-md-5">
                                <label className="form-label">
                                    <FaTasks className="me-2" />
                                    Select Task
                                </label>

                                <select
                                    className="form-select"
                                    value={selectedTask}
                                    onChange={(e) => setSelectedTask(e.target.value)}
                                >
                                    <option value="">Select Task</option>

                                    {tasks.map((task) => (
                                        <option key={task._id} value={task._id}>
                                            {task.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-2 d-flex align-items-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Assign Task
                                </button>
                            </div>

                        </div>

                        {/* Users */}

                        <div className="mb-4">

                            <label className="form-label">
                                <FaUsers className="me-2" />
                                Select Users
                            </label>

                            <div
                                className="border rounded p-3"
                                style={{ maxHeight: "300px", overflowY: "auto" }}
                            >
                                {currentUsers.map((user) => (
                                    <div
                                        className="form-check"
                                        key={user._id}
                                    >
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={user._id}
                                            checked={selectedUsers.includes(user._id)}
                                            onChange={() => handleUserSelect(user._id)}
                                        />

                                        <label
                                            className="form-check-label"
                                            htmlFor={user._id}
                                        >
                                            {user.name} ({user.email})
                                        </label>
                                    </div>
                                ))}
                            </div>

                        </div>

                       
                    </form>
 <div className="d-flex justify-content-center mt-3">

                            <button
                                className="btn btn-outline-secondary me-2"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </button>

                            <span className="align-self-center">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                className="btn btn-outline-secondary ms-2"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </button>

                        </div>
                </div>

            </div>
        </div>
    );
};

export default AssignTask;