import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import api from "../utils/Api";
import * as auth from "../utils/Auth.js";

import ProtectedRoute from "./ProtectedRoute";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import Login from "./Login";
import Register from "./Register";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup";
import InfoTooltip from "./InfoTooltip";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import "../index.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function App({ history }) {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState();
  const [deletingCard, setDeletingCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState("");

  const [isLogined, setIsLogined] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);

  const { pathname } = useLocation();

  React.useEffect(() => {
    Promise.all([
      api.getProfileData(),
      api.getInitialCards()
    ])
      .then(([profile, cards]) => {
        setCurrentUser(profile);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      loadProfile(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setDeletingCard(card);
  }

  function showResult(success) {
    setIsInfoTooltipPopupOpen(true);
    setIsInfoTooltipSuccess(success);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);

    setSelectedCard(undefined);
    setDeletingCard(undefined);
  }

  function onKeydown({ key }) {
    if (key === "Escape") {
      closeAllPopups();
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    api.setProfileData(data.name, data.about)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    api.setAvatar(avatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    setCards((state) => state.map((c) => c._id === card._id ? { ...c, likeClicked: true } : c));

    const promise = isLiked ?
      api.unlikeCard(card._id) :
      api.likeCard(card._id);

    promise
      .then((card) => {
        setCards((state) => state.map((c) => c._id === card._id ? card : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    setCards((state) => state.map((c) => c._id === card._id ? { ...c, deleteClicked: true } : c));

    return api.removeCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.createCard(data.title, data.pic)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function loadProfile(token) {
    auth.getContent(token)
      .then((res) => {
        if (res) {
          setUserData(res.data.email);
          setLoggedIn(true);
          history.push("/content");
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function authorization(values) {
    setIsLogined(true);

    auth.authorize(values)
      .then((token) => {
        if (token) {
          localStorage.setItem("token", token);
          handleLogin(token);
          setIsLogined(false);
          history.push("/content");
        }
      })
      .catch(() => {
        showResult(false);
        setIsLogined(false);
      });
  }

  function registration(values) {
    setIsRegistered(true);

    if (values.password === values.confirmPassword) {
      auth
        .register({
          email: values.email,
          password: values.password,
        })
        .then(() => {
          showResult(true);
          setIsRegistered(false);
          history.push("/sign-in");
        })
        .catch(() => {
          showResult(false);
          setIsRegistered(false);
        });
    }
  }

  function handleLogin(token) {
    loadProfile(token);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Page>

        <PageContainer>
          <Header
            pageType={pathname}
            userData={userData}
            handleLogout={handleLogout}
            loggedIn={loggedIn}
          />
          <Content>

            <Switch>
              <ProtectedRoute
                path="/content"
                loggedIn={loggedIn}
              >
                <Main
                  cards={cards}
                  currentUser={currentUser}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCardClick}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddCard={handleAddCardClick}
                  onCardClick={handleCardClick}
                />
              </ProtectedRoute>

              <Route path="/sign-in">
                <Login
                  isLogined={isLogined}
                  authorization={authorization}
                />
              </Route>

              <Route path="/sign-up">
                <Register
                  isRegistered={isRegistered}
                  registration={registration}
                />
              </Route>

              <Route exact path="/">
                {loggedIn ? <Redirect to="/content" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>

          </Content>
          <Footer />
        </PageContainer>

        {currentUser.name &&
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onKeydown={onKeydown}
          />
        }

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onKeydown={onKeydown}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onKeydown={onKeydown}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={selectedCard}
          onClose={closeAllPopups}
          onKeydown={onKeydown}
        />

        <ConfirmDeleteCardPopup
          card={deletingCard}
          onDelete={handleCardDelete}
          isOpen={deletingCard !== undefined}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          success={isInfoTooltipSuccess}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          onKeydown={onKeydown}
        />

      </Page>
    </CurrentUserContext.Provider>
  );
}

App.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withRouter(App);

const Page = styled.div`
    max-width: 1280px;
    min-width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Inter", Tahoma, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #FFFFFF;
    margin: 0 auto;
`
const PageContainer = styled.div`
    width: 880px;
    margin: 0 200px;
    padding: 0;

  @media (max-width: 980px) {
    width: 581px;
    margin: 0 auto;
  }

  @media (max-width: 680px) {
    width: 320px;
  }
`
const Content = styled.main`
    width: 100%;
`
