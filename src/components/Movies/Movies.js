import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

export default function Movies (props) {

    return (
        <div className="movies">
            <SearchForm setKeyword={props.setKeyword} setSubmitClicked={props.setSubmitClicked} isSubmitClicked={props.isSubmitClicked} getMovies={props.getMovies} isClick={props.isClick} clickCheckbox={props.clickCheckbox} />
            <Preloader />
            <div className="movies__break-line" />
            <MoviesCardList allShowed={props.allShowed} openMoreMovies={props.openMoreMovies} isSaved={props.isSaved} handleAddSavedMovie={props.handleAddSavedMovie} isNotFound={props.isNotFound} saveMovie={props.saveMovie} movies={props.movies} savedMovies={props.savedMovies} />
        </div>
    )
}