"use client";
import { useState, useEffect } from "react";
import { Movie } from "./types";
import { deleteMovie, getMovies } from "../lib/api";
import Layout from "./components/Layout";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { useRouter } from "next/navigation";
import AddMovieModal from "./components/AddMovieModal";
import AddReviewModal from "./components/AddReviewModal";

export default function Home() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const fetchedMovies = await getMovies();
    setMovies(fetchedMovies);
    setFilteredMovies(fetchedMovies);
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleMovieClick = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };

  const handleDeleteMovie = async (movieId: number) => {
    await deleteMovie(movieId);
    fetchMovies();
  };

  return (
    <Layout
      onAddMovie={() => setIsAddMovieModalOpen(true)}
      onAddReview={() => setIsAddReviewModalOpen(true)}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-4 text-gray-600">
          The best movie reviews site!
        </h1>
        <SearchBar onSearch={handleSearch} />
        <MovieList
          movies={filteredMovies}
          onMovieClick={handleMovieClick}
          onDeleteMovie={handleDeleteMovie}
        />
      </div>
      {isAddMovieModalOpen && (
        <AddMovieModal
          onClose={() => setIsAddMovieModalOpen(false)}
          onMovieAdded={fetchMovies}
        />
      )}
      {isAddReviewModalOpen && (
        <AddReviewModal
          onClose={() => setIsAddReviewModalOpen(false)}
          onReviewAdded={fetchMovies}
          movies={movies}
        />
      )}
    </Layout>
  );
}
