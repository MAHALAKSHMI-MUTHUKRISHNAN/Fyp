package com.example.fyproject.service;

import com.example.fyproject.config.SecurityUtils;
import com.example.fyproject.dao.AppointmentDao;
import com.example.fyproject.dao.ServiceCenterDao;
import com.example.fyproject.dao.UserDao;
import com.example.fyproject.entity.Appointment;
import com.example.fyproject.entity.ServiceCenter;
import com.example.fyproject.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class AppointmentServiceimpl implements com.example.fyproject.service.AppointmentService {
    @Autowired
    private AppointmentDao appointmentDao;

    @Autowired
    private UserDao dao;
    @Autowired
    private ServiceCenterServices serviceCenterServices;
    @Autowired
    private ServiceCenterDao centerDao;

    @Override
    public Appointment addAppointment(Appointment appointment) {
        appointment.setPaymentDone("no");
        appointment.setBookingStatus("no");
        appointment.setServiceStatus("no");
        appointment.setFinalPay("no");
        appointment.setCharges("null");
        this.appointmentDao.save(appointment);
        //adding to center
        List<ServiceCenter> centers = this.centerDao.findAll();
        for(ServiceCenter x:centers){
            if(Objects.equals(x.getId(),appointment.getSc_id())){
                System.out.println(appointment.getSc_id());
                x.getAppointments().add(appointment);
                this.centerDao.save(x);
            }
        }
        //adding to user
        List<Users> users = this.dao.findAll();
        for(Users y:users){
            if(Objects.equals(y.getId(),appointment.getU_id())){
                y.getAppointments().add(appointment);
                this.dao.save(y);
            }
        }
        return appointment;
    }

    @Override
    public List<Appointment> allAppointments() {
        return this.appointmentDao.findAll();
    }

    @Override
    public List<Appointment>getUserAppointments(){
        Users user = dao.findByUsername(SecurityUtils.getCurrentUserLogin().get());
        List<Appointment> result = user.getAppointments();

        return result;
    }


    @Override
    public List<Appointment> getAppointmentbyCenter(long id) {
         List<ServiceCenter> center = this.serviceCenterServices.viewAllCenter();
        List<Appointment> appointments = new ArrayList<>();
        for(ServiceCenter x:center){
            if(x.getId()==id){
                appointments = x.getAppointments();
            }
        }
            List<Appointment> appointmentsbycenter = new ArrayList<>();

        for(Appointment y:appointments){

            appointmentsbycenter.add(y);
        }

            return appointmentsbycenter;

    }

    @Override
    public Appointment editAppointment(Appointment appointment) {
        appointment.setPaymentDone("yes");
        appointment.setBookingStatus("accept");
        appointment.setServiceStatus("no");
        appointment.setCharges("null");
        appointment.setFinalPay("no");
        this.appointmentDao.save(appointment);
        return appointment;
    }

    @Override
    public Appointment editBookingStatusAccept(long id) {
        List<Appointment> appointments = allAppointments();
        Appointment appointment = new Appointment();
        System.out.println(id);
        System.out.println(appointments);

        for(Appointment x:appointments){
            System.out.println(x.getBook_id());
            if(x.getBook_id()==id){
                x.setBookingStatus("accept");
                appointment=x;
                this.appointmentDao.save(appointment);
                System.out.println(x.getBookingStatus());
            }
        }

        return appointment;
    }

    @Override
    public Appointment editServiceStarted(long id) {
        List<Appointment> appointments = allAppointments();
        Appointment appointment = new Appointment();
        System.out.println(id);
        System.out.println(appointments);

        for(Appointment x:appointments){
            System.out.println(x.getBook_id());
            if(x.getBook_id()==id){
                x.setServiceStatus("started");
                appointment=x;
                this.appointmentDao.save(appointment);
                System.out.println(x.getBookingStatus());
            }
        }

        return appointment;
    }

    @Override
    public Appointment editServiceEnded(long id) {
        List<Appointment> appointments = allAppointments();
        Appointment appointment = new Appointment();
        System.out.println(id);
        System.out.println(appointments);

        for(Appointment x:appointments){
            System.out.println(x.getBook_id());
            if(x.getBook_id()==id){
                x.setServiceStatus("ended");
                appointment=x;
                this.appointmentDao.save(appointment);
                System.out.println(x.getBookingStatus());
            }
        }

        return appointment;
    }

    @Override
    public Appointment editBookingStatusReject(long id) {
        List<Appointment> appointments = allAppointments();
        Appointment appointment = new Appointment();
        System.out.println(id);
        System.out.println(appointments);

        for(Appointment x:appointments){
            System.out.println(x.getBook_id());
            if(x.getBook_id()==id){
                x.setBookingStatus("reject");
                appointment=x;
                this.appointmentDao.save(appointment);
                System.out.println(x.getBookingStatus());
            }
        }

        return appointment;
    }

    @Override
    public Appointment editCharges(Appointment appointment) {
        appointment.setPaymentDone("yes");
        appointment.setBookingStatus("accept");
        appointment.setServiceStatus("ended");
        this.appointmentDao.save(appointment);
        return appointment;
    }

    @Override
    public Appointment editFinalPay(long id) {
        List<Appointment> appointments = allAppointments();
        Appointment appointment = new Appointment();
        for(Appointment x:appointments){
            System.out.println(x.getBook_id());
            if(x.getBook_id()==id){
                x.setFinalPay("yes");
                appointment=x;
                this.appointmentDao.save(appointment);

            }
        }

        return appointment;
    }

    @Override
    public Appointment deleteAppointment(long id) {
        List<Appointment> appointments = allAppointments();
        Appointment appointment = new Appointment();
        for(Appointment a:appointments){
            if(a.getBook_id()==id){
                appointment = a;
                this.appointmentDao.delete(appointment);
            }
        }
        return appointment;
    }

    @Override
    public Appointment editPayment(long id) {
        List<Appointment> appointments = getUserAppointments();
        Appointment appointment = new Appointment();

        for(Appointment x:appointments){
            if(x.getBook_id()==id){
                x.setPaymentDone("yes");
                appointment=x;
                this.appointmentDao.save(appointment);
            }
        }
        return appointment;
    }
}
