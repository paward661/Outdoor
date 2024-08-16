import HeaderBackground from "./HeaderBackground.js";
import "./Header.css";

function Header({ pageTitle }) {
  return (
    <div>
      <HeaderBackground />
      <div className="content">
        <h1>{pageTitle}</h1> {/* Web page name */}
      </div>
    </div>
  );
}

export default Header;
