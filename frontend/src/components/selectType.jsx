import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const SelectType = () => {
  const [rentSelected, setRentSelected] = useState(false);
  const inputRef = React.useRef(null);
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-br from-black  to-gray-800 h-[50vh] tablet:h-[50] laptop:h-[100vh] w-full mb-20">
      <div
        className="flex bg-fixed  flex-col justify-center items-center mb-10 mt-[48px]  bg-cover bg-center bg-no-repeat h-[50vh] tablet:h-[50] laptop:h-[100vh] w-full shadow-sm opacity-40"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dzxywksdm/image/upload/v1732791511/sean-pollock-PhYq704ffdA-unsplash_zttnvb.jpg')`, // Replace with your image URL
        }}
      ></div>

      <div className="absolute top-[48px]  w-full  flex flex-col  items-center   h-[50vh] tablet:h-[50] laptop:h-[100vh]  ">
        <div className="flex flex-col justify-start items-start  mb-10">
        <h1 className="mt-0 laptop:mt-10 animate-text bg-gradient-to-r from-gray-500 via-white to-blue-500 bg-clip-text text-transparent text-4xl tablet:text-6xl laptop:text-8xl font-extrabold text-center tracking-wide ">
               Smart Solutions
        </h1>
          <h1 className="mt-0 laptop:mt-10 animate-text bg-gradient-to-r from-blue-500 via-white to-gray-500 bg-clip-text text-transparent text-3xl tablet:text-4xl laptop:text-6xl font-black text-center w-full "> for Real Estate</h1>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="sticky top-[180px] rounded-none  pb-[100px]  bg-opacity-50  "
        >
          <div className="flex justify-center items-center gap-2 ">
            <span className="bg-white  rounded-md">
              {/* <h1
            className={`text-xs tablet:text-xl font-bold cursor-pointer border-none w-20 btn laptop:w-32 rounded-none shadow-sm  ${
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
          </h1> */}
              <h1
                className={`w-16 text-sm laptop:text-xl rounded-md laptop:w-28 h-8 transition-all ease-linear duration-700 transform   laptop:h-10 flex justify-center items-center shadow-sm cursor-pointer    ${
                  !rentSelected
                    ? "bg-blue-600 text-white "
                    : " bg-white text-blue-600  "
                } `}
                onClick={(e) => {
                  e.preventDefault();
                  setRentSelected(false);
                }}
              >
                Buy
              </h1>
            </span>
            <span className="bg-white rounded-md">
              <h1
                className={`w-16 text-sm laptop:text-xl rounded-md laptop:w-28 h-8 transition-all ease-linear duration-700 transform   laptop:h-10 flex justify-center items-center shadow-sm cursor-pointer    ${
                  !rentSelected
                    ? "bg-white text-blue-600"
                    : " bg-blue-600 text-white "
                } `}
                onClick={(e) => {
                  e.preventDefault();
                  setRentSelected(true);
                }}
              >
                Rent
              </h1>
              {/* <h1
            className={`text-xs tablet:text-xl font-bold cursor-pointer border-none btn rounded-none w-20 laptop:w-32 shadow-sm ${
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
          </h1> */}
            </span>
          </div>
          <div className="flex justify-center items-center mt-5">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className="input input-bordered  mt-5 px-8 focus:outline-none focus:border-none focus:shadow-xl w-[calc(100vw-200px)] tablet:w-[40vw] laptop:w-[30vw] h-[47px] border-none shadow-lg  rounded-l-md rounded-r-none"
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
              className="btn btn-primary mt-5 w-20 laptop:h-10 rounded-r-md rounded-l-none shadow-sm text-white"
              onClick={(e) => {
                e.preventDefault();
                inputRef?.current?.value.length > 0 &&
                  navigate(
                    `/search?q=${inputRef?.current?.value}&page=1&pagetype=${
                      rentSelected ? "rent" : "buy"
                    }`
                  );
              }}
            >
              Search
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SelectType;
