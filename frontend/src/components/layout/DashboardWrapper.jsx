import  { useEffect, useState, useCallback, memo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DashboardWrapper = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const navigate = useNavigate();

  // Memoized toggle functions
  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
  const toggleDropdown = useCallback(
    () => setDropdownOpen((prev) => !prev),
    []
  );

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Define desktop as >= 1024px
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="">
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="z-[1000] fixed inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform mt-20 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 pt-20 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 font-medium">
            <li onClick={() => navigate("/admin/dashboard")}>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 hover:text-white rounded-lg hover:bg-blue-600 group"
                onClick={() => navigate("/admin/dashboard")}
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3" >Dashboard</span>
              </a>
            </li>
            {/* Add more navigation items here */}
            <li  onClick={() => navigate("/admin/dashboard/users")}>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 hover:text-white rounded-lg  hover:bg-blue-600  group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span
                  className="ms-3"
                 
                >
                  Users
                </span>
              </a>
            </li>
           
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 hover:text-white transition duration-75 rounded-lg group hover:bg-blue-600  "
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
                onClick={toggleDropdown}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500  transition duration-75 group-hover:text-white "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  E-commerce
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`${
                  isDropdownOpen ? "block" : "hidden"
                } py-2 space-y-2`}
              >
                {["Products", "Billing", "Invoice", "Settings"].map(
                  (item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="flex items-center w-full p-2 text-gray-900 hover:text-white transition duration-75 rounded-lg pl-11 group hover:bg-blue-600  "
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </li>
          </ul>
        </div>
      </aside>

      <div
        className={`p-4 ${
          isSidebarOpen && isDesktop ? "ml-64" : "ml-0"
        } transition-all duration-300 ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
};

// Add memoization to prevent re-rendering
const MemoizedDashboardWrapper = memo(DashboardWrapper);

DashboardWrapper.propTypes = {
  children: PropTypes.node, // Validates that children can be any renderable React node
};

export default MemoizedDashboardWrapper;
