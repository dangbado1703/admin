import instance from "../../config/axios.config";
import { FormRegister } from "../../model/register.model";

export const registerService = async (data: FormRegister) => {
  return await instance.post("/user/create", data);
};
