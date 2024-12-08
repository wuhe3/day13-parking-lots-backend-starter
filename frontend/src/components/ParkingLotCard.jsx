// frontend/src/components/ParkingLotCard.jsx
import React from 'react';
import ParkingSpace from './ParkingSpace';
import './ParkingLot.css';

function ParkingLotCard({ lot }) {
    return (
        <div className="parking-lot-card">
            <h2>{lot.name}</h2>
            <p>ID: {lot.id}</p>
            <p>Capacity: {lot.capacity}</p>
            <p>Available Capacity: {lot.availableCapacity}</p>
            <div className="parking-spaces-grid">
                {Array.from({ length: lot.capacity }).map((_, index) => {
                    const ticket = lot.tickets.find(ticket => ticket.position === index + 1);
                    return (
                        <ParkingSpace
                            key={index}
                            position={index + 1}
                            ticket={ticket}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default ParkingLotCard;