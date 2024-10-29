import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Menu } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const queryClient = useQueryClient();

  // const { data: notifications } = useQuery({
  // 	queryKey: ["notifications"],
  // 	queryFn: async () => axiosInstance.get("/notifications"),
  // 	enabled: !!authUser,
  // });

  // const { data: connectionRequests } = useQuery({
  // 	queryKey: ["connectionRequests"],
  // 	queryFn: async () => axiosInstance.get("/connections/requests"),
  // 	enabled: !!authUser,
  // });
  const navigate = useNavigate();
  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/users/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      // location.reload();
    },
  });

  const { mutate: createConversation } = useMutation({
    mutationFn: (userData) => axiosInstance.post("/conversations", userData),
    onSuccess: (res) => {
      // (res?.data?.data?._id);

      navigate(`/messenger/${res?.data?.data?._id}`);
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });

    // Mutation for Becomming a Seller
    const { mutate: becomeSeller } = useMutation({
      mutationFn: () =>
         axiosInstance.post("/users/become-a-seller"),
      onSuccess: () => {
        toast.success("Congratulations, You are a seller Now");
        navigate(`/profile/${authUser?.data?.username}`,{ replace: true })

        
      },
      onError: (err) => {
        console.log("errrrr", err.response.data);
        toast.error(err.response.data.message || "Something went wrong");
      },
    });


  const selfMessageCreate = () => {
    if (authUser) {
      createConversation({
        receiverId: authUser?.data?._id,
      });
      
    } else {
       // setting current path as a state in loccation to redirect back to this page
      navigate("/login", { state: { from: location.pathname } });
    }
  };

  const handleCreateNewListing= ()=>{
    navigate("/listings/create-listing")
   
  }
  const handleBecomeSeller= ()=>{
    becomeSeller()
  }
  
  // const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
  // const unreadConnectionRequestsCount = connectionRequests?.data?.length;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[screen] mx-auto px-10 laptop:px-20">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img
                className="h-8 rounded"
                src="/small-logo.png"
                alt="Rent Property"
              />
            </Link>
          </div>
          <div className="flex items-center gap-2 md:gap-6">
            {authUser ? (
              <div className="flex justify-end gap-3 items-center">
                {authUser?.data?.role == "user" && (
                  <a
                  onClick={(e)=>{
                    e.preventDefault()
                    handleBecomeSeller()
                  }}
                    className="btn ptn-primary bg-blue-600 text-white mr-2 hover:bg-white hover:text-blue-600 hover:border-blue-600"
                  >
                    Become A Seller
                  </a>
                )}
                <button
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600"
                  onClick={() => logout()}
                >
                  <LogOut size={20} />
                  <span className="hidden font-semibold md:inline">Logout</span>
                </button>

                <div className="dropdown dropdown-bottom dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn h-9 min-h-9 w-9 min-w-9 bg-transparent border-0 shadow-none hover:bg-blue-600 hover:text-white p-0 m-0"
                    onClick={handleMenuClick}
                  >
                    <Menu className="p-0 m-0" />
                  </div>
                  {isOpen && (
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-4"
                    >
                      <li
                        className="hover:bg-blue-600 rounded-lg hover:text-white"
                        onClick={handleItemClick}
                      >
                        <a onClick={() => navigate("/wishlist")}>Wishlist</a>
                      </li>
                      <li
                        className="hover:bg-blue-600 rounded-lg hover:text-white"
                        onClick={handleItemClick}
                      >
                        <a onClick={selfMessageCreate}>Messages</a>
                      </li>
                      {
                      ["seller", "admin"].includes(authUser?.data?.role) && (<li
                        className="hover:bg-blue-600 rounded-lg hover:text-white"
                        onClick={handleItemClick}
                      >
                        <a onClick={handleCreateNewListing}>Create A New Listing</a>
                      </li>)
                      }
                      <li>
                        <Link
                          to={`/profile/${authUser?.data?.username}`}
                          className="hover:bg-blue-600 rounded-lg hover:text-white"
                          onClick={handleItemClick}
                        >
                          Profile
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Join now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
