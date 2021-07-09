import React from "react";
import "./Profile.css";
import "../EditProfilePopup/EditProfilePopup.css";
import { CurrentUserContext } from '../../context/CurrentUserContext';
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

export default function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const handleEditProfile = () => {
        props.handleEditProfileClick();
    }

    const logOut = (e) => {
        e.preventDefault();
        props.handleLogOut();
    }

    return (
        <div className="profile">
            <h2 className="profile__title">Привет, {currentUser.name}!</h2>
            <div className="profile__container">
                <h3 className="profile__name">Имя</h3>
                <p className="profile__data">{currentUser.name}</p>
            </div>
            <div className="profile__line" />
            <div className="profile__container">
                <h3 className="profile__name">Email</h3>
                <p className="profile__data">{currentUser.email}</p>
            </div>
            <button className="profile__edit-button" onClick={handleEditProfile}>Редактировать</button>
            <button onClick={logOut} className="profile__exit-button">Выйти из аккаунта</button>
            <EditProfilePopup isOpen={props.isOpen} isClose={props.isClose} handleUpdateUser={props.handleUpdateUser} closeAllPopups={props.closeAllPopups} />
            <InfoTooltip isUpdateProfile={props.isUpdateProfile} closeInfoTool={props.closeInfoTool} isOpenInfoTool={props.isOpenInfoTool} resultSuccess={props.resultSuccess} />
        </div>
    )
}