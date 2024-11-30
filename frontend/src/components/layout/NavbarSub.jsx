import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarSub = () => {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState(1); // Default active status

  // Handle select change
  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10); // Get the selected value (converted to integer)
    setActiveStatus(selectedValue);  // Update activeStatus
  };

  return (
    <div className="w-full fixed top-[80px] z-[200] backdrop-blur-sm">
      <div className="hidden relative w-11/12 mx-auto">
        <div className="absolute inset-0 m-auto mr-4 z-0 w-6 h-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-selector"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#A0AEC0"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <polyline points="8 9 12 5 16 9" />
            <polyline points="16 15 12 19 8 15" />
          </svg>
        </div>

        <select
          aria-label="Selected tab"
          className="form-select block w-full p-3 border-gray-300 text-gray-600 appearance-none bg-transparent relative z-10"
          value={activeStatus}  // Set value to activeStatus
          onChange={handleSelectChange}  // Handle change
        >
          <option value={1} className="text-sm text-gray-600">Inactive</option>
          <option value={2} className="text-sm text-gray-600">Inactive</option>
          <option value={3} className="text-sm text-gray-600">Active</option>
          <option value={4} className="text-sm text-gray-600">Inactive</option>
          <option value={5} className="text-sm text-gray-600">Inactive</option>
        </select>
      </div>

      <div className="justify-between flex-wrap tablet:block bg-white bg-opacity-50 shadow-sm">
        <div className="xl:w-full xl:mx-0 pl-5 pr-5 h-12">
          <ul className="flex justify-center">
            <li
              onClick={() => {
                setActiveStatus(1);
                navigate("/");
              }}
              className={
                activeStatus === 1
                  ? "text-sm text-blue-600 flex flex-col justify-between border-blue-600 pt-3 rounded-t mr-10 font-normal"
                  : "text-sm text-gray-600 py-3 mr-10 font-normal cursor-pointer hover:text-gray-800"
              }
            >
              <span className="mb-3 cursor-pointer">
                {activeStatus === 1 ? "Home" : "Home"}
              </span>
              {activeStatus === 1 && (
                <div className="w-full h-1 bg-blue-600 rounded-t-md" />
              )}
            </li>
            <li
              onClick={() => setActiveStatus(2)}
              className={
                activeStatus === 2
                  ? "text-sm text-blue-600 flex flex-col justify-between border-blue-600 pt-3 rounded-t mr-10 font-normal"
                  : "text-sm text-gray-600 py-3 mr-10 font-normal cursor-pointer hover:text-gray-800"
              }
            >
              <span className="mb-3 cursor-pointer">
                {activeStatus === 2 ? "About" : "About"}
              </span>
              {activeStatus === 2 && (
                <div className="w-full h-1 bg-blue-600 rounded-t-md" />
              )}
            </li>
            <li
              onClick={() => setActiveStatus(3)}
              className={
                activeStatus === 3
                  ? "text-sm text-blue-600 flex flex-col justify-between border-blue-600 pt-3 rounded-t mr-10 font-normal"
                  : "text-sm text-gray-600 py-3 mr-10 font-normal cursor-pointer hover:text-gray-800"
              }
            >
              <span className="mb-3 cursor-pointer">
                {activeStatus === 3 ? "Blogs" : "Blogs"}
              </span>
              {activeStatus === 3 && (
                <div className="w-full h-1 bg-blue-600 rounded-t-md" />
              )}
            </li>
            <li
              onClick={() => setActiveStatus(4)}
              className={
                activeStatus === 4
                  ? "text-sm text-blue-600 flex flex-col justify-between border-blue-600 pt-3 rounded-t mr-10 font-normal"
                  : "text-sm text-gray-600 py-3 mr-10 font-normal cursor-pointer hover:text-gray-800"
              }
            >
              <span className="mb-3 cursor-pointer">
                {activeStatus === 4 ? "Career" : "Career"}
              </span>
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
