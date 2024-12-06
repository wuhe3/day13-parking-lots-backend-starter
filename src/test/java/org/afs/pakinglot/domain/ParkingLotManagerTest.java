package org.afs.pakinglot.domain;

import org.afs.pakinglot.domain.exception.NoAvailablePositionException;
import org.afs.pakinglot.domain.exception.UnrecognizedTicketException;
import org.afs.pakinglot.domain.strategies.AvailableRateStrategy;
import org.afs.pakinglot.domain.strategies.MaxAvailableStrategy;
import org.afs.pakinglot.domain.strategies.SequentiallyStrategy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ParkingLotManagerTest {

    private ParkingLotManager parkingLotManager;

    @BeforeEach
    void setUp() {
        parkingLotManager = new ParkingLotManager();
    }

    @Test
    void should_display_parking_lot_status() {
        // Given
        ParkingLot plazaPark = parkingLotManager.findParkingLot(new SequentiallyStrategy());
        Car car = new Car("AB-1234");
        plazaPark.park(car);

        // When
        List<Ticket> tickets = plazaPark.getTickets();

        // Then
        assertNotNull(tickets);
        assertEquals(1, tickets.size());
        assertEquals("AB-1234", tickets.get(0).plateNumber());
    }

    @Test
    void should_park_car_using_sequential_strategy() {
        // Given
        ParkingBoy parkingBoy = new ParkingBoy(parkingLotManager.findParkingLot(new SequentiallyStrategy()));
        Car car = new Car("AB-1234");

        // When
        Ticket ticket = parkingBoy.park(car);

        // Then
        assertNotNull(ticket);
        assertEquals("AB-1234", ticket.plateNumber());
    }

    @Test
    void should_fetch_car_using_sequential_strategy() {
        // Given
        ParkingBoy parkingBoy = new ParkingBoy(parkingLotManager.findParkingLot(new SequentiallyStrategy()));
        Car car = new Car("AB-1234");
        Ticket ticket = parkingBoy.park(car);

        // When
        Car fetchedCar = parkingBoy.fetch(ticket);

        // Then
        assertNotNull(fetchedCar);
        assertEquals(car, fetchedCar);
    }

    @Test
    void should_throw_exception_when_fetching_with_unrecognized_ticket() {
        // Given
        ParkingBoy parkingBoy = new ParkingBoy(parkingLotManager.findParkingLot(new SequentiallyStrategy()));
        Ticket wrongTicket = new Ticket("XY-5678", 1, 1);

        // When/Then
        assertThrows(UnrecognizedTicketException.class, () -> parkingBoy.fetch(wrongTicket));
    }

    @Test
    void should_throw_exception_when_parking_lot_is_full() {
        // Given
        ParkingBoy parkingBoy = new ParkingBoy(parkingLotManager.findParkingLot(new SequentiallyStrategy()));
        for (int i = 0; i < 9; i++) {
            parkingBoy.park(new Car("AB-123" + i));
        }
        Car car = new Car("AB-1239");

        // When/Then
        assertThrows(NoAvailablePositionException.class, () -> parkingBoy.park(car));
    }

    @ParameterizedTest
    @ValueSource(strings = {"AB-1234", "XY-5678"})
    void should_validate_license_plate_format(String plateNumber) {
        // Given
        Car car = new Car(plateNumber);

        // When
        boolean isValid = plateNumber.matches("[A-Z]{2}-\\d{4}");

        // Then
        assertTrue(isValid);
    }

    @ParameterizedTest
    @ValueSource(strings = {"A-1234", "AB-123", "1234-AB", "AB1234", ""})
    void should_invalidate_incorrect_license_plate_format(String plateNumber) {
        // Given
        Car car = new Car(plateNumber);

        // When
        boolean isValid = plateNumber.matches("[A-Z]{2}-\\d{4}");

        // Then
        assertFalse(isValid);
    }

    @Test
    void should_park_car_using_max_available_strategy() {
        // Given
        ParkingBoy parkingBoy = new ParkingBoy(parkingLotManager.findParkingLot(new MaxAvailableStrategy()));
        Car car = new Car("AB-1234");

        // When
        Ticket ticket = parkingBoy.park(car);

        // Then
        assertNotNull(ticket);
        assertEquals("AB-1234", ticket.plateNumber());
    }

    @Test
    void should_park_car_using_available_rate_strategy() {
        // Given
        ParkingBoy parkingBoy = new ParkingBoy(parkingLotManager.findParkingLot(new AvailableRateStrategy()));
        Car car = new Car("AB-1234");

        // When
        Ticket ticket = parkingBoy.park(car);

        // Then
        assertNotNull(ticket);
        assertEquals("AB-1234", ticket.plateNumber());
    }
}