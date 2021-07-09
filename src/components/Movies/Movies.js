import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

export default function Movies (props) {

    return (
        <div className="movies">
            <SearchForm keyword={props.keyword} notFindKeyword={props.notFindKeyword} setKeyword={props.setKeyword} setSubmitClicked={props.setSubmitClicked} isSubmitClicked={props.isSubmitClicked} getMovies={props.getMovies} isClick={props.isClick} clickCheckbox={props.clickCheckbox} movies={props.movies} />
            {props.isFetching && <Preloader isFetching={props.isFetching} />}
            <div className="movies__break-line" />
            <MoviesCardList isLoadError={props.isLoadError} allShowed={props.allShowed} handleCardDelete={props.handleCardDelete} openMoreMovies={props.openMoreMovies} handleAddSavedMovie={props.handleAddSavedMovie} isNotFound={props.isNotFound} saveMovie={props.saveMovie} movies={props.movies} savedMovies={props.savedMovies} />
        </div>
    )
}