import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoListDTO } from '../../models/todolist';

@Component({
  selector: 'app-todo-input',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './todo-input.html',
  styleUrl: './todo-input.scss'
})
export class TodoInput {
  @Input() searchTerm: string = '';
  @Output() listItems = new EventEmitter<TodoListDTO>();

  addItems(task: string) {
    if (task.trim()) {
      const newItem: TodoListDTO = {
        task: task,
        completed: false
      };
      this.listItems.emit(newItem);
      this.searchTerm = '';
    }
  }
}
