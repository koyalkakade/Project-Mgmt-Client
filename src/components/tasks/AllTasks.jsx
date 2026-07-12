import React, { useEffect, useState } from "react";
import { getAllTASKS, deleteTASK } from "../../api/taskAPI";
import { getAllUsers } from '../../api/api'
import { assignTaskToUserAPI } from "../../api/assignTask";
import { toast } from "react-toastify";
import AssignTaskModal from "./AssignTaskModal";
import ConfirmationModal from "../ConfirmationModel";
import {
    FaEdit,
    FaTrash,
    FaSearch,
    FaFilter,
    FaCalendarAlt,
    FaUserPlus
} from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const AllTasks = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [month, setMonth] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [users, setUsers] = useState([]);

    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedUser, setSelectedUser] = useState("");
    const [showDelete, setShowDelete] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const tasksPerPage = 10;

    const fetchTasks = async () => {
        try {
            const res = await getAllTASKS();
            setTasks(res.tasks);
        } catch (error) {
            toast.error("Failed to fetch tasks");
        }
    };


    const filteredTasks = tasks.filter((task) => {
        const searchMatch =
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase());

        const statusMatch = status ? task.status === status : true;

        const taskMonth = task.endDate
            ? new Date(task.endDate).getMonth() + 1
            : "";

        const monthMatch = month ? taskMonth === Number(month) : true;

        return searchMatch && statusMatch && monthMatch;
    });

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    const lastIndex = currentPage * tasksPerPage;
    const firstIndex = lastIndex - tasksPerPage;

    const currentTasks = filteredTasks.slice(firstIndex, lastIndex);


    const fetchUsers = async () => {
        try {
            const res = await getAllUsers();
            setUsers(res.allUsers);
           // console.log(res.allUsers)
        } catch (error) {
            toast.error("Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchUsers();
    }, []);

    const openAssignModal = (task) => {
        setSelectedTask(task);
        setSelectedUser("");
        setShowAssignModal(true);
    };

    const closeAssignModal = () => {
        setShowAssignModal(false);
    };

    const handleAssignTask = async () => {
        if (!selectedUser) {
            return toast.error("Please select user");
        }

        try {
            const payload = {
                taskID: selectedTask._id,
                userID: selectedUser,
            };

            const res = await assignTaskToUserAPI(payload);

            toast.success(res.msg);

            setShowAssignModal(false);
            setSelectedUser("");
        } catch (error) {
            toast.error(
                error.response?.data?.msg || "Assign task failed"
            );
        }
    };


    const openDeleteModal = (id) => {
        setSelectedTaskId(id);
        setShowDelete(true);
    };

    const deleteTask = async () => {
        try {
            const result = await deleteTASK(selectedTaskId);
            toast.success("Task deleted successfully");
            //toast.success(result.msg || "Task deleted successfully");
            fetchTasks();


            setShowDelete(false);
            setSelectedTaskId(null);
        } catch (error) {
            toast.error(error.response?.data?.msg || "Something went wrong");
        }
    };

    return (
        <div className="container-fluid mt-4">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">All Tasks</h4>
                </div>

                <div className="card-body">
                    {/* Top Filter Navbar */}
                    <div className="row mb-4 g-3">
                        <div className="col-md-4">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaSearch />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search task..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaFilter />
                                </span>
                                <select
                                    className="form-select"
                                    value={status}
                                    onChange={(e) => {
                                        setStatus(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value="">All Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Inprogress">Inprogress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCalendarAlt />
                                </span>
                                <select
                                    className="form-select"
                                    value={month}
                                    onChange={(e) => {
                                        setMonth(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value="">End Date Month</option>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Task Table */}
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentTasks.length > 0 ? (
                                    currentTasks.map((task,index) => (
                                        <tr key={index+1}>
                                            <td>{index+1}</td>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>
                                                <span
                                                    className={
                                                        task.status === "Completed"
                                                            ? "badge bg-success"
                                                            : task.status === "Inprogress"
                                                                ? "badge bg-warning text-dark"
                                                                : "badge bg-danger"
                                                    }
                                                >
                                                    {task.status}
                                                </span>
                                            </td>
                                           <td>{task.startDate?.split("T")[0]}</td>
                                            <td>{task.endDate?.split("T")[0]}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() =>
                                                        navigate(`/dashboard/edit-task/${task._id}`)
                                                    }
                                                >
                                                    <FaEdit />
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-danger me-2"
                                                    onClick={() => openDeleteModal(task._id)}
                                                >
                                                    <FaTrash />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-info text-white"
                                                    onClick={() => openAssignModal(task)}
                                                >
                                                    <FaUserPlus />
                                                </button>
                                            </td>
                                            <AssignTaskModal
                                                show={showAssignModal}
                                                handleClose={closeAssignModal}
                                                task={selectedTask}
                                                users={users}
                                            />
                                            <ConfirmationModal
                                                show={showDelete}
                                                title="Delete Task"
                                                message="Are you sure you want to delete this task?"
                                                confirmText="Delete"
                                                onConfirm={deleteTask}
                                                onCancel={() => {
                                                    setShowDelete(false);
                                                    setSelectedTaskId(null);
                                                }}
                                            />
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

    );
};

export default AllTasks;