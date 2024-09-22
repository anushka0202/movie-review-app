import React from "react";
import { Movie } from "../types";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (movieId: number) => void;
  onDeleteMovie: (movieId: number) => Promise<void>;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onMovieClick, onDeleteMovie }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={onMovieClick}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </div>
  );
};

export default MovieList;
