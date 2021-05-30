import React from "react";
import { CurrentUserContext } from '../../context/CurrentUserContext';

export default function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');

//Обновляю значение name
    function handleChangeName(e) {
       setName(e.target.value);
    }

//Обновляю значение email
    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

//Сохраняю изменения
    function handleSubmit(e) {
        e.preventDefault();
      
        props.handleUpdateUser({
          name: name,
          email: email,
        });
      } 

//Дублирую данные профиля в инпут
    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setEmail(currentUser.email);
        }
    }, [currentUser]);

//Обновляю поля после закрытия попапа
    React.useEffect(() => {
        if (props.isClose) {
            setName(currentUser.name);
            setEmail(currentUser.email);
        }
    }, [props.isClose, currentUser])

//Закрытие попапа через кнопку крестика
    function closePopup() {
        props.closeAllPopups(true);
    }

    return (
        <div className={props.isOpen ? `popup_opened` : `popup popup_type_edit` }>
            <form className="popup__container popup__container_edit" noValidate onSubmit={handleSubmit}>
                <h2 className="popup__title">Редактирование профиля</h2>
                <input className="popup__data popup__data_name" id="form-name" value={name || ''} onChange={handleChangeName} type="text" name="nameInput" />
                <span className= "popup__input-error" id='form-name-error' />
                <input className="popup__data popup__data_email" id="form-email" value={email || ''} onChange={handleChangeEmail} type="email" name="emailInput" />
                <span className= "popup__input-error" id='form-email-error' />
                <button className="submit-button" type="submit" name="SubmitButton">Сохранить</button>
                <button type="button" className="close-button" onClick={closePopup} />
            </form>
        </div>
    )
}