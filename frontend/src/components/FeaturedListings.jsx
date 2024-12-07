import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {  BathIcon, BedIcon, Loader, MapPinHouse, Proportions } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedListings = (dataType) => {
  const {type} = dataType;
  const navigate = useNavigate();

  // Fetch featured listings
  const { data, isLoading } = useQuery({
    queryKey: ["featuredListings", type],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `listings/c/all?type=${type === "rent" ? "rent" : "buy"}&page=1&limit=6`
        );
        return response.data.data;
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
        throw err; // Ensures React Query handles the error correctly
      }
    },
    staleTime: 100000, // Cache duration
  });

  const handleClick = (id) => {
    navigate(`/listings/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader className="size-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className={`w-full px-5 laptop:px-20 pb-20 ${type === "featured" ? "pt-10" : "pt-20"}`}>
      <div className="flex justify-between items-center mb-5">
      <h2 className="text-xl tablet:text-2xl font-bold text-left  text-blue-600">
        {type === "featured" ? "Buy Properties" : "Rent Properties"}
      </h2>
      <h2 className="text-sm tablet:text-lg font-bold text-left  text-gray-600 cursor-pointer hover:text-blue-600 hover:underline" onClick={(e)=>{
        e.preventDefault();
        navigate(`/${type === "rent" ? "listings-rent" : "listings-buy"}`);
      }}>
        View all
      </h2>
      </div>
     

      {/* Custom Navigation Buttons */}
      <div className="relative">
        <button
          className="hidden tablet:block custom-prev z-20 ml-5 cursor-pointer absolute w-5 h-10 tablet:w-10 tablet:h-10 top-1/2 left-0 -translate-y-1/2 bg-white opacity-50 hover:opacity-100 hover:text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
          aria-label="Previous"
        >
          &#10094;
        </button>
        <button
          className="hidden tablet:block custom-next z-20 mr-5 cursor-pointer absolute top-1/2 right-0 w-5 h-10 tablet:w-10 tablet:h-10 -translate-y-1/2 text-black p-2 bg-white opacity-50 hover:opacity-100 hover:text-white rounded-full  hover:bg-blue-600 transition"
          aria-label="Next"
        >
          &#10095;
        </button>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          // pagination={{ clickable: true}}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: type === "rent",
          }}
          loop={true}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }}
          className="h-full py-0 tablet:py-10 "
          onInit={(swiper) => {
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {data?.docs?.map((product) => (
            <SwiperSlide key={product._id} onClick={() => handleClick(product._id)}>
              <div className="p-4 bg-white rounded-lg cursor-pointer shadow-lg">
                <img
                  src={product.images[0]?.url}
                  alt={product.title || "Property"}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="flex justify-between items-center mt-4 gap mb-4 mx-5">
                  <h3 className="text-lg font-semibold text-blue-600">
                    {product.title?.substring(0, 15)}
                    {product.title?.length > 15 && "..."}
                  </h3>
                  <p className="text-gray-600 font-semibold">Rs-{product.price}</p>
                </div>
                <div className="flex items-center justify-start  mb-2 ml-5 gap-2">
                  <div className=" flex gap-2 items-center">
                    <BedIcon className="w-5 h-5 text-blue-600" />
                    <p className="text-xs text-gray-600">3</p>
                  </div>
                  <div className=" flex gap-2 items-center">
                    <BathIcon className="w-5 h-5 text-blue-600" />
                    <p className="text-xs text-gray-600">3</p>
                  </div>
                  
                </div>
                <div className="flex items-center justify-between">
                  <div className="mx-5 flex gap-2 items-center">
                    <MapPinHouse className="w-5 h-5 text-blue-600" />
                    <p className="text-xs text-gray-600">{product.location?.city}</p>
                  </div>
                  <div className="mx-5 flex gap-2 items-center">
                    <Proportions className="w-5 h-5 text-blue-600" />
                    <p className="text-xs text-gray-600">{product.categories?.name}</p>
                  </div>
                </div>
                
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedListings;
