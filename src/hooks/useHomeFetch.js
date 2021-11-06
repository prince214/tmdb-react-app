import React, {useEffect, useState, useRef}  from "react";
//API
import API from '../API'
import { isPersistedState } from "../helpers";

const initialState = {
    page: 0,
    results: [],
    total_page: 0,
    total_results: 0
}

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isSetLoadMore, setisSetLoadMore] = useState(false);

    const fetchMovies = async (page, searchTerm = '') => {
        try {
          setError(false);
          setLoading(true);
    
          const movies = await API.fetchMovies(searchTerm, page);
    
          setState(prev => ({
            ...movies,
            results:
              page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
          }));
        } catch (error) {
          setError(true);
        }
        setLoading(false);
      };

    //initial and search
    useEffect(() =>{
        if(!searchTerm){
          const sessionState = isPersistedState('homeState')
          if(sessionState){
            setState(sessionState);
            return;
          }
        }
        setState(initialState)
        fetchMovies(1,searchTerm)
    },[searchTerm])

    useEffect(() => {
      if(!isSetLoadMore) return false;

      fetchMovies(state.page + 1,searchTerm)
      setisSetLoadMore(false)
    },[isSetLoadMore,searchTerm,state.page])

    //write to sessionStorage
    useEffect(() => {
      if(!searchTerm) sessionStorage.setItem('homeState',JSON.stringify(state))
    },[searchTerm, state])

    return { state, loading, error, searchTerm, setSearchTerm, setisSetLoadMore}
}