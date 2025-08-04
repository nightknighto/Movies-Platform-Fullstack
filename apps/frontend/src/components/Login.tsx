import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function Login() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Login</Button>
            </DialogTrigger>

            <DialogContent>
                <form>
                    <DialogHeader>
                        <DialogTitle>Login</DialogTitle>
                        <DialogDescription>
                            Sign in to your account
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-y-4 gap-x-6 mt-4">
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
                            Login
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}