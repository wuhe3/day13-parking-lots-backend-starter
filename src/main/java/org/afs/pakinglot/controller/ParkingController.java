package org.afs.pakinglot.controller;

import org.afs.pakinglot.domain.Car;
import org.afs.pakinglot.domain.ParkingLot;
import org.afs.pakinglot.domain.ParkingLotManager;
import org.afs.pakinglot.domain.Ticket;
import org.afs.pakinglot.dto.FetchRequestDto;
import org.afs.pakinglot.dto.ParkRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking")
public class ParkingController {

    private final ParkingLotManager parkingLotManager;

    @Autowired
    public ParkingController(ParkingLotManager parkingLotManager) {
        this.parkingLotManager = parkingLotManager;
    }

    @PostMapping("/park")
    public ResponseEntity<Ticket> park(@RequestBody ParkRequestDto parkRequestDto) {
        Car car = new Car(parkRequestDto.getPlateNumber());
        Ticket ticket = parkingLotManager.park(car, parkRequestDto.getStrategyNo());
        return ResponseEntity.ok(ticket);
    }

    @PostMapping("/fetch")
    public ResponseEntity<Car> fetch(@RequestBody FetchRequestDto fetchRequestDto) {
        Ticket ticket = new Ticket(fetchRequestDto.getPlateNumber(), fetchRequestDto.getPosition(), fetchRequestDto.getParkingLot());
        Car car = parkingLotManager.fetch(ticket);
        return ResponseEntity.ok(car);
    }

    @GetMapping("/parking-lots")
    public ResponseEntity<List<ParkingLot>> getAllParkingLots() {
        List<ParkingLot> parkingLots = parkingLotManager.getAllParkingLots();
        return ResponseEntity.ok(parkingLots);
    }
}