import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const success = (text) =>
    toast.success(text, { ...ToastConfig, icon: "👍", toastId: text });

export const error = (text) =>
    toast.error(text, { ...ToastConfig, icon: "😥", toastId: text });

export const warning = (text) =>
    toast.warn(text, { ...ToastConfig, icon: "😑", toastId: text });

export const generatedToast = (toast) => {
    switch (toast.data?.status) {
        case "create":
            success(toast.data?.message);
            break;
        case "update":
            success(toast.data?.message);
            break;
        case "delete":
            error(toast.data?.message);
            break;
        case "warning":
            warning(toast.data?.message);
            break;
        case "error":
            error(toast.data?.message);
            break;
    }
};

export const Toast = () => {
    return (
        <ToastContainer
            style={{ width: "auto" }}
            transition={Slide}
            closeOnClick
        />
    );
};
