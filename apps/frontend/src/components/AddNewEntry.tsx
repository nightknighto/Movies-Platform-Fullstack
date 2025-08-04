import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "./ui/dialog";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import EntryForm from "./EntryForm";

export default function AddNewEntry() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="w-full sm:w-auto mt-4 sm:mt-0">
                    <Plus />
                    Add New Entry
                </Button>
            </DialogTrigger>


            <DialogContent>
                <form className="overflow-y-auto max-h-[80vh]">
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