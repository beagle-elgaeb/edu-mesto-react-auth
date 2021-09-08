import React from "react";
import PropTypes from 'prop-types';

import Card from "./Card";

import loader from "../images/loader.gif";
import buttonEditImg from "../images/button-edit.svg";
import buttonAddCard from "../images/button-add.svg";

function Main({ cards, currentUser, onEditProfile, onEditAvatar, onAddCard, onCardClick, onCardLike, onCardDelete }) {
  return (
    <main className="content">
      <section className="profile">
        <button className="profile__button-edit-avatar profile__button-edit-avatar-overlay" onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar ?? loader} alt="Фото профиля" />
        </button>
        <div className="profile__info">
          <div className="profile__info-full-name-and-button-edit">
            <h1 id="fullName" className="profile__info-full-name">{currentUser.name}</h1>
            <button className="profile__button-edit" type="button" aria-label="Изменить" onClick={onEditProfile}>
              <img className="profile__button-edit-img" src={buttonEditImg} alt="Кнопка редактирования профиля" />
            </button>
          </div>
          <p id="profession" className="profile__info-profession">{currentUser.about}</p>
        </div>
        <button className="profile__button-add-card" type="button" aria-label="Добавить фото" onClick={onAddCard}>
          <img className="profile__button-add-card-img" src={buttonAddCard} alt="Кнопка добавления места" />
        </button>
      </section>
      <section className="photo-gallery">
        <ul className="photo-gallery__cards list">
          {cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onClick={onCardClick}
              onLikeClick={onCardLike}
              onDeleteClick={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

Main.propTypes = {
  cards: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  onCardLike: PropTypes.func.isRequired,
  onCardDelete: PropTypes.func.isRequired,
  onEditAvatar: PropTypes.func.isRequired,
  onEditProfile: PropTypes.func.isRequired,
  onAddCard: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
}

export default Main;
