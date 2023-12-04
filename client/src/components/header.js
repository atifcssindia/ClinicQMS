import AvatarMy from "./AvatarMy";

const Header = () => {
  return (
    <header className="header shadow  bg-gradient-to-r from-blue-400  to-blue-500 ">
      <div className="header-wrapper h-16 flex justify-between items-center px-5">
        <div className="header-action header-action-start">
          <div className="header-action-item header-action-item-hoverable">
            <div className="text-2xl"></div>
          </div>
        </div>
        <div className="header-action header-action-end">
          <AvatarMy />
        </div>
      </div>
    </header>
  );
};

export default Header;
