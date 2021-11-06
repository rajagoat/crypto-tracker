import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'

function Input() {
    const [data, setData] = useState(null);
    const [input, setInput] = useState('');

    API = `http://localhost8080:risk/${input}`

    return (
        <div>
            <Search />
        </div>
    )
}

export default Input
