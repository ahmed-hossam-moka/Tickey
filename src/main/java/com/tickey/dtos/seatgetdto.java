package com.tickey.dtos;

import com.tickey.entites.enums.SeatType;

public class seatgetdto {
    private Long id;
    private Long hallId; // بدل الـ Hall object كامل
    private String hallName; // للعرض
    private Integer rowNo;
    private Integer seatNumber;
    private SeatType type;
    
    public seatgetdto() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getHallId() {
        return hallId;
    }

    public void setHallId(Long hallId) {
        this.hallId = hallId;
    }

    public String getHallName() {
        return hallName;
    }

    public void setHallName(String hallName) {
        this. hallName = hallName;
    }

    public Integer getRowNo() {
        return rowNo;
    }

    public void setRowNo(Integer rowNo) {
        this.rowNo = rowNo;
    }

    public Integer getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(Integer seatNumber) {
        this.seatNumber = seatNumber;
    }

    public SeatType getType() {
        return type;
    }

    public void setType(SeatType type) {
        this. type = type;
    }
}