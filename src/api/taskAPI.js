import axiosInstance from "./axiosInstance";

export const createTASK =async (formData) => {
const res = await axiosInstance.post("/task/createTask",  formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
    return res.data
}

export const getAllTASKS = async () => {
  const res = await axiosInstance.get("/task/getAll");
  return res.data;
};

export const deleteTASK = async (id) => {
  const res = await axiosInstance.delete(`/task/delete/${id}`);
  return res.data;
};

export const getTaskById = async (ID) => {
  const res = await axiosInstance.get(`/task/getTaskByID/${ID}`);
  return res.data;
};

export const updateTask = async (id,payload) => {
  const res = await axiosInstance.put(`/task/updateTask/${id}`, payload);
    return res.data;
};

export const updateTaskStatus = async (id, data) => {
    const res = await axiosInstance.patch(`/task/updateStatus/${id}`, data);
    return res.data;
};