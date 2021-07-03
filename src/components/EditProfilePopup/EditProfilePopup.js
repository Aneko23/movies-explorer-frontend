import React from "react";
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Preloader from "../Preloader/Preloader";

export default function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [isFetching, toggleIsFetching] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [user, setUser] = React.useState('');
    const [isClickedEmail, setClickedEmail] = React.useState(false);
    const [isClickedUser, setClickedUser] = React.useState(false);

    const [emailError, setEmailError] = React.useState("");
    const [userError, setUserError] = React.useState("")

    const [formValid, setFormValid] = React.useState(false);


    const [isSameData, setSameData] = React.useState(true);

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setClickedEmail(true)
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

        props.handleUpdateUser({name: user, email: email});
      }

      React.useEffect(() => {
        if (emailError || userError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, userError])

//Дублирую данные профиля в инпут
    React.useEffect(() => {
        if (currentUser) {
            setUser(currentUser.name);
            setEmail(currentUser.email);
        }
    }, [currentUser]);

//Обновляю поля после закрытия попапа
    React.useEffect(() => {
        if (props.isClose) {
            setUser(currentUser.name);
            setEmail(currentUser.email);
            toggleIsFetching(false)
        }
    }, [props.isClose, currentUser])

//Закрытие попапа через кнопку крестика
    function closePopup() {
        props.closeAllPopups(true);
    }

    React.useEffect(() => {
        if (currentUser.name === user && currentUser.email === email) {
            setSameData(true)
        } else {
            setSameData(false)
        }
    }, [user, email, currentUser])

    return (
        <div className={props.isOpen ? `popup_opened` : `popup popup_type_edit` }>
            <form className="popup__container popup__container_edit" noValidate onSubmit={handleSubmit}>
                <h2 className="popup__title">Редактирование профиля</h2>
                <input onBlur={e => blurHandler(e)} className="popup__data popup__data_name" id="form-name" value={user || ''} onChange={e => userChange(e)} type="text" name="user" />
                {(isClickedUser && userError) && <span className= "popup__input-error" id='form-name-error'>{userError}</span>}
                <input onBlur={e => blurHandler(e)} className="popup__data popup__data_email" id="form-email" value={email || ''} onChange={e => emailChange(e)} type="email" name="email" />
                {(isClickedEmail && emailError) && <span className= "popup__input-error" id='form-name-error'>{emailError}</span>}
                {isFetching ? <Preloader isFetching={isFetching} /> : <button disabled={isSameData || !formValid} className={`submit-button ${isSameData ? "submit-button_inactive" : "submit-button_active"}`} type="submit" name="SubmitButton">Сохранить</button>}
                <button disabled={!isSameData} type="button" className="close-button" onClick={closePopup} />
            </form>
        </div>
    )
}