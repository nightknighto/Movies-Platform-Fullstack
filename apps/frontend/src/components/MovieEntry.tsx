import { Film, Star, Calendar, Clock, DollarSign, MapPin, User, Tv } from "lucide-react";
import { TableRow, TableCell } from "./ui/table";
import { Badge } from "./ui/badge";
import { Card, CardHeader, CardDescription, CardTitle, CardAction, CardContent } from "./ui/card";
import { useMediaQuery } from "@/hooks/use-media-query";
import DeleteButton from "./DeleteButton";
import EditEntry from "./EditEntry";
import type { Movie } from "@/types";

type MovieEntryProps = Movie

export default function MovieEntry(props: MovieEntryProps) {
    const { id, type, title, director, year, duration, budget, location, genre, rating } = props;

    const isMediumScreen = useMediaQuery("(max-width: 768px)");

    if (isMediumScreen) {
        return (
            <Card>
                <CardHeader>
                    <CardDescription className="flex gap-x-2 align-center">
                        <Badge>
                            {
                                type === "movie" ? <Film /> : <Tv />
                            }
                            {type === "movie" ? "Movie" : "TV Show"}
                        </Badge>
                        <Badge variant="outline">{genre}</Badge>
                        <Badge variant="secondary"><Star fill="gold" strokeWidth={2} />{rating}</Badge>
                    </CardDescription>
                    <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                    <CardAction>
                        <EditEntry {...props} />
                        <DeleteButton id={id} />
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                        <li><span className="mr-2 text-gray-500"><User className="inline-block mr-2" /> Director:</span> <span className="font-medium">{director}</span></li>
                        <li><span className="mr-2 text-gray-500"><Calendar className="inline-block mr-2" /> Year:</span> <span className="font-medium">{year}</span></li>
                        <li><span className="mr-2 text-gray-500"><Clock className="inline-block mr-2" /> Duration:</span> <span className="font-medium">{duration} minutes</span></li>
                        <li><span className="mr-2 text-gray-500"><DollarSign className="inline-block mr-2" /> Budget:</span> <span className="font-medium">{budget}</span></li>
                        <li><span className="mr-2 text-gray-500"><MapPin className="inline-block mr-2" /> Location:</span> <span className="font-medium">{location}</span></li>
                    </ul>
                </CardContent>
            </Card>
        )
    }

    return (
        <TableRow>
            <TableCell>
                <Badge>
                    {
                        type === "movie" ? <Film /> : <Tv />
                    }
                    {type === "movie" ? "Movie" : "TV Show"}
                </Badge>
            </TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{director}</TableCell>
            <TableCell>{year}</TableCell>
            <TableCell>{duration} min</TableCell>
            <TableCell>{budget}</TableCell>
            <TableCell>{location}</TableCell>
            <TableCell><Badge variant="outline">{genre}</Badge></TableCell>
            <TableCell><Badge variant="secondary"><Star fill="gold" strokeWidth={2} />{rating}</Badge></TableCell>
            <TableCell>
                <EditEntry {...props} />
                <DeleteButton id={id} />
            </TableCell>
        </TableRow>
    )
}