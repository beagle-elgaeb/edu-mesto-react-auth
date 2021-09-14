import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import buttonClosePopup from "../images/button-сlose.svg";

function ImagePopup({ card, isOpen, onClose, onKeydown }) {
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <PopupOverlay className={`popup_type_pic ${card && "opened"}`} onClick={onClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <Picture alt="Изображение отсутствует" src={card?.link} />
        <Title>{`${card?.name} || ${card?.owner.name} (${card?.owner.about})`}</Title>
        <CloseButton type="button" aria-label="Закрыть картинку" onClick={onClose}>
          <CloseButtonIcon src={buttonClosePopup} alt="Закрыть картинку" />
        </CloseButton>
      </PopupContainer>
    </PopupOverlay>
  );
}

ImagePopup.propTypes = {
  card: PropTypes.object,
  isOpen: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onKeydown: PropTypes.func.isRequired,
};

export default ImagePopup;

const PopupOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  overflow: hidden;
  visibility: hidden;
  opacity: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in;
  margin: 0;
  z-index: -1;

  &.opened {
    visibility: visible;
    opacity: 1;
    z-index: 2;
  }
`;

const PopupContainer = styled.div`
  max-width: 75vw;
  max-height: 75vh;
  display: flex;
  position: relative;
`;

const Picture = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const Title = styled.h2`
  position: absolute;
  left: 0;
  bottom: -25px;
  font-size: 12px;
  line-height: 15px;
  font-weight: 400;
  color: #ffffff;
  margin: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: -40px;
  background: transparent;
  border: none;
  outline: none;
  transition: opacity 0.5s ease-out;
  margin: 0;
  padding: 0;

  @media (max-width: 680px) {
    right: 0;
  }

  :hover {
    opacity: 0.6;
  }
`;

const CloseButtonIcon = styled.img`
  width: 40px;
  height: 40px;
  transform: rotate(45deg);

  @media (max-width: 680px) {
    width: 26px;
    height: 26px;
  }
`;
