package com.example.fyproject.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
@Entity
public class Rating {
    @Id
    private long book_id;

    private int starCount;
    private String experience;
    private String userName;


    private String givenDate;
}
