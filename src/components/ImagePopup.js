import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import * as StylePopup from "../styles/StylesPopup";

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
    <StylePopup.Overlay opened={card} onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Picture alt="Изображение отсутствует" src={card?.link} />
        <Title>{`${card?.name} || ${card?.owner.name} (${card?.owner.about})`}</Title>
        <StylePopup.CloseButton type="button" aria-label="Закрыть картинку" onClick={onClose}>
          <StylePopup.CloseButtonIcon src={buttonClosePopup} alt="Закрыть картинку" />
        </StylePopup.CloseButton>
      </Container>
    </StylePopup.Overlay>
  );
}

ImagePopup.propTypes = {
  card: PropTypes.object,
  isOpen: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onKeydown: PropTypes.func.isRequired,
};

export default ImagePopup;

const Container = styled.div`
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
