import { useEffect, useState } from "react";
import AvatarMy from "./AvatarMy";
import { useSidebar } from "./../services/SidebarContext";
import { jwtDecode } from "jwt-decode";

const Header = (props) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [doctorName, setDoctorName]=useState('');

  useEffect(() => {

    const fetchDoctorId = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
        setDoctorName(decodedToken.doctorName);
    };
  
    fetchDoctorId();
  }, []);

  return (
    <header className="header  shadow-md shadow-gray-200  bg-gradient-to-r bg-white border-l border-gray-100 ">
      <div className="header-wrapper h-[70px] flex justify-between items-center px-5">
        <div className="header-action header-action-start">
          <div
            className="m-1/4 cursor-pointer rounded-full p-2 hover:bg-[#eee] ease-in-out duration-100"
            onClick={toggleSidebar}
          >
            <div className="text-2xl text-[#2E37A4]">
              {isSidebarOpen ? (
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
              ) : (
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
                    d="M4 6h16M4 12h16M4 18h7"
                  ></path>
                </svg>
              )}
            </div>
          </div>
        </div>

        <div className="header-action header-action-end  inline-flex items-center gap-x-5">
          <div className="inline-flex items-center">
            <div className="m-1/4 cursor-pointer rounded-full p-2 text-[#2E37A4] font-semibold text-lg">
{doctorName}
            </div>
            <div className="m-1/4 cursor-pointer rounded-full p-2">
              <AvatarMy />
            </div>
          </div>

          <div className="inline-flex items-center">
            <button className="w-10 h-10 inline-flex justify-center items-center rounded-full hover:bg-gray-100 cursor-pointer">
              <img src="images/icons/setting-icon-01.svg" alt="Settings"/>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
