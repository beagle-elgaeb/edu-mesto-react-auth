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
    <RegisterContainer>
      <Title>Регистрация</Title>
      <Form name="register" onSubmit={formik.handleSubmit}>
        <Fieldset>
          <Input
            id="register-input-email"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
          />
          <Error>{formik.touched.email && formik.errors.email ? formik.errors.email : null}</Error>
          <InputPass>
            <Input
              id="register-input-pass"
              type={!visiblePass ? "password" : "text"}
              {...formik.getFieldProps("password")}
              placeholder="Пароль"
            />
            <Eye onClick={changeButtonPass}>
              <EyeIcon
                src={!visiblePass ? eyeClose : eyeOpen}
                alt={!visiblePass ? "Пароль скрыт" : "Пароль показан"}
              />
            </Eye>
          </InputPass>
          <Error>
            {formik.touched.password && formik.errors.password ? formik.errors.password : null}
          </Error>
          <InputPass>
            <Input
              id="register-input-confirm-pass"
              type={!visibleConfirmPass ? "password" : "text"}
              {...formik.getFieldProps("confirmPassword")}
              placeholder="Повторите пароль"
            />
            <Eye onClick={changeButtonConfirmPass}>
              <EyeIcon
                src={!visibleConfirmPass ? eyeClose : eyeOpen}
                alt={!visibleConfirmPass ? "Пароль скрыт" : "Пароль показан"}
              />
            </Eye>
          </InputPass>
          <Error>
            {formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : null}
          </Error>
        </Fieldset>

        {isRegistered && (
          <Loadbar>
            <LoadbarIcon src={loader} alt="Регистрация" />
          </Loadbar>
        )}

        <SubmitButton type="submit" aria-label="Зарегистрироваться" disabled={!formik.isValid}>
          Зарегистрироваться
        </SubmitButton>
      </Form>
      <Question>
        Уже зарегистрированы? <QuestionLink to="/sign-in">Войти</QuestionLink>
      </Question>
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
  color: #ffffff;
  margin: 0 auto;

  @media (max-width: 680px) {
    width: 260px;
  }
`;

const Title = styled.h1`
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
`;

const Form = styled.form`
  width: 100%;
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  margin: 0;
  padding: 0;
`;

const Input = styled.input`
  width: 358px;
  height: 27px;
  box-sizing: border-box;
  background: transparent;
  border: none;
  border-bottom: 2px solid #ffffff;
  outline: none;
  font-size: 14px;
  line-height: 17px;
  font-weight: 500;
  color: #ffffff;
  margin: 30px 0 0;

  @media (max-width: 680px) {
    width: 260px;
  }

  ::placeholder {
    font-weight: 400;
    color: #ffffff;
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus {
    -webkit-text-fill-color: #ffffff;
    -webkit-box-shadow: 0 0 0px 1000px #131414 inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const InputPass = styled.div`
  position: relative;
`;

const Eye = styled.button`
  width: 22px;
  position: absolute;
  bottom: 0px;
  right: 10px;
  background: transparent;
  opacity: 0.6;
  border: none;
  outline: none;
  cursor: pointer;
  transition: opacity 0.5s ease-out;
  margin: 0;
  padding: 0;

  :hover {
    opacity: 0.4;
  }
`;

const EyeIcon = styled.img`
  width: 100%;
`;

const Error = styled.span`
  width: 358px;
  height: 0;
  display: inline-block;
  font-size: 12px;
  line-height: 13px;
  font-weight: 400;
  color: #ff0000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 auto -13px auto;
  padding: 0 0 13px 0;

  @media (max-width: 680px) {
    width: 260px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  background: ${({ disabled }) => (disabled ? "#DDDDDD" : "#FFFFFF")};
  border: none;
  border-radius: 2px;
  outline: none;
  font-size: 18px;
  line-height: 22px;
  color: ${({ disabled }) => (disabled ? "#BBBBBB" : "#000000")};
  cursor: pointer;
  transition: opacity 0.5s ease-out;
  margin: 159px 0 0;

  @media (max-width: 680px) {
    height: 46px;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    margin: 116px 0 0;
  }

  :hover {
    opacity: 0.85;
  }
`;

const Question = styled.p`
  width: 100%;
  font-size: 14px;
  line-height: 17px;
  margin: 30px 0 0;

  @media (max-width: 680px) {
    margin: 20px 0 0;
  }
`;

const QuestionLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.5s ease-out;

  @media (max-width: 680px) {
    opacity: 0.6;
  }
`;

const Loadbar = styled.div`
  width: 60px;
  height: 60px;
  margin: 20px auto -80px auto;
`;

const LoadbarIcon = styled.img`
  width: 100%;
  height: 100%;
`;
