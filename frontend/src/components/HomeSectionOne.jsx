import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const HomeSectionOne = () => {
  const navigate = useNavigate();
    const handleClick = (type) => {
        type == "rent" ? navigate("/listings-rent") : navigate("/listings-buy");
         
    }
    return (  
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }} className="flex flex-col tablet:flex-row justify-between items-center w-full pt-5 tablet:pt-10 px-5 laptop:px-20"
        >
          <div className="laptop:w-[50%]  flex flex-col justify-center items-center tablet:items-start gap-5 tablet:gap-10 mb-10">
            <h1 className="text-2xl laptop:text-5xl font-bold text-center tablet:text-left text-blue-600 ">
            The new way to find <br /> <span className="text-gray-600">your new home</span> 
            </h1>
            <p className="text-xs px-10 tablet:px-0 tablet:text-lg font-semibold text-gray-600 text-center tablet:text-left">
            Find your dream place to live in with more than 10k+ properties listed.
            </p>
           <div className="flex flex-wrap gap-10  justify-center items-center self-center tablet:self-start my-5">
           <span className=" text-blue-600 font-semibold underline cursor-pointer" onClick={(e)=>{
            e.preventDefault();
            handleClick("rent");
           }}> Rent Houses</span>
           <span className="text-blue-600 font-semibold underline cursor-pointer" onClick={(e)=>{
            e.preventDefault();
            handleClick("buy");
           }}> Buy a Home</span>
           </div>
          </div>
          <div
          className="w-full  flex justify-end items-center gap-10 tablet:mb-10">
            <img src="https://res.cloudinary.com/dzxywksdm/image/upload/v1732781875/illustration_xdiqw3.png" alt="image" className="object-cover h-full laptop:h-[400px]"  />
          </div>
        </motion.div>
    )
}
 
export default HomeSectionOne;