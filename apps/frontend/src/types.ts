import type { GetMoviesDTO } from "@movievault/dtos";

export type Movie = GetMoviesDTO['movies'][number];