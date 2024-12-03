import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import ListingCard from "../components/ListingCard";
import { useEffect } from "react";
import { Loader } from "lucide-react";
// import { useLocation, useHistory } from'react-router-dom';
const SearchPage = () => {
  // const {pagetype} = useParams()

  //  const location = useLocation();
  //  const fullUrl = location.href;
  // const history = useHistory();
  // console.log(rentSelected, "rentselected");
  const [searchPageParams, setSearchPageParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const page = searchParams.get("page") || 1;
  const pagetype = searchParams.get("pagetype");
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["listingsByQuery", [q, page]] });
  }, [q, page, queryClient]);

  // Search lisiting query
  const {
    data: listingsByQuery,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["listingsByQuery", [q, page]],

    queryFn: async () => {
      try {
        const params = new URLSearchParams({ q: q, page: page });
        const res = await axiosInstance.get(
          `/listings/search?type=${pagetype}&${params.toString()})}`
        );
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
  });

  //  useEffect(() => {
  //   queryClient.invalidateQueries({ queryKey: ["listingsByQuery", [q, page]]});
  // },[rentSelected, q, page, queryClient])

  return isPending || isLoading ? 
  (
    <div className="flex justify-center items-center h-screen">
       <Loader className="size-10 animate-spin text-blue-700" />
    </div>
  ) : (
    <>
      {/* <div className="flex  justify-center items-center gap-4 mt-10 ">
      <h1 className={`text-2xl font-bold  cursor-pointer btn ${!rentSelected ? "btn-primary text-white" : "btn-outline btn-outline-primary text-blue-600 hover:btn-primary hover:text-white"  }`} onClick= {(e)=>{
        e.preventDefault();
        setRentSelected(false)
        const newUrl = fullUrl.replace('pagetype=rent', 'pagetype=buy');
        history.push(newUrl);
      }}>Buy</h1>
      <h1 className={`text-2xl font-bold  cursor-pointer btn ${rentSelected ?  "btn-primary text-white" : "btn-outline btn-outline-primary text-blue-600 hover:btn-primary hover:text-white" }`} onClick= {(e)=>{
        e.preventDefault();
        setRentSelected(true)
        const newUrl = fullUrl.replace('pagetype=buy', 'pagetype=rent');
         history.push(newUrl);
        }}>Rent</h1>
    </div> */}
      <div className="flex flex-col justify-center items-center ">
        {listingsByQuery && listingsByQuery?.data?.docs?.length == 0 && (
          <div className="text-center w-full mt-20  text-blue-600 font-semibold">
            No Results Found
          </div>
        )}
        {listingsByQuery && listingsByQuery?.data?.docs?.length > 0 && (
          <div className="text-center w-full mt-10 mb-10  text-blue-600 font-semibold">
            Total {listingsByQuery?.data?.totalDocs}
            {`${
              listingsByQuery?.data?.totalDocs > 1 ? " Listings" : " Listing"
            }`}
            Found
          </div>
        )}
        {/* // Pagination */}
        {listingsByQuery && listingsByQuery?.data?.docs?.length > 0 && (
          <div className="join mb-5">
            <button
              className="join-item btn hover:bg-blue-600 hover:text-white text-xs"
              disabled={!listingsByQuery?.data?.hasPrevPage}
              onClick={(e) => {
                e.preventDefault();
                setSearchPageParams((prev) => {
                  prev.set("page", Number(prev.get("page")) - 1);
                  return prev;
                });
              }}
            >
              «
            </button>
            <button className="join-item btn hover:bg-blue-600 hover:text-white text-xs">
              {listingsByQuery?.data?.page}
            </button>
            <button
              className="join-item btn hover:bg-blue-600 hover:text-white text-xs"
              disabled={!listingsByQuery?.data?.hasNextPage}
              onClick={(e) => {
                e.preventDefault();
                setSearchPageParams((prev) => {
                  prev.set("page", Number(prev.get("page")) + 1);
                  return prev;
                });
              }}
            >
              »
            </button>
          </div>
        )}
        {/* pagination end */}
        <div className="flex flex-wrap  ">
          {listingsByQuery &&
            listingsByQuery?.data?.docs?.length > 0 &&
            listingsByQuery?.data?.docs?.map((item, index) => (
              <div
                key={index}
                className={`w-full ${
                  listingsByQuery?.data?.docs?.length == 1 && "laptop:flex-1"
                } ${
                  listingsByQuery?.data?.docs?.length >= 3
                    ? "laptop:w-1/3"
                    : "laptop:w-1/2"
                } ${
                  listingsByQuery?.data?.docs?.length >= 4 && "desktop:w-1/4"
                }   p-2 flex justify-center `}
              >
                <ListingCard item={item} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
