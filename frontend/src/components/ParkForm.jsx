import React, { useState } from 'react';
import Client from '../api/Client';
import './ParkAndFetch.css';

function ParkForm({ parkingBoys, onParkSuccess, storedCars, setStoredCars }) {
    const [plateNumber, setPlateNumber] = useState('');
    const [selectedBoy, setSelectedBoy] = useState(parkingBoys[0].id);
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

    const parkCar = async () => {
        try {
            const response = await Client.post('/park', { plateNumber, strategyNo: selectedBoy });
            alert('Car parked successfully!');
            setStoredCars([...storedCars, { plateNumber, position: response.data.position, parkingLot: response.data.parkingLot }]);
            setPlateNumber('');
            onParkSuccess();
        } catch (error) {
            console.error('There was an error parking the car!', error);
            alert('There was an error parking the car!');
        }
    };

    const handlePark = (e) => {
        e.preventDefault();
        if (validatePlateNumber(plateNumber)) {
            parkCar();
        }
    };

    return (
        <form className="park-form" onSubmit={handlePark}>
            <h2>Park a Car</h2>
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
            <div className="form-group">
                <label htmlFor="parkingBoy">Select Parking Boy:</label>
                <select
                    id="parkingBoy"
                    value={selectedBoy}
                    onChange={(e) => setSelectedBoy(e.target.value)}
                >
                    {parkingBoys.map(boy => (
                        <option key={boy.id} value={boy.id}>{boy.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Park</button>
        </form>
    );
}

export default ParkForm;