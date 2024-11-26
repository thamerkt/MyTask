package com.tasck.mytasckk.Repository;

import com.tasck.mytasckk.Entity.Project;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}