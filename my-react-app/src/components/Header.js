import HeaderBackground from "./HeaderBackground.js";
import ProfilePic from "./ProfilePic.js";
import "./Header.css";

function Header({ editOn, pageTitle }) {
  return (
    <div>
      <HeaderBackground />
      <div className="content">
        <h1>{pageTitle}</h1> {/* Web page name */}
        <ProfilePic editOn={editOn} />
      </div>
    </div>
  );
}

export default Header;
