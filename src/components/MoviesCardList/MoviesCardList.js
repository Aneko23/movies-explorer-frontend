import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList (props) {

    const isNotFoundShorts = props.savedMovies.length === 0;

    function openMoreMovies() {
        props.openMoreMovies();
    }

    return (
        <div className="movies-list">
            <Switch>
        <Route exact path="/movies">
        <ul className="movies-list__element">
            {props.movies.map(movie =>
                <MoviesCard
                key={movie._id}
                movie={movie}
                filterMovies={props.filterMovies}
                handleAddSavedMovie={props.handleAddSavedMovie}
                savedMovies={props.savedMovies}
                handleCardDelete={props.handleCardDelete}
                movies={props.movies}
                />
            )}
        </ul>
        <p className={props.isNotFound ? "movies-list__error" : "movies-list__error_inactive"}>Ничего не найдено. Пожалуйста, попробуйте изменить запрос.</p>
        <button className={props.allShowed ? "movies-list__more_unactive" : "movies-list__more"} onClick={openMoreMovies} >Ещё</button>
        </Route>
        <Route path="/saved-movies">
            <ul className="movies-list__element_saved">
            {props.savedMovies.map(movie => 
                <MoviesCard 
                key={movie._id}
                movie={movie}
                movies={props.movies}
                savedMovies={props.savedMovies}
                handleCardDelete={props.handleCardDelete}
                />
            )}
            </ul>
            <p className={props.isLoadError ? "movies-list__error" : "movies-list__error_inactive"}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p>
            <p className={isNotFoundShorts ? "movies-list__error" : "movies-list__error_inactive"}>Ничего не найдено. Пожалуйста, попробуйте изменить запрос.</p>
        </Route>
        </Switch>
        </div>
    )
}