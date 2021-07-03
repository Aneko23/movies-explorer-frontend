import React from 'react';
import { Route } from 'react-router-dom';
import './MoviesCard.css';
import Saved from '../../images/saved.svg';
import Trash from '../../images/delete-movie.svg';
import NoImage from '../../images/not-image.png';

export default function MoviesCard (props) {
    const [isVisible, setVisibleElement] = React.useState(false);
    const [isSaved, setSaved] = React.useState(false);
    const hours = Math.trunc(props.movie.duration/60);
    const minutes = props.movie.duration - (hours*60);
    const partUrl = 'https://api.nomoreparties.co';

    function handleClick() {
        props.handleAddSavedMovie(props.movie);
        setSaved(true);
    }

    function setVisibleButton() {
        setVisibleElement(true);
    }

    function setUnvisibleButton() {
        setVisibleElement(false);
    }

    function handleDeleteClick() {
        setSaved(false);
        props.handleCardDelete(props.movie);
    }

    const isLiked = props.savedMovies.some((s) => {
        return s.nameRU === props.movie.nameRU;
    })
    console.log(isLiked)

    return (
        <>
            <Route path="/movies">
            <li className="movies-card" >
            <div className="movies-card__container" onMouseOver={setVisibleButton} onMouseOut={setUnvisibleButton}>
                <div className={isVisible ? "movies-card__button" : "movies-card__button_inactive"}>
                    <button className={`movies-card__save ${isSaved && "movies-card__save_inactive"}`} type="submit" onClick={handleClick} >Сохранить</button>
                </div>
                <img className={isSaved || isLiked ? "movies-card__saved" : "movies-card__unsaved"} src={Saved} alt="Уведомление о том, что фильм сохранён" onClick={handleDeleteClick} />
                <a href={props.movie.trailerLink} target="_blank" rel="noreferrer">
                <img className="movies-card__image" src={props.movie.image ? partUrl.concat(props.movie.image.url) : NoImage} alt={`Обложка к фильму "${props.movie.nameRU}"`} />
                </a>
            </div>
            <div className="movies-card__info">
                <h4 className="movies-card__name">{props.movie.nameRU}</h4>
                <p className="movies-card__time">{hours}ч {minutes}м</p>
            </div>
            </li>
            </Route>
            <Route path="/saved-movies">
            <li className="movies-card">
            <div className="movies-card__container" onMouseOver={setVisibleButton} onMouseOut={setUnvisibleButton}>
                <button className={isVisible ? "delete-movie" : "delete-movie_inactive"} type="submit" onClick={handleDeleteClick}>
                    <img className="movies-card__delete" src={Trash} alt="Иконка удаления" />
                </button>
                <img className="movies-card__image" src={props.movie.image} alt={`Обложка к фильму "${props.movie.nameRU}"`} />
            </div>
            <div className="movies-card__info">
                <h4 className="movies-card__name">{props.movie.nameRU}</h4>
                <p className="movies-card__time">{hours}ч {minutes}м</p>
            </div>
            </li>
        </Route>
        </>
    )
}