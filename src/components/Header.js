import React from "react";
import { Link, withRouter } from "react-router-dom";

import logo from "../images/logo.svg";

function Header({ pageType, userData, history }) {
  let headerUserEmail = "";
  let headerLinkName;
  let headerLink;

  if (pageType === "/sign-in") {
    headerLinkName = "Регистрация";
    headerLink = "/sign-up"
  } else if (pageType === "/sign-up") {
    headerLinkName = "Войти";
  } else if (pageType === "/content") {
    headerUserEmail=userData;
    headerLinkName = "Выйти";
    headerLink = "/sign-in"
  }

  function signOut() {
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  return (
    <header className="header">
      <a className="logo" href="/">
        <img className="logo__image" src={logo} alt="Логотип проекта Mesto" />
      </a>
      <p>{headerUserEmail}</p><Link className="header__link" onClick={signOut}>{headerLinkName}</Link>
    </header>
  );
}

export default withRouter(Header);
