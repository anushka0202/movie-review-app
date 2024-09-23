import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { updateAverageRating } from "../route";

// GET method - fetch all reviews
export async function GET(
  req: Request,
  { params }: { params: { movieId: string } }
) {
  const { movieId } = params;

  const reviews = await prisma.review.findMany({
    where: { movieId: Number(movieId) },
    orderBy: { rating: "desc" },
  });

  // Update the average rating after getting all the reviews
  await updateAverageRating(movieId);

  return NextResponse.json(reviews);
}
