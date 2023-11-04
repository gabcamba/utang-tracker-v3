import toast from "react-hot-toast";

const HOT_TOAST_STYLES = {
  borderRadius: "50px",
  background: "#000000",
  color: "#fff",
  fontFamily: "ui-monospace",
  fontSize: "0.8rem",
};

export const errorToast = (message) => {
  return toast.error(message, {
    style: HOT_TOAST_STYLES,
  });
};

export const successToast = (message) => {
  return toast.success(message, {
    style: HOT_TOAST_STYLES,
  });
};
