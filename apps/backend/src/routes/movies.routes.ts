import { Router } from 'express';
import { MoviesController } from '../controllers/movies.controller';
import { Validators } from '../middlewares/validators.middleware';
import { CreateMovieDTOSchema, UpdateMovieDTOSchema } from '@movievault/dtos';

const moviesRouter = Router();

moviesRouter.get('/', Validators.validateOptionalQuery(['query', 'page', 'size'], ['page', 'size']), MoviesController.getMovies);

moviesRouter.post('/', Validators.validateBody(CreateMovieDTOSchema), MoviesController.createMovie);

moviesRouter.use('/:id', Validators.validateNumericParams(['id']));

moviesRouter.put('/:id', Validators.validateBody(UpdateMovieDTOSchema), MoviesController.updateMovie);

moviesRouter.delete('/:id', MoviesController.deleteMovie);

export default moviesRouter;
