import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

// GET method - fetch all reviews
export async function GET(req: Request, { params }: { params: { movieId: string } }) {
  const { movieId } = params;

  const reviews = await prisma.review.findMany({
    where: { movieId: Number(movieId) },
  });
  return NextResponse.json(reviews);
}