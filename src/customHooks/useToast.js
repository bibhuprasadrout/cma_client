import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = (paramsArray) => {
  const [toastParams, setToastParams] = useState([]);
  useEffect(() => {
    setToastParams(paramsArray);
  });
  useEffect(() => {
    if (toastParams.length === 0) return;
    if (toastParams[0] === "success") {
      toast.success(toastParams[1], {
        position: "top-right",
        autoClose: toastParams[2],
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else if (toastParams[0] === "error") {
      toast.error(toastParams[1], {
        position: "top-right",
        autoClose: toastParams[2],
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      toast.warning(toastParams[1], {
        position: "top-right",
        autoClose: toastParams[2],
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }, [toastParams]);
  return <ToastContainer />;
};

export default useToast;
