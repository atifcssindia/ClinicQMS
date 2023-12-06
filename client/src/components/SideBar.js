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
                <i className="inline-block w-45 h-34 leading-34 text-center top-0 relative z-10 text-xl text-blue-800">
                  {" "}
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M400 64h-48V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v52H160V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v52H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 400H54a6 6 0 0 1-6-6V160h352v298a6 6 0 0 1-6 6zm-52.849-200.65L198.842 404.519c-4.705 4.667-12.303 4.637-16.971-.068l-75.091-75.699c-4.667-4.705-4.637-12.303.068-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l44.104 44.461 111.072-110.181c4.705-4.667 12.303-4.637 16.971.068l22.536 22.718c4.667 4.705 4.636 12.303-.069 16.97z"></path>
                  </svg>
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
                hover:after:w-1  hover:after:bg-blue-600  hover:after:h-full  hover:after:absolute   hover:after:inline-flex  hover:after:left-0 hover:bg-[#212121]/10
              flex gap-x-2 items-center text-md leading-[42px] min-h-[42px] h-auto text-[#424242] no-underline pl-5 clear-both border-l-4 border-transparent whitespace-nowrap"
              >
                <i className="inline-block w-45 h-34 leading-34 text-center top-0 relative text-xl text-blue-900">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M9.5 6.5v3h-3v-3h3M11 5H5v6h6V5zm-1.5 9.5v3h-3v-3h3M11 13H5v6h6v-6zm6.5-6.5v3h-3v-3h3M19 5h-6v6h6V5zm-6 8h1.5v1.5H13V13zm1.5 1.5H16V16h-1.5v-1.5zM16 13h1.5v1.5H16V13zm-3 3h1.5v1.5H13V16zm1.5 1.5H16V19h-1.5v-1.5zM16 16h1.5v1.5H16V16zm1.5-1.5H19V16h-1.5v-1.5zm0 3H19V19h-1.5v-1.5zM22 7h-2V4h-3V2h5v5zm0 15v-5h-2v3h-3v2h5zM2 22h5v-2H4v-3H2v5zM2 2v5h2V4h3V2H2z"></path>
                  </svg>
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
