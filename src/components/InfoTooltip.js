import buttonClosePopup from "../images/button-сlose.svg";

function InfoTooltip({ success, isOpen, onClose }) {

  return (
    <div className={`popup popup_type_tooltype ${isOpen ? "popup_opened" : ""} `} onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <img src={success ? "" : ""}/>
        <p className="popup__text">{success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
        <button className="popup__button-close" type="button" aria-label="Закрыть окно" onClick={onClose}>
          <img className="popup__button-close-img" src={buttonClosePopup} alt="Закрыть окно" />
        </button>
      </div>
    </div>
  );
}

export default InfoTooltip;
