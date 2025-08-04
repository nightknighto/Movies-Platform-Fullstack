import { z } from "zod";

const BaseMovieSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    type: z.string(),
    director: z.string(),
    year: z.number().int(),
    duration: z.number().int().min(1, "Duration must be a positive integer"),
    budget: z.string(),
    location: z.string(),
    genre: z.string(),
    rating: z.number().min(0).max(10)
})

export const GetMoviesDTOSchema = z.object({
    movies: z.array(BaseMovieSchema),
    totalCount: z.number().int().min(0, "Total count must be a non-negative integer"),
    page: z.number().int().min(1, "Page must be a positive integer"),
    pageSize: z.number().int().min(1, "Page size must be a positive integer")
})

export const CreateMovieDTOSchema = BaseMovieSchema.omit({ id: true });

export const UpdateMovieDTOSchema = CreateMovieDTOSchema

export const DeleteMovieDTOSchema = z.void();

// Export types for use in the application

export type GetMoviesDTO = z.infer<typeof GetMoviesDTOSchema>;
export type CreateMovieDTO = z.infer<typeof CreateMovieDTOSchema>;
export type UpdateMovieDTO = z.infer<typeof UpdateMovieDTOSchema>;
export type DeleteMovieDTO = z.infer<typeof DeleteMovieDTOSchema>;