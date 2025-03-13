import argentBankLogo from "../assets/img/argentBankLogo.png";
import "../styles/main.css";

function Header(){
  return (
    <header className="header">
      <nav className="main-nav">
      <a className="main-nav-logo" href="/"><img src={argentBankLogo}/></a>
            <a className="main-nav-item" href="/signin">Sign In</a>
      </nav>
    </header>
  );
};

export default Header;
