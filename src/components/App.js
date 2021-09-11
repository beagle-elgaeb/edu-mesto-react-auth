import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import api from "../utils/Api";
import ProtectedRoute from "../utils/ProtectedRoute";
import * as auth from "../utils/Auth.js";

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
  const [editAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [editProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [addCardPopupOpen, setAddCardPopupOpen] = React.useState(false);
  const [infoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);
  const [infoTooltipSuccess, setInfoTooltipSuccess] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState();
  const [deletingCard, setDeletingCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState("");

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
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    setAddCardPopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setDeletingCard(card);
  }

  function showResult(success) {
    setInfoTooltipPopupOpen(true);
    setInfoTooltipSuccess(success);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddCardPopupOpen(false);
    setInfoTooltipPopupOpen(false);

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
      });
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
      <div className="page">

        <div className="page__container">
          <Header
            pageType={pathname}
            userData={userData}
            handleLogout={handleLogout}
            loggedIn={loggedIn}
          />
          <main className="content">

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
                  showResult={showResult}
                  handleLogin={handleLogin}
                />
              </Route>

              <Route path="/sign-up">
                <Register
                  showResult={showResult}
                />
              </Route>

              <Route exact path="/">
                {loggedIn ? <Redirect to="/content" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>

          </main>
          <Footer />
        </div>

        {currentUser.name &&
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={editProfilePopupOpen}
            onClose={closeAllPopups}
            onKeydown={onKeydown}
          />
        }

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={editAvatarPopupOpen}
          onClose={closeAllPopups}
          onKeydown={onKeydown}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={addCardPopupOpen}
          onClose={closeAllPopups}
          onKeydown={onKeydown}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={infoTooltipPopupOpen}
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
          success={infoTooltipSuccess}
          isOpen={infoTooltipPopupOpen}
          onClose={closeAllPopups}
          onKeydown={onKeydown}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

App.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withRouter(App);
