package com.tasck.mytasckk.Controller;

import com.tasck.mytasckk.Entity.Project;
import com.tasck.mytasckk.Entity.Task;
import com.tasck.mytasckk.Repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;


@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    public TaskRepository taskRep;

    @GetMapping("/")
    public ResponseEntity<List<Task>> getAllTasks() {
        try {
            List<Task> tasks = taskRep.findAll();  // Retrieve all tasks from the repository
            return ResponseEntity.ok(tasks);  // Return 200 OK with the tasks as JSON
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);  // In case of error, return HTTP 500 with null body
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> Add(@RequestBody Task tas){
        try{
            Task taskadd = taskRep.save(tas);
            return ResponseEntity.status(HttpStatus.CREATED).body(taskadd);


        }catch( Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating TASK :" + e.getMessage());


        }}
        @GetMapping("/{id}")
        public ResponseEntity<?> getProjectById(@PathVariable Long id) {
            try {
                // Retrieve task by ID
                Optional<Task> optionalTask = taskRep.findById(Math.toIntExact(id));

                // Check if task is present
                if (optionalTask.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
                }

                // Return the found task
                return ResponseEntity.ok(optionalTask.get());
            } catch (Exception e) {
                // Handle unexpected errors
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error finding task: " + e.getMessage());
            }
        }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody Task updatedTask) {
        // Retrieve the task by id
        Optional<Task> currentTaskOpt = Optional.ofNullable(taskRep.findById(id));

        // If task is not found, return 404 not found response
        if (currentTaskOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
        }

        // Get the current task
        Task currentTask = currentTaskOpt.get();

        try {
            // Update the current task with new values
            currentTask.setDescription(updatedTask.getDescription());
            currentTask.setDuration(updatedTask.getDuration());
            currentTask.setPriority(updatedTask.getPriority());
            currentTask.setStatus(updatedTask.getStatus());
            currentTask.setTitle(updatedTask.getTitle());

            // Save the updated task back to the repository
            taskRep.save(currentTask);

            return ResponseEntity.ok("Task updated successfully");
        } catch (Exception e) {
            // Handle any errors during the update process
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating task:" +e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletebyid(@PathVariable Long id){
        Task task=taskRep.findById(id);
        if (task==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("task not found");
        }
        try{
            taskRep.deleteById(Math.toIntExact(id));
            return ResponseEntity.ok("task deleted succeffuly");


        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleteting task:"+e.getMessage());
        }
    }




}









