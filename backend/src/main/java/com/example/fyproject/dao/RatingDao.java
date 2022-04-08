package com.example.fyproject.dao;

import com.example.fyproject.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingDao extends JpaRepository<Rating,Long> {
}
