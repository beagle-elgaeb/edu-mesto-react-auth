import React from "react";
import { withRouter } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import * as Style from "../styles/StylesAuth";

import eyeOpen from "../images/icon-eye-open.svg";
import eyeClose from "../images/icon-eye-close.svg";
import loader from "../images/loader.gif";

function Register({ isRegistered, registration }) {
  const [visiblePass, setVisibilityPass] = React.useState(false);
  const [visibleConfirmPass, setVisibilityConfirmPass] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Введите, пожулуйста, корректный email")
        .required("Введите, пожалуйста, email"),
      password: Yup.string()
        .min(8, "Пароль не должно быть короче 8 символов")
        .matches(/^[a-zA-Z0-9]/, "Пароль может сожержать только латинские символы")
        .matches(/^(?=.*[A-Z])/, "Пароль должен содержать хотябы один символ верхнего регистра")
        .matches(/^(?=.*[a-z])/, "Пароль должен содержать хотябы один символ нижнего регистра")
        .matches(/^(?=.*[0-9])/, "Пароль должен содержать хотябы одну цифру")
        .required("Введите, пожалуйста, пароль"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
        .required("Введите пароль повторно, пожалуйста"),
    }),
    onSubmit: (values) => {
      registration(values);
    },
  });

  function changeButtonPass() {
    setVisibilityPass((state) => !state);
  }

  function changeButtonConfirmPass() {
    setVisibilityConfirmPass((state) => !state);
  }

  return (
    <Style.Container>
      <Style.Title>Регистрация</Style.Title>
      <Style.Form name="register" onSubmit={formik.handleSubmit}>
        <Style.Fieldset>
          <Style.Input
            id="register-input-email"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
          />
          <Style.Error>{formik.touched.email && formik.errors.email ? formik.errors.email : null}</Style.Error>
          <Style.InputPass>
            <Style.Input
              id="register-input-pass"
              type={!visiblePass ? "password" : "text"}
              {...formik.getFieldProps("password")}
              placeholder="Пароль"
            />
            <Style.Eye onClick={changeButtonPass}>
              <Style.EyeIcon
                src={!visiblePass ? eyeClose : eyeOpen}
                alt={!visiblePass ? "Пароль скрыт" : "Пароль показан"}
              />
            </Style.Eye>
          </Style.InputPass>
          <Style.Error>
            {formik.touched.password && formik.errors.password ? formik.errors.password : null}
          </Style.Error>
          <Style.InputPass>
            <Style.Input
              id="register-input-confirm-pass"
              type={!visibleConfirmPass ? "password" : "text"}
              {...formik.getFieldProps("confirmPassword")}
              placeholder="Повторите пароль"
            />
            <Style.Eye onClick={changeButtonConfirmPass}>
              <Style.EyeIcon
                src={!visibleConfirmPass ? eyeClose : eyeOpen}
                alt={!visibleConfirmPass ? "Пароль скрыт" : "Пароль показан"}
              />
            </Style.Eye>
          </Style.InputPass>
          <Style.Error>
            {formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : null}
          </Style.Error>
        </Style.Fieldset>

        {isRegistered && (
          <Style.Loadbar>
            <Style.LoadbarIcon src={loader} alt="Регистрация" />
          </Style.Loadbar>
        )}

        <Style.SubmitButton type="submit" aria-label="Зарегистрироваться" disabled={!formik.isValid}>
          Зарегистрироваться
        </Style.SubmitButton>
      </Style.Form>
      <Style.Question>
        Уже зарегистрированы? <Style.QuestionLink to="/sign-in">Войти</Style.QuestionLink>
      </Style.Question>
    </Style.Container>
  );
}

Register.propTypes = {
  isRegistered: PropTypes.bool.isRequired,
  registration: PropTypes.func.isRequired,
};

export default withRouter(Register);
