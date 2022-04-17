package com.example.fyproject.service;


import com.example.fyproject.entity.Appointment;

import java.util.List;

public interface AppointmentService {
    Appointment addAppointment(Appointment appointment);

    List<Appointment> allAppointments();
    List<Appointment> getUserAppointments();
    List<Appointment> getAppointmentbyCenter(long id);
    Appointment editAppointment(Appointment appointment);

    Appointment deleteAppointment(long id);

    Appointment editPayment(long id);
}
