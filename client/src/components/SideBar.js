import { Link } from "react-router-dom";
import { useSidebar } from "./../services/SidebarContext";

const SideBar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div
      className={`side-nav side-nav-light side-nav-expand transition-width duration-600 shadow-md shadow-gray-200 ${
        isSidebarOpen
          ? " bg-white w-[290px]   lg:w-[85px]  fixed  min-h-screen h-full lg:h-auto lg:relative z-10 "
          : "min-w-[290px] fixed   min-h-screen h-full  lg:h-auto lg:relative  bg-white hidden lg:block"
      }`}
    >
      <div
        className={`side-nav-header h-[70px] flex items-center justify-between ${
          isSidebarOpen ? "bg-white" : "bg-white"
        } `}
      >
        <div className="logo px-5 inline-flex text-xl text-[#2E37A4] font-semibold items-center">
          <span className="  text-2xl">
            <img src="images/logo.png" className=" w-9" alt="none"/>
          </span>

          <span className={`ml-2  ${isSidebarOpen ? "lg:hidden" : ""} `}>
            Clinic
            <span className="text-[#2E37A4] font-semibold "> QMS</span>
          </span>
        </div>

        <span
          className={` m-1/4 cursor-pointer rounded-full p-2 hover:bg-[#eee] ease-in-out duration-100  ${
            isSidebarOpen ? "lg:hidden " : " lg:hidden"
          }`}
          onClick={toggleSidebar}
        >
          <span className="text-2xl text-[#2E37A4]">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </span>
        </span>
      </div>

      <div className="side-nav-content  lg:h-[calc(100vh-70px)]">
        <nav className="menu menu-light pt-5">
          <ul className="">
            <li className=" overflow-x-hidden  relative">
              <Link
                to="dashboard"
                className="
                flex gap-x-2 items-center text-md min-h-[42px] py-3 h-auto  text-black/70 no-underline pl-5 clear-both whitespace-nowrap customHover"
              >
                <i className=" inline-flex justify-center items-center w-10 h-10 rounded-md leading-34  text-center top-0 relative z-10 text-xl text-blue-800 bg-gray-100 font-semibold">
                  <img src="images/icons/menu-icon-01.svg" alt="none"/>
                </i>

                <span
                  className={` relative z-10   ${
                    isSidebarOpen ? "lg:hidden" : ""
                  }`}
                >
                  Dashboard
                </span>
              </Link>
            </li>

            <li className=" overflow-x-hidden  relative">
              <Link
                to="/doctorview"
                className="
                flex gap-x-2 items-center text-md min-h-[42px] py-3 h-auto  text-black/70 no-underline pl-5 clear-both whitespace-nowrap customHover"
              >
                <i className=" inline-flex justify-center items-center w-10 h-10 rounded-md leading-34  text-center top-0 relative z-10 text-xl text-blue-800 bg-gray-100  font-semibold">
                  <img src="images/icons/menu-icon-04.svg" alt="none"/>
                </i>
                <span
                  className={` relative z-10   ${
                    isSidebarOpen ? "lg:hidden" : ""
                  }`}
                >
                  Appointments
                </span>
              </Link>
            </li>

            <li className=" overflow-x-hidden  relative">
              <Link
                to="/qr"
                className="
                flex gap-x-2 items-center text-md min-h-[42px] py-3 h-auto  text-black/70 no-underline pl-5 clear-both whitespace-nowrap customHover"
              >
                <i className=" inline-flex justify-center items-center w-10 h-10 rounded-md leading-34  text-center top-0 relative z-10 text-xl text-blue-800 bg-gray-100 font-semibold">
                  <img src="images/icons/menu-icon-13.svg" alt="none"/>
                </i>
                <span
                  className={` relative z-10   ${
                    isSidebarOpen ? "lg:hidden" : ""
                  }`}
                >
                  QR Code
                </span>
              </Link>
            </li>

            {/* Add more menu items as needed */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
