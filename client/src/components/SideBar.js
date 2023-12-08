import { Link } from "react-router-dom";
import { useSidebar } from "./../services/SidebarContext";

const SideBar = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div
      className={`side-nav side-nav-light side-nav-expand transition-width duration-600 shadow-md shadow-gray-200 ${
        isSidebarOpen ? " bg-white w-[85px]" : "min-w-[290px]  bg-white"
      }`}
    >
      <div
        className={`side-nav-header h-[70px] flex items-center ${
          isSidebarOpen ? "bg-white" : "bg-white"
        } `}
      >
        <div className="logo px-5 inline-flex text-xl text-[#2E37A4] font-semibold items-center">
          <span className="  text-2xl">
            <img src="images/logo.png" className=" w-9" />
          </span>

          {isSidebarOpen ? (
            ""
          ) : (
            <span className="ml-2">
              Clinic
              <span className="text-[#2E37A4] font-semibold "> QMS</span>
            </span>
          )}
        </div>
      </div>

      <div className="side-nav-content">
        <nav className="menu menu-light pt-5">
          <ul className="">
            <li className=" overflow-x-hidden  relative">
              <Link
                to="dashboard"
                className="
                flex gap-x-2 items-center text-md min-h-[42px] py-3 h-auto  text-black/70 no-underline pl-5 clear-both whitespace-nowrap customHover"
              >
                <i className=" inline-flex justify-center items-center w-10 h-10 rounded-md leading-34  text-center top-0 relative z-10 text-xl text-blue-800 bg-gray-100 font-semibold">
                  <img src="images/icons/menu-icon-01.svg" />
                </i>
                {isSidebarOpen ? (
                  ""
                ) : (
                  <span className=" relative z-10">Dashboard</span>
                )}
              </Link>
            </li>

            <li className=" overflow-x-hidden  relative">
              <Link
                to="/doctorview"
                className="
                flex gap-x-2 items-center text-md min-h-[42px] py-3 h-auto  text-black/70 no-underline pl-5 clear-both whitespace-nowrap customHover"
              >
                <i className=" inline-flex justify-center items-center w-10 h-10 rounded-md leading-34  text-center top-0 relative z-10 text-xl text-blue-800 bg-gray-100  font-semibold">
                  <img src="images/icons/menu-icon-04.svg" />
                </i>
                {isSidebarOpen ? (
                  ""
                ) : (
                  <span className=" relative z-10">Appointments</span>
                )}
              </Link>
            </li>

            <li className=" overflow-x-hidden  relative">
              <Link
                to="/qr"
                className="
                flex gap-x-2 items-center text-md min-h-[42px] py-3 h-auto  text-black/70 no-underline pl-5 clear-both whitespace-nowrap customHover"
              >
                <i className=" inline-flex justify-center items-center w-10 h-10 rounded-md leading-34  text-center top-0 relative z-10 text-xl text-blue-800 bg-gray-100 font-semibold">
                  <img src="images/icons/menu-icon-13.svg" />
                </i>
                {isSidebarOpen ? (
                  ""
                ) : (
                  <span className=" relative z-10">QR Code</span>
                )}
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
