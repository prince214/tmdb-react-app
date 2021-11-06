import { useEffect, useState } from "react";
import API from '../API'

export const useMovieFetch = movieID => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(false)
    
    useEffect(() => {
        const fetchMovie = async () => {
            try{
                setLoading(true)
                setError(false)

                const movie = await API.fetchMovie(movieID);
                const credits = await API.fetchCredits(movieID)
                //get directors only
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                )

                setState({
                    ...movie,
                    actors: credits.cast,
                    directors: directors
                })
                setLoading(false)
            }catch{
                setError(true)
            }
        }
        fetchMovie();
    },[movieID])
    
    return { state, loading, error }
}