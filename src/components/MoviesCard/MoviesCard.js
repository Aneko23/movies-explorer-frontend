import React from 'react';
import { Route } from 'react-router-dom';
import './MoviesCard.css';
import Saved from '../../images/saved.svg';
import Trash from '../../images/delete-movie.svg';

export default function MoviesCard (props) {
    const [isVisible, setVisibleElement] = React.useState(false);
    const [isSaved, setSavedMovie] = React.useState(false);

    function handleClick() {
        props.saveMovie(props.movie)
        setSavedMovie(true)
    }

    function setVisibleButton() {
        setVisibleElement(true);
    }

    function setUnvisibleButton() {
        setVisibleElement(false);
    }

    return (
        <li className="movies-card">
            <Route path="/movies">
            <div className="movies-card__container" onMouseOver={setVisibleButton} onMouseOut={setUnvisibleButton}>
                <div className={isVisible ? "movies-card__button" : "movies-card__button_inactive"}>
                    <button className={isSaved ? "save-movie_inactive" : "save-movie"} type="submit" onClick={handleClick} >Сохранить</button>
                </div>
                <img className={isSaved ? "movies-card__saved" : "movies-card__unsaved"} src={Saved} alt="Уведомление о том, что фильм сохранён" />
                <img className="movies-card__image" src={props.image} alt={`Обложка к фильму "${props.nameRu}"`} />
            </div>
            <div className="movies-card__info">
                <h4 className="movies-card__name">{props.nameRu}</h4>
                <p className="movies-card__time">{props.time}</p>
            </div>
            </Route>
            <Route path="/saved-movies">
            <div className="movies-card__container" onMouseOver={setVisibleButton} onMouseOut={setUnvisibleButton}>
                <button className={isVisible ? "delete-movie" : "delete-movie_inactive"} type="submit" >
                    <img className="movies-card__delete" src={Trash} alt="Иконка удаления" />
                </button>
                <img className="movies-card__image" src={props.image} alt={`Обложка к фильму "${props.nameRu}"`} />
            </div>
            <div className="movies-card__info">
                <h4 className="movies-card__name">{props.nameRu}</h4>
                <p className="movies-card__time">{props.time}</p>
            </div>
        </Route>
        </li>
    )
}