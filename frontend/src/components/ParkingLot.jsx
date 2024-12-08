import React from 'react';
import './ParkingLot.css';

function ParkingLot({ parkingLots }) {
    return (
        <div>
            <h1>Parking Lots</h1>
            <div className="parking-lots-grid">
                {parkingLots.map(lot => (
                    <div key={lot.id} className="parking-lot-card">
                        <h2>{lot.name}</h2>
                        <p>ID: {lot.id}</p>
                        <p>Capacity: {lot.capacity}</p>
                        <p>Available Capacity: {lot.availableCapacity}</p>
                        <div className="parking-spaces-grid">
                            {Array.from({ length: lot.capacity }).map((_, index) => {
                                const ticket = lot.tickets.find(ticket => ticket.position === index + 1);
                                return (
                                    <div
                                        key={index}
                                        className={`parking-space ${ticket ? 'occupied' : 'available'}`}
                                    >
                                        <div className="plate-number">
                                            {ticket ? ticket.plateNumber : 'NULL'}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ParkingLot;