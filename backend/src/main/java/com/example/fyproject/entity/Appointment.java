package com.example.fyproject.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "bookId")
    private long book_id;

    @Transient
    private long u_id;


    private long sc_id;


    private String custName;
    private String custEmail;
    private String contactNumber;
    private String custAddress;
    private String problemStatement;
    private String bookingDate;
    private String bookingTime;
    private String bookingStatus;
    private String charges;
    private String finalPay;
    private String paymentDone;
    private String serviceStatus;

    @OneToOne(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name="bookId")
    private Rating rating;

}

