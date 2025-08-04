import { prisma } from "../src/prisma";

prisma.movie.createMany({
    data: [
        {
            title: "Inception",
            type: "movie",
            director: "Christopher Nolan",
            year: 2010,
            duration: 148,
            budget: "$160 million",
            location: "USA",
            genre: "Sci-Fi",
            rating: 8.8
        },
        {
            title: "The Dark Knight",
            type: "movie",
            director: "Christopher Nolan",
            year: 2008,
            duration: 152,
            budget: "$185 million",
            location: "USA",
            genre: "Action",
            rating: 9.0
        },
        {
            title: "Interstellar",
            type: "movie",
            director: "Christopher Nolan",
            year: 2014,
            duration: 169,
            budget: "$165 million",
            location: "USA",
            genre: "Sci-Fi",
            rating: 8.6
        },
        {
            title: "Dunkirk",
            type: "movie",
            director: "Christopher Nolan",
            year: 2017,
            duration: 106,
            budget: "$100 million",
            location: "UK",
            genre: "War",
            rating: 7.8
        },
        {
            title: "The Matrix",
            type: "movie",
            director: "The Wachowskis",
            year: 1999,
            duration: 136,
            budget: "$63 million",
            location: "USA",
            genre: "Sci-Fi",
            rating: 8.7
        },
        {
            title: "Pulp Fiction",
            type: "movie",
            director: "Quentin Tarantino",
            year: 1994,
            duration: 154,
            budget: "$8.5 million",
            location: "USA",
            genre: "Crime",
            rating: 8.9
        },
        {

            title: "The Godfather",
            type: "movie",
            director: "Francis Ford Coppola",
            year: 1972,
            duration: 175,
            budget: "$6 million",
            location: "USA",
            genre: "Crime",
            rating: 9.2
        },
        {

            title: "Fight Club",
            type: "movie",
            director: "David Fincher",
            year: 1999,
            duration: 139,
            budget: "$63 million",
            location: "USA",
            genre: "Drama",
            rating: 8.8
        },
        {

            title: "Forrest Gump",
            type: "movie",
            director: "Robert Zemeckis",
            year: 1994,
            duration: 142,
            budget: "$55 million",
            location: "USA",
            genre: "Drama",
            rating: 8.8
        },
        {

            title: "The Lord of the Rings: The Fellowship of the Ring",
            type: "movie",
            director: "Peter Jackson",
            year: 2001,
            duration: 178,
            budget: "$93 million",
            location: "New Zealand",
            genre: "Fantasy",
            rating: 8.8
        },
        {

            title: "Gladiator",
            type: "movie",
            director: "Ridley Scott",
            year: 2000,
            duration: 155,
            budget: "$103 million",
            location: "UK",
            genre: "Action",
            rating: 8.5
        },
        {

            title: "The Shawshank Redemption",
            type: "movie",
            director: "Frank Darabont",
            year: 1994,
            duration: 142,
            budget: "$25 million",
            location: "USA",
            genre: "Drama",
            rating: 9.3
        },
        {

            title: "Avatar",
            type: "movie",
            director: "James Cameron",
            year: 2009,
            duration: 162,
            budget: "$237 million",
            location: "USA",
            genre: "Sci-Fi",
            rating: 7.8
        },
        {

            title: "Titanic",
            type: "movie",
            director: "James Cameron",
            year: 1997,
            duration: 194,
            budget: "$200 million",
            location: "USA",
            genre: "Romance",
            rating: 7.8
        },
        {

            title: "Saving Private Ryan",
            type: "movie",
            director: "Steven Spielberg",
            year: 1998,
            duration: 169,
            budget: "$70 million",
            location: "USA",
            genre: "War",
            rating: 8.6
        },
        {

            title: "Jurassic Park",
            type: "movie",
            director: "Steven Spielberg",
            year: 1993,
            duration: 127,
            budget: "$63 million",
            location: "USA",
            genre: "Adventure",
            rating: 8.1
        },
        {

            title: "The Avengers",
            type: "movie",
            director: "Joss Whedon",
            year: 2012,
            duration: 143,
            budget: "$220 million",
            location: "USA",
            genre: "Action",
            rating: 8.0
        },
        {

            title: "Star Wars: A New Hope",
            type: "movie",
            director: "George Lucas",
            year: 1977,
            duration: 121,
            budget: "$11 million",
            location: "USA",
            genre: "Sci-Fi",
            rating: 8.6
        },
        {

            title: "Goodfellas",
            type: "movie",
            director: "Martin Scorsese",
            year: 1990,
            duration: 146,
            budget: "$25 million",
            location: "USA",
            genre: "Crime",
            rating: 8.7
        },
        {

            title: "The Silence of the Lambs",
            type: "movie",
            director: "Jonathan Demme",
            year: 1991,
            duration: 118,
            budget: "$19 million",
            location: "USA",
            genre: "Thriller",
            rating: 8.6
        },
        {

            title: "Schindler's List",
            type: "movie",
            director: "Steven Spielberg",
            year: 1993,
            duration: 195,
            budget: "$22 million",
            location: "Poland",
            genre: "Drama",
            rating: 8.9
        },
        {

            title: "Casablanca",
            type: "movie",
            director: "Michael Curtiz",
            year: 1942,
            duration: 102,
            budget: "$1 million",
            location: "USA",
            genre: "Romance",
            rating: 8.5
        },
        {

            title: "Raiders of the Lost Ark",
            type: "movie",
            director: "Steven Spielberg",
            year: 1981,
            duration: 115,
            budget: "$20 million",
            location: "USA",
            genre: "Adventure",
            rating: 8.4
        },
        {

            title: "Terminator 2: Judgment Day",
            type: "movie",
            director: "James Cameron",
            year: 1991,
            duration: 137,
            budget: "$102 million",
            location: "USA",
            genre: "Action",
            rating: 8.5
        }
    ]
}).then(() => {
    console.log("Dummy movie data seeded successfully.");
}).catch((error) => {
    console.error("Error seeding dummy movie data:", error);
});
