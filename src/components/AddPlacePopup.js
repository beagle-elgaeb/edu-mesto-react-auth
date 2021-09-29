import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import PopupWithForm from "./PopupWithForm";

import * as Style from "../styles/StylesForm";

function AddPlacePopup({ onAddPlace, isOpen, onClose, onKeydown }) {
  const formik = useFormik({
    initialValues: {
      title: "",
      pic: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, "Название не должно быть короче 2 символов")
        .max(30, "Название не должно превышать 30 символов")
        .required("Введите, пожалуйста, название"),
      pic: Yup.string()
        .url("Введите, пожалуйста, корректную ссылку")
        .required("Введите, пожалуйста, ссылку на изображение"),
    }),
    onSubmit: (values) => {
      onAddPlace({
        title: values.title,
        pic: values.pic,
      });
    },
  });

  React.useEffect(() => {
    formik.resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      onSubmit={formik.handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      onKeydown={onKeydown}
      disabledSubmit={!formik.isValid}
    >
      <Style.Fieldset>
        <Style.Input
          id="title-pic-input"
          error={!formik.errors.title}
          type="text"
          {...formik.getFieldProps("title")}
          placeholder="Название места"
        />
        <Style.Error>
          {formik.touched.title && formik.errors.title ? formik.errors.title : null}
        </Style.Error>

        <Style.Input
          id="url-pic-input"
          error={!formik.errors.pic}
          type="url"
          {...formik.getFieldProps("pic")}
          placeholder="Ссылка на картинку"
        />
        <Style.Error>
          {formik.touched.pic && formik.errors.pic ? formik.errors.pic : null}
        </Style.Error>
      </Style.Fieldset>
    </PopupWithForm>
  );
}

AddPlacePopup.propTypes = {
  onAddPlace: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onKeydown: PropTypes.func.isRequired,
};

export default AddPlacePopup;
