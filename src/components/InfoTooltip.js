import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import * as StylePopup from "../styles/StylesPopup";

import buttonClosePopup from "../images/button-сlose.svg";
import imageOk from "../images/icon-ok.svg";
import imageErr from "../images/icon-err.svg";

function InfoTooltip({ success, isOpen, onClose, onKeydown }) {
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <StylePopup.Overlay opened={isOpen} onClick={onClose}>
      <StylePopup.Container onClick={(e) => e.stopPropagation()}>
        <ToolTyipIcon src={success ? imageOk : imageErr} alt={success ? "ОК" : "Ошибка"} />
        <Text>
          {success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </Text>
        <StylePopup.CloseButton type="button" aria-label="Закрыть окно" onClick={onClose}>
          <StylePopup.CloseButtonIcon src={buttonClosePopup} alt="Закрыть окно" />
        </StylePopup.CloseButton>
      </StylePopup.Container>
    </StylePopup.Overlay>
  );
}

InfoTooltip.propTypes = {
  success: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onKeydown: PropTypes.func.isRequired,
};

export default InfoTooltip;

const ToolTyipIcon = styled.img`
  width: 120px;
  height: 120px;
  margin: 60px auto 32px auto;
`;

const Text = styled.p`
  width: 83%;
  height: 58px;
  font-size: 24px;
  line-height: 29px;
  font-weight: 900;
  color: #000000;
  text-align: center;
  margin: 0 auto 60px auto;

  @media (max-width: 680px) {
    width: 244px;
    font-size: 20px;
    line-height: 24px;
    margin: 0 auto 50px auto;
  }
`;
