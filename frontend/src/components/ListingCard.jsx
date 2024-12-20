import { useNavigate } from "react-router-dom";

const ListingCard = (data) => {

  const item = data?.item;

  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/listings/${id}`);
  };

  return (
    <div
      className="card bg-base-100 w-full h-80   tablet:w-80 tablet:h-80 shadow-lg m-5 cursor-pointer hover:transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-2xl"
      onClick={() => {
        handleNavigate(item?._id);
      }}
    >
      <figure className="h-[50%]">
        <img
          src={
            item?.images?.length > 0
              ? item?.images?.[0]?.url
              : `/public/assets/images/5.jpg`
          }
          alt="House"
          className="h-[parent]"
        />
      </figure>
      <div className="card-body p-5 h-[50%]">
        <h2 className="card-title text-blue-600">
          {item?.title?.substring(0, 15)}
          {`${item?.title?.length > 15 ? "..." : ""}`}
          {/* <div className="badge badge-secondary">NEW</div> */}
        </h2>
        <p className="text-gray-600">
          {item?.description?.substring(0, 30)}
          {`${item?.description?.length > 30 ? "..." : ""}`}
        </p>
        <div className="relative w-full ">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-sm text-gray-600">Details</span>
          </div>
        </div>
        <div className="card-actions flex flex-row justify-center items-center  mt-1  w-full ">
          <span className=" text-blue-600 text-xs font-[400]  px-2.5 py-0.5 rounded shadow-inner ">
            {item?.location?.city}
          </span>
          <span className=" text-blue-600 text-xs font-[400] me-1 px-2.5 py-0.5 rounded shadow-inner  ">
            {item?.categories?.name || item?.categories[0]?.name}
          </span>
          {/* <span className="bg-blue-600 text-white text-xs font-[500] me-1 px-2.5 py-1 rounded  ">
            {new Intl.NumberFormat("en-PK", {
              style: "currency",
              currency: "PKR",
            }).format(item?.price)}
          </span> */}
          <span className="bg-blue-600 text-white text-xs font-[500] me-1 px-2.5 py-1 rounded  ">
           Rs - {item?.price }
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
