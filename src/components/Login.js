import React from "react";
import { withRouter } from "react-router-dom";
import { useFormik } from "formik";
import styled from "styled-components";
import PropTypes from "prop-types";

import loader from "../images/loader.gif";

function Login({ isLogined, authorization }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      authorization({
        email: values.email,
        password: values.password,
      });
    },
  });

  return (
    <LoginContainer>
      <LoginTitle>Вход</LoginTitle>
      <LoginForm name="login" onSubmit={formik.handleSubmit}>
        <LoginFieldset>
          <LoginInput
            id="login-input-email"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
            required
          />
          <LoginInput
            id="login-input-pass"
            type="password"
            {...formik.getFieldProps("password")}
            placeholder="Пароль"
            required
          />
        </LoginFieldset>

        {isLogined && (
          <LoginLoadbar>
            <LoginLoadbarImg
              src={loader}
              alt="Вход"
            />
          </LoginLoadbar>
        )}

        <LoginButton type="submit" aria-label="Войти">
          Войти
        </LoginButton>
      </LoginForm>
    </LoginContainer>
  );
}

Login.propTypes = {
  isLogined: PropTypes.bool.isRequired,
  authorization: PropTypes.func.isRequired,
};

export default withRouter(Login);

const LoginContainer = styled.section`
    width: 358px;
    text-align: center;
    color: #FFFFFF;
    margin: 0 auto;

  @media (max-width: 680px) {
    width: 260px;
  }
`
const LoginTitle = styled.h1`
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
const LoginForm = styled.form`
    width: 100%;
`
const LoginFieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    margin: 0;
    padding: 0;
`
const LoginInput = styled.input`
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
const LoginButton = styled.button`
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
const LoginLoadbar = styled.div`
    width: 60px;
    height: 60px;
    margin: 20px auto -80px auto;
`
const LoginLoadbarImg = styled.img`
    width: 100 %;
    height: 100 %;
`
