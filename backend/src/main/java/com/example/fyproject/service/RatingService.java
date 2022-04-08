package com.example.fyproject.service;


import com.example.fyproject.entity.Rating;

import java.util.List;

public interface RatingService {
    Rating addRating(Rating rating);

    List<Rating> getRatings();

    List<Rating> getRatingbyCenter(long id);

    List<Rating> getRatingsbyUser();

    Rating editRating(Rating rating);

    Rating deleteRating(long id);

}
