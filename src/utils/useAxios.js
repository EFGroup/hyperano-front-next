import axios from 'axios';
import { useState, useCallback } from "react";

export const useAxios = () => {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const source = axios.CancelToken.source();

    const abort = () => source.cancel();

    const fetchData = async (options) => {
        try {
            const res = await axios({...options, cancelToken: source.token, withCredentials: true});
            setResponse(res.data);
            setError(null)
            return {response: res.data, error: null, isLoading: false}
        } catch (err) {
            const data = err.response ? err.response.data : "Server error";
            setError(data);
            setResponse(null);
            return {response: null, error: data, isLoading: false}
        } finally {
            setIsLoading(false);
        }
    };
    
    const doFetch = useCallback((options = {}) => {
        setIsLoading(true);
        return fetchData(options)
    }, []);

  return [{ response, error, isLoading }, doFetch, abort];
}

export default useAxios;