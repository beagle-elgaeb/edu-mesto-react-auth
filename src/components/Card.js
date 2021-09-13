import React from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import buttonDelete from "../images/button-delete.svg";
import buttonLike from "../images/like.svg";
import buttonLikeActive from "../images/like-active.png";

function Card({ card, onClick, onLikeClick, onDeleteClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  return (
    <CardItem>
      <CardButtonDelete
        type="button"
        aria-label="Удалить"
        onClick={() => onDeleteClick(card)}
        disabled={!isOwn}
      >
        <CardButtonDeleteImg src={buttonDelete} alt="Удалить" />
      </CardButtonDelete>
      <CardPhoto src={card.link} alt={card.name} onClick={() => onClick(card)} />
      <CardTitleAndLike>
        <CardTitle>{card.name}</CardTitle>
        <CardButtonLike type="button" aria-label="Нравится" onClick={() => onLikeClick(card)}>
          {
            card.likeClicked
              ?
              isLiked
                ?
                <CardButtonLikeImgWaiting src={buttonLikeActive} alt="Нравится" />
                :
                <CardButtonLikeImgWaiting src={buttonLike} alt="Нравится" />
              :
              isLiked
                ?
                <CardButtonLikeImg src={buttonLikeActive} alt="Нравится" />
                :
                <CardButtonLikeImg src={buttonLike} alt="Нравится" />
          }
          <CardLikeCount>{card.likes.length}</CardLikeCount>
        </CardButtonLike>
      </CardTitleAndLike>
    </CardItem >
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default Card;

const flicker = keyframes`
  0% {
    filter: brightness(100%);
    filter: hue-rotate(0deg);
  }
  100% {
    filter: brightness(100%);
    filter: hue-rotate(360deg);
  }
`
const rotate = keyframes`
  from {
    transform: rotate(10deg) scale(0.8);
  }
  50% {
    transform: rotate(0deg) scale(1);
  }
  to {
    transform: rotate(-10deg) scale(0.8);
  }
`

const CardItem = styled.li`
    display: flex;
    flex-direction: column;
    position: relative;
    background: #ffffff;
    border-radius: 11px;
    list-style-type: none;
    margin: 0;
`
const CardButtonDelete = styled.button`
    width: 22px;
    height: 38px;
    display: ${({ disabled }) => disabled ? "none" : "inline"};
    position: absolute;
    top: 18px;
    right: 18px;
    background: transparent;
    border: none;
    outline: none;
    transition: opacity .5s ease-out;
    animation: none;
    margin: 0;
    padding: 0;
    z-index: 1;

  :hover {
    opacity: .6;
  }
`
const CardButtonDeleteImg = styled.img`
    width: 18px;
    height: 19px;
    margin: 0;
`
const CardPhoto = styled.img`
    width: 100%;
    height: 282px;
    object-fit: cover;
    border-top-left-radius: 11px;
    border-top-right-radius: 11px;
    z-index: 0;

  :hover {
    animation: ${flicker} 2s linear infinite;
  }
`
const CardTitleAndLike = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
`
const CardTitle = styled.h2`
    font-size: 24px;
    line-height: 29px;
    font-weight: 900;
    color: #000000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 0 0 18px;
`
const CardButtonLike = styled.button`
    width: 22px;
    height: 38px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    border: none;
    outline: none;
    transition: opacity .5s ease-out;
    margin: auto 18px auto 0;

  :hover {
    opacity: .5;
  }
`
const CardButtonLikeImg = styled.img`
    width: 22px;
    height: 19px;
    background: transparent;
    margin: 0;

  :hover {
    opacity: .6;
  }
`
const CardButtonLikeImgWaiting = styled(CardButtonLikeImg)`
    animation: ${rotate} .03s ease-in-out infinite;
`
const CardLikeCount = styled.p`
    display: block;
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
    margin: 0;
`
