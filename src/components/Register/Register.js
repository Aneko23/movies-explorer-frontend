import React from "react";
import { Link } from 'react-router-dom';
import Preloader from "../Preloader/Preloader";
import "./Register.css";

const Register = ({ handleRegister }) => {
    const [isFetching, toggleIsFetching] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isClickedEmail, setClickedEmail] = React.useState(false);
    const [isClickedPassword, setClickedPassword] = React.useState(false);
    const [isClickedUser, setClickedUser] = React.useState(false);

    const [emailError, setEmailError] = React.useState("Поле Email не может быть пустым");
    const [passwordError, setPasswordError] = React.useState("Поле с паролем не может быть пустым");
    const [userError, setUserError] = React.useState("Поле с именем не может быть пустым")

    const [formValid, setFormValid] = React.useState(false);

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setClickedEmail(true)
                break
            case 'password':
                setClickedPassword(true)
                break
            case 'user':
                setClickedUser(true)
                break

            // no default
        }
    }

    const emailChange = (e) => {
        setEmail(e.target.value);
        const schemaEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!schemaEmail.test(String(e.target.value).toLowerCase())) {
            setEmailError("Некорректный email");
            if (!e.target.value) {
                setEmailError("Поле Email не может быть пустым")
            }
        }   else {
                setEmailError("")
            }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        if (!e.target.value) {
            setPasswordError("Поле с паролем не может быть пустым")
        } else {
            setPasswordError("")
        }
    }

    const userChange = (e) => {
        setUser(e.target.value);
        if (!e.target.value) {
            setUserError("Поле с именем не может быть пустым")
        } else {
            setUserError("")
        }
    }

    const handleSubmit = (e) => {
        toggleIsFetching(true);
        e.preventDefault();
        handleRegister(password, email, user);
      }

      React.useEffect(() => {
        if (emailError || passwordError || userError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, userError])

    return (
        <div className="register">
            <h2 className="register__title">Добро пожаловать!</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <p className="register__data-name">Имя</p>
                <input onBlur={e => blurHandler(e)} className="register__data" id="form-user" name="user" value={user} onChange={e => userChange(e)} required type="text" />
                {(isClickedUser && userError) && <span className= "register__input-error" id='form-name-error'>{userError}</span>}
                <p className="register__data-name">Email</p>
                <input onBlur={e => blurHandler(e)} className="register__data" id="form-email" name="email" value={email} onChange={e => emailChange(e)} required type="email" />
                {(isClickedEmail && emailError) && <span className= "register__input-error" id='form-email-error'>{emailError}</span>}
                <p className="register__data-name">Пароль</p>
                <input onBlur={e => blurHandler(e)} className="register__data" id="form-job" name="password" required type="password" value={password} onChange={e => passwordHandler(e)} />
                {(isClickedPassword && passwordError) && <span className= "register__input-error" id='form-job-error'>{passwordError}</span>}
                {isFetching ? <Preloader isFetching={isFetching} /> : <button disabled={!formValid} type="submit" className={`register__submit ${formValid ? "register__submit_valid" : "register__submit_invalid"}`}>Зарегистрироваться</button>}
            </form>
            <div className="register__signin">
            <p className="register__login-title">Уже зарегистрированы?</p>
            <Link to="/signin" className="register__login-link">Войти</Link>
            </div>
        </div>

    )
}

export default Register;