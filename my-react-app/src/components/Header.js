import HeaderBackground from "./HeaderBackground.js";
import DropdownMenu from "./DropdownMenu.js";
import ProfilePic from "./ProfilePic.js";
import "./Header.css";

function Header() {
  return (
    <div>
      <HeaderBackground />
      <div class="content">
        <h1>OUTDOOR</h1> {/* Web page name */}
        <DropdownMenu />
        <ProfilePic />
      </div>
    </div>
  );
}

export default Header;
