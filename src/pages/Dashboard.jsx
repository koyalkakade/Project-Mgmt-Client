import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getAllTask } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getAssignTaskByUser } from "../api/assignTask";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [tasks, setTasks] = useState({
    total: 0,
    pending: 0,
    inprogress: 0,
    completed: 0,
  });

  const [taskStats, setTaskStats] = useState({
    total: 0,
    pending: 0,
    inprogress: 0,
    completed: 0,
  });

  const fetchTasks = async () => {
    try {
      const res = await getAllTask()

      const tasks = res.tasks;
      //console.log('dashboard task',tasks)
      const total = tasks.length;
      const pending = tasks.filter(t => t.status === "Pending").length;
      const inprogress = tasks.filter(t => t.status === "Inprogress").length;
      const completed = tasks.filter(t => t.status === "Completed").length;

      setTaskStats({ total, pending, inprogress, completed });
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }

  const fetchTaskByUser = async () => {
    try {
      const res = await getAssignTaskByUser(user._id);
      const taskArray = res.data;
      const data = taskArray.map(({ task_id }) => task_id);
      console.log(data);
      const total = data.length;
      const pending = data.filter(t => t.status === "Pending").length;
      const inprogress = data.filter(t => t.status === "Inprogress").length;
      const completed = data.filter(t => t.status === "Completed").length;

      setTasks({ total, pending, inprogress, completed });
    }
     catch (error) {
      console.log(error)
    //   toast.error("This user have not assign task");
     }
  }

  useEffect(() => {
    fetchTaskByUser()
    fetchTasks()
  }, [])

  const pieData = [
    { name: "Pending", value: taskStats.pending },
    { name: "In Progress", value: taskStats.inprogress },
    { name: "Completed", value: taskStats.completed },
  ];

  const COLORS = ["#ffc107", "#0d6efd", "#198754"];

  console.log(user,'user')
  return (

    <main className="p-4 w-100 bg-light" style={{ minHeight: "100vh" }}>
      {user?.role === "admin" && (
        <div>
          <div className="d-flex gap-3 mb-4">
            <div className="card p-3 flex-fill dashboard-card total">
              <div className="d-flex align-items-center">
                {/* Left half: icon */}
                <div className="flex-shrink-0 me-3 icon-section">
                  <i className="bi bi-list-task fs-1"></i>
                </div>
                {/* Right half: number + label */}
                <div className="flex-grow-1 text-end content-section">
                  <div className="fs-1 fw-bold">{tasks.total}</div>
                  <div className="small">Total Tasks</div>
                </div>
              </div>
            </div>

            <div className="card p-3 flex-fill dashboard-card pending">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3 icon-section">
                  <i className="bi bi-hourglass-split fs-1"></i>
                </div>
                <div className="flex-grow-1 text-end content-section">
                  <div className="fs-1 fw-bold">{tasks.pending}</div>
                  <div className="small">Pending</div>
                </div>
              </div>
            </div>

            <div className="card p-3 flex-fill dashboard-card inprogress">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3 icon-section">
                  <i className="bi bi-arrow-repeat fs-1"></i>
                </div>
                <div className="flex-grow-1 text-end content-section">
                  <div className="fs-1 fw-bold">{tasks.inprogress}</div>
                  <div className="small">In Progress</div>
                </div>
              </div>
            </div>

            <div className="card p-3 flex-fill dashboard-card completed">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3 icon-section">
                  <i className="bi bi-check-circle-fill fs-1"></i>
                </div>
                <div className="flex-grow-1 text-end content-section">
                  <div className="fs-1 fw-bold">{tasks.completed}</div>
                  <div className="small">Completed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="card shadow-sm p-4">
            <h4 className="mb-4 text-center">Task Status Overview</h4>

            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  innerRadius={70}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {user?.role === "hod" && (
         <div>
          <div className="d-flex gap-3 mb-4">
            <div className="card p-3 flex-fill dashboard-card total">
              <div className="d-flex align-items-center">
                {/* Left half: icon */}
                <div className="flex-shrink-0 me-3 icon-section">
                  <i className="bi bi-list-task fs-1"></i>
                </div>
                {/* Right half: number + label */}
                <div className="flex-grow-1 text-end content-section">
                  <div className="fs-1 fw-bold">{tasks.total}</div>
                  <div className="small">Total Tasks</div>
                </div>
              </div>
            </div>

            <div className="card p-3 flex-fill dashboard-card pending">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3 icon-section">
                  <i className="bi bi-hourglass-split fs-1"></i>
                </div>
                <div className="flex-grow-1 text-end content-section">
                  <div className="fs-1 fw-bold">{tasks.pending}</div>
                  <div className="small">Pending</div>
                </div>
              </div>
            </div>

            <div className="card p-3 flex-fill dashboard-card inprogress">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3 icon-section">
                  <i className="bi bi-arrow-repeat fs-1"></i>
                </div>
                <div className="flex-grow-1 text-end content-section">
                  <div className="fs-1 fw-bold">{tasks.inprogress}</div>
                  <div className="small">In Progress</div>
                </div>
              </div>
            </div>

            <div className="card p-3 flex-fill dashboard-card completed">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3 icon-section">
                  <i className="bi bi-check-circle-fill fs-1"></i>
                </div>
                <div className="flex-grow-1 text-end content-section">
                  <div className="fs-1 fw-bold">{tasks.completed}</div>
                  <div className="small">Completed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="card shadow-sm p-4">
            <h4 className="mb-4 text-center">Task Status Overview</h4>

            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  innerRadius={70}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {user?.role === "user" && (
        <div className="d-flex gap-3 mb-4">
          <div className="card p-3 flex-fill dashboard-card total">
            <div className="d-flex align-items-center">
              {/* Left half: icon */}
              <div className="flex-shrink-0 me-3 icon-section">
                <i className="bi bi-list-task fs-1"></i>
              </div>
              {/* Right half: number + label */}
              <div className="flex-grow-1 text-end content-section">
                <div className="fs-1 fw-bold">{tasks.total}</div>
                <div className="small">Total Tasks</div>
              </div>
            </div>
          </div>

          <div className="card p-3 flex-fill dashboard-card pending">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-3 icon-section">
                <i className="bi bi-hourglass-split fs-1"></i>
              </div>
              <div className="flex-grow-1 text-end content-section">
                <div className="fs-1 fw-bold">{tasks.pending}</div>
                <div className="small">Pending</div>
              </div>
            </div>
          </div>

          <div className="card p-3 flex-fill dashboard-card inprogress">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-3 icon-section">
                <i className="bi bi-arrow-repeat fs-1"></i>
              </div>
              <div className="flex-grow-1 text-end content-section">
                <div className="fs-1 fw-bold">{tasks.inprogress}</div>
                <div className="small">In Progress</div>
              </div>
            </div>
          </div>

          <div className="card p-3 flex-fill dashboard-card completed">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-3 icon-section">
                <i className="bi bi-check-circle-fill fs-1"></i>
              </div>
              <div className="flex-grow-1 text-end content-section">
                <div className="fs-1 fw-bold">{tasks.completed}</div>
                <div className="small">Completed</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <Outlet /> */}
    </main>

  );
};

export default Dashboard;