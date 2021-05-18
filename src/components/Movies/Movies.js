import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

export default function Movies (props) {

    return (
        <div className="movies">
            <SearchForm isClick={props.isClick} clickCheckbox={props.clickCheckbox} />
            <Preloader />
            <div className="movies__break-line" />
            <MoviesCardList saveMovie={props.saveMovie} movies={props.movies} />
        </div>
    )
}