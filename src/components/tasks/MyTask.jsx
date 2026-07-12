import React, { useEffect, useState } from "react";
import { getTaskById, deleteTASK } from "../../api/taskAPI";
import { toast } from "react-toastify";
import {
    FaEdit,
    FaTrash,
    FaSearch,
    FaFilter,
    FaCalendarAlt
} from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getMyAssignedTasks } from "../../api/assignTask";
import{updateTaskStatus} from '../../api/taskAPI'
import { useNavigate } from "react-router-dom";

const MyTask = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [month, setMonth] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const tasksPerPage = 10;


    const fetchTasks = async () => {
        try {
            const res = await getMyAssignedTasks();
            const res1 = res.getTasks           
            const data = res1.map(({ task_id }) => task_id);
            setTasks(data);
            // console.log(res1)
        } catch (error) {
            toast.error("Failed to fetch tasks");
        }
    };

    const openModal = (task) => {
        setSelectedTask({ ...task });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedTask(null);
    };

    const handleStatusUpdate = async () => {
        try {
            await updateTaskStatus(selectedTask._id, {
                status: selectedTask.status,
            });

            toast.success("Status updated successfully");
            closeModal();
            fetchTasks();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);


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


    return (
        <div className="container-fluid mt-4">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">My Tasks</h4>
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
                                    <th>Project Title</th>
                                    <th>Task Title</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentTasks.length > 0 ? (
                                    currentTasks.map((task, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                             <td>{task.project_ID.title}</td>
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
                                                        openModal(task)
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
                                                    {selectedTask && (
                                                        <>
                                                            <div className="mb-3">
                                                                <label className="form-label">Title</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={selectedTask.title}
                                                                    readOnly
                                                                />
                                                            </div>

                                                            <div className="mb-3">
                                                                <label className="form-label">Description</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    value={selectedTask.description}
                                                                    readOnly
                                                                />
                                                            </div>

                                                            <div className="mb-3">
                                                                <label className="form-label">Start Date</label>
                                                                <input
                                                                    type="date"
                                                                    className="form-control"
                                                                    value={selectedTask.startDate?.split("T")[0]}
                                                                    readOnly
                                                                />
                                                            </div>

                                                            <div className="mb-3">
                                                                <label className="form-label">End Date</label>
                                                                <input
                                                                    type="date"
                                                                    className="form-control"
                                                                    value={selectedTask.endDate?.split("T")[0]}
                                                                    readOnly
                                                                />
                                                            </div>

                                                            <div className="mb-3">
                                                                <label className="form-label">Status</label>
                                                                <select
                                                                    className="form-select"
                                                                    value={selectedTask.status}
                                                                    onChange={(e) =>
                                                                        setSelectedTask({
                                                                            ...selectedTask,
                                                                            status: e.target.value,
                                                                        })
                                                                    }
                                                                >
                                                                    <option value="Pending">Pending</option>
                                                                    <option value="Inprogress">Inprogress</option>
                                                                    <option value="Completed">Completed</option>
                                                                </select>
                                                            </div>
                                                        </>
                                                    )}
                                                </Modal.Body>

                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={closeModal}>
                                                        Cancel
                                                    </Button>

                                                    <Button variant="primary" onClick={handleStatusUpdate}>
                                                        Update Status
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
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
    )
}

export default MyTask