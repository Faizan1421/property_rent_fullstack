import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { Loader } from "lucide-react";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import ProfilePage from "./pages/ProfilePage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import MessengerPage from "./pages/MessengerPage";
import WishlistPage from "./pages/WishlistPage";
import CreateListingPage from "./pages/CreateListingPage";
import UpdateListingPage from "./pages/UpdateListingPage";
import SearchPage from "./pages/SearchPage";
import ListingsRent from "./pages/ListingsRent";
import ListingsBuy from "./pages/ListingsBuy";
import AboutUsPage from "./pages/AboutUsPage";
import BlogsPage from "./pages/BlogsPage";
import CareerPage from "./pages/CareerPage";
import DashboardHomePage from "./pages/DashboardHomePage";
import CostCalculator from "./pages/CostCalculatorPage";
import DashboardUsersPage from "./pages/DashboardUsersPage";

// import MemoizedDashboardWrapper from "./components/layout/DashboardWrapper";

function App() {
  const {
    data: authUser,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/users/current-user");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          return null;
        }
        toast.error(err.response.data.message || "Something went wrong");
      }
    },
    refetchOnWindowFocus: false, //refetchOnMount: false, for coming back on tab it will not refetch the data
  });

  if (isLoading || isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin text-blue-700" />
      </div>
    );
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/forgot-password"
          element={!authUser ? <ForgotPasswordPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/reset-password/:token"
          element={!authUser ? <ResetPasswordPage /> : <Navigate to={"/"} />}
        />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/listings/:id" element={<ListingDetailsPage />} />
        <Route
          path="/messenger/:id?"
          element={authUser ? <MessengerPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/wishlist"
          element={authUser ? <WishlistPage /> : <Navigate to={"/login"} />}
        />

        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/listings/create-listing"
          element={
            authUser && ["seller", "admin"].includes(authUser.data.role) ? (
              <CreateListingPage />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/listings/update-listing/:id"
          element={
            authUser && ["seller", "admin"].includes(authUser.data.role) ? (
              <UpdateListingPage />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route path="/listings-rent" element={<ListingsRent />} />
        <Route path="/listings-buy" element={<ListingsBuy />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/cost-calculator" element={<CostCalculator />} />

   
        {/* only Admin Routes */}
      
        <Route
          path="/admin/dashboard"
          element={
            authUser?.data?.role == "admin" ? (
              <DashboardHomePage />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/admin/dashboard/users"
          element={
            authUser?.data?.role == "admin" ? (
              <DashboardUsersPage />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
     
           </Routes>
      <Toaster position="bottom-center" reverseOrder={false} />
    </Layout>
  );
}

export default App;
