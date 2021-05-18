import React from "react";
import { Link } from 'react-router-dom';
import "./Register.css";

const Register = ({ handleRegister }) => {
    const [data, setData] = React.useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
          const { password, email } = data;

          handleRegister(password, email);
      }

    return (
        <div className="register">
            <h2 className="register__title">Добро пожаловать!</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <p className="register__data-name">Имя</p>
                <input className="register__data" id="form-user" name="user" value={data.user} onChange={handleChange} required type="text" />
                <span className= "register__input-error" id='form-name-error' />
                <p className="register__data-name">Email</p>
                <input className="register__data" id="form-email" name="email" value={data.email} onChange={handleChange} required type="email" />
                <span className= "register__input-error" id='form-email-error' />
                <p className="register__data-name">Пароль</p>
                <input className="register__data" id="form-job" name="password" required type="password" value={data.password} onChange={handleChange} />
                <span className= "register__input-error" id='form-job-error' />
                <button type="submit" className="register__submit">Зарегистрироваться</button>
            </form>
            <div className="register__signin">
            <p className="register__login-title">Уже зарегистрированы?</p>
            <Link to="/signin" className="register__login-link">Войти</Link>
            </div>
        </div>

    )
}

export default Register;