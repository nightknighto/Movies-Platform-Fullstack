import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import mainRouter from "./routes/index.routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(mainRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
