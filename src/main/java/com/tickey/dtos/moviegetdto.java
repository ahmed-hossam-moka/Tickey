package com.tickey.dtos;

import com.tickey.entites.enums.MovieStatus;
import java.time.LocalDateTime;


import com.tickey.entites.Showtime;
import java.util.List;

public class moviegetdto {
    private Long id;
    private String cardName; // "movie-card"
    private String badge; // "New", "Popular", etc
    private String image; // posterUrl
    private String alt; // title for alt text
    private String title;
    private String description;
    private String duration; // formatted as "1h 58m"
    private String rating; // formatted as "4.6/5"
    private String genre;
    private MovieStatus status;
    private LocalDateTime releaseDate;
    private List<Showtime> showtimes;
    
    // Constructors, Getters and Setters
    public moviegetdto() {
    }
    
    // Helper method to format duration from minutes to "Xh Ym"
    public static String formatDuration(Integer durationMinutes) {
        if (durationMinutes == null) return "0m";
        int hours = durationMinutes / 60;
        int minutes = durationMinutes % 60;
        if (hours > 0) {
            return hours + "h " + minutes + "m";
        }
        return minutes + "m";
    }
    
    // Helper method to format rating
    public static String formatRating(Double rating) {
        if (rating == null) return "N/A";
        return String. format("%.1f/5", rating);
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCardName() {
        return cardName;
    }

    public void setCardName(String cardName) {
        this.cardName = cardName;
    }

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getAlt() {
        return alt;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public MovieStatus getStatus() {
        return status;
    }

    public void setStatus(MovieStatus status) {
        this.status = status;
    }

    public LocalDateTime getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDateTime releaseDate) {
        this.releaseDate = releaseDate;
    }
    
    public List<Showtime> getShowtimes() {
        return showtimes;
    }

    public void setShowtimes(List<Showtime> showtimes) {
        this.showtimes = showtimes;
    }

}