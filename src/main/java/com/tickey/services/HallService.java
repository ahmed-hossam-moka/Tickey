package com.tickey.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tickey.dtos.hallgetdto;
import com.tickey.entites.Hall;
import com.tickey.entites.Seat;
import com.tickey.entites.enums.SeatType;
import com.tickey.repositorys.HallRepository;
import com.tickey.repositorys.SeatRepository;

import jakarta.transaction.Transactional;


@Service
public class HallService {
    
    @Autowired
    private HallRepository hallRepository;
    
    @Autowired
    private SeatRepository seatRepository;
    
    // Convert Hall entity to hallgetdto
    private hallgetdto convertToDto(Hall hall) {
        hallgetdto dto = new hallgetdto();
        dto.setId(hall.getId());
        dto.setName(hall.getName());
        dto.setTotalSeats(hall.getTotalSeats());
        dto.setRowCount(hall.getRowCount());
        dto.setSeatsPerRow(hall.getSeatsPerRow());
        dto.setCreatedAt(hall.getCreatedAt());
        return dto;
    }

    public HallService(){

    }
    //create
    public Hall createHall(Hall hall){
        return hallRepository.save(hall);
    }

    //Read
    
    // Get all halls
    public List<Hall> getAllHalls() {
        return hallRepository.findAll();
    }
    
    // DTO methods for GET operations
    public List<hallgetdto> getAllHallsAsDto() {
        return hallRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    //Get Halls by id
    public Optional<Hall> getHallById(Long id) {
        return hallRepository.findById(id);
    }
    
    public Optional<hallgetdto> getHallByIdAsDto(Long id) {
        return hallRepository.findById(id).map(this::convertToDto);
    }

    //Get Halls by Name
    public Optional<Hall> getHallByName(String name) {
        return hallRepository.findByName(name);
    }
    
    public Optional<hallgetdto> getHallByNameAsDto(String name) {
        return hallRepository.findByName(name).map(this::convertToDto);
    }

    //update
    public Hall updateHall(Hall hall){
        return hallRepository.save(hall);
    }

    //delete
    public void deleteHall(Long id){
        hallRepository.deleteById(id);
    }
    

    // Get all seats in a hall
    public List<Seat> getSeatsInHall(Long hallId) {
        Optional<Hall> hall = hallRepository.findById(hallId);
        if (hall.isPresent()) {
            return seatRepository.findByHall(hall.get());
        }
        return new ArrayList<>();
    }

    // Check if hall exists
    public boolean hallExists(Long id) {
        return hallRepository.existsById(id);
    }


    //Check hall capacity
        public int getHallCapacity(Long hallId) {
        Optional<Hall> hall = hallRepository.findById(hallId);
        return hall.map(Hall::getTotalSeats).orElse(0);
    }




    // Create hall with seats automatically
    @Transactional
    public Hall createHallWithSeats(String name, int rows, int seatsPerRow) {
        // Create hall
        Hall hall = new Hall();
        hall.setName(name);
        hall.setRowCount(rows);
        hall.setSeatsPerRow(seatsPerRow);
        hall.setTotalSeats(rows * seatsPerRow);
        hall.setCreatedAt(LocalDateTime.now());
        
        Hall savedHall = hallRepository.save(hall);

        // Create seats
        List<Seat> seats = new ArrayList<>();
        for (int row = 1; row <= rows; row++) {
            for (int seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
                Seat seat = new Seat();
                seat.setHall(savedHall);
                seat.setRowNo(row);
                seat.setSeatNumber(seatNum);
                
                // Assign seat types based on position
                if (row >= rows - 1) {
                    // Last 2 rows are premium
                    seat.setType(SeatType.PREMIUM);
                } else if (seatNum == 1 || seatNum == seatsPerRow) {
                    // First and last seats in each row are handicap accessible
                    seat.setType(SeatType.HANDICAP);
                } else {
                    seat.setType(SeatType.NORMAL);
                }
                
                seats.add(seat);
            }
        }

        seatRepository.saveAll(seats);
        savedHall.setSeats(seats);
        
        return savedHall;
    }

}
