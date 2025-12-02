package com.tickey.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.tickey.entites.Hall;
import com.tickey.entites.Seat;
import com.tickey.services.HallService;

@RestController
@RequestMapping("/halls")
public class HallController {
    
    @Autowired 
    private HallService hallService;

    @PostMapping
    public Hall createHall(@RequestBody Hall hall){
        return hallService.createHall(hall);
    }

      // Create hall with seats
    // @PostMapping("/with-seats")
    // @ResponseStatus(HttpStatus.CREATED)
    // public Hall createHallWithSeats(@RequestBody Map<String, Object> request) {
        
    //     if (!request.containsKey("name") || !request.containsKey("rows") || !request.containsKey("seatsPerRow")) {
    //     throw new ResponseStatusException(
    //         HttpStatus.BAD_REQUEST, 
    //         "Missing required fields: name, rows, seatsPerRow"
    //     );
    // }
        
        
    //     String name = (String) request.get("name");
    //     int rows = (Integer) request.get("rows");
    //     int seatsPerRow = (Integer) request.get("seatsPerRow");
        
    //     return hallService.createHallWithSeats(name, rows, seatsPerRow);
    // }


@PostMapping("/with-seats")
@ResponseStatus(HttpStatus.CREATED)
public Hall createHallWithSeats(@RequestBody Map<String, Object> request) {
    // Check if all required fields exist
    if (!request.containsKey("name")) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST, 
            "Missing required field: name"
        );
    }
    if (!request.containsKey("rows")) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST, 
            "Missing required field: rows"
        );
    }
    if (!request.containsKey("seatsPerRow")) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST, 
            "Missing required field: seatsPerRow"
        );
    }
    
    // Safely get values
    String name = (String) request.get("name");
    Integer rows = (Integer) request.get("rows");
    Integer seatsPerRow = (Integer) request.get("seatsPerRow");
    
    // Validate values are not null
    if (name == null || rows == null || seatsPerRow == null) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST, 
            "Fields cannot be null"
        );
    }
    
    // Validate positive numbers
    if (rows <= 0 || seatsPerRow <= 0) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST, 
            "Rows and seatsPerRow must be positive numbers"
        );
    }
    
    return hallService.createHallWithSeats(name, rows, seatsPerRow);
}



    @GetMapping
    public List<Hall> getAllHalls(){
        return hallService.getAllHalls();
    }
    @GetMapping("/id/{id}")
    public Hall getHallbyID(@PathVariable Long id){
        return hallService.getHallById(id)
                    .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Hall not found"));
    }
    @GetMapping("/name/{name}")
    public Hall getHallByName(@PathVariable String name){
        return hallService.getHallByName(name)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Hall not found"));
    }
    // Get all seats in a hall
    @GetMapping("/{id}/seats")
    public List<Seat> getSeatsInHall(@PathVariable Long id) {
        List<Seat> seats = hallService.getSeatsInHall(id);
        if (seats.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Hall not found");
        }
        return seats;
    }
    // Get hall capacity
    @GetMapping("/{id}/capacity")
    public Map<String, Integer> getHallCapacity(@PathVariable Long id) {
        int capacity = hallService.getHallCapacity(id);
        if (capacity == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Hall not found");
        }
        Map<String, Integer> response = new HashMap<>();
        response.put("capacity", capacity);
        return response;
    }


    // Update hall
    @PutMapping("/{id}")
    public Hall updateHall(@PathVariable Long id, @RequestBody Hall hall) {
        if (!hallService.hallExists(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Hall not found");
        }
        hall.setId(id);
        return hallService.updateHall(hall);
    }

    // Delete hall
    @DeleteMapping("/{id}")
    public void deleteHall(@PathVariable Long id) {
        if (!hallService.hallExists(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Hall not found");
        }
        hallService.deleteHall(id);
    }


}
