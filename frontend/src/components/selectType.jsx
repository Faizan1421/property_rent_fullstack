import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectType = () => {
  const [rentSelected, setRentSelected] = useState(false);
  const inputRef = React.useRef(null);
  const navigate = useNavigate();

  return (
    <div
      className="flex bg-fixed  flex-col justify-center items-center mb-10    bg-cover bg-center bg-no-repeat h-[55vh] tablet:h-[70] laptop:h-[85vh] w-full "
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dzxywksdm/image/upload/v1732791511/sean-pollock-PhYq704ffdA-unsplash_zttnvb.jpg')`, // Replace with your image URL
      }}
    >
      <div className="sticky top-28 rounded-none  backdrop-blur-lg px-20 py-10 bg-white bg-opacity-80 shadow-sm">
        <div className="flex justify-center items-center gap-4 ">
          <span className="bg-white rounded-none ">
          <h1
            className={`text-sm tablet:text-xl font-bold cursor-pointer border-none btn laptop:w-32 rounded-none shadow-sm  ${
              !rentSelected
                ? "btn-primary text-white"
                : "btn-outline btn-outline-primary text-blue-600 hover:btn-primary hover:text-white"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setRentSelected(false);
            }}
          >
            Buy
          </h1>
          </span>
          <span className="bg-white rounded-none">
          <h1
            className={`text-sm tablet:text-xl font-bold cursor-pointer border-none btn rounded-none laptop:w-32 shadow-sm ${
              rentSelected
                ? "btn-primary text-white"
                : "btn-outline btn-outline-primary text-blue-600 hover:btn-primary hover:text-white"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setRentSelected(true);
            }}
          >
            Rent
          </h1>
          </span>
         
        </div>
        <div className="flex justify-center items-center mt-5">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="input input-bordered mt-5 focus:outline-none focus:border-none focus:shadow-xl w-full tablet:w-[30vw] h-[47px] border-none shadow-lg rounded-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                inputRef?.current?.value.length > 0 &&
                  navigate(
                    `/search?q=${inputRef?.current?.value}&page=1&pagetype=${
                      rentSelected ? "rent" : "buy"
                    }`
                  );
              }
            }}
          
          />
          <button
            className="btn btn-primary mt-5 w-20 laptop:h-10 rounded-none shadow-sm"
           
            onClick={(e) => {
              e.preventDefault();
              inputRef?.current?.value.length > 0 && navigate(
                `/search?q=${inputRef?.current?.value}&page=1&pagetype=${
                  rentSelected ? "rent" : "buy"
                }`
              );
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectType;
