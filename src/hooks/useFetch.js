import axios from 'axios'
import { useState, useEffect } from 'react'

function useFetch(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(url)
        .then(res => {
            // console.log(res.data)
            setData(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [url]);
    
    // console.log(data);
    return { data };
}

export default useFetch;
