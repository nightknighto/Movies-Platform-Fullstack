import { CreateMovieDTO } from "@movievault/dtos";
import { prisma } from "../prisma";


export namespace MoviesModel {

    interface getAllMoviesParams {
        query?: string;
        page?: number;
        size?: number;
    }

    export async function getAllMovies({ query, page, size }: getAllMoviesParams) {
        const movies = await prisma.movie.findMany({
            where: query ? {
                title: {
                    contains: query
                }
            } : {},
            skip: page && size ? (page - 1) * size : 0,
            ...(size && { take: size })
        });

        const totalCount = await prisma.movie.count({
            where: query ? {
                title: {
                    contains: query
                }
            } : {}
        });
        
        return {
            movies,
            totalCount,
        }
    }

    export function createMovie(movieData: CreateMovieDTO) {
        return prisma.movie.create({
            data: movieData
        });
    }

    export function updateMovie(movieId: number, movieData: CreateMovieDTO) {
        return prisma.movie.update({
            where: { id: movieId },
            data: movieData
        });
    }

    export function deleteMovie(movieId: number) {
        return prisma.movie.delete({
            where: { id: movieId }
        });
    }
}