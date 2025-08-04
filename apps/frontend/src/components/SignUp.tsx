import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function SignUp() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Sign Up</Button>
            </DialogTrigger>

            <DialogContent>
                <form>
                    <DialogHeader>
                        <DialogTitle>Sign Up</DialogTitle>
                        <DialogDescription>
                            Create a new account
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-y-4 gap-x-6 mt-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" placeholder="Name" required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email-1">Email</Label>
                            <Input id="email-1" name="email" placeholder="Email" required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password-1">Password</Label>
                            <Input id="password-1" name="password" placeholder="Password" required />
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" variant="default">
                            Sign Up
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}