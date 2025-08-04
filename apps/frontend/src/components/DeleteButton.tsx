import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Dialog } from "./ui/dialog";

export default function DeleteButton() {
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
                    <Button type="button" variant="destructive">
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}