import type { CreateMovieDTO, GetMoviesDTO, UpdateMovieDTO } from "@movievault/dtos";

export async function getAllMovies(query?: string, page?: number) {
    const url = new URL('http://localhost:3000/movies');
    url.searchParams.append('size', "10");

    if (query) {
        url.searchParams.append('query', query);
    }
    if (page) {
        url.searchParams.append('page', page.toString());
    }

    const response = await fetch(url.toString());
    return await response.json() as GetMoviesDTO;
}

export async function createMovie(movieData: CreateMovieDTO) {
    const response = await fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
    });
    return await response.json();
}

export async function updateMovie(movieId: number, movieData: UpdateMovieDTO) {
    const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
    });
    return await response.json();
}

export async function deleteMovie(movieId: number) {
    const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
        method: 'DELETE',
    });
    return response.ok;
}