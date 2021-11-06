import React from 'react'

function Search({ setCoin }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        setCoin(e.target[0].value);
        console.log(e.target[0].value);
    }

    return (
        <div className="search">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={`Search for cryptocurrency`}
                />
                <button>Search</button>
            </form>
        </div>
    )
}

export default Search
