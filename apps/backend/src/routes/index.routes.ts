import { Router } from "express";
import moviesRouter from "./movies.routes";

const mainRouter = Router();

mainRouter.use("/movies", moviesRouter);

export default mainRouter;