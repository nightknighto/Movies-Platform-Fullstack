import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Dialog } from "./ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMovie } from "@/lib/api";
import type { Movie } from "@/types";

type DeleteButtonProps = Pick<Movie, 'id'>;

export default function DeleteButton({ id }: DeleteButtonProps) {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteMovie,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['movies']
            });
        }
    })

    function handleClick() {
        mutation.mutate(id);
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-4"><Trash2 stroke="red" /></Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete "Movie Title 1" from your collection.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="button" variant="destructive" onClick={handleClick}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}