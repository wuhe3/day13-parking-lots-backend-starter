import React, { useState } from 'react';
import Client from '../api/Client';
import './ParkForm.css';

function ParkForm({ parkingBoys, onParkSuccess }) {
    const [plateNumber, setPlateNumber] = useState('');
    const [selectedBoy, setSelectedBoy] = useState(parkingBoys[0].id);

    const handlePark = (e) => {
        e.preventDefault();
        Client.post('/park', { plateNumber, strategyNo: selectedBoy })
            .then(response => {
                alert('Car parked successfully!');
                setPlateNumber('');
                onParkSuccess();
            })
            .catch(error => {
                console.error('There was an error parking the car!', error);
            });
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