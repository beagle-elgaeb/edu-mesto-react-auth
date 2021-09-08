import React from "react";
import PropTypes from 'prop-types';

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import buttonDeleteCard from "../images/button-delete.svg";

function Card({ card, onClick, onLikeClick, onDeleteClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  let cardDeleteButtonClassName = `${isOwn ? "card__button-delete" : "card__button-delete card__button-delete_disabled"}`;
  let cardLikeButtonClassName = `${isLiked ? "card__button-like-img card__button-like-img_active" : "card__button-like-img"}`;

  if (card.deleteClicked) {
    cardDeleteButtonClassName += " card__button-delete_wait";
  }

  if (card.likeClicked) {
    cardLikeButtonClassName += " card__button-like-img_wait";
  }

  return (
    <li className="photo-gallery__card card list__item">
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить" onClick={() => onDeleteClick(card)}>
        <img className="card__button-delete-img" src={buttonDeleteCard} alt="Удалить карточку" />
      </button>
      <img className="card__photo" src={card.link} alt={card.name} onClick={() => onClick(card)} />
      <div className="card__title-and-like">
        <h2 className="card__title">{card.name}</h2>
        <button className="card__button-like" type="button" aria-label="Нравится" onClick={() => onLikeClick(card)}>
          <div className={cardLikeButtonClassName}></div>
          <p className="card__button-like-count">{card.likes.length}</p>
        </button>
      </div>
    </li>
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default Card;
