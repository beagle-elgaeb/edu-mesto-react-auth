import React from "react";
import { withRouter } from "react-router-dom";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import * as Style from "../styles/StylesAuth";

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
    <Style.Container>
      <Style.Title>Вход</Style.Title>
      <Style.Form name="login" onSubmit={formik.handleSubmit}>
        <Style.Fieldset>
          <Style.Input
            id="login-input-email"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
            required
          />
          <Style.Input
            id="login-input-pass"
            type="password"
            {...formik.getFieldProps("password")}
            placeholder="Пароль"
            required
          />
        </Style.Fieldset>

        {isLogined && (
          <Style.Loadbar>
            <Style.LoadbarIcon src={loader} alt="Вход" />
          </Style.Loadbar>
        )}

        <Style.SubmitButton type="submit" aria-label="Войти">
          Войти
        </Style.SubmitButton>
      </Style.Form>
    </Style.Container>
  );
}

Login.propTypes = {
  isLogined: PropTypes.bool.isRequired,
  authorization: PropTypes.func.isRequired,
};

export default withRouter(Login);
