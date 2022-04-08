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

    @Transient
    private long sc_id;


    private String productName;
    private String purchaseDate;
    private String productModelNo;
    private String problemStatement;
    private String contactNumber;
    private String bookingDate;
    private String bookingTime;

    private String paymentDone;

    @OneToOne(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name="bookId")
    private Rating rating;

}

