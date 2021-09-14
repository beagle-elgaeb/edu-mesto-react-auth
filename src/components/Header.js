import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import logo from "../images/logo.svg";
import butonProfileData from "../images/button-profile.svg";
import buttonCloseProfileData from "../images/button-сlose-profile.svg";

function Header({ loggedIn, pageType, userData, handleLogout }) {
  const [headerMobile, setHeaderMobile] = React.useState(true);
  const [openedProfileData, setOpenedProfileData] = React.useState(false);

  let headerUserEmail = "";
  let headerLinkName;
  let headerLink;

  React.useEffect(() => {
    window.addEventListener("resize", onСhangedScreenWidth);
    return () => document.removeEventListener("resize", onСhangedScreenWidth);
  }, []);

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
      setOpenedProfileData(false);
    }
  }

  function onСhangedScreenWidth(e) {
    if (e.target.innerWidth <= 680) {
      setHeaderMobile(true);
    } else if (e.target.innerWidth > 680) {
      setHeaderMobile(false);
    }
  }

  function handleOpenProfileData() {
    setOpenedProfileData((state) => !state);
  }

  return (
    <>
      {headerMobile && loggedIn && (
        <ProfileData disabled={!openedProfileData}>
          <MailUp>{headerUserEmail}</MailUp>
          <ExitLinkUp to={headerLink} onClick={signOut}>
            {headerLinkName}
          </ExitLinkUp>
        </ProfileData>
      )}
      <Container>
        <Logo href="/">
          <LogoIcon src={logo} alt="Логотип проекта Mesto" />
        </Logo>
        {loggedIn && headerMobile ? (
          <ProfileDataButon onClick={handleOpenProfileData}>
            <ProfileDataButonIcon
              src={!openedProfileData ? butonProfileData : buttonCloseProfileData}
              alt="Регистрационные данные пользователя"
            />
          </ProfileDataButon>
        ) : (
          <Mail>
            {headerUserEmail}
            <ExitLink to={headerLink} onClick={signOut}>
              {headerLinkName}
            </ExitLink>
          </Mail>
        )}
      </Container>
    </>
  );
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  pageType: PropTypes.string.isRequired,
  userData: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default withRouter(Header);

const ProfileData = styled.div`
  width: 100%;
  max-height: ${({ disabled }) => (disabled ? "0px" : "150px")};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: ${({ disabled }) =>
    disabled ? "max-height 0.2s linear" : "max-height 0.5s ease-in-out"};
`;

const Container = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  opacity: 0.7;
  border-bottom: 1px solid #545454;
  margin: 45px 0 0 0;

  @media (max-width: 680px) {
    margin: 28px 0 0 0;
  }
`;

const Logo = styled.a`
  display: block;
  cursor: pointer;
  margin: 0 0 41px 0;

  @media (max-width: 680px) {
    margin: 0 0 28px 19px;
  }
`;

const LogoIcon = styled.img`
  width: 142px;
  height: 33px;

  @media (max-width: 680px) {
    width: 104px;
    height: 24px;
  }
`;

const ProfileDataButon = styled.button`
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: opacity 0.5s ease-out;
  margin: 8px 0 0 0;
  padding: 0;

  @media (max-width: 680px) {
    margin: 0 19px 28px 0;
  }

  :hover {
    opacity: 0.6;
  }
`;

const ProfileDataButonIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const Mail = styled.p`
  color: #ffffff;
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
  text-decoration: none;
  margin: 6px 0 46px;

  @media (max-width: 680px) {
    font-size: 14px;
    line-height: 17px;
    margin: 6px 19px 33px 0;
  }
`;

const MailUp = styled(Mail)`
  margin: 40px 0 18px 0;
`;

const ExitLink = styled(Link)`
  color: #a9a9a9;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.5s ease-out;
  margin: 0 0 0 24px;

  :hover {
    opacity: 0.6;
  }
`;

const ExitLinkUp = styled(ExitLink)`
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
  cursor: pointer;
  margin: 0 0 40px 0;
`;
