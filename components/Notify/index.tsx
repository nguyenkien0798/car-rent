import { Bounce, toast } from "react-toastify";

interface ToastNotify {
  message: string;
  type: string;
}

const Notify = ({ message, type }: ToastNotify) => {
  let ToastMessage;

  switch (type) {
    case "success":
      ToastMessage = toast.success;
      break;
    case "error":
      ToastMessage = toast.error;
      break;
    case "warn":
      ToastMessage = toast.warn;
      break;
    default:
      ToastMessage = toast;
      break;
  }

  ToastMessage(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

export default Notify;
