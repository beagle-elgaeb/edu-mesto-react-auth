import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useFormik } from "formik";

import * as auth from "../utils/Auth.js";

function Register({ history }) {
  const [message, setMessage] = React.useState("")

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      auth.register({
        email: values.email,
        password: values.password,
      })
        .then((res) => {
          if (res) {
            setMessage("Всё ок");
            history.push("/sign-in");
          } else {
            setMessage("Что-то пошло не так!");
          }
        });
    },
  });

  return (
    <section className="register">
      <h1 className="register__title">Регистрация</h1>
      <form className="register__form" name="register" onSubmit={formik.handleSubmit}>
        <input
          id="register-input"
          className="register__input"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
          required />
        <input
          id="register-input"
          className="register__input"
          type="text"
          {...formik.getFieldProps("password")}
          placeholder="Пароль"
          required />
        <button className="register__button" type="submit" aria-label="Зарегистрироваться">Зарегистрироваться</button>
      </form>
      <p className="register__question">Уже зарегистрированы? <Link className="register__link" to="/sign-in">Войти</Link></p>
    </section>
  )
}

export default withRouter(Register);