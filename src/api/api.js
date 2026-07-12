import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  const res = await axiosInstance.post("/user/register", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const loginUser = async (loginData) => {
  const res = await axiosInstance.post("/user/login", loginData);
  console.log(res)
  return res.data;
};

export const getUserInfo = async () => {
  const res = await axiosInstance.get("/user/getUserInfo")
  return res.data
}

export const getAllTask = async () => {
  const res = await axiosInstance.get("/task/getAll")
  return res.data
}

export const getAllUsers = async () => {
  const res = await axiosInstance.get("/user/getAllUsers");
  return res.data;
};

export const changePasswordAPI = async (id, pass) => {
  // console.log('////////////////')
  const res = await axiosInstance.patch(`/user/changePassword/${id}`, { pass: pass });
  return res.data;
};

export const sendOTP = async (email) => {
  const res = await axiosInstance.post("/user/send-otp", { email });
  return res.data;
};

export const verifyOTP = async (email, otp) => {
  const res = await axiosInstance.post("/user/verify-otp", { email, otp });
  return res.data;
};
//
export const changePassword = async (email, pass) => {
  // console.log('////////////////')
  const res = await axiosInstance.patch(`/user/changePasswordOTP`, { email: email, pass: pass });
  return res.data;
};

export const getUserProfile = async (userID) => {
  //console.log('////////////////',userID)
  const res = await axiosInstance.get(`/user/getUserProfileById/${userID}`);
  return res.data;
};
//updateProfile role and status
export const updateProfileStatusRole = async (userID, data) => {
  const res = await axiosInstance.put(`/user/updateProfileStatus/${userID}`, { data: data });
  return res.data;
};

export const updateProfileAPI = async (id, payload) => {
  console.log('profiel api', payload)
  const res = await axiosInstance.put(
    `/user/updateProfile/${id}`,
    payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};