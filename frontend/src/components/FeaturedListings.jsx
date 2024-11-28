import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Loader, MapPinHouse, Proportions } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedListings = (featuredType) => {
  const { type } = featuredType;
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["featuredListings", featuredType],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(
          `listings/c/all?type=${type === "rent" ? "rent" : "buy"}&page=1&limit=6`
        );
        return data.data;
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    },
    staleTime: 100000,
  });

  const handleClick = (id) => {
    navigate(`/listings/${id}`);
  };

  if (isLoading) return <Loader className="size-5 animate-spin" />;

  return (
    <div className={`w-full px-5 tablet:px-20 pb-20 ${type === "rent" ? "pt-0" : "pt-20"}`}>
      <h2 className="text-xl tablet:text-2xl font-bold text-left mb-5 text-blue-600">
        {type === "featured" ? "Featured Properties" : "Trending Rent Properties"}
      </h2>

      {/* Custom Navigation Buttons */}
      <div className="relative">
        <button
          className="custom-prev z-20 ml-5 cursor-pointer absolute w-10 h-10 top-1/2 left-0 -translate-y-1/2 bg-white opacity-50 hover:opacity-100 hover:text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
          aria-label="Previous"
        >
          &#10094;
        </button>
        <button
          className="custom-next z-20 mr-5 cursor-pointer absolute top-1/2 right-0 w-10 h-10 -translate-y-1/2 text-black p-2 bg-white opacity-50 hover:opacity-100 hover:text-white rounded-full shadow-md hover:bg-blue-600 transition"
          aria-label="Next"
        >
          &#10095;
        </button>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            nextEl: ".custom-next", // Reference to the custom next button
            prevEl: ".custom-prev", // Reference to the custom previous button
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: type == " rent " ? 3000 : 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: type == "rent" ? true : false,
          }}
          loop={true}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="h-full shadow-lg"
          onInit={(swiper) => {
            // Ensure Swiper buttons are correctly linked on initialization
            swiper.params.navigation.prevEl = ".custom-prev";
            swiper.params.navigation.nextEl = ".custom-next";
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {data?.docs?.map((product) => (
            <SwiperSlide key={product._id} onClick={() => handleClick(product?._id)}>
              <div className="p-4 bg-white rounded-lg cursor-pointer">
                <img
                  src={product?.images[0]?.url}
                  alt="property listing"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="flex justify-between items-center mt-4 gap mb-5 mx-5">
                  <h3 className="text-lg font-semibold text-blue-600">
                    {product?.title?.substring(0, 15)}
                    {`${product?.title?.length > 15 ? "..." : ""}`}
                  </h3>
                  <p className="text-gray-600 font-semibold">Rs-{product?.price}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="mx-5 flex gap-2 items-center">
                    <MapPinHouse className="w-5 h-5 text-blue-600" />
                    <p className="text-xs text-gray-600">{product?.location?.city}</p>
                  </div>
                  <div className="mx-5 flex gap-2 items-center">
                    <Proportions className="w-5 h-5 text-blue-600" />
                    <p className="text-xs text-gray-600">{product?.categories?.name}</p>
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
