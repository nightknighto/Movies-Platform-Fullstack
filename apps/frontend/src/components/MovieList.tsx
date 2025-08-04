import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "./ui/table";
import MovieEntry from "./MovieEntry";
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Clock, DollarSign, Film, MapPin, SquarePen, Star, Trash2, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function MovieList() {

    const isMediumScreen = useMediaQuery("(max-width: 768px)");

    if (isMediumScreen) {
        return (
            <div className="flex flex-col gap-4">
                <MovieEntry />
                <MovieEntry />
                <MovieEntry />
                <MovieEntry />
                <MovieEntry />
                <p className="text-center text-gray-500">Loading more entries...</p>
            </div>
        )
    }

    // For larger screens, use the table layout
    return (
        <>
            <div className="border rounded-md">
                <Table>
                    <TableCaption className="pb-4">Loading more entries...</TableCaption>
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
                        <MovieEntry />
                        <MovieEntry />
                        <MovieEntry />
                        <MovieEntry />
                        <MovieEntry />
                    </TableBody>
                </Table>
            </div>
        </>
    )
}