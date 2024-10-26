import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import ListingCard from "../components/ListingCard";

const WishlistPage = () => {
  const { data: wishlist } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/wishlist");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          return null;
        }
        toast.error(err.response.data.message || "Something went wrong");
      }
    },
    refetchOnWindowFocus: false, //refetchOnMount: false, for coming back on tab it will not refetch the data
  });

  return (
    <div className="flex flex-col items-center justify-center laptop:px-20 ">
      <h1 className="text-4xl font-semibold my-20 text-blue-600">Wishlist</h1>
      <div className="flex  flex-wrap justify-center flex-row  ">
        {wishlist?.data?.map((item, index) => (   
          <ListingCard key={index} item={item?.listing} />
          
        ))}
      </div>
      <div>
      {wishlist?.data?.length < 1 && <h1 className="text-lg font-semibold text-gray-600">No Listing Added to wishlist Yet !!!</h1>}
      </div>
    </div>
  );
};

export default WishlistPage;
