package com.tasck.mytasckk.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Project {

    public int getProject_id() {
        return project_id;
    }

    public void setProject_id(int project_id) {
        this.project_id = project_id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int project_id;
    private String name;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;


    // Use LocalDateTime for better handling of date/time
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")  // Ensure the date format is compatible
    private LocalDateTime date_start;

    // Use LocalDateTime for consistency with date_start
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")  // Ensure the date format is compatible
    private LocalDateTime date_end;

    private String description;

    // Getters and Setters




    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getDate_start() {
        return date_start;
    }

    public void setDate_start(LocalDateTime date_start) {
        this.date_start = date_start;
    }

    public LocalDateTime getDate_end() {
        return date_end;
    }

    public void setDate_end(LocalDateTime date_end) {
        this.date_end = date_end;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
