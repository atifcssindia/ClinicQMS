import { Link } from "react-router-dom";
import { useSidebar } from "./../services/SidebarContext";

const SideBar = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div
      className={`side-nav side-nav-light side-nav-expand transition-width duration-600 ${
        isSidebarOpen ? " bg-white w-[70px]" : "min-w-[290px] bg-[#d7e5f5]"
      }`}
    >
      <div
        className={`side-nav-header h-16 flex items-center ${
          isSidebarOpen ? "bg-blue-400" : "bg-blue-400"
        } `}
      >
        <div className="logo px-6 inline-flex text-xl text-white font-semibold items-center">
          <span className="  text-2xl">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path>
            </svg>
          </span>
          {isSidebarOpen ? (
            ""
          ) : (
            <span className="ml-2">
              Clinic<span className="text-white font-semibold">QMS</span>
            </span>
          )}
        </div>
      </div>

      <div className="side-nav-content">
        <nav className="menu menu-light pt-5">
          <ul className="">
            <li className=" overflow-x-hidden  relative">
              <Link
                to="/doctorview"
                className="
                  hover:after:w-1  hover:after:bg-blue-600  hover:after:h-full  hover:after:absolute   hover:after:inline-flex  hover:after:left-0 hover:bg-[#212121]/10
                flex gap-x-2 items-center text-md leading-[42px] min-h-[42px] h-auto text-[#424242] no-underline pl-5 clear-both border-l-4 border-transparent whitespace-nowrap"
              >
                <i className="inline-block w-45 h-34 leading-34 text-center top-0 relative z-10">
                  {" "}
                  <img src="images/navbar/1.png" alt="" className=" w-5" />
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
                to="/dashboard"
                className="
                hover:after:w-1  hover:after:bg-blue-600  hover:after:h-full  hover:after:absolute   hover:after:inline-flex  hover:after:left-0 hover:bg-[#212121]/10
              flex gap-x-2 items-center text-md leading-[42px] min-h-[42px] h-auto text-[#424242] no-underline pl-5 clear-both border-l-4 border-transparent whitespace-nowrap"
              >
                <i className="inline-block w-45 h-34 leading-34 text-center top-0 relative">
                  <img src="images/navbar/6.png" alt="" className=" w-5" />
                </i>
                {isSidebarOpen ? "" : <span> QR Code</span>}
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
