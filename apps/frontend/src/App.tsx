import { Button } from "@/components/ui/button"
import { Film, Plus, Search, SquarePen, Star, Trash2 } from "lucide-react"
import Navbar from "./components/Navbar"
import { Input } from "./components/ui/input"
import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "./components/ui/table"
import { Badge } from "./components/ui/badge"
import MovieList from "./components/MovieList"
import Searchbar from "./components/Searchbar"
import AddNewEntry from "./components/AddNewEntry"

function App() {
  return (
    <div>
      <Navbar />
      <div className="max-w-[1200px] m-auto p-4">
        <main className="max-w-[1200px] p-4 border rounded-lg mt-4 flex flex-col gap-7">
          <div className="sm:flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">My Favorite Movies & TV Shows</h1>
              <p className="text-base font-medium text-gray-500">Manage your personal collection of favorite entertainment</p>
            </div>
            <AddNewEntry />
          </div>
          <Searchbar />
          <MovieList />
        </main>
      </div>
    </div>
  )
}

export default App