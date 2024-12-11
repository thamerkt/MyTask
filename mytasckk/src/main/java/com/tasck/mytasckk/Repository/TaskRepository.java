package com.tasck.mytasckk.Repository;

import com.tasck.mytasckk.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Integer> {

    Task findById(Long id);

    List<Task> findByUserId(Long userId);
}
