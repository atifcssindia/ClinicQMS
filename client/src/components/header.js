import AvatarMy from "./AvatarMy";
import { useSidebar } from "./../services/SidebarContext";

const Header = (props: any) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <header className="header shadow  bg-gradient-to-r from-blue-400  to-blue-500 ">
      <div className="header-wrapper h-16 flex justify-between items-center px-5">
        <div className="header-action header-action-start">
          <div
            className="m-1/4 cursor-pointer rounded-full p-2 hover:bg-blue-600 ease-in-out duration-100"
            onClick={toggleSidebar}
          >
            <div className="text-2xl text-white">
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

        <div className="header-action header-action-end inline-flex items-center">
          <div className="m-1/4 cursor-pointer rounded-full p-2 text-white font-semibold text-sm">
            Carolyn Perkins
          </div>
          <div className="m-1/4 cursor-pointer rounded-full p-2">
            <AvatarMy />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
