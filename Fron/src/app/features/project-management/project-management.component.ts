import { Component,OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/projectservice.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent {
  Projects:Project[]=[];
   constructor(private project: ProjectService){}

  
    ngOnInit(): void {
      this.project.getProjects().subscribe({
        next: (data) => {
          this.Projects = data;
          
        },
        error: (err) => {
          console.error('Error fetching tasks:', err);
        }
      });
    }
    delete(projectId: number): void {
      this.project.deleteProject(projectId).subscribe({
        next: (response) => {
          console.log(`Project with ID ${projectId} deleted successfully.`, response);
          // Update the Projects array to reflect the deletion in the UI
          this.Projects = this.Projects.filter(project => project.project_id !== projectId);
        },
        error: (err) => {
          console.error('Error deleting the project:', err);
        }
      });
    }
    
   }


