// import { useState, useEffect } from "react";
// import Layout from "../components/Layout";
// import { Review, Movie } from "../types";
// import { getMovies } from "../../lib/api";

// export default function ReviewSearch() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [movies, setMovies] = useState<Movie[]>([]);

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const fetchMovies = async () => {
//     const fetchedMovies = await getMovies();
//     setMovies(fetchedMovies);
//   };

//   const handleSearch = () => {
//     const allReviews = movies.flatMap((movie) => movie.reviews);
//     const filteredReviews = allReviews.filter(
//       (review) =>
//         review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         review.reviewer.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setReviews(filteredReviews);
//   };

//   return (
//     <Layout>
//       <div className="container mx-auto px-4">
//         <h1 className="text-3xl font-bold mb-4">Search Reviews</h1>
//         <div className="flex mb-4">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="flex-grow p-2 border border-gray-300 rounded-l-md"
//             placeholder="Search reviews..."
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-purple-700 text-white px-4 py-2 rounded-r-md"
//           >
//             Search
//           </button>
//         </div>
//         <div className="space-y-4">
//           {reviews.map((review) => (
//             <div key={review.id} className="bg-white p-4 rounded-lg shadow">
//               <p className="font-bold">{review.reviewer}</p>
//               <p className="text-yellow-500">Rating: {review.rating}/10</p>
//               <p>{review.comment}</p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Movie: {movies.find((m) => m.id === review.movieId)?.name}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// }
