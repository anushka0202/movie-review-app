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
      className="bg-purple-100 p-4 shadow cursor-pointer"
      onClick={() => onMovieClick(movie.id)}
    >
      <h2 className="text-xl font-semibold mb-2 text-gray-600">{movie.name}</h2>
      <p className="text-base text-gray-600 mb-2 italic">
        Released: {new Date(movie.releaseDate).toLocaleDateString()}
      </p>
      <p className="text-lg font-bold mb-2">
        Rating:{" "}
        {movie.averageRating ? movie.averageRating.toFixed(2) + "/10" : "N/A"}
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
