import React, { useState } from 'react';
import ParkForm from './ParkForm';
import FetchForm from './FetchForm';
import './ParkAndFetch.css';

function ParkAndFetch({ parkingBoys, onParkSuccess }) {
    const [storedCars, setStoredCars] = useState([]);

    return (
        <div className="forms-container">
            <div className="collapsible-panel">
                <ParkForm
                    parkingBoys={parkingBoys}
                    onParkSuccess={onParkSuccess}
                    storedCars={storedCars}
                    setStoredCars={setStoredCars}
                />
            </div>
            <div className="collapsible-panel">
                <FetchForm
                    onFetchSuccess={onParkSuccess}
                    storedCars={storedCars}
                    setStoredCars={setStoredCars}
                />
            </div>
        </div>
    );
}

export default ParkAndFetch;