import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Slider from "../components/Slider";
import ListingDetailsSection from "../components/ListingDetailsSection";
import ListingDetailsBelowSectionOne from "../components/ListingDetailsBelowSectionOne";
import ListingDetailsBelowSectionTwo from "../components/ListingDetailsBelowSectionTwo";
import ListingDetailsBelowSectionThree from "../components/ListingDetailsBelowSectionThree";
import Comments from "../components/Comments";

const ListingDetailsPage = () => {
  const { id } = useParams();

  const { data: listingDetails, isLoading } = useQuery({
    queryKey: ["ListingDetails", id],
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

  !isLoading ? listingDetails.data[0].images : "loading";

  return (
    <div className=" py-10 laptop:py-20 px-5 laptop:px-32 ">
      <div className=" flex  flex-row  w-[100%]  laptop:justify-center items-center ">
        <div className="slider_wraper w-full laptop:w-[60%] mr-10 ">
          <Slider listingDetails={listingDetails} />
        </div>
        <div className="hidden laptop:block listing_details_wrapper px-10 py-10 laptop:w-[40%] outline outline-1 outline-base-300">
          <ListingDetailsSection listingDetails={listingDetails} />
        </div>
      </div>
      <div className=" laptop:hidden below_section1 pt-10  laptop:px-16">
        <ListingDetailsBelowSectionOne listingDetails={listingDetails} />
      </div>

      <div className="below_section2 pt-10 laptop:px-16   ">
        <ListingDetailsBelowSectionTwo listingDetails={listingDetails} />
      </div>
      <div className="below_section3 pt-10 laptop:px-16   ">
        <ListingDetailsBelowSectionThree listingDetails={listingDetails} />
      </div>
      <div className="below_section3 pt-10 laptop:px-16 ">
        <Comments listingDetails={listingDetails} />
      </div>
    </div>
  );
};

export default ListingDetailsPage;
