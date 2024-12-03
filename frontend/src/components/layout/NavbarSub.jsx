import { useLocation, useNavigate } from "react-router-dom";

const NavbarSub = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  // Map paths to their corresponding active statuses
  const getActiveStatus = () => {
    switch (location.pathname) {
      case "/":
        return 1;
      case "/about-us":
        return 2;
      case "/blogs":
        return 3;
      case "/career":
        return 4;
      default:
        return 1; // Default to "Home"
    }
  };
   
  const activeStatus = getActiveStatus(); // Dynamically determine the active status

  return (
    <div className="w-full fixed top-[80px] z-[200] backdrop-blur-lg  bg-opacity-50 shadow-sm">

      <div className="justify-between flex-wrap tablet:block bg-black bg-opacity-50 shadow-sm">
        <div className="xl:w-full  h-12">
        <ul className="flex justify-center bg-white gap-6">
        <li
          onClick={() => navigate("/")}
          className={
            activeStatus === 1
              ? "text-sm text-blue-600 flex flex-col justify-between border-blue-600 pt-3 rounded-t  font-normal"
              : "text-sm text-gray-600 py-3  font-normal cursor-pointer hover:text-gray-800"
          }
        >
          <span className="mb-3 cursor-pointer ">Home</span>
          {activeStatus === 1 && (
            <div className="w-full h-1 bg-blue-600 rounded-t-md" />
          )}
        </li>
        <li
          onClick={() => navigate("/about-us")}
          className={
            activeStatus === 2
              ? "text-sm text-blue-600 flex flex-col justify-between border-blue-600 pt-3 rounded-t  font-normal"
              : "text-sm text-gray-600 py-3 font-normal cursor-pointer hover:text-gray-800"
          }
        >
          <span className="mb-3 cursor-pointer">About</span>
          {activeStatus === 2 && (
            <div className="w-full h-1 bg-blue-600 rounded-t-md" />
          )}
        </li>
        <li
          onClick={() => navigate("/blogs")}
          className={
            activeStatus === 3
              ? "text-sm text-blue-600 flex flex-col justify-between border-blue-600 pt-3 rounded-t font-normal"
              : "text-sm text-gray-600 py-3  font-normal cursor-pointer hover:text-gray-800"
          }
        >
          <span className="mb-3 cursor-pointer">Blogs</span>
          {activeStatus === 3 && (
            <div className="w-full h-1 bg-blue-600 rounded-t-md" />
          )}
        </li>
        <li
          onClick={() => navigate("/career")}
          className={
            activeStatus === 4
              ? "text-sm text-blue-600 flex flex-col justify-between border-blue-600 pt-3 rounded-t  font-normal"
              : "text-sm text-gray-600 py-3  font-normal cursor-pointer hover:text-gray-800"
          }
        >
          <span className="mb-3 cursor-pointer">Career</span>
          {activeStatus === 4 && (
            <div className="w-full h-1 bg-blue-600 rounded-t-md" />
          )}
        </li>
      </ul>

        </div>
      </div>
    </div>
  );
};

export default NavbarSub;
