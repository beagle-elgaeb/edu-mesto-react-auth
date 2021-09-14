import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import PropTypes from "prop-types";

import PopupWithForm from "./PopupWithForm";

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
      <Fieldset>
        <Input
          id="title-pic-input"
          className={!formik.isValid && "error"}
          type="text"
          {...formik.getFieldProps("title")}
          placeholder="Название места"
        />
        <Error>{formik.touched.title && formik.errors.title ? formik.errors.title : null}</Error>

        <Input
          id="url-pic-input"
          className={!formik.isValid && "error"}
          type="url"
          {...formik.getFieldProps("pic")}
          placeholder="Ссылка на картинку"
        />
        <Error>{formik.touched.pic && formik.errors.pic ? formik.errors.pic : null}</Error>
      </Fieldset>
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
