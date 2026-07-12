import axiosInstance from "./axiosInstance";

export const getAllProjects = async () => {
    console.log('----')
  const res = await axiosInstance.get("/project/getAll");
  return res.data;
};