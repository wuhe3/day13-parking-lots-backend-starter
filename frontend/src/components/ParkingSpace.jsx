// frontend/src/components/ParkingSpace.jsx
import React from 'react';
import './ParkingLot.css';

function ParkingSpace({ position, ticket }) {
    return (
        <div className={`parking-space ${ticket ? 'occupied' : 'available'}`}>
            <div className="plate-number">
                {ticket ? ticket.plateNumber : 'NULL'}
            </div>
        </div>
    );
}

export default ParkingSpace;