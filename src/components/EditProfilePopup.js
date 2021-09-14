import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import PropTypes from "prop-types";

import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ onUpdateUser, isOpen, onClose, onKeydown }) {
  const currentUser = React.useContext(CurrentUserContext);

  const formik = useFormik({
    initialValues: {
      fullName: currentUser.name,
      profession: currentUser.about,
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, "Имя не должно быть короче 2 символов")
        .max(40, "Имя не должно превышать 40 символов")
        .required("Введите, пожалуйста, имя"),
      profession: Yup.string()
        .min(2, "Профессия не должно быть короче 2 символов")
        .max(200, "Профессия не должно превышать 200 символов")
        .required("Введите, пожалуйста, профессию"),
    }),
    onSubmit: (values) => {
      onUpdateUser({
        name: values.fullName,
        about: values.profession,
      });
    },
  });

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={formik.handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      onKeydown={onKeydown}
      disabledSubmit={!formik.isValid}
    >
      <Fieldset>
        <Input
          id="name-input"
          error={!formik.errors.fullName}
          type="text"
          {...formik.getFieldProps("fullName")}
          placeholder="Ваше имя"
        />
        <Error>
          {formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : null}
        </Error>

        <Input
          id="about-you-input"
          error={!formik.errors.profession}
          type="text"
          {...formik.getFieldProps("profession")}
          placeholder="Ваша профессия"
        />
        <Error>
          {formik.touched.profession && formik.errors.profession ? formik.errors.profession : null}
        </Error>
      </Fieldset>
    </PopupWithForm>
  );
}

EditProfilePopup.propTypes = {
  onUpdateUser: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onKeydown: PropTypes.func.isRequired,
};

export default EditProfilePopup;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: 0;
  line-height: 17px;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  margin: 0;
  padding: 0;
`;

const Input = styled.input`
  width: 358px;
  height: 27px;
  background: transparent;
  border: 0;
  border-bottom: 1px solid ${({ error }) => (error ? "#ff0000" : "#dddddd")};
  outline: none;
  margin: 30px 0 0 0;

  @media (max-width: 680px) {
    width: 238px;
  }

  ::placeholder {
    color: #c4c4c4;
  }
`;

const Error = styled.span`
  width: 358px;
  height: 0;
  overflow: visible;
  font-size: 12px;
  line-height: 15px;
  font-weight: 400;
  color: #ff0000;
  margin: 0 auto -5px auto;
  padding: 5px 0 0 0;

  @media (max-width: 680px) {
    width: 238px;
  }
`;
