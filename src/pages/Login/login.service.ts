import instance from "../../config/axios.config";

export const loginService = async (data: {
  username: string;
  password: string;
}) => {
  return await instance.post("/user/login", data);
};
