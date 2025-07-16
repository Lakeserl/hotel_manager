package com.server.HotelServer.repository;

import com.server.HotelServer.model.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Rooms,Long> {

}
