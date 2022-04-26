package com.example.fyproject.service;


import com.example.fyproject.entity.Appointment;

import java.util.List;

public interface AppointmentService {
    Appointment addAppointment(Appointment appointment);

    List<Appointment> allAppointments();
    List<Appointment> getUserAppointments();
    List<Appointment> getAppointmentbyCenter(long id);
    Appointment editAppointment(Appointment appointment);
    Appointment editBookingStatusAccept(long id);
    Appointment editServiceStarted(long id);
    Appointment editServiceEnded(long id);
    Appointment editBookingStatusReject(long id);
    Appointment editCharges(Appointment appointment);
    Appointment editFinalPay(long id);
    Appointment deleteAppointment(long id);

    Appointment editPayment(long id);
}
