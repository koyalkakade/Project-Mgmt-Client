import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { assignTaskToUserAPI } from "../../api/assignTask";
import { toast } from "react-toastify";

const AssignTaskModal = ({
  show,
  handleClose,
  task,
  users,
}) => {
  const [selectedUser, setSelectedUser] = useState("");

  const handleAssignTask = async () => {
    if (!selectedUser) {
      return toast.error("Please select user");
    }

    try {
      const payload = {
        task_id: task._id,
        user_id: selectedUser,
      };

      const res = await assignTaskToUserAPI(payload);

      toast.success(res.msg);

      setSelectedUser("");
      handleClose();
    } catch (error) {
      toast.error(
        error.response?.data?.msg ||
          "Failed to assign task"
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Assign Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">
            Task
          </label>

          <input
            className="form-control"
            value={task?.title || ""}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Select User
          </label>

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
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>

        <Button
          variant="primary"
          onClick={handleAssignTask}
        >
          Assign Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignTaskModal;