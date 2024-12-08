import React, { useState } from 'react';
import Client from '../api/Client';
import './ParkAndFetch.css';

function FetchForm({ onFetchSuccess, storedCars, setStoredCars }) {
    const [plateNumber, setPlateNumber] = useState('');
    const [error, setError] = useState('');

    const validatePlateNumber = (plateNumber) => {
        const plateRegex = /^[A-Z]{2}-\d{4}$/;
        if (!plateRegex.test(plateNumber)) {
            setError('Plate number must follow the format: 2 letters + four digits (e.g., AB-1234)');
            return false;
        }
        setError('');
        return true;
    };

    const fetchCar = async () => {
        const carDetails = getCarDetails(plateNumber);
        if (!carDetails) {
            alert('Car details not found!');
            return;
        }
        const { position, parkingLot } = carDetails;

        try {
            await Client.post('/fetch', { plateNumber, position, parkingLot });
            alert('Car fetched successfully!');
            setStoredCars(storedCars.filter(car => car.plateNumber !== plateNumber));
            setPlateNumber('');
            onFetchSuccess();
        } catch (error) {
            console.error('There was an error fetching the car!', error);
            alert('There was an error fetching the car!');
        }
    };

    const handleFetch = (e) => {
        e.preventDefault();
        if (validatePlateNumber(plateNumber)) {
            fetchCar();
        }
    };

    const getCarDetails = (plateNumber) => {
        return storedCars.find(car => car.plateNumber === plateNumber) || null;
    };

    return (
        <form className="park-form" onSubmit={handleFetch}>
            <h2>Fetch a Car</h2>
            <div className="form-group">
                <label htmlFor="plateNumber">Plate Number:</label>
                <input
                    type="text"
                    id="plateNumber"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
            </div>
            <button type="submit">Fetch</button>
        </form>
    );
}

export default FetchForm;