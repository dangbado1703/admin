import { RcFile } from "antd/es/upload";
import { toast } from "react-toastify";

export const filterSelectOption = (input: any, option: any) => {
  return (
    option.label?.toLowerCase().includes(input) || option.label?.includes(input)
  );
};
export const TOKEN_KEY = "shopping_token";
export const useAuth = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    return true;
  }
  return false;
};

export const DATE_FORMAT_YYYY_MM_DD = "YYYY-MM-DD";
export const DATE_FORMAT_YYYYMMDD = "YYYY/MM/DD";
export const STATUS_ACTIVE = [
  {
    label: "Không hoạt động",
    value: "0",
  },
  {
    label: "Hoạt động",
    value: "1",
  },
];
export const GET_BASE64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const BEFORE_UPLOAD = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    toast.error("Vui lòng tải lên JPG/PNG file ");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    toast.error("Vui lòng tải lên file nhỏ hơn 2MB");
  }
  return isJpgOrPng && isLt2M;
};

export const PRODUCER = [
  {
    label: "Dell",
    value: "Dell",
  },
  {
    label: "Viettel",
    value: "Viettel",
  },
  {
    label: "Vinaphone",
    value: "Vinaphone",
  },
];
