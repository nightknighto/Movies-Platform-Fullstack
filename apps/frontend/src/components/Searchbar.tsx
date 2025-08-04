import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";

interface SearchbarProps {
    onSearch: (query: string) => void;
}

export default function Searchbar({ onSearch }: SearchbarProps) {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        onSearch(value);
    };

    return (
        <div className="relative">
            <Input
                placeholder="Search movies and TV shows..."
                className="pl-10"
                value={inputValue}
                onChange={handleInputChange}
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4" />
        </div>
    )
}