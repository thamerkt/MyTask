import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/projectservice.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

  Projects: Project[] = [];
  newProject: Project = {
    id:0,
    
    name: '',
    date_start: new Date(),
    date_end: new Date(),
    description: '',
  };
  editedProject: Project = {
    id:0,
    name: '',
    date_start: new Date(),
    date_end: new Date(),
    description: '',
  };
  showAddProjectForm = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.Projects = data;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  toggleAddProjectForm(): void {
    this.showAddProjectForm = !this.showAddProjectForm;
  }

  addProject(): void {
    this.projectService.createProject(this.newProject).subscribe({
      next: (response) => {
        console.log('Project added successfully.', response);
        this.Projects.push(response); // Add the new project to the list
        this.newProject = {  name: '', date_start: new Date(), date_end: new Date(), description: '' }; // Reset form
        this.showAddProjectForm = false;
      },
      error: (err) => {
        console.error('Error adding the project:', err);
      }
    });
  }

  edit(project: Project) {
    this.editedProject = { ...project }; }

  save(): void {
    if (!this.editedProject.id) return;

    this.projectService.updateProject(this.editedProject.id, this.editedProject).subscribe({
      next: (response) => {
        console.log('Project updated successfully.', response);
        const index = this.Projects.findIndex(p => p.id === this.editedProject.id);
        if (index !== -1) {
          this.Projects[index] = response; // Update the project in the list
        }
        this.editedProject = { name: '', date_start: new Date(), date_end: new Date(), description: '' }; 
      },
      error: (err) => {
        console.error('Error updating the project:', err);
      }
    });
  }

  delete(projectId: any): void {
    this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        console.log(`Project with ID ${projectId} deleted successfully.`);
        this.fetchProjects
      },
      error: (err) => {
        console.error('Error deleting the project:', err);
      }
    });
  }
}
