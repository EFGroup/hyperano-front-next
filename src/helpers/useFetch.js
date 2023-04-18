import { useEffect, useState } from "react"
import axios from "axios"

export default function useFetch({url, method = 'get', data}){

    const [result,setResult] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios({
                        url,
                        data,
                        method,
                    });
                    setResult(response.data)
                }catch(err){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [url])

    return { result, error, loading }

}