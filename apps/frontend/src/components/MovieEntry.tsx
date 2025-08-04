import { Film, Star, SquarePen, Trash2, Calendar, Clock, DollarSign, MapPin, User } from "lucide-react";
import { Button } from "./ui/button";
import { TableRow, TableCell } from "./ui/table";
import { Badge } from "./ui/badge";
import { Card, CardHeader, CardDescription, CardTitle, CardAction, CardContent, CardFooter } from "./ui/card";
import { useMediaQuery } from "@/hooks/use-media-query";
import DeleteButton from "./DeleteButton";
import EditEntry from "./EditEntry";

export default function MovieEntry() {

    const isMediumScreen = useMediaQuery("(max-width: 768px)");

    if (isMediumScreen) {
        return (
            <Card>
                <CardHeader>
                    <CardDescription className="flex gap-x-2 align-center">
                        <Badge><Film /> Movie</Badge>
                        <Badge variant="outline">Comedy</Badge>
                        <Badge variant="secondary"><Star fill="gold" strokeWidth={2} />8.8</Badge>
                    </CardDescription>
                    <CardTitle className="text-lg font-semibold">Inception</CardTitle>
                    <CardAction>
                        <EditEntry />
                        <DeleteButton />
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                        <li><span className="mr-2 text-gray-500"><User className="inline-block mr-2" /> Director:</span> <span className="font-medium">Christopher Nolan</span></li>
                        <li><span className="mr-2 text-gray-500"><Calendar className="inline-block mr-2" /> Year:</span> <span className="font-medium">2010</span></li>
                        <li><span className="mr-2 text-gray-500"><Clock className="inline-block mr-2" /> Duration:</span> <span className="font-medium">148 minutes</span></li>
                        <li><span className="mr-2 text-gray-500"><DollarSign className="inline-block mr-2" /> Budget:</span> <span className="font-medium">$160 million</span></li>
                        <li><span className="mr-2 text-gray-500"><MapPin className="inline-block mr-2" /> Location:</span> <span className="font-medium">Various</span></li>
                    </ul>
                </CardContent>
            </Card>
        )
    }

    return (
        <TableRow>
            <TableCell><Badge><Film /> Movie</Badge></TableCell>
            <TableCell>Inception</TableCell>
            <TableCell>Christopher Nolan</TableCell>
            <TableCell>2010</TableCell>
            <TableCell>148 min</TableCell>
            <TableCell>$160 million</TableCell>
            <TableCell>USA</TableCell>
            <TableCell><Badge variant="outline">Comedy</Badge></TableCell>
            <TableCell><Badge variant="secondary"><Star fill="gold" strokeWidth={2} />8.8</Badge></TableCell>
            <TableCell>
                <EditEntry />
                <DeleteButton />
            </TableCell>
        </TableRow>
    )
}