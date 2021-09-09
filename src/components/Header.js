import React from "react";
import { Link, withRouter } from "react-router-dom";

import logo from "../images/logo.svg";

function Header({ pageType, userData, handleLogout }) {
  let headerUserEmail = "";
  let headerLinkName;
  let headerLink;

  if (pageType === "/sign-in") {
    headerLinkName = "Регистрация";
    headerLink = "/sign-up"
  } else if (pageType === "/sign-up") {
    headerLinkName = "Войти";
    headerLink = "/sign-in"
  } else if (pageType === "/content") {
    headerUserEmail = userData;
    headerLinkName = "Выйти";
    headerLink = "/sign-in"
  }

  function signOut() {
    if (pageType === "/content") {
      handleLogout();
    }
  }

  return (
    <header className="header">
      <a className="logo" href="/">
        <img className="logo__image" src={logo} alt="Логотип проекта Mesto" />
      </a>
      <p className="header__mail">{headerUserEmail}<Link className="header__link" to={headerLink} onClick={signOut}>{headerLinkName}</Link></p>
    </header>
  );
}

export default withRouter(Header);
