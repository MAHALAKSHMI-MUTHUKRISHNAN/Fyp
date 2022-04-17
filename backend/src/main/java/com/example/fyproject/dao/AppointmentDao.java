package com.example.fyproject.dao;

import com.example.fyproject.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentDao extends JpaRepository<Appointment,Long> {

}
