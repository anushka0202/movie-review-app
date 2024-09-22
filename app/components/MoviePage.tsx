import { useState, useEffect } from "react";
import { Movie, Review } from "../types";
import { getMovie, getReviews, deleteReview, getMovies } from "../../lib/api";
import Layout from "../components/Layout";
import ReviewList from "../components/ReviewList";
import AddReviewModal from "../components/AddReviewModal";
import AddMovieModal from "./AddMovieModal";

const MoviePage = ({ movieId }: { movieId: number }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (movieId) {
        await fetchMovie();
        await fetchReviews();
        await fetchMovies();
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchData();
  }, [movieId]);

  const fetchMovie = async () => {
    try {
      const fetchedMovie = await getMovie(movieId);
      console.log("Fetched movie:", fetchedMovie);
      setMovie(fetchedMovie);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const fetchedReviews = await getReviews(movieId);
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchMovies = async () => {
    const fetchedMovies = await getMovies();
    setMovies(fetchedMovies);
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReview(reviewId);
      fetchReviews();
      fetchMovie(); // Refetch movie to update average rating
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleAddReview = () => {
    setIsAddReviewModalOpen(true);
  };

   const handleAddMovie = () => {
     setIsAddMovieModalOpen(true);
   };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>; // Handle case where movie is not found
  }

  return (
    <Layout onAddMovie={handleAddMovie} onAddReview={handleAddReview}>
      {movie && (
        <div className="container mx-auto px-4">
          <div className=" flex justify-between">
            <h1 className="text-3xl font-bold mb-4">
              {movie.name || "Undefined"}
            </h1>
            <p className="text-xl font-semibold mb-4">
              {movie.averageRating?.toFixed(2) || "N/A"}
            </p>
          </div>
          <h2 className="text-2xl font-bold mb-2">Reviews</h2>
          <ReviewList reviews={reviews} onDeleteReview={handleDeleteReview} />
        </div>
      )}
      {isAddReviewModalOpen && (
        <AddReviewModal
          onClose={() => setIsAddReviewModalOpen(false)}
          onReviewAdded={() => {
            fetchReviews();
            fetchMovie(); // Refetch movie to update average rating
            fetchMovies();
          }}
          movies={movies}
        />
      )}
      {isAddMovieModalOpen && (
        <AddMovieModal
          onClose={() => setIsAddMovieModalOpen(false)}
          onMovieAdded={() => {
            fetchReviews();
            fetchMovie();
            fetchMovies();
          }}
        />
      )}
    </Layout>
  );
};

export default MoviePage;
