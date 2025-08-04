import { Request, Response } from "express";
import { MoviesModel } from "../models/movies.model";
import { CreateMovieDTO, DeleteMovieDTO, GetMoviesDTO, UpdateMovieDTO } from "@movievault/dtos";

export namespace MoviesController {

    export async function getMovies(req: Request<unknown, unknown, unknown, { query?: string; page?: string; size?: string }>, res: Response<GetMoviesDTO>) {
        const {
            movies,
            totalCount,
        } = await MoviesModel.getAllMovies({
            query: req.query.query,
            page: req?.query?.page ? parseInt(req.query.page) : undefined,
            size: req?.query?.size ? parseInt(req.query.size) : undefined
        });

        res.json({
            movies,
            totalCount,
            page: req.query.page ? parseInt(req.query.page) : 1,
            pageSize: req.query.size ? parseInt(req.query.size) : -1
        });
    }

    export async function createMovie(req: Request, res: Response<CreateMovieDTO>) {
        const movieData = req.body;
        const newMovie = await MoviesModel.createMovie(movieData);
        res.status(201).json(newMovie);
    }

    export async function updateMovie(req: Request<{ id: string }>, res: Response<UpdateMovieDTO>) {
        const movieId = parseInt(req.params.id);
        const movieData = req.body;

        try {
            const updatedMovie = await MoviesModel.updateMovie(movieId, movieData);
            res.json(updatedMovie);
        } catch (error: any) {
            if (error.code === 'P2025') {
                // Prisma error code for "Record not found"
                res.status(404).end();
                return;
            }
            // Re-throw other errors
            throw error;
        }
    }

    export async function deleteMovie(req: Request<{ id: string }>, res: Response<DeleteMovieDTO>) {
        const movieId = parseInt(req.params.id);

        try {
            await MoviesModel.deleteMovie(movieId);
            res.sendStatus(204);
        } catch (error: any) {
            if (error.code === 'P2025') {
                // Prisma error code for "Record not found"
                res.status(404).end();
                return;
            }
            // Re-throw other errors
            throw error;
        }
    }
}