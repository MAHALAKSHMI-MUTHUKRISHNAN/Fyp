package com.example.fyproject.service;

import com.example.fyproject.config.SecurityUtils;
import com.example.fyproject.dao.AppointmentDao;
import com.example.fyproject.dao.RatingDao;
import com.example.fyproject.dao.UserDao;
import com.example.fyproject.entity.Appointment;
import com.example.fyproject.entity.Rating;
import com.example.fyproject.entity.ServiceCenter;
import com.example.fyproject.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class RatingServiceimpl implements RatingService{

    @Autowired
    private ServiceCenterServices serviceCenterServices;

    @Autowired
    private AppointmentDao appointmentDao;

    @Autowired
    private com.example.fyproject.service.AppointmentService appointmentService;

    @Autowired
    private RatingDao ratingDao;

    @Autowired
    private UserDao dao;

    @Override
    public Rating addRating(Rating rating) {
        String user = SecurityUtils.getCurrentUserLogin().get();
        rating.setUserName(user);
        this.ratingDao.save(rating);

        return rating;
    }

    @Override
    public List<Rating> getRatings() {
        return this.ratingDao.findAll();
    }

    @Override
    public List<Rating> getRatingbyCenter(long id) {
        List<ServiceCenter> center = this.serviceCenterServices.viewAllCenter();
        List<Appointment> appointments = new ArrayList<>();
        List<Rating> ratings = new ArrayList<>();
        for(ServiceCenter x:center){
            if(x.getId()==id){
                appointments = x.getAppointments();
            }
        }
        for(Appointment y:appointments){
            if(Objects.isNull(y.getRating())){
               continue;
            }
            ratings.add(y.getRating());
        }
        return ratings;
    }

    @Override
    public List<Rating> getRatingsbyUser() {
        Users user = this.dao.findByUsername(SecurityUtils.getCurrentUserLogin().get());
        List<Appointment> appointments = user.getAppointments();
        List<Rating> ratings = new ArrayList<>();
        for(Appointment x:appointments){
            if(Objects.isNull(x.getRating())){
                continue;
            }
            ratings.add(x.getRating());
        }
        return ratings;
    }

    @Override
    public Rating editRating(Rating rating) {
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String strDate = formatter.format(date);
        rating.setGivenDate(strDate);
        String user = SecurityUtils.getCurrentUserLogin().get();
        rating.setUserName(user);
        this.ratingDao.save(rating);
        return rating;
    }

    @Override
    public Rating deleteRating(long id) {
        List<Rating> ratings = getRatings();
        Rating rating = new Rating();
        for(Rating x:ratings){
            if(Objects.equals(x.getBook_id(),id)){
                rating = x;
                this.ratingDao.delete(rating);

            }
        }
        return rating;

    }




}
