import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <a className="logo" href="/">
        <img className="logo__image" src={logo} alt="Логотип проекта Mesto" />
      </a>
    </header>
  );
}

export default Header;
