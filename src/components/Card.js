import React from "react";
import styled, { css, keyframes } from "styled-components";
import PropTypes from "prop-types";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import buttonDelete from "../images/button-delete.svg";
import buttonLike from "../images/like.svg";
import buttonLikeActive from "../images/like-active.png";

function Card({ card, onClick, onLikeClick, onDeleteClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  return (
    <Item>
      <DeleteButton
        type="button"
        aria-label="Удалить"
        onClick={() => onDeleteClick(card)}
        disabled={!isOwn}
      >
        <DeleteButtonImg src={buttonDelete} alt="Удалить" />
      </DeleteButton>
      <Photo src={card.link} alt={card.name} onClick={() => onClick(card)} />
      <TitleAndLike>
        <Title>{card.name}</Title>
        <LikeButton
          type="button"
          aria-label="Нравится"
          onClick={() => onLikeClick(card)}
        >
          <LikeIcon
            waiting={card.likeClicked}
            src={isLiked ? buttonLikeActive : buttonLike}
            alt="Нравится"
          />
          <LikeCount>{card.likes.length}</LikeCount>
        </LikeButton>
      </TitleAndLike>
    </Item>
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

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
`;
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
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  position: relative;
  background: #FFFFFF;
  border-radius: 11px;
  list-style-type: none;
  margin: 0;
`;

const DeleteButton = styled.button`
  width: 22px;
  height: 38px;
  display: ${({ disabled }) => (disabled ? "none" : "inline")};
  position: absolute;
  top: 18px;
  right: 18px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: opacity 0.5s ease-out;
  animation: none;
  margin: 0;
  padding: 0;
  z-index: 1;

  :hover {
    opacity: 0.6;
  }
`;

const DeleteButtonImg = styled.img`
  width: 18px;
  height: 19px;
  margin: 0;
`;

const Photo = styled.img`
  width: 100%;
  height: 282px;
  object-fit: cover;
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
  z-index: 0;

  :hover {
    animation: ${flicker} 2s linear infinite;
  }
`;

const TitleAndLike = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 24px;
  line-height: 29px;
  font-weight: 900;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 0 0 18px;
`;

const LikeButton = styled.button`
  width: 22px;
  height: 38px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: opacity 0.5s ease-out;
  margin: auto 18px auto 0;

  :hover {
    opacity: 0.5;
  }
`;

const LikeIcon = styled.img`
  width: 22px;
  height: 19px;
  background: transparent;
  ${({ waiting }) =>
    waiting &&
    css`
      animation: ${rotate} 0.03s ease-in-out infinite;
    `};
  margin: 0;

  :hover {
    opacity: 0.6;
  }
`;

const LikeCount = styled.p`
  display: block;
  font-size: 13px;
  line-height: 16px;
  font-weight: 400;
  margin: 0;
`;
