import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.svg";

function Header({ pageType }) {
  let headerLinkName;
  let headerLink;

  if (pageType == "/sign-in") {
    headerLinkName = "Регистрация";
    headerLink = "/sign-up"
  } else if (pageType == "/sign-up") {
    headerLinkName = "Войти";
    headerLink = "/sign-in"
  } else if (pageType == "/content") {
    headerLinkName = "Выйти";
    headerLink = "/sign-in"
  }

  return (
    <header className="header">
      <a className="logo" href="/">
        <img className="logo__image" src={logo} alt="Логотип проекта Mesto" />
      </a>
      <Link className="header__link" to={headerLink}>{headerLinkName}</Link>
    </header>
  );
}

export default Header;
