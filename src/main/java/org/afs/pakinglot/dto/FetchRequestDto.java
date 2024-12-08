package org.afs.pakinglot.dto;

public class FetchRequestDto {
    private String plateNumber;
    private int position;
    private int parkingLot;

    public FetchRequestDto() {
    }

    public FetchRequestDto(String plateNumber, int position, int parkingLot) {
        this.plateNumber = plateNumber;
        this.position = position;
        this.parkingLot = parkingLot;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public int getParkingLot() {
        return parkingLot;
    }

    public void setParkingLot(int parkingLot) {
        this.parkingLot = parkingLot;
    }
}