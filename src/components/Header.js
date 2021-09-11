import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import logo from "../images/logo.svg";
import butonProfileData from "../images/button-profile.svg";
import buttonCloseProfileData from "../images/button-сlose-profile.svg";

function Header({ loggedIn, pageType, userData, handleLogout }) {
  const [headerMobile, setHeaderMobile] = React.useState(true);

  let headerUserEmail = "";
  let headerLinkName;
  let headerLink;

  React.useEffect(() => {
    window.addEventListener("resize", onСhangedScreenWidth);
    return () => document.removeEventListener("resize", onСhangedScreenWidth);
  })

  if (pageType === "/sign-in") {
    headerLinkName = "Регистрация";
    headerLink = "/sign-up";
  } else if (pageType === "/sign-up") {
    headerLinkName = "Войти";
    headerLink = "/sign-in";
  } else if (pageType === "/content") {
    headerUserEmail = userData;
    headerLinkName = "Выйти";
    headerLink = "/sign-in";
  } else if (pageType === "/") {
    if (loggedIn) {
      headerUserEmail = userData;
      headerLinkName = "Выйти";
      headerLink = "/sign-in";
    } else {
      headerLinkName = "Регистрация";
      headerLink = "/sign-up";
    }
  }

  function signOut() {
    if (pageType === "/content") {
      handleLogout();
    }
  }

  function onСhangedScreenWidth(e) {
    if (e.target.innerWidth <= 680) {
      setHeaderMobile(true);
    } else if (e.target.innerWidth > 680) {
      setHeaderMobile(false);
    }
  }

  const [openedProfileData, setOpenedProfileData] = React.useState(false);

  function handleOpenProfileData() {
    setOpenedProfileData(state => !state);
  }

  return (
    <>
      {
        headerMobile && loggedIn
        &&
        <div className={`header__profile-data ${!openedProfileData ? "header__profile-data_disabled" : ""}`}>
          <p className="header__profile-data-mail">{headerUserEmail}</p>
          <Link className="header__profile-data-link" to={headerLink} onClick={signOut}>{headerLinkName}</Link>
        </div>
      }
      <header className="header">
        <a className="logo" href="/">
          <img className="logo__image" src={logo} alt="Логотип проекта Mesto" />
        </a>
        {
         loggedIn && headerMobile
            ?

              <button className="header__buton-profile-data" onClick={handleOpenProfileData}>
                <img className="header__buton-profile-data-img" src={!openedProfileData ? butonProfileData : buttonCloseProfileData} alt="Регистрационные данные пользователя" />
              </button>
            :
            <p className="header__mail">{headerUserEmail}
              <Link className="header__link" to={headerLink} onClick={signOut}>{headerLinkName}</Link>
            </p>

        }
      </header>
    </>
  );
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  pageType: PropTypes.string.isRequired,
  userData: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default withRouter(Header);