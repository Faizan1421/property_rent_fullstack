import {useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import ListingCard from "../components/ListingCard";


const SearchPage = () => {
 
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";


  // Search lisiting query
  const { data: listingsByQuery } = useQuery({
    queryKey: ["listingsByQuery", q],
    // dependencies: [id],
    queryFn: async () => {
      try {
        const params = new URLSearchParams({ q: q }); // encode the q parameter properly
        const res = await axiosInstance.get(
          `/listings/search?${params.toString()}`
        );
        console.log(res?.data);
        return res?.data;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          return null;
        }
        toast.error(err.response.data.message || "Something went wrong");
      }
    },
    refetchOnWindowFocus: false, //refetchOnMount: false, for coming back on tab it will not refetch the data
    enabled: !!q,
    staleTime: 100000,
  });

  return (
    <>
    { listingsByQuery &&listingsByQuery?.data?.docs?.length == 0 && (
      <div className="text-center w-full mt-20  text-blue-600">No Results Found</div>
    )}
    {listingsByQuery && listingsByQuery?.data?.docs?.length > 0 && (
      <div className="text-center w-full mt-20 mb-10 tablet:mt-32 tablet:mb-20 text-blue-600">Results Found: {listingsByQuery?.data?.totalDocs}</div>
    )}
    <div className="flex flex-wrap  ">
      {listingsByQuery && listingsByQuery?.data?.docs?.length > 0 &&
        listingsByQuery?.data?.docs?.map((item, index) => (
          <div
          key={index}
            className={`w-full ${listingsByQuery?.data?.docs?.length == 1 && "laptop:flex-1"} ${
              listingsByQuery?.data?.docs?.length >= 3 ? "laptop:w-1/3" : "laptop:w-1/2"
            } ${
              listingsByQuery?.data?.docs?.length >= 4 && "desktop:w-1/4"
            }   p-2 flex justify-center `}
          >
            <ListingCard item={item} />
          </div>
        ))}
    </div>
        </>
  );
};

export default SearchPage;
