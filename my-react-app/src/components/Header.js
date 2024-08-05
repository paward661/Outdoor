import HeaderBackground from "./HeaderBackground.js";
import DropdownMenu from "./DropdownMenu.js";
import ProfilePic from "./ProfilePic.js";
import "./Header.css";

function Header({ pageTitle }) {
  return (
    <div>
      <HeaderBackground />
      <div className="content">
        <h1>{pageTitle}</h1> {/* Web page name */}
        <ProfilePic />
      </div>
    </div>
  );
}

export default Header;
