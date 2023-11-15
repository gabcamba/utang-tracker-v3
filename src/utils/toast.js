import toast from "react-hot-toast";
import { toastStyle } from "../styles";

export const errorToast = (message) => {
  return toast.error(message, {
    style: toastStyle,
  });
};

export const successToast = (message) => {
  return toast.success(message, {
    style: toastStyle,
  });
};
