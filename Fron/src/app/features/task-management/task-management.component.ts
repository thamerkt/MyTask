import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from 'src/app/core/models/task.model';
import { TaskserviceService } from 'src/app/core/services/taskservice.service';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent implements OnInit {
  tasks: Task[] = [];
  todoTasks: Task[] = [];
  doingTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(private taskservice: TaskserviceService) {}

  ngOnInit(): void {
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
    console.log('Previous container data:', event.previousContainer.data);
    console.log('Current container data:', event.container.data);
    console.log('Previous index:', event.previousIndex);
    console.log('Current index:', event.currentIndex);
  
    // Only handle the drop if the task is moved between lists
    if (event.previousIndex !== event.currentIndex || event.previousContainer !== event.container) {
      // Get the task from the previous container
      const task = event.previousContainer.data[event.previousIndex];
      
      // Log the dropped task with its updated status
      console.log('Dropped Task:', task);
    
      // Update the status based on the container ID (column)
      if (event.container.id === 'cdk-drop-list-0') {
        task.status = 'To Do';
      } else if (event.container.id === 'cdk-drop-list-1') {
        task.status = 'Doing';
      } else if (event.container.id === 'cdk-drop-list-2') {
        task.status = 'Done';
      }
    
      // Update the task via the API
      this.taskservice.updateTask(task.id, task).subscribe({
        next: (response) => {
          console.log('Task updated:', response);
          // Re-filter tasks after updating to ensure the UI reflects the change
          this.filterTasksByStatus();
        },
        error: (err) => {
          console.error('Error updating the task:', err);
        }
      });
    } else {
      console.log('No change in position or container.');
    }
  }
}
