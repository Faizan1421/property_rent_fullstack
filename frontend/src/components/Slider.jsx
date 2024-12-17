// import {  useState } from 'react';
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./sliderStyles.css";
import { CircleX, ImagePlus, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const Slider = (data) => {
  const [selectedimages, setSelectedimages] = useState([]);

  const { id: listingId } = useParams();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  // (authUser?.data?._id, "authUser");

  const queryClient = useQueryClient();

  const images = data?.listingDetails?.data[0]?.images;

  // Delete Listing Image Mutation
  const { mutate: deleteImage } = useMutation({
    mutationFn: (public_id) =>
      axiosInstance.delete(`/listings/${listingId}/images/${public_id}`),
    onSuccess: (res) => {
      queryClient.invalidateQueries(["ListingDetails", listingId]);
      (res, "Image deleted res");
      toast.success("Image Deleted successfully");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });
  // Update Listing Image Mutation
  const { mutate: updateImageToBackend, isLoading: isUpdatingImage } = useMutation({
    mutationFn: (data) =>
      axiosInstance.patch(`/listings/${listingId}/images/`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["ListingDetails", listingId]);
     
      toast.success("Image Updated successfully");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });

  const handleDeleteImage = async (public_id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      deleteImage(public_id);
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const validImage = image.type.startsWith("image/");

    if (!validImage) {
      toast.error("Please select a valid image file");
      return;
    }
    setSelectedimages([image]);
  };

  const updateImage = () => {
    const formData = new FormData();
    if (selectedimages.length > 0) {
      formData.append("listingImages", selectedimages[0]);
      updateImageToBackend(formData);
      document.getElementById("my_modal_3").close();
    }

  }

  return (
    <>
      {/* select image start here */}
      {
        <>
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              {/* content start here */}
              <label className="block text-lg laptop:text-2xl font-bold mb-4 ">
                Select Image
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                required
                // disabled={isPending || isUpdating}
                className="mb-8"
              />
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  updateImage()
                  // document.getElementById("my_modal_3").close();
                  
                }}
                disabled={isUpdatingImage}
              >
                Upload
              </button>

              {/* content end here */}
            </div>
          </dialog>
        </>

        //   <div className="absolute top-0 right-0 p-2 w-full h-full  flex justify-center items-center z-50 bg-black backdrop-blur-md bg-opacity-50">
        //   <label className="block text-lg laptop:text-2xl font-bold mb-4 ">
        //     Upload Images (max 5)
        //   </label>

        //   <input
        //     type="file"
        //     multiple
        //     accept="image/*"
        //     onChange={handleImageChange}
        //     required
        //     // disabled={isPending || isUpdating}
        //     className="mb-8"
        //   />
        //   <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-4 mb-4 ">
        //     {previewImages.map((image, index) => (
        //       <div key={index} className="relative">
        //         <img
        //           src={image}
        //           alt={`preview ${index}`}
        //           className="w-full h-32 object-cover rounded  "
        //           // disabled={isPending || isUpdating}
        //         />
        //         <button
        //           onClick={(e) => {
        //             e.preventDefault();
        //             handleRemoveImage(index);
        //           }}
        //           className="absolute top-0 right-0 bg-white text-white rounded-full p-1"
        //         >
        //           <X color="blue" width={10} height={10} />
        //         </button>
        //       </div>
        //     ))}
        //   </div>
        // </div>
      }
      {/* Select img ends here */}
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        slidesPerView={2}
        centeredSlides={true}
        spaceBetween={30}
        // pagination={{
        //   type: "fraction",

        // }}
        navigation={true}
        virtual
        className="w-[100%] text-gray-100 text-sm font-semibold cursor-grabbing  "
      >
        {images?.map((slideContent, index) => (
          <SwiperSlide
            key={slideContent}
            virtualIndex={index}
            className="text-center text-[18px] items-center"
          >
            <img
              src={slideContent?.url}
              className="block h-[300px]  tablet:h-[400px] laptop:w-[400px] laptop:h-[400px] desktop:w-[600px] desktop:h-[400px] object-cover"
              onClick={() =>
                document.getElementById(`index-${index}`).showModal()
              }
            />
            {authUser &&
              authUser?.data?._id ==
                data?.listingDetails?.data[0]?.owner?._id && (
                <div
                  className="absolute top-0 right-0 p-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteImage(slideContent?.public_id);
                  }}
                >
                  <Trash2 className="w-5 h-5 hover:w-7 hover:h-7 text-white hover:text-red-600 " />
                </div>
              )}

            {/* Daisy Ui Model is implemented below for full image view */}
            <dialog
              id={`index-${index}`}
              className="modal bg-black bg-opacity-50 backdrop-blur-lg"
            >
              <div className="modal-box p-0 ">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-blue-600">
                    <CircleX />
                  </button>
                </form>
                <img
                  src={slideContent?.url}
                  alt=""
                  className="w-[100%] h-[100%] object-contain overflow-hidden "
                />
              </div>
            </dialog>
          </SwiperSlide>
        ))}
        {authUser &&
          authUser?.data?._id == data?.listingDetails?.data[0]?.owner?._id &&
          images.length < 15 && (
            <SwiperSlide
              className="text-center text-[18px] items-center"
              onClick={(e) => {
                e.preventDefault();
                // setSelectImage(true);
                document.getElementById("my_modal_3").showModal();
              }}
            >
              <div className="w-[100%] h-[300px]  tablet:h-[400px] laptop:w-[400px] laptop:h-[400px] desktop:w-[600px] desktop:h-[400px] object-cover bg-gray-200 flex justify-center items-center">
                <ImagePlus className="w-10 h-10 text-blue-600" />
              </div>
            </SwiperSlide>
          )}
      </Swiper>

      {/* Images Upload ends here*/}
    </>
  );
};

export default Slider;
