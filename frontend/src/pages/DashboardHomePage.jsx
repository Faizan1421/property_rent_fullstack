import MemoizedDashboardWrapper from "../components/layout/DashboardWrapper";

const DashboardHomePage = () => {
    return (  
       <MemoizedDashboardWrapper>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
          <p>Dashboard Content </p>
          <p>Dashboard Content </p>
          <p>Dashboard Content </p>
        </div>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
          <p>Dashboard Content </p>
          <p>Dashboard Content </p>
          <p>Dashboard Content </p>
        </div>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
          <p>Dashboard Content </p>
          <p>Dashboard Content </p>
          <p>Dashboard Content </p>
        </div>
        </MemoizedDashboardWrapper>
       
    );
}
 
export default DashboardHomePage 