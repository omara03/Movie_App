import React, {useEffect,useState} from 'react'
import Search from "./components/Search.jsx";
import Loader from "./components/Loader.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce} from "react-use";
import {updateSearchCount} from "./appwrite.js";

const API_BASE_URL = 'https://api.themoviedb.org/3/';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const [movieList, setMovieList] = useState([])

    const [isLoading, setIsLoading] = useState(false);

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    // Debounce search term to prevent too many API requests by waiting for user to stop typing for 500ms
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchMovies = async (query='') => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const endpoint =query
                ?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error('Failed to not fetch movies');
            }

            const data = await response.json();

            if (data.Response== 'False'){
                setErrorMessage(data.Error || 'Failed to fetch movies');
                setMovieList([]);
                return;
            }

            setMovieList(data.results || []);

            if (query && data.results.length > 0) {
                await updateSearchCount(query,data.results[0]);
            }

        }catch (error) {
            console.error(`Error in fetchMovies: ${error}`);
            setErrorMessage('Something went wrong. Please try again later.');
        }
        finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    },[debouncedSearchTerm])
    return (
    <main>
        <div className="pattern"/>

        <div className="wrapper">
            <header>
                <img src="./hero-img.png" />
                <h1>React App</h1>
                <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>

            <section className="all-movies">
                <h2>All Movies</h2>
                {isLoading ? (
                        <Loader />
                    ) : errorMessage ? (
                    <p className="text-red-500">{errorMessage}</p>
                ) : (
                    <ul>
                        {movieList.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </ul>
                )}
            </section>




        </div>
    </main>
    )
}
export default App
