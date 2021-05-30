import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList (props) {

    function openMore() {
        props.openMoreSavedMovies();
    }

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
                isSaved={props.isSaved}
                savedMovies={props.savedMovies}
                />
            )}
        </ul>
        <p className={props.isNotFound ? "movies-list__not-found" : "movies-list__not-found_unactive"}>Ничего не найдено. Пожалуйста, попробуйте изменить запрос.</p>
        <button className={props.allShowed ? "movies-list__more_unactive" : "movies-list__more"} onClick={openMoreMovies} >Ещё</button>
        </Route>
        <Route path="/saved-movies">
            <ul className="movies-list__element_saved">
            {props.savedMovies.map(movie => 
                <MoviesCard 
                key={movie._id}
                movie={movie}
                handleCardDelete={props.handleCardDelete}
                />
            )}
            </ul>
            <p className={props.isNotFound ? "movies-list__not-found" : "movies-list__not-found_unactive"}>Ничего не найдено. Пожалуйста, попробуйте изменить запрос.</p>
            <button className={props.allShowed ? "movies-list__more_unactive" : "movies-list__more"} onClick={openMore} >Ещё</button>
        </Route>
        </Switch>
        </div>
    )
}