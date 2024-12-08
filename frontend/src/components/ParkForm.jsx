import React, { useState } from 'react';
import Client from '../api/Client';
import './ParkForm.css';

function ParkForm({ parkingBoys, onParkSuccess }) {
    const [plateNumber, setPlateNumber] = useState('');
    const [selectedBoy, setSelectedBoy] = useState(parkingBoys[0].id);
    const [error, setError] = useState('');
    const [storedCars, setStoredCars] = useState([]);

    const validatePlateNumber = (plateNumber) => {
        const plateRegex = /^[A-Z]{2}-\d{4}$/;
        if (!plateRegex.test(plateNumber)) {
            alert('Plate number must follow the format: 2 letters + four digits (e.g., AB-1234)');
            return false;
        }
        setError('');
        return true;
    };

    const handlePark = (e) => {
        e.preventDefault();
        if (!validatePlateNumber(plateNumber)) return;

        Client.post('/park', { plateNumber, strategyNo: selectedBoy })
            .then(response => {
                alert('Car parked successfully!');
                setStoredCars([...storedCars, { plateNumber, position: response.data.position, parkingLot: response.data.parkingLot }]);
                setPlateNumber('');
                onParkSuccess();
            })
            .catch(error => {
                console.error('There was an error parking the car!', error);
                alert('There was an error parking the car!');
            });
    };

    const handleFetch = (e) => {
        e.preventDefault();
        if (!validatePlateNumber(plateNumber)) return;

        const carDetails = getCarDetails(plateNumber);
        if (!carDetails) {
            alert('Car details not found!');
            return;
        }
        const { position, parkingLot } = carDetails;

        Client.post('/fetch', { plateNumber, position, parkingLot })
            .then(response => {
                alert('Car fetched successfully!');
                setStoredCars(storedCars.filter(car => car.plateNumber !== plateNumber));
                setPlateNumber('');
                onParkSuccess();
            })
            .catch(error => {
                console.error('There was an error fetching the car!', error);
                alert('There was an error fetching the car!');
            });
    };

    const getCarDetails = (plateNumber) => {
        return storedCars.find(car => car.plateNumber === plateNumber) || null;
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
            <button type="button" onClick={handleFetch}>Fetch</button>
        </form>
    );
}

export default ParkForm;