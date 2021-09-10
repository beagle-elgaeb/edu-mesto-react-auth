import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import logo from "../images/logo.svg";

function Header({ loggedIn, pageType, userData, handleLogout }) {
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
  } else if (pageType === "/") {
    if (loggedIn) {
      headerUserEmail = userData;
      headerLinkName = "Выйти";
      headerLink = "/sign-in"
    } else {
      headerLinkName = "Регистрация";
      headerLink = "/sign-up"
    }
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

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  pageType: PropTypes.string.isRequired,
  userData: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default withRouter(Header);
