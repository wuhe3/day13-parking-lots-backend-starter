import React, { useEffect, useState } from 'react';
import Client from './api/Client';
import ParkingLot from './components/ParkingLot';
import ParkAndFetch from './components/ParkAndFetch';

function App() {
    const [parkingLots, setParkingLots] = useState([]);
    const [parkingBoys, setParkingBoys] = useState([
        { id: 1, name: 'Standard Parking Boy' },
        { id: 2, name: 'Smart Parking Boy' },
        { id: 3, name: 'Super Smart Parking Boy' }
    ]);

    const fetchParkingLots = () => {
        Client.get('/parking-lots')
            .then(response => {
                console.log('API Response:', response.data);
                setParkingLots(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the parking lots!', error);
            });
    };

    useEffect(() => {
        fetchParkingLots();
    }, []);

    return (
        <div className="App">
            <ParkAndFetch parkingBoys={parkingBoys} onParkSuccess={fetchParkingLots} />
            <ParkingLot parkingLots={parkingLots} />
        </div>
    );
}

export default App;