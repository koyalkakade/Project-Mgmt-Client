import axiosInstance from "./axiosInstance";


export const assignTaskToUserAPI = async (payload) => {
  const res = await axiosInstance.post("/assign/assignTask", payload);
  return res.data;
};

export const getMyAssignedTasks = async () => {
  const res = await axiosInstance.get("/assign/myAssignedTasks");
  return res.data;
};

export const updateTaskStatus = async (id, data) => {
    const res = await axiosInstance.patch(`/task/updateStatus/${id}`, data);
    return res.data;
};

export const getAssignTaskByUser = async (userID) => {
  const res = await axiosInstance.get(`/assign/getTasksByUser/${userID}`);
  return res.data;
};
//
export const assignTaskToUsers = async (payload) => {
  const res = await axiosInstance.post(`/assign/assignMultipleUsers`,payload);
  return res.data;
};