import UsersTable from "../components/dashboard_components/UsersTable";
import MemoizedDashboardWrapper from "../components/layout/DashboardWrapper";



const  DashboardUsersPage = () => {
    return (
    
        <MemoizedDashboardWrapper >
             <UsersTable />
        </MemoizedDashboardWrapper>
     

      );
}
 
export default  DashboardUsersPage;
