package org.afs.pakinglot.domain;

import org.afs.pakinglot.domain.strategies.ParkingStrategy;
import org.afs.pakinglot.domain.strategies.SequentiallyStrategy;
import org.afs.pakinglot.domain.strategies.MaxAvailableStrategy;
import org.afs.pakinglot.domain.strategies.AvailableRateStrategy;

import java.util.ArrayList;
import java.util.List;

public class ParkingLotManager {
    private static final int PLAZA_PARK_ID = 1;
    private static final int CITY_MALL_GARAGE_ID = 2;
    private static final int OFFICE_TOWER_PARKING_ID = 3;

    private final List<ParkingLot> parkingLots;
    private final List<ParkingBoy> parkingBoys;

    public ParkingLotManager() {
        this.parkingLots = new ArrayList<>();
        this.parkingBoys = new ArrayList<>();
        initializeParkingLots();
        initializeParkingBoys();
    }

    private void initializeParkingLots() {
        parkingLots.add(createParkingLot(PLAZA_PARK_ID, "The Plaza Park", 9));
        parkingLots.add(createParkingLot(CITY_MALL_GARAGE_ID, "City Mall Garage", 12));
        parkingLots.add(createParkingLot(OFFICE_TOWER_PARKING_ID, "Office Tower Parking", 9));
    }

    private ParkingLot createParkingLot(int id, String name, int capacity) {
        return new ParkingLot(id, name, capacity);
    }

    private void initializeParkingBoys() {
        parkingBoys.add(createParkingBoy(new SequentiallyStrategy())); // Standard parking strategy
        parkingBoys.add(createParkingBoy(new MaxAvailableStrategy())); // Smart parking strategy
        parkingBoys.add(createParkingBoy(new AvailableRateStrategy())); // Super Smart parking strategy
    }

    private ParkingBoy createParkingBoy(ParkingStrategy strategy) {
        return new ParkingBoy(parkingLots, strategy);
    }

    public ParkingLot findParkingLot(ParkingStrategy strategy) {
        return strategy.findParkingLot(parkingLots);
    }
}