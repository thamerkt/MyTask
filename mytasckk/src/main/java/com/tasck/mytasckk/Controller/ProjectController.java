package com.tasck.mytasckk.Controller;

import com.tasck.mytasckk.Entity.Project;
import com.tasck.mytasckk.Repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectController {

    @Autowired
    private ProjectRepository ProjectRepository;

    // Endpoint to authenticate a user (Login)
    @PostMapping("/add")
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        try {
            // Save the project and return it as a response
            Project savedProject = ProjectRepository.save(project);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProject);
        } catch (Exception e) {
            // Log the error for debugging
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating project: " + e.getMessage());  // Provide more details on the error
        }
    }

    // Get all projects
    @GetMapping("/")
    public ResponseEntity<?> getAllProjects() {
        try {
            List<Project> projects = ProjectRepository.findAll();
            return ResponseEntity.ok(projects);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching projects");
        }
    }

    // Get a project by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Long id) {
        Optional<Project> project = ProjectRepository.findById(id);
        if (project.isPresent()) {
            return ResponseEntity.ok(project.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
        }
    }

    // Update a project
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody Project updatedProject) {
        try {
            Optional<Project> existingProject = ProjectRepository.findById(id);

            if (existingProject.isPresent()) {
                Project project = existingProject.get();
                project.setName(updatedProject.getName());
                project.setDescription(updatedProject.getDescription());
                project.setDate_start(updatedProject.getDate_start());
                project.setDate_end(updatedProject.getDate_end());

                Project savedProject = ProjectRepository.save(project);
                return ResponseEntity.ok(savedProject);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
            }
        } catch (Exception e) {
            // Log the error and return a 500 internal server error
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating project");
        }
    }


    // Delete a project
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        try {
            if (ProjectRepository.existsById(id)) {
                ProjectRepository.deleteById(id);
                return ResponseEntity.ok("Project deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting project" +e.getMessage());
        }
    }
}