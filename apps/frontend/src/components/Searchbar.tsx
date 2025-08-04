import { Search } from "lucide-react";
import { Input } from "./ui/input";

export default function Searchbar() {
    return (
        <div className="relative">
            <Input placeholder="Search movies and TV shows..." className="pl-10" />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4" />
        </div>
    )
}