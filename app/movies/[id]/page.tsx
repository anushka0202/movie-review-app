"use client";
import MoviePage from "@/app/components/MoviePage";

export default function MovieDetail({ params }: { params: { id: string } }) {
  const { id } = params; // Get the movie ID from the URL

  return (
    <div>
      <MoviePage movieId={Number(id)} />
    </div>
  );
}
