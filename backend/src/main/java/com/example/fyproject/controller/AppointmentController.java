package com.example.fyproject.controller;

import com.example.fyproject.entity.Appointment;
import com.example.fyproject.entity.ServiceCenter;
import com.example.fyproject.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {
    @Autowired
    private AppointmentService Appointments;
    

    @PostMapping("/appointment")
    public Appointment addAppointment(@RequestBody Appointment appointment){
        return this.Appointments.addAppointment(appointment);
    }
    @GetMapping("/getAppointments")
    public List<Appointment> getAppointments(){
        return this.Appointments.allAppointments();
    }

    @GetMapping("/getAppointments/user")
    public List<Appointment> getUserAppointments(){
        return this.Appointments.getUserAppointments();
    }

    @PutMapping("/editAppointment")
    public Appointment editAppointment(@RequestBody Appointment appointment){
        return this.Appointments.editAppointment(appointment);
    }

    @PutMapping("/editCharges")
    public Appointment editCharges(@RequestBody Appointment appointment){
        return this.Appointments.editCharges(appointment);
    }

    @GetMapping("/getAppointmentbyCenter/{id}")
    public List<Appointment> getAppointmentbyCenter(@PathVariable String id){
        return this.Appointments.getAppointmentbyCenter(Long.parseLong(id));
    }

    @PutMapping("/payment/{id}")
    public Appointment editPayment(@PathVariable String id) {
        return this.Appointments.editPayment(Long.parseLong(id));
    }

    @PutMapping("/statusaccept/{id}")
    public Appointment editBookingStatusAccept(@PathVariable String id){
        return this.Appointments.editBookingStatusAccept(Long.parseLong(id));
    }

    @PutMapping("/statusreject/{id}")
    public Appointment editBookingStatusReject(@PathVariable String id){
        return this.Appointments.editBookingStatusReject(Long.parseLong(id));
    }

    @PutMapping("/servicestart/{id}")
    public Appointment editServiceStarted(@PathVariable String id){
        return this.Appointments.editServiceStarted(Long.parseLong(id));
    }

    @PutMapping("/serviceend/{id}")
    public Appointment editServiceEnded(@PathVariable String id){
        return this.Appointments.editServiceEnded(Long.parseLong(id));
    }

    @PutMapping("/finalpay/{id}")
    public Appointment editFinalPay(@PathVariable String id){
        return this.Appointments.editFinalPay(Long.parseLong(id));
    }

    @DeleteMapping("/deleteAppointment/{id}")
    public Appointment deleteAppointment(@PathVariable String id){
        return this.Appointments.deleteAppointment(Long.parseLong(id));
    }
}
