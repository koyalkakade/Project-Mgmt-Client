import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createTASK, getTaskById, updateTask } from "../../api/taskAPI"; // adjust imports
import { toast } from "react-toastify";
import { FaTasks, FaAlignLeft, FaCalendarAlt, FaFileUpload, FaProjectDiagram } from "react-icons/fa";
import { getAllProjects } from "../../api/projectAPI";

const CreateUpdateTask = () => {
  const { ID } = useParams(); // route param
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Pending");

  const [file, setFile] = useState(null);
  const [existingFile, setExistingFile] = useState("");

  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");

  const isEdit = Boolean(ID);

  const fetchProjects = async () => {
    try {
      const res = await getAllProjects();
      // console.log(res)
      setProjects(res.projects);
    } catch (err) {
      toast.error("Failed to load projects");
    }
  };

  // Fetch task if editing
  const fetchTask = async () => {
    try {
      const res = await getTaskById(ID);
      //console.log(res)
      const task = res.task;
      setTitle(task.title);
      setDescription(task.description);
      setStartDate(task.startDate);
      setEndDate(task.endDate);
      setStatus(task.status);
      setProjectId(task.project_ID || "");
      setProjectName(task.project_ID.title ||"");
      setExistingFile(task.docPath || "");
    } catch (error) {
      toast.error("Failed to load task");
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchTask();
    } else {
      // reset fields for create mode
      fetchProjects();
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setStatus("Pending");
      setFile(null);
      setExistingFile("");
    }
  }, [ID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const st = startDate ? startDate.split("T")[0] : "";
      const ed = endDate ? endDate.split("T")[0] : "";
      const formData = new FormData();

      console.log(projectId._id,'projectId')

      formData.append("title", title);
      formData.append("description", description);
      formData.append("startDate", st);
      formData.append("endDate", ed);
      formData.append("project_ID", projectId._id);

      if (isEdit) {
        formData.append("status", status);
      }

      if (file) {
        formData.append("docPath", file); // same name expected by multer
      }

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      let res;
      if (isEdit) {
        //console.log(ID)
        res = await updateTask(ID, formData);
      } else {
        res = await createTASK(formData);
      }

      toast.success(res.msg);
      navigate("/dashboard/all-tasks");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <FaTasks className="me-2" />
            {isEdit ? "Update Task" : "Create Task"}
          </h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
           {isEdit ? (
  <div className="mb-3">
    <label className="form-label">Project</label>

    <div className="input-group">
      <span className="input-group-text">
        <FaProjectDiagram />
      </span>

      <input
        type="text"
        className="form-control"
        value={projectName}
        readOnly
      />

      {/* Hidden input so project ID is still submitted */}
      <input type="hidden" value={projectId} />
    </div>
  </div>
) : (
  <div className="mb-3">
    <label className="form-label">Project</label>

    <div className="input-group">
      <span className="input-group-text">
        <FaProjectDiagram />
      </span>

      <select
        className="form-select"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        required
      >
        <option value="">Select Project</option>

        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.title}
          </option>
        ))}
      </select>
    </div>
  </div>
)}
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Task Title</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaTasks />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required readOnly
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaAlignLeft />
                </span>
                <textarea
                  rows="4"
                  className="form-control"
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>

            {/* Start Date */}
            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>
                <input
                  type="date"
                  className="form-control"
                  value={startDate ? startDate.split("T")[0] : ""}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label className="form-label">End Date</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>
                <input
                  type="date"
                  className="form-control"
                  value={endDate ? endDate.split("T")[0] : ""}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Upload Document */}
            <div className="mb-4">
              <label className="form-label">Upload File</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaFileUpload />
                </span>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                />
              </div>

              {existingFile && !file && (
                <div className="mt-2">
                  <small className="text-success">
                    Current File: {existingFile}
                  </small>
                </div>
              )}
            </div>

            {/* Status field only for update */}
            {isEdit && (
              <div className="mb-4">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Inprogress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              {isEdit ? "Update Task" : "Create Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUpdateTask;
