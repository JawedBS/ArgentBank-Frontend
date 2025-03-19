import argentBankLogo from "../assets/img/argentBankLogo.png";
import "../styles/main.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function Header(){
  return (
    <header className="header">
      <nav className="main-nav">
      <a className="main-nav-logo" href="/"><img src={argentBankLogo}/></a>
      <div>
        <FontAwesomeIcon icon={faCircleUser} size="1x" color="black" />
            <a className="main-nav-item" href="/signin">Sign In</a>
            </div>
      </nav>
    </header>
  );
};

export default Header;
