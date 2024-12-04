import {
  useInfiniteQuery,
  useQuery,
  
} from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import InfiniteScroll from "react-infinite-scroller";
// import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import ListingCard from "./ListingCard";
import { useLocation } from "react-router-dom";

const Listings = () => {
  const location = useLocation();
  // const queryClient = useQueryClient();

  // Simulating selected category
  const { data: selectedCategory = { name: "all" }} =
    useQuery({
      queryKey: ["selectedCategory"],
      initialData: { name: "all" },
    });

  const fetchProjects = async ({ pageParam = 1 }) => {
    const { data } = await axiosInstance.get(
      `listings/c/${selectedCategory.name}?type=${
        location.pathname === "/listings-rent" ? "rent" : "buy"
      }&page=${pageParam}&limit=12`
    );
    return data.data;
  };

  const {
    data: queryData = {},
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["listings", selectedCategory.name, location.pathname],
    queryFn: fetchProjects,
    getNextPageParam: (lastPage) =>
      lastPage?.hasNextPage ? lastPage.page + 1 : undefined,
    refetchOnWindowFocus: false,
  });


  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
      <Loader className="size-10 animate-spin text-blue-700" />
      </div>
    );

  if (!queryData && !isLoading)
    return <div className="text-center w-full">No data</div>;

  if (isError)
    return <div className="text-center w-full">{error.message}</div>;

  return (
    <div className="mb-48 mt-5 flex flex-col flex-wrap justify-center items-center">
      {/* Example category selector */}
      <div className=" mb-5 tablet:mb-20  w-full justify-center flex items-center " >
       <h1 className="text-2xl tablet:text-3xl laptop:text-4xl font-bold text-blue-600">{location.pathname === "/listings-rent" ? "Rent Properties" : "Buy Properties"}</h1>
      </div>

      <InfiniteScroll
        loadMore={() => {
          if (!isFetching) fetchNextPage();
        }}
        hasMore={hasNextPage}
      >
        {queryData.pages.map((page, pageIndex) => (
          <div key={pageIndex} className="flex flex-wrap ">
            {page.docs.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={`w-full tablet:w-1/2  ${
                 
                  page.docs.length === 1 && "laptop:flex-1"
                } ${page.docs.length >= 3 ? "laptop:w-1/3" : "laptop:w-1/2"} ${
                  page.docs.length >= 4 && "desktop:w-1/4"
                } p-2 flex justify-center`}
              >
                <ListingCard item={item} />
              </div>
            ))}
          </div>
        ))}
      </InfiniteScroll>

      {isFetching && (
        <div className="flex justify-center items-center h-screen">
          <Loader className="size-10 animate-spin text-blue-700" />
        </div>
      )}
      {!hasNextPage && !isFetching && (
        <div className="text-center w-full mt-20">No More Data</div>
      )}
    </div>
  );
};

export default Listings;
