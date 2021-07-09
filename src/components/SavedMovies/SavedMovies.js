import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies (props) {

    return (
        <div className="movies">
            <SearchForm setSavedKeyword={props.setSavedKeyword} setSubmitClicked={props.setSubmitClicked} isSubmitClicked={props.isSubmitClicked} getMovies={props.getMovies} isClickSavedFilter={props.isClickSavedFilter} clickCheckboxSaved={props.clickCheckboxSaved} />
            <Preloader />
            <div className="movies__break-line" />
            <MoviesCardList allShowed={props.allShowed} handleCardDelete={props.handleCardDelete} savedMovies={props.savedMovies} movies={props.movies} />
        </div>
    )
}