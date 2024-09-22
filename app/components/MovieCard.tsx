import React from "react";
import { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
  onMovieClick: (movieId: number) => void;
  onDeleteMovie: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onMovieClick,
  onDeleteMovie,
}) => {
  return (
    <div
      className="bg-purple-100 p-4 rounded-lg shadow cursor-pointer"
      onClick={() => onMovieClick(movie.id)}
    >
      <h2 className="text-xl font-semibold mb-2">{movie.name}</h2>
      <p className="text-sm text-gray-600 mb-2">
        Released: {new Date(movie.releaseDate).toLocaleDateString()}
      </p>
      <p className="text-lg font-bold mb-2">
        Rating: {movie.averageRating ? movie.averageRating.toFixed(2) : "N/A"}
        /10
      </p>
      <div className="flex justify-end">
        <button
          className="text-red-600 hover:text-red-800"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteMovie(movie.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
