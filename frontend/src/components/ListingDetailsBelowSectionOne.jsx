import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { BadgeCheck } from "lucide-react";

const ListingDetailsBelowSectionOne = (data) => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  // const { data: conversationIdState } = useQuery({ queryKey: ["conversationIdState"] });
  const listingDetails = data?.listingDetails?.data[0];

  const navigate = useNavigate();

  const { mutate: createConversation } = useMutation({
    mutationFn: (userData) => axiosInstance.post("/conversations", userData),
    onSuccess: (res) => {
      // (res?.data?.data?._id);

      navigate(`/messenger/${res?.data?.data?._id}`);
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });

  const handleClick = () => {
    if (authUser) {
      createConversation({
        receiverId: listingDetails?.owner?._id,
      });
    } else {
      // setting current path as a state in loccation to redirect back to this page
      navigate("/login", { state: { from: location.pathname } });
    }
  };

  return (
    <div className="flex justify-between  items-center  laptop:w-[60%]">
      <div className="flex justify-start items-center gap-2">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src={
                listingDetails?.owner?.avatar
                  ? listingDetails?.owner?.avatar
                  : "/avatar.png"
              }
              alt="Profile Image"
              onClick={() => {
                navigate(`/profile/${listingDetails?.owner?.username}`);
              }}
            />
          </div>
        </div>
        <h1
          className="text-sm font-semibold text-black flex items-center gap-2 cursor-pointer"
          onClick={() => {
            navigate(`/profile/${listingDetails?.owner?.username}`);
          }}
        >
          {listingDetails?.owner?.fullName}  {listingDetails?.owner?.role == "admin" && <span className="text-yellow-500" title="Admin"><BadgeCheck /></span>} {listingDetails?.owner?.isVerified && listingDetails?.owner?.role != "admin"   && <span className="text-blue-600" title="Verified"><BadgeCheck /></span>}
        </h1>
      </div>
      <div className="">
        {listingDetails?.owner?._id == authUser?.data?._id ? (
          <h1
            className="btn hover:bg-blue-600 hover:text-white text-xs"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/listings/update-listing/${listingDetails?._id}`);
            }}
          >
            Edit Listing
          </h1>
        ) : (
          <h1
            className="btn hover:bg-blue-600 hover:text-white text-xs"
            onClick={handleClick}
          >
            Message
          </h1>
        )}
      </div>
    </div>
  );
};

export default ListingDetailsBelowSectionOne;
