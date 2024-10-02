# Movie Review App

Live link: https://movie-review-app-prod.vercel.app/

This project is a movie review management application built using **Next.js**, **TypeScript**, **Tailwind CSS**, **Prisma**, and **Vercel Postgres**. It allows users to manage movies and their reviews by providing features for adding, updating, deleting, and searching through movies and reviews. The application also automatically calculates the average rating for each movie based on the associated reviews.

## Features

1. **Home Page**:
   - Displays all movies with a search bar to filter visible movies.
   - Each movie card shows the movie's name, release date, and average rating.

2. **Movie Review Page**:
   - Clicking on a movie card opens the movie's review page.
   - Displays all reviews for the selected movie.
   - Allows users to add, edit, or delete reviews for that movie.

3. **Movie Management**:
   - Users can add new movies or edit existing ones.
   - Deleting a movie also removes all associated reviews.
   - The average rating for each movie is automatically updated based on the reviews.

4. **Review Management**:
   - Users can add, edit, or delete reviews for any movie.
   - Reviews consist of a rating (max 10), reviewer name, and review comments.

## Tech Stack

- **Frontend**:
  - **Next.js**: Framework for server-side rendering and building the React-based UI.
  - **TypeScript**: Type-safe development and better tooling.
  - **Tailwind CSS**: Utility-first CSS framework for responsive design and styling.

- **Backend**:
  - **Prisma**: ORM for managing the PostgreSQL database schema and queries.
  - **Vercel Postgres**: The relational database used to store movies, reviews, and their associations.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later recommended)
- npm (usually comes with Node.js)

## Installation

To run this project locally, follow these steps:

1. Clone the repository.

```bash
git clone https://github.com/anushka0202/movie-review-app.git
cd movie-review-app
```

2. Install the required dependencies:

```bash
npm install 
```

3. Start the development server:

```bash
npm run dev 
```

4. Access the app at `http://localhost:3000`.

## Prisma Models

Movie Model

```bash
model Movie {
  id            Int          @id @default(autoincrement())
  name          String
  releaseDate   DateTime
  averageRating Float?
  reviews       Review[]     // One movie has many reviews
}
```

Review Model

```bash
model Review {
  id       Int               @id @default(autoincrement())
  reviewer String?           // Reviewer name can be optional
  rating   Float             // Rating out of 10
  comment  String            // Review comment
  movie    Movie             @relation(fields: [movieId], references: [id], onDelete: Cascade)
  movieId  Int               // Foreign key to reference Movie
}
```
