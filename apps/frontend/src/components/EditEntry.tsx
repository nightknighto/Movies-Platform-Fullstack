import { Plus, SquarePen } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "./ui/dialog";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import EntryForm from "./EntryForm";

export default function EditEntry() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-4"><SquarePen /></Button>
            </DialogTrigger>

            <DialogContent>
                <form className="overflow-y-auto max-h-[80vh]">
                    <DialogHeader>
                        <DialogTitle>Edit Entry</DialogTitle>
                        <DialogDescription>
                            Update the details for this movie or TV show
                        </DialogDescription>
                    </DialogHeader>
                    <EntryForm />
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