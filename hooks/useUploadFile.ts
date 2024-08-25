import { upload } from "@/app/lib/mutations";
import { useMutation } from "@tanstack/react-query";
import { Bounce, toast } from "react-toastify";

export const useUploadFile = (successCallback: any, failCallback: any) => {
  return useMutation({
    mutationFn: upload,
    onSuccess: (data) => {
      successCallback(data);
    },
    onError: (error) => {
      toast.error(`Uploading a file failed, try again later!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      failCallback(error);
    },
  });
};
