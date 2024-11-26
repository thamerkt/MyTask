package com.tasck.mytasckk.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Fixed naming convention for `Id`

    @ManyToOne
    @JsonBackReference  // Prevent circular reference here
    @JoinColumn(name = "user_id", nullable = false)
    private user user; // Fixed naming convention for `User` (capitalized)

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = true)  // Explicitly making nullable if needed
    private Project project;

    private String title;
    private String status;
    private String duration;
    private String description;
    private int priority;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public user getUser() {  // Changed from `user` to `User`
        return user;
    }

    public void setUser(user user) {  // Changed from `user` to `User`
        this.user = user;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }
}
