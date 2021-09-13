import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import PropTypes from "prop-types";

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
        .min(3, "Пароль не должно быть короче 3 символов")
        // .matches(
        //   /^[a-zA-Z0-9]/,
        //   "Пароль может сожержать только латинские символы"
        // )
        // .matches(
        //   /^(?=.*[A-Z])/,
        //   "Пароль должен содержать хотябы один символ верхнего регистра"
        // )
        // .matches(
        //   /^(?=.*[a-z])/,
        //   "Пароль должен содержать хотябы один символ нижнего регистра"
        // )
        // .matches(/^(?=.*[0-9])/, "Пароль должен содержать хотябы одну цифру")
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
    <RegisterContainer>
      <RegisterTitle>Регистрация</RegisterTitle>
      <RegisterForm
        name="register"
        onSubmit={formik.handleSubmit}
      >
        <RegisterFieldset>
          <RegisterInput
            id="register-input-email"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
          />
          <RegisterError>
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null}
          </RegisterError>
          <RegisterInputPass>
            <RegisterInput
              id="register-input-pass"
              type={!visiblePass ? "password" : "text"}
              {...formik.getFieldProps("password")}
              placeholder="Пароль"
            />
            <RegisterEye onClick={changeButtonPass}>
              <RegisterEyeImg
                src={!visiblePass ? eyeClose : eyeOpen}
                alt={!visiblePass ? "Пароль скрыт" : "Пароль показан"}
              />
            </RegisterEye>
          </RegisterInputPass>
          <RegisterError>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : null}
          </RegisterError>
          <RegisterInputPass>
            <RegisterInput
              id="register-input-confirm-pass"
              type={!visibleConfirmPass ? "password" : "text"}
              {...formik.getFieldProps("confirmPassword")}
              placeholder="Повторите пароль"
            />
            <RegisterEye onClick={changeButtonConfirmPass}>
              <RegisterEyeImg
                src={!visibleConfirmPass ? eyeClose : eyeOpen}
                alt={!visibleConfirmPass ? "Пароль скрыт" : "Пароль показан"}
              />
            </RegisterEye>
          </RegisterInputPass>
          <RegisterError>
            {formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : null}
          </RegisterError>
        </RegisterFieldset>

        {isRegistered
          &&
          <RegisterLoadbar>
            <RegisterLoadbarImg src={loader} alt="Регистрация" />
          </RegisterLoadbar>
        }

        <RegisterButton
          type="submit"
          aria-label="Зарегистрироваться"
          disabled={!formik.isValid}
        >
          Зарегистрироваться
        </RegisterButton>
      </RegisterForm>
      <RegisterQuestion>
        Уже зарегистрированы?{" "}
        <RegisterQuestionLink to="/sign-in">
          Войти
        </RegisterQuestionLink>
      </RegisterQuestion>
    </RegisterContainer>
  );
}

Register.propTypes = {
  isRegistered: PropTypes.bool.isRequired,
  registration: PropTypes.func.isRequired,
};

export default withRouter(Register);

const RegisterContainer = styled.section`
    width: 358px;
    text-align: center;
    color: #FFFFFF;
    margin: 0 auto;

  @media (max-width: 680px) {
    width: 260px;
  }
`
const RegisterTitle = styled.h1`
    width: 100%;
    font-size: 24px;
    line-height: 29px;
    font-weight: 900;
    margin: 60px 0 20px;

  @media (max-width: 680px) {
    font-size: 20px;
    line-height: 24px;
    margin: 40px 0 10px;
  }

`
const RegisterForm = styled.form`
    width: 100%;
`
const RegisterFieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    margin: 0;
    padding: 0;
`
const RegisterInput = styled.input`
    width: 358px;
    height: 27px;
    box-sizing: border-box;
    background: transparent;
    border: none;
    border-bottom: 2px solid #FFFFFF;
    outline: none;
    font-size: 14px;
    line-height: 17px;
    font-weight: 500;
    color: #FFFFFF;
    margin: 30px 0 0;

  @media (max-width: 680px) {
    width: 260px;
  }

  ::placeholder {
    font-weight: 400;
    color: #FFFFFF;
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus {
    -webkit-text-fill-color: #FFFFFF;
    -webkit-box-shadow: 0 0 0px 1000px #131414 inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`
const RegisterInputPass = styled.div`
    position: relative;
`
const RegisterEye = styled.button`
    width: 22px;
    position: absolute;
    bottom: 0px;
    right: 10px;
    background: transparent;
    opacity: .6;
    border: none;
    outline: none;
    transition: opacity .5s ease-out;
    margin: 0;
    padding: 0;

  :hover {
    opacity: .4;
  }
`
const RegisterEyeImg = styled.img`
    width: 100%;
`
const RegisterError = styled.span`
    width: 358px;
    height: 0;
    display: inline-block;
    font-size: 12px;
    line-height: 13px;
    font-weight: 400;
    color: #FF0000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 auto -13px auto;
    padding: 0 0 13px 0;

  @media (max-width: 680px) {
    width: 260px;
  }
`
const RegisterButton = styled.button`
    width: 100%;
    height: 50px;
    background: ${({ disabled }) => disabled ? "#DDDDDD" : "#FFFFFF"};
    border: none;
    border-radius: 2px;
    outline: none;
    font-size: 18px;
    line-height: 22px;
    color:  ${({ disabled }) => disabled ? "#BBBBBB" : "#000000"};
    transition: opacity .5s ease-out;
    margin: 159px 0 0;

  @media (max-width: 680px) {
    height: 46px;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    margin: 116px 0 0;
  }

  :hover {
    opacity: .85;
  }
`
const RegisterQuestion = styled.p`
    width: 100%;
    font-size: 14px;
    line-height: 17px;
    margin: 30px 0 0;

  @media (max-width: 680px) {
    margin: 20px 0 0;
  }
`
const RegisterQuestionLink = styled(Link)`
    color: #FFFFFF;
    text-decoration: none;
    transition: opacity .5s ease-out;

  @media (max-width: 680px) {
    opacity: .6;
  }
`
const RegisterLoadbar = styled.div`
    width: 60px;
    height: 60px;
    margin: 20px auto -80px auto;
`
const RegisterLoadbarImg = styled.img`
    width: 100 %;
    height: 100 %;
`
