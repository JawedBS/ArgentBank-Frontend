import argentBankLogo from "../assets/img/argentBankLogo.png";

function Header(){
  return (
    <header>
      <h1><img className="header-image" src={argentBankLogo}/></h1>
      <nav className="navbar">
            <a href="/signin">Sign In</a>
      </nav>
    </header>
  );
};

export default Header;
