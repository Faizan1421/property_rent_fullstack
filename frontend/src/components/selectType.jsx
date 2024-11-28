
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectType = () => {
  const [rentSelected, setRentSelected] = useState(false);
 const inputRef = React.useRef(null);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center mt:10 tablet:mt-20 mb-20 tablet:mb-40 ">
      <div className="flex  justify-center items-center gap-4 mt-10 ">
        <h1
          className={`text-lg tablet:text-2xl font-bold  cursor-pointer btn  rounded-none  laptop:w-40 ${
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
        <h1
          className={`text-lg tablet:text-2xl font-bold  cursor-pointer btn  rounded-none laptop:w-40 ${
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
      </div>
      <div className="flex justify-center items-center mt-5">
   <input
   ref={inputRef}
   type="text" placeholder="Search..." className="input input-bordered mt-5 focus:outline-none focus:border-none focus:shadow-xl w-[50vw] laptop:h-20 border-none shadow-lg" />
   <button className="btn btn-primary mt-5 w-20 laptop:h-20 rounded-l-none ml-[-10px]"
    onClick={(e)=>{
      e.preventDefault();
      navigate( `/search?q=${inputRef?.current?.value}&page=1&pagetype=${rentSelected ? "rent" : "buy"}`);
    }}
   >
    Search</button>
      </div>
    </div>
  );
};

export default SelectType;
