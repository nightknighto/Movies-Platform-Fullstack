import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "./ui/dialog";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import EntryForm from "./EntryForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMovie } from "@/lib/api";

export default function AddNewEntry() {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createMovie,
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
        e.currentTarget.reset();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="w-full sm:w-auto mt-4 sm:mt-0">
                    <Plus />
                    Add New Entry
                </Button>
            </DialogTrigger>


            <DialogContent>
                <form className="overflow-y-auto max-h-[80vh]"
                    onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Movie or TV Show</DialogTitle>
                        <DialogDescription>
                            Fill in the details for your favorite movie or TV show
                        </DialogDescription>
                    </DialogHeader>
                    <EntryForm />
                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Add Entry</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}