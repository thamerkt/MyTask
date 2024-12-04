import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from 'src/app/core/models/task.model';
import { TaskserviceService } from 'src/app/core/services/taskservice.service';
import { Project } from 'src/app/core/models/project.model';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent implements OnInit {
  showForm: boolean = false;
  showForm2: boolean = false;
  showForm3: boolean = false;
  tasks: Task[] = [];
  todoTasks: Task[] = [];
  doingTasks: Task[] = [];
  doneTasks: Task[] = [];
  
  // Initialize a new task object
  newTask: Task = {
    title: "",
    priority: 0,
    status: "To Do", // Default status
    duration: "",
    description: "",
    user: {
      id: 1 // Default user ID
    },
    project: {
      id: 1 // Default project ID
    }
  };
  Projects:Project[]=[]
  projectService: any;

  constructor(private taskservice: TaskserviceService) {}

  ngOnInit(): void {
    this.loadtask()
    this.fetchProjects
  }
  loadtask(){
    this.taskservice.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filterTasksByStatus();
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    });
  }
  filterTasksByStatus(): void {
    // Reset the task arrays before filtering
    this.todoTasks = this.tasks.filter(task => task.status === 'To Do');
    this.doingTasks = this.tasks.filter(task => task.status === 'Doing');
    this.doneTasks = this.tasks.filter(task => task.status === 'Done');
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer !== event.container || event.previousIndex !== event.currentIndex) {
      if (event.previousContainer === event.container) {
        // Reorder within the same container
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        // Transfer item between containers
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
  
        // Update task status based on the target container
        const task = event.container.data[event.currentIndex];
        task.status = this.getStatusFromContainerId(event.container.id);
  
        // Update task via API
        this.taskservice.updateTask(task.id!, task).subscribe({
          next: () => this.filterTasksByStatus(),
          error: (err) => console.error('Error updating task:', err),
        });
      }
    } else {
      console.log('No change in position or container.');
    }
  }
  fetchProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data: Project[]) => {
        this.Projects = data;
      },
      error: (err: any) => {
        console.error('Error fetching projects:', err);
      }
    });}
  getStatusFromContainerId(containerId: string): string {
    switch (containerId) {
      case 'todoList': return 'To Do';
      case 'doingList': return 'Doing';
      case 'doneList': return 'Done';
      default: return '';
    }
  }

  add(): void {
    if(this.showForm==true){
      this.newTask.status="To Do"
    }
    if(this.showForm2==true){
      this.newTask.status="Doing"
    }
    if(this.showForm3==true){
      this.newTask.status="Done"
    }
    this.taskservice.createTask(this.newTask).subscribe({
      next: (response) => {
        console.log("Task added successfully:", response);
        this.tasks.push(response); // Add the new task to the list
        this.filterTasksByStatus(); // Refresh the lists
        this.showForm = false; // Hide the form after submission
        this.showForm2 = false;
        this.showForm3 = false;
        this.loadtask()
        this.resetNewTask(); // Reset the form
      },
      error: (error) => {
        console.error("Error adding task:", error);
      }
    });
  }
  delete(id: any): void {
    this.taskservice.deleteTask(id).subscribe({
      next: (response) => {
        console.log("Task deleted successfully:", response);
        // Call loadTasks to refresh the list of tasks after deletion
        this.ngOnInit;
      },
      error: (error) => {
        console.error("Error deleting task:", error);
      }
    });
  }
  

  resetNewTask(): void {
    this.newTask = {
      title: "",
      priority: 0,
      status: "To Do",
      duration: "",
      description: "",
      user: {
        id: 1
      },
      project: {
        id: 1
      }
    };
  }
}
