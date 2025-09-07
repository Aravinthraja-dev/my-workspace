import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TodoListDTO } from '../../models/todolist';

@Component({
  selector: 'app-todo-list-item',
  imports: [],
  templateUrl: './todo-list-item.html',
  styleUrl: './todo-list-item.scss'
})
export class TodoListItem{

  @Input() todolist: TodoListDTO[] = [];
  @Output() removeItemEvent = new EventEmitter<number>();
  @Output() editItemEvent = new EventEmitter<TodoListDTO>();
  @Output() isCompletedEvent = new EventEmitter<TodoListDTO>();

  removeItem(index: number) {
    this.removeItemEvent.emit(index);
  }

  editItem(item: TodoListDTO) {
    this.editItemEvent.emit(item);
  }

  isCompleted(item: TodoListDTO) {
    this.isCompletedEvent.emit(item);
  }

}
