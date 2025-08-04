import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import MovieEntry from "./MovieEntry";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Movie } from "@/types";

type MovieListProps = {
    movies: Movie[]
}


export default function MovieList({ movies }: MovieListProps) {
    // Use media query to determine screen size

    const isMediumScreen = useMediaQuery("(max-width: 768px)");

    if (isMediumScreen) {
        return (
            <div className="flex flex-col gap-4">
                {movies.map(movie => (
                    <MovieEntry key={movie.id} {...movie} />
                ))}
            </div>
        )
    }

    // For larger screens, use the table layout
    return (
        <>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Director</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Genre</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {movies.map(movie => (
                            <MovieEntry key={movie.id} {...movie} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}