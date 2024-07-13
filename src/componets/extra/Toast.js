import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// toast.configure();

export const setToast = (type, data) => {
  return toast(data, {
    type: type,
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    rtl: false,
  });
};
