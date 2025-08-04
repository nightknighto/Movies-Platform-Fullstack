import { SquarePen } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "./ui/dialog";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import EntryForm from "./EntryForm";
import type { Movie } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMovie } from "@/lib/api";

type EditEntryProps = Movie;

export default function EditEntry(props: EditEntryProps) {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateMovie.bind(null, props.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['movies']
            });
        }
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newEntry = {
            title: formData.get('title') as string,
            type: formData.get('type') as string,
            director: formData.get('director') as string,
            budget: formData.get('budget') as string,
            location: formData.get('location') as string,
            duration: parseInt(formData.get('duration') as string),
            year: parseInt(formData.get('year') as string),
            genre: formData.get('genre') as string,
            rating: parseFloat(formData.get('rating') as string),
        };
        mutation.mutate(newEntry);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-4"><SquarePen /></Button>
            </DialogTrigger>

            <DialogContent>
                <form className="overflow-y-auto max-h-[80vh]" onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Entry</DialogTitle>
                        <DialogDescription>
                            Update the details for this movie or TV show
                        </DialogDescription>
                    </DialogHeader>
                    <EntryForm defaultValues={props} />
                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Update Entry</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}