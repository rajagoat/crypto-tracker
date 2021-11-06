import React from 'react'
import useFetch from '../hooks/useFetch';

function Home() {
    const API = `https://api.coingecko.com/api/v3/coins/list`;
    const { data } = useFetch(API);

    if (data) {
        data.map(coin => {
            console.log(coin.symbol);
            return coin;
        })
    }

    return (
        <div>
            <ul className="coin-list">
                
            </ul>
        </div>
    )
}

export default Home
