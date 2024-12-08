// frontend/src/components/ParkingLot.jsx
import React from 'react';
import ParkingLotCard from './ParkingLotCard';
import './ParkingLot.css';

function ParkingLot({ parkingLots }) {
    return (
        <div>
            <div className="parking-lots-grid">
                {parkingLots.map(lot => (
                    <ParkingLotCard key={lot.id} lot={lot} />
                ))}
            </div>
        </div>
    );
}

export default ParkingLot;