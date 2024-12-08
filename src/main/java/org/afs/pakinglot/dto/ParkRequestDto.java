package org.afs.pakinglot.dto;

public class ParkRequestDto {
    private String plateNumber;
    private int strategyNo;

    public ParkRequestDto() {
    }

    public ParkRequestDto(String plateNumber, int strategyNo) {
        this.plateNumber = plateNumber;
        this.strategyNo = strategyNo;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    public int getStrategyNo() {
        return strategyNo;
    }

    public void setStrategyNo(int strategyNo) {
        this.strategyNo = strategyNo;
    }
}