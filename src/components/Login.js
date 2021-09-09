import React from "react";
import { useFormik } from "formik";

function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values.email);
    },
  });

  return (
    <section className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form" name="login" onSubmit={formik.handleSubmit}>
        <fieldset className="login__fieldset">
          <input
            id="login-input"
            className="login__input"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
            required />
          <input
            id="login-input"
            className="login__input"
            type="text"
            {...formik.getFieldProps("password")}
            placeholder="Пароль"
            required />
        </fieldset>
        <button className="login__button" type="submit" aria-label="Войти">Войти</button>
      </form>
    </section>

  )
}

export default Login;