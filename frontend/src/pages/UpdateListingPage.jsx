import { useQuery } from "@tanstack/react-query"
import CreateOrUpdateListingPage from "../components/CreateOrUpdateListing"
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";




const UpdateListingPage = () => {
    const { id } = useParams();
  const { data: listingDetails } = useQuery({
    queryKey: ["ListingDetails", id],
    // dependencies: [id],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/listings/single/${id}`);
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          return null;
        }
        toast.error(err.response.data.message || "Something went wrong");
      }
    },
    refetchOnWindowFocus: false, //refetchOnMount: false, for coming back on tab it will not refetch the data
    staleTime: 600000
  });

 

  return (
    <>
    <h2 className="text-3xl laptop:text-4xl font-bold mt-20 mb-10 laptop:mb-20 text-center text-blue-600 ">
      Update Listing Details
    </h2>
    <CreateOrUpdateListingPage data={listingDetails} />
  </>
  )
}

export default UpdateListingPage