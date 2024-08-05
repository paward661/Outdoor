import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./GoHome.css";

function GoHome({ show }) {
  return (
    <div className={show === false ? "hidden" : "go-home"}>
      <Link to="/">
        <FontAwesomeIcon icon={faHome} />
      </Link>
    </div>
  );
}

export default GoHome;
