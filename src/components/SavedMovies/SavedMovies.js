import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies (props) {

    return (
        <div className="movies">
            <SearchForm isClick={props.isClick} clickCheckbox={props.clickCheckbox} />
            <Preloader />
            <div className="movies__break-line" />
            <MoviesCardList savedMovies={props.savedMovies} movies={props.movies} />
        </div>
    )
}