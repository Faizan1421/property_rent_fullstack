import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useParams } from "react-router-dom";

const AvatarUpdate = (data) => {
    const { show, handleClose } = data;
  const [image, setImage] = useState(null);
  const queryClient = useQueryClient();
  const params = useParams();
  // Avatar Update Mutation
  const { mutate: updateAvatar } = useMutation({
    mutationFn: (newAvatar) => axiosInstance.patch(`/users/avatar`, newAvatar),
    onSuccess: () => {
      toast.success("Avatar Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["userProfile", params?.username] });
      handleClose(); // Close the modal after successful update
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  const handleUpdateAvatar = (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image to upload");
      return;
    }

    // Create FormData to send image
    const formData = new FormData();
    formData.append(`avatar`, image, image.name);
    updateAvatar(formData);
  };

  return (
    <div
      className={`fixed z-[100] flex justify-center items-center mx-auto top-0 left-0 bg-gray-500 bg-opacity-75 transition-opacity ${
        show ? "block" : "hidden"
      } w-[100vw] h-[100vh]`}
    >
      <form className="w-full tablet:w-1/2 laptop:w-1/3 mx-10" onSubmit={handleUpdateAvatar}>
        <div className="bg-white px-4 pt-5 pb-4 tablet:p-6 tablet:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-10">
                Update Avatar
              </h3>
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => {
                    e.preventDefault();
                    setImage(e.target.files[0]); // Set the first file
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="submit"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default AvatarUpdate;