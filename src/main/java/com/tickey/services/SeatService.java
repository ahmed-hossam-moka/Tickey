package com.tickey.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tickey.dtos.seatgetdto;
import com.tickey.entites.Hall;
import com.tickey.entites.Seat;
import com.tickey.entites.enums.SeatType;
import com.tickey.repositorys.HallRepository;
import com.tickey.repositorys.SeatRepository;

import jakarta.transaction.Transactional;

@Service
public class SeatService {
    
    @Autowired
    private SeatRepository seatRepository;
    
    @Autowired
    private HallRepository hallRepository;

    // Convert Seat entity to seatgetdto
    private seatgetdto convertToDto(Seat seat) {
        seatgetdto dto = new seatgetdto();
        dto.setId(seat.getId());
        dto.setHallId(seat.getHall().getId());
        dto.setHallName(seat.getHall().getName());
        dto.setRowNo(seat.getRowNo());
        dto.setSeatNumber(seat.getSeatNumber());
        dto.setType(seat.getType());
        return dto;
    }

    // Get all seats as DTOs
    public List<seatgetdto> getAllSeats() {
        List<Seat> seats = seatRepository.findAll();
        return seats.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get seat by ID as DTO
    public Optional<seatgetdto> getSeatById(Long id) {
        Optional<Seat> seat = seatRepository.findById(id);
        return seat.map(this::convertToDto);
    }

    // Get all seats in a hall as DTOs
    public List<seatgetdto> getSeatsByHall(Long hallId) {
        Optional<Hall> hall = hallRepository.findById(hallId);
        if (hall.isPresent()) {
            List<Seat> seats = seatRepository.findByHall(hall.get());
            return seats.stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    // Get seats by hall and row number as DTOs
    public List<seatgetdto> getSeatsByHallAndRow(Long hallId, Integer rowNo) {
        Optional<Hall> hall = hallRepository.findById(hallId);
        if (hall.isPresent()) {
            List<Seat> seats = seatRepository.findByHallAndRowNo(hall.get(), rowNo);
            return seats.stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    // Get seats by type as DTOs
    public List<seatgetdto> getSeatsByType(SeatType type) {
        List<Seat> seats = seatRepository.findAll();
        return seats.stream()
                .filter(seat -> seat.getType() == type)
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get seats by type in a specific hall as DTOs
    public List<seatgetdto> getSeatsByHallAndType(Long hallId, SeatType type) {
        Optional<Hall> hall = hallRepository.findById(hallId);
        if (hall.isPresent()) {
            List<Seat> seats = seatRepository.findByHall(hall.get());
            return seats.stream()
                    .filter(seat -> seat.getType() == type)
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    // Create a new seat
    @Transactional
    public seatgetdto createSeat(Long hallId, Integer rowNo, Integer seatNumber, SeatType type) {
        Hall hall = hallRepository.findById(hallId)
                .orElseThrow(() -> new RuntimeException("Hall not found"));

        // Check if seat already exists at this position
        List<Seat> existingSeats = seatRepository.findByHallAndRowNo(hall, rowNo);
        boolean seatExists = existingSeats.stream()
                .anyMatch(seat -> seat.getSeatNumber().equals(seatNumber));
        
        if (seatExists) {
            throw new RuntimeException("Seat already exists at row " + rowNo + ", seat " + seatNumber);
        }

        Seat seat = new Seat();
        seat.setHall(hall);
        seat.setRowNo(rowNo);
        seat.setSeatNumber(seatNumber);
        seat.setType(type);

        Seat savedSeat = seatRepository.save(seat);
        return convertToDto(savedSeat);
    }

    // Update seat
    @Transactional
    public seatgetdto updateSeat(Long id, Long hallId, Integer rowNo, Integer seatNumber, SeatType type) {
        Seat seat = seatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seat not found"));

        if (hallId != null) {
            Hall hall = hallRepository.findById(hallId)
                    .orElseThrow(() -> new RuntimeException("Hall not found"));
            seat.setHall(hall);
        }

        if (rowNo != null) {
            seat.setRowNo(rowNo);
        }

        if (seatNumber != null) {
            seat.setSeatNumber(seatNumber);
        }

        if (type != null) {
            seat.setType(type);
        }

        Seat updatedSeat = seatRepository.save(seat);
        return convertToDto(updatedSeat);
    }

    // Delete seat
    @Transactional
    public void deleteSeat(Long id) {
        if (!seatRepository.existsById(id)) {
            throw new RuntimeException("Seat not found");
        }
        seatRepository.deleteById(id);
    }

    // Check if seat exists
    public boolean seatExists(Long id) {
        return seatRepository.existsById(id);
    }
}

