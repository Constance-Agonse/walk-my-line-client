import React from 'react';
// import './JourneyCard.css';

export default function JourneyCard() {
    return (
        <section className="globalContainerJourneyCard">
            <div className="innerBoxContainer" >
                <h3>Paris</h3>
                <ul>
                    <li>5 km</li>
                    <li>40 min</li>
                    <li>5 pins</li>
                    <li>Public</li>
                </ul>
            </div>
            <div className="innerBoxContainer">
                <p>arrondissement (précision)</p>
                <p>France</p>
                <div className="tagContainer">
                    <span className="item">#Component</span>
                    <span className="item">#Component</span>
                    <span className="item">#Component</span>
                    <span className="item">#Component </span>
                    <span className="item">#Component</span>
                    <span className="item">...</span>

                </div>
            </div>
            <div className="innerBoxContainer">
                map
            </div>
        </section>
    )
}
