import React, { useState, useEffect } from 'react'
import useFetch from '../hooks/useFetch';
import Search from '../components/Search';

function Home() {
    const API = `https://api.coingecko.com/api/v3/coins/list`;
    const { data } = useFetch(API);
    const [coin, setCoin] = useState('');
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="home">
            <Search setCoin={setCoin} />
            {!data && <p>Loading...</p>}
            <ul className="coin-list">
                {data && data.map(coinValue => {
                    return (
                        <li className="coin" key={`${coinValue.id}`}>
                            <p className="symbol">{coinValue.symbol}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Home
