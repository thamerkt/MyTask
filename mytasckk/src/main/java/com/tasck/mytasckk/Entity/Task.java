package com.tasck.mytasckk.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Use proper naming conventions and reference mappings
    @ManyToOne
    @JsonBackReference(value = "user-tasks")  // Prevent circular reference and add a unique reference for clarity
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private user user;  // Use 'User' as the class name should start with an uppercase letter

    @ManyToOne
    @JsonBackReference(value = "project-tasks")  // Prevent circular reference and add a unique reference
    @JoinColumn(name = "project_id", referencedColumnName = "id", nullable = false)
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

    public user getUser() {
        return user;
    }

    public void setUser(user user) {
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
