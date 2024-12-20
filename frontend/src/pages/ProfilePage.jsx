import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useParams, useNavigate } from "react-router-dom";
import { BadgeCheck, FilePenLine, Trash2 } from "lucide-react";
import { useState } from "react";
import AvatarUpdate from "../components/AvatarUpdate.jsx";
const ProfilePage = () => {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: userProfile } = useQuery({
    queryKey: ["userProfile", params?.username],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/users/u/${params?.username}`);
        return res?.data?.data;
      } catch (err) {
        (err, "err");
        if (err.response && err.response.status === 401) {
          return null;
        }
        toast.error(err.response.data.message || "Something went wrong");
      }
    },
    refetchOnWindowFocus: false,
  });

  //Delete Listing Mutation
  const deleteListingMutation = useMutation({
    mutationFn: async (listingId) => {
      const res = await axiosInstance.delete(`/listings/${listingId}`);
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile", params?.username]);
      toast.success("Listing deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Failed to delete listing");
    },
  });

  const handleDelete = (listingId) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      deleteListingMutation.mutate(listingId);
    }
  };

  const handleUpdate = (listingId) => {
    // Navigate to the edit page or open a modal
    navigate(`/listings/update-listing/${listingId}`); // Adjust the path as necessary
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
const title = userProfile?.username == authUser?.data?.username ? "Click to Update Profile Image" : "Profile Image";
  return (
    <div className="max-w-full mx-auto p-10 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col laptop:flex-row items-center justify-center laptop:justify-start mb-20 gap-8">
        <div
          className="relative rounded-full "
          onClick={() => {
            userProfile?.username == authUser?.data?.username &&
              setShowModal(true);
          }}
        >
          <img
            src={userProfile?.avatar ||  "/avatar.png"}
            title={title}
            alt="Profile"
            className={`w-32 h-32 tablet:w-40 tablet:h-40 rounded-full border-4  cursor-pointer  object-cover border-none ${userProfile?.username == authUser?.data?.username && "hover:opacity-60"}`}
            // onMouseOver={() => setShowEditIcon(true)}
            // onMouseOut={() => setShowEditIcon(false)}
          />
          {
            userProfile?.username == authUser?.data?.username && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <FilePenLine className="text-white" size={24}  />
              </div>
            )}
        </div>
        <AvatarUpdate show={showModal} handleClose={handleCloseModal} />
        <div className="text-left">
          <h1 className="text-3xl font-bold flex items-center  gap-2">{userProfile?.fullName} {userProfile?.role == "admin" && <span className="text-yellow-500" title="Admin"><BadgeCheck /></span>} {userProfile?.isVerified && userProfile?.role != "admin" && <span className="text-blue-600" title="Verified"><BadgeCheck /></span>}</h1>
          {/* <p className="text-gray-500 font-semibold">{userProfile?.username}</p> */}
        
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold my-10">Property Listings</h2>
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-14">
          {userProfile?.listings?.map((listing) => (
            <div
              key={listing?._id}
              className=" bg-base-100  rounded-3xl shadow  hover:transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-2xl cursor-pointer"
            >
              <img
                src={listing?.images[0]?.url}
                alt={listing?.title}
                onClick={() => navigate(`/listings/${listing?._id}`)}
                className="w-full h-40 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <div
                  className=""
                  onClick={() => navigate(`/listings/${listing?._id}`)}
                >
                  <h3 className="text-lg font-semibold mt-2">
                    {listing?.title?.substring(0, 20)}
                    {`${listing?.title?.length > 15 ? "..." : ""}`}
                  </h3>

                  <p className="font-bold mt-2">Price: PKR {listing?.price}</p>
                  <p className="text-gray-600">{listing?.location?.city}</p>
                </div>

                {authUser?.data?._id === userProfile?._id && (
                  <div className="mt-4 flex justify-between">
                    <span
                      title="Update Your Listing"
                      onClick={(e) => {
                        e.preventDefault();
                        handleUpdate(listing._id);
                      }}
                    >
                      <FilePenLine className="text-gray-500 hover:text-blue-600" />
                    </span>
                    <span
                      title="Delete Listing"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(listing._id);
                      }}
                    >
                      <Trash2 className="text-gray-500 hover:text-red-600" />
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
