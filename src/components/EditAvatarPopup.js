import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import PopupWithForm from "./PopupWithForm";

import * as Style from "../styles/StylesForm";

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
      <Style.Fieldset>
        <Style.Input
          id="url-avatar-input"
          error={!formik.errors.avatar}
          type="url"
          {...formik.getFieldProps("avatar")}
          placeholder="Ссылка на аватар"
        />
        <Style.Error>
          {formik.touched.avatar && formik.errors.avatar ? formik.errors.avatar : null}
        </Style.Error>
      </Style.Fieldset>
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
