import React, { useState, useEffect } from 'react';
import './suggestions.css'
function Suggestions({ data }) {
    // Initialize history state with an empty array
    const [history, setHistory] = useState([]);

    // Update history state when data prop changes
    useEffect(() => {
        if (data.cityname!="") {
            // Create a new history item based on the data received
            const newHistoryItem = {
                name: data.cityname,
                temperature: data.temperature
            };

            // Add the new history item to the existing history array
            setHistory(prevHistory => [...prevHistory, newHistoryItem]);
           
        }
    }, [data]); // Trigger the effect when the data prop changes
    console.log(history.length)
    //if(history)
    if(history.length==4){
        history.shift()
    }
    

    return (
        <div className='items'>
            {/* Render the history array */}
            {history.map((item, index) => (
                <div key={index} className='item'>
                   <h3>{item.name}</h3> 
                     <span>{item.temperature}°C</span>
                </div>
            ))}
        </div>
    );
}

export default Suggestions;
