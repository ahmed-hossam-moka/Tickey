package com.tickey.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.tickey.dtos.seatgetdto;
import com.tickey.entites.enums.SeatType;
import com.tickey.services.SeatService;

@RestController
@RequestMapping("/seats")
@CrossOrigin("*")
public class SeatController {
    
    @Autowired
    private SeatService seatService;

    // Get all seats
    @GetMapping
    public List<seatgetdto> getAllSeats() {
        return seatService.getAllSeats();
    }

    // Get seat by ID
    @GetMapping("/{id}")
    public seatgetdto getSeatById(@PathVariable Long id) {
        return seatService.getSeatById(id)
                .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Seat not found"));
    }

    // Get all seats in a hall
    @GetMapping("/hall/{hallId}")
    public List<seatgetdto> getSeatsByHall(@PathVariable Long hallId) {
        List<seatgetdto> seats = seatService.getSeatsByHall(hallId);
        if (seats.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Hall not found or has no seats");
        }
        return seats;
    }

    // Get seats by hall and row number
    @GetMapping("/hall/{hallId}/row/{rowNo}")
    public List<seatgetdto> getSeatsByHallAndRow(
            @PathVariable Long hallId, 
            @PathVariable Integer rowNo) {
        List<seatgetdto> seats = seatService.getSeatsByHallAndRow(hallId, rowNo);
        if (seats.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "No seats found for hall " + hallId + " in row " + rowNo);
        }
        return seats;
    }

    // Get seats by type
    @GetMapping("/type/{type}")
    public List<seatgetdto> getSeatsByType(@PathVariable SeatType type) {
        return seatService.getSeatsByType(type);
    }

    // Get seats by hall and type
    @GetMapping("/hall/{hallId}/type/{type}")
    public List<seatgetdto> getSeatsByHallAndType(
            @PathVariable Long hallId, 
            @PathVariable SeatType type) {
        List<seatgetdto> seats = seatService.getSeatsByHallAndType(hallId, type);
        if (seats.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "No seats found for hall " + hallId + " with type " + type);
        }
        return seats;
    }

    // Create a new seat
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public seatgetdto createSeat(@RequestBody Map<String, Object> request) {
        // Validate required fields
        if (!request.containsKey("hallId")) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Missing required field: hallId");
        }
        if (!request.containsKey("rowNo")) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Missing required field: rowNo");
        }
        if (!request.containsKey("seatNumber")) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Missing required field: seatNumber");
        }
        if (!request.containsKey("type")) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Missing required field: type");
        }

        // Get and validate values
        Long hallId = Long.valueOf(request.get("hallId").toString());
        Integer rowNo = Integer.valueOf(request.get("rowNo").toString());
        Integer seatNumber = Integer.valueOf(request.get("seatNumber").toString());
        String typeStr = request.get("type").toString().toUpperCase();
        
        SeatType type;
        try {
            type = SeatType.valueOf(typeStr);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Invalid seat type. Must be NORMAL, PREMIUM, or HANDICAP");
        }

        // Validate positive numbers
        if (rowNo <= 0 || seatNumber <= 0) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Row number and seat number must be positive");
        }

        try {
            return seatService.createSeat(hallId, rowNo, seatNumber, type);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    // Update seat
    @PutMapping("/{id}")
    public seatgetdto updateSeat(
            @PathVariable Long id, 
            @RequestBody Map<String, Object> request) {
        
        Long hallId = null;
        Integer rowNo = null;
        Integer seatNumber = null;
        SeatType type = null;

        if (request.containsKey("hallId")) {
            hallId = Long.valueOf(request.get("hallId").toString());
        }
        if (request.containsKey("rowNo")) {
            rowNo = Integer.valueOf(request.get("rowNo").toString());
            if (rowNo <= 0) {
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Row number must be positive");
            }
        }
        if (request.containsKey("seatNumber")) {
            seatNumber = Integer.valueOf(request.get("seatNumber").toString());
            if (seatNumber <= 0) {
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Seat number must be positive");
            }
        }
        if (request.containsKey("type")) {
            String typeStr = request.get("type").toString().toUpperCase();
            try {
                type = SeatType.valueOf(typeStr);
            } catch (IllegalArgumentException e) {
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Invalid seat type. Must be NORMAL, PREMIUM, or HANDICAP");
            }
        }

        try {
            return seatService.updateSeat(id, hallId, rowNo, seatNumber, type);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    // Delete seat
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSeat(@PathVariable Long id) {
        if (!seatService.seatExists(id)) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Seat not found");
        }
        try {
            seatService.deleteSeat(id);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}

