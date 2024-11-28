import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const Categories = () => {
  //setting state Globally by using tanstack query
  const queryClient = useQueryClient();
  const { data: selectedCategory } = useQuery({
    queryKey: ["selectedCategory"],
    initialData: {
      name: "all",
    },
  });

  // Fetching Categories by using tanstack query
  const {
    data: categories,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/category");
        return res?.data;
      } catch (err) {
        toast.error(err.response.data.message || "Something went wrong");
      }
    },
    staleTime : 100000
  });
  
  isSuccess && queryClient.invalidateQueries({ queryKey: ["listings"] });
(categories,"categ");
  return isLoading ? (
    <div className="flex justify-center items-center h-screen ">
      <Loader className="size-10 animate-spin text-blue-700" />
    </div>
  ) : (
    <div className=" flex flex-col justify-center items-center mt-10 laptop:mt-24 gap-5 tablet:gap-10 px-10 ">
      <h1 className=" text-center font-semibold text-3xl tablet:text-5xl  text-blue-600 ">
        Explore Top Categories
      </h1>
      <p className="pb-12 max-w-full tablet:max-w-[1000px] text-sm tablet:text-xl font-semibold text-gray-600  mx-auto text-justify tablet:text-center ">
        Explore our wide range of vacation rentals that cater to all types of
        travelers. Immerse yourself in the local culture, enjoy the comforts of
        home, and create unforgettable memories in your dream destination.
      </p>
      <div className="flex justify-center overflow-hidden flex-wrap gap-4 tablet:gap-4 mb-10 laptop:mb-20">
        <button
          className={`btn btn-outline btn-primary ${
            selectedCategory?.name === "all" && "btn-active "
          }`}
          onClick={() => {
            queryClient.setQueryData(["selectedCategory"], () => {
              return {
                name: "all",
              };
            });
          }}
        >
          All
        </button>
        {categories.data?.map((data, key) => {
          return (
            <button
              key={key}
              className={`btn btn-outline btn-primary ${
                selectedCategory.name === data.name && "btn-active"
              }`}
              onClick={() => {
                queryClient.setQueryData(["selectedCategory"], () => {
                  return {
                    name: data.name,
                  };
                });
              }}
            >
              {data.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
