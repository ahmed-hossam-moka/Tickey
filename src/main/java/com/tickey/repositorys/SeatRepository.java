package com.tickey.repositorys;


import com.tickey.entites.Seat;
import com.tickey.entites.Hall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByHall(Hall hall);
    List<Seat> findByHallAndRowNo(Hall hall, Integer rowNo);
}