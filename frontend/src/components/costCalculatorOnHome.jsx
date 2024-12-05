import {  ArrowBigRightDashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CostCalculatorOnHome = () => {
    const navigate = useNavigate();
    return (  
        <div className="w-full flex flex-col items-center justify-center gap-8 bg-white pb-8 tablet:pb-16 ">
        <div className="flex flex-col items-center justify-center text-center gap-8  w-[80%]">
            <h1 className="px-4  text-3xl tablet:text-4xl laptop:text-5xl text-blue-600 font-bold">Construction Cost Calculator</h1>
            <p className="px-4 text-gray-700 font-bold">Use our Construction Cost Calculator to get a quick estimate of  required building materials along with their costs.</p>
        </div>
       <button 
       
       className="bg-blue-600 text-white p-2 flex justify-center items-center text-lg px-6 rounded-full " 
       onClick={()=> navigate("/cost-calculator")}
       >Calculate Cost <ArrowBigRightDashIcon className="ml-4 animate-bounceRight "/> </button>
        </div>
    );
}
 
export default CostCalculatorOnHome;