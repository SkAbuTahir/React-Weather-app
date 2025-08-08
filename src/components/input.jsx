import React, { useState, useEffect } from 'react';
import './input.css'; // Import CSS for styling

function Input() {
    // State for input field
    const [input, setInput] = useState('');
    // State for submitted city
    const [submittedCity, setSubmittedCity] = useState('');
    // State for fetched weather data
    const [weather, setWeather] = useState(null);

    // Fetch weather data when submittedCity changes
    useEffect(() => {
        if (submittedCity === '') return;

        async function fetchWeather() {
            const res = await fetch(`https://wttr.in/${submittedCity}?format=j1`);
            const data = await res.json();
            setWeather(data);
        }
        fetchWeather();
    }, [submittedCity]);

    return (
        <div  className="weather-input-wrapper">
            {/* Input and button container */}
            <div className="input-container">
                <input
                    className="search-input"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    placeholder="Enter city..."
                    type="text"
                />
                <button
                    className="search-btn"
                    onClick={() => {
                        setSubmittedCity(input);
                        setInput('');
                    }}
                >
                    Search
                </button>
                {/* Show which city is being searched */}
                {submittedCity && (
                    <p className="searching-city">
                        Searching weather for: <span className="city-name">{submittedCity}</span>
                    </p>
                )}
            </div>
            {/* Weather result display */}
            {weather && (
                <div className="weather-result">
                    <h2 className="result-city">{submittedCity}</h2>
                    <p className="result-temp">
                        Temp: <span className="temp-value">{weather.current_condition[0].temp_C}°C</span>
                    </p>
                    <p className="result-desc">
                        {weather.current_condition[0].weatherDesc[0].value}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Input;





// import React, { useState, useEffect } from 'react';
// import './input.css';

// function Input() {
//     const [input, setInput] = useState('');
//     const [submittedCity, setSubmittedCity] = useState('');
//     const [weather, setWeather] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (submittedCity === '') return;

//         async function fetchWeather() {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const res = await fetch(`https://wttr.in/${submittedCity}?format=j1`);
//                 if (!res.ok) throw new Error('City not found');
//                 const data = await res.json();
//                 setWeather(data);
//             } catch (err) {
//                 setError('Unable to fetch weather data. Please try again.');
//                 setWeather(null);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchWeather();
//     }, [submittedCity]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (input.trim()) {
//             setSubmittedCity(input);
//             setInput('');
//         }
//     };

//     return (
//         <div className="weather-input-wrapper">
//             <h1 className="app-title">Weather Forecast</h1>
//             <form onSubmit={handleSubmit} className="input-container">
//                 <input
//                     className="search-input"
//                     onChange={(e) => setInput(e.target.value)}
//                     value={input}
//                     placeholder="Enter city name..."
//                     type="text"
//                 />
//                 <button type="submit" className="search-btn">
//                     {loading ? 'Searching...' : 'Search'}
//                 </button>
//             </form>

//             {error && <p className="error-message">{error}</p>}

//             {loading && <div className="loading">Loading weather data...</div>}

//             {weather && !loading && !error && (
//                 <div className="weather-result">
//                     <h2 className="result-city">{submittedCity}</h2>
//                     <div className="weather-details">
//                         <p className="result-temp">
//                             <span className="temp-label">Temperature:</span>
//                             <span className="temp-value">{weather.current_condition[0].temp_C}°C</span>
//                         </p>
//                         <p className="result-desc">
//                             {weather.current_condition[0].weatherDesc[0].value}
//                         </p>
//                         <div className="additional-info">
//                             <p>Humidity: {weather.current_condition[0].humidity}%</p>
//                             <p>Wind: {weather.current_condition[0].windspeedKmph} km/h</p>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Input;