import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import PropTypes from "prop-types";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose, onKeydown }) {
  const formik = useFormik({
    initialValues: {
      avatar: "",
    },
    validationSchema: Yup.object({
      avatar: Yup.string()
        .url("Введите, пожалуйста, корректную ссылку")
        .required("Введите, пожалуйста, ссылку на изображение"),
    }),
    onSubmit: (values) => {
      onUpdateAvatar({
        avatar: values.avatar,
      });
    },
  });

  React.useEffect(() => {
    formik.resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onSubmit={formik.handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      onKeydown={onKeydown}
      disabledSubmit={!formik.isValid}
    >
      <Fieldset>
        <Input
          id="url-avatar-input"
          className={!formik.isValid && "error"}
          type="url"
          {...formik.getFieldProps("avatar")}
          placeholder="Ссылка на аватар"
        />
        <Error>{formik.touched.avatar && formik.errors.avatar ? formik.errors.avatar : null}</Error>
      </Fieldset>
    </PopupWithForm>
  );
}

EditAvatarPopup.propTypes = {
  onUpdateAvatar: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onKeydown: PropTypes.func.isRequired,
};

export default EditAvatarPopup;

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
  border-bottom: 1px solid #dddddd;
  outline: none;
  margin: 30px 0 0 0;

  @media (max-width: 680px) {
    width: 238px;
  }

  ::placeholder {
    color: #c4c4c4;
  }

  &.error {
    border: 0;
    border-bottom: 1px solid #ff0000;
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
