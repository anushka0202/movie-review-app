// app/api/reviews/route.ts
import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

// DELETE method - delete review
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.review.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json(null, { status: 204 });
}

// PUT method - update review
export async function PUT(req: Request) {
  const { id, reviewer, rating, comment } = await req.json();

  // Update the review using Prisma
  const updatedReview = await prisma.review.update({
    where: { id: Number(id) }, // Ensure the id is a number
    data: {
      reviewer,
      rating: Number(rating),
      comment,
    },
  });

  return NextResponse.json(updatedReview, { status: 200 });
}

// POST method - add new review
export async function POST(req: Request) {
  const { movieId, reviewer, rating, comment } = await req.json();

  // Create a new review
  const newReview = await prisma.review.create({
    data: {
      movieId: Number(movieId),
      reviewer,
      rating: Number(rating),
      comment,
    },
  });

  // Fetch all reviews for the given movie
  const allReviews = await prisma.review.findMany({
    where: { movieId: Number(movieId) },
  });

  // Calculate the average rating
  const totalRating = allReviews.reduce(
    (sum: any, review: { rating: any; }) => sum + review.rating,
    0
  );
  const averageRating = totalRating / allReviews.length;

  // Update the averageRating of the movie
  const updatedMovie = await prisma.movie.update({
    where: { id: Number(movieId) },
    data: {
      averageRating: averageRating, // Set the calculated average rating
    },
  });

  // Return the new review and updated movie info
  return NextResponse.json({ newReview, updatedMovie }, { status: 201 });
}

