import React, { useState } from "react";
import { createTASK } from "../../api/taskAPI";
import { toast } from "react-toastify";
import {
  FaTasks,
  FaAlignLeft,
  FaCalendarAlt,
} from "react-icons/fa";

const CreateUpdateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title,
        description,
        startDate,
        endDate,
      };

      const res = await createTASK(payload);

      toast.success(res.msg);

      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Something went wrong"
      );
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <FaTasks className="me-2" />
            Create Task
          </h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">
                Task Title
              </label>

              <div className="input-group">
                <span className="input-group-text">
                  <FaTasks />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">
                Description
              </label>

              <div className="input-group">
                <span className="input-group-text">
                  <FaAlignLeft />
                </span>

                <textarea
                  rows="4"
                  className="form-control"
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                ></textarea>
              </div>
            </div>

            {/* Start Date */}
            <div className="mb-3">
              <label className="form-label">
                Start Date
              </label>

              <div className="input-group">
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>

                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(e.target.value)
                  }
                />
              </div>
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label className="form-label">
                End Date
              </label>

              <div className="input-group">
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>

                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(e.target.value)
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUpdateTask;