package com.example.fyproject.dao;

import com.example.fyproject.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentDao extends JpaRepository<Appointment,Long> {
}
