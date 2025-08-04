import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";

interface EntryFormProps {
    defaultValues?: {
        title?: string;
        type?: string;
        director?: string;
        budget?: string;
        location?: string;
        duration?: number;
        year?: number;
        genre?: string;
        rating?: number;
    };
}

export default function EntryForm({ defaultValues }: EntryFormProps) {
    return (
        <>
            <div className="grid gap-y-4 gap-x-6 mt-4 sm:grid-cols-2">
                <div className="grid gap-3">
                    <Label htmlFor="title-1">Title *</Label>
                    <Input id="title-1" name="title" placeholder="Enter title" defaultValue={defaultValues?.title} required />
                </div>
                <div className="grid gap-3">
                    <Label>Type *</Label>
                    <Select defaultValue={defaultValues?.type || "movie"} name="type" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="movie">Movie</SelectItem>
                            <SelectItem value="tvshow">TV Show</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="director-1">Director *</Label>
                    <Input id="director-1" name="director" placeholder="Enter director name" defaultValue={defaultValues?.director} required />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="budget-1">Budget *</Label>
                    <Input id="budget-1" name="budget" placeholder="Number in million $" defaultValue={defaultValues?.budget} required />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="location-1">Location *</Label>
                    <Input id="location-1" name="location" placeholder="Filming location" defaultValue={defaultValues?.location} required />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="duration-1">Duration *</Label>
                    <Input type="number" id="duration-1" name="duration" placeholder="In minutes" defaultValue={defaultValues?.duration} required />
                </div>
            </div>
            <div className="grid gap-4 mt-6 sm:grid-cols-3">
                <div className="grid gap-3">
                    <Label htmlFor="year-1">Year *</Label>
                    <Input type="number" id="year-1" name="year" placeholder="Release year" defaultValue={defaultValues?.year} required />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="genre-1">Genre *</Label>
                    <Input id="genre-1" name="genre" placeholder="e.g., Action, Drama" defaultValue={defaultValues?.genre} required />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="rating-1">Rating *</Label>
                    <Input type="number" id="rating-1" name="rating" placeholder="Between 1 and 10" defaultValue={defaultValues?.rating} required />
                </div>
            </div>
        </>
    )
}