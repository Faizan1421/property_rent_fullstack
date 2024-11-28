import { useNavigate } from "react-router-dom";

const HomeSectionOne = () => {
  const navigate = useNavigate();
    const handleClick = (type) => {
        type == "rent" ? navigate("/listings-rent") : navigate("/listings-buy");
         
    }
    return (  
        <div className="flex flex-col tablet:flex-row justify-between items-center w-full px-5 tablet:px-20"
        >
          <div className="laptop:w-[50%]  flex flex-col justify-center items-start gap-5 tablet:gap-10 mb-10">
            <h1 className="text-2xl laptop:text-5xl font-bold text-left text-blue-600 ">
            The new way to find <span className="text-gray-600">your new home</span> 
            </h1>
            <p className="text-xs tablet:text-lg font-semibold text-gray-600">
            Find your dream place to live in with more than 10k+ properties listed.
            </p>
           <div className="flex flex-wrap gap-10  justify-center items-center self-center tablet:self-start">
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
          <div className="w-full   flex justify-end items-center gap-10 tablet:mb-10">
            <img src="public/assets/images/illustration.png" alt="image" className="object-cover h-full laptop:h-[400px]"  />
          </div>
        </div>
    );
}
 
export default HomeSectionOne;