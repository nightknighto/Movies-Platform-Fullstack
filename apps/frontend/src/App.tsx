import Navbar from "./components/Navbar"
import MovieList from "./components/MovieList"
import Searchbar from "./components/Searchbar"
import AddNewEntry from "./components/AddNewEntry"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getAllMovies } from "./lib/api"
import { useState, useEffect, useCallback } from "react"
import type { GetMoviesDTO } from "@movievault/dtos"

function App() {

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("")

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500) // 500ms delay

    return () => clearTimeout(timer)
  }, [searchQuery])

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['movies', debouncedSearchQuery],
    queryFn: ({ pageParam }: { pageParam: number }) => getAllMovies(debouncedSearchQuery || undefined, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: GetMoviesDTO, allPages: GetMoviesDTO[]) => {
      // Calculate if there are more pages
      const totalPages = Math.ceil(lastPage.totalCount / 10); // 10 is the page size
      const currentPage = allPages.length;
      console.log('Next page calculation:', { totalPages, currentPage, totalCount: lastPage.totalCount });
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  })

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    // Get scroll position and document height
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if user is near the bottom (within 100px)
    const isNearBottom = scrollTop + windowHeight >= documentHeight - 100;

    if (isNearBottom && hasNextPage && !isFetchingNextPage) {
      console.log('Fetching next page...'); // Debug log
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    console.log('Infinite query state:', { hasNextPage, isFetchingNextPage, totalPages: data?.pages.length });
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, hasNextPage, isFetchingNextPage, data?.pages.length]);

  // Flatten all pages into a single movies array
  const allMovies = data?.pages.flatMap((page: GetMoviesDTO) => page.movies) ?? [];

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
          <Searchbar onSearch={setSearchQuery} />
          {
            isLoading ? (
              <p className="text-center text-gray-500">Loading movies...</p>
            ) : error ? (
              <p className="text-red-500">Error loading movies: {error.message}</p>
            ) : allMovies.length === 0 ? (
              <p className="text-center text-gray-500">No movies found. Add your first entry!</p>
            ) : (
              <>
                <MovieList movies={allMovies} />
                {isFetchingNextPage && (
                  <p className="text-center text-gray-500 mt-4">Loading more movies...</p>
                )}
              </>
            )
          }
        </main>
      </div>
    </div>
  )
}

export default App