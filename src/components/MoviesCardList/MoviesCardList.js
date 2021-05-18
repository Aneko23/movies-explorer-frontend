import React from 'react';
import { Route } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList (props) {

    return (
        <div className="movies-list">
        <Route path="/movies">
        <ul className="movies-list__element">
            {props.movies.map(movie => 
                <MoviesCard 
                key={movie._id}
                movie={movie}
                nameRu={movie.nameRu} 
                time={movie.time} 
                image={movie.image}
                saveMovie={props.saveMovie}
                />
            )}
        </ul>
        </Route>
        <Route path="/saved-movies">
            <ul className="movies-list__element">
            {props.movies.map(movie => 
                <MoviesCard 
                key={movie._id}
                movie={movie}
                nameRu={movie.nameRu} 
                time={movie.time} 
                image={movie.image}
                />
            )}
            </ul>
        </Route>
        <button className="movies-list__more" >Ещё</button>
        </div>
    )
}