import { Component, Input } from '@angular/core';
import { TodoInput } from '../../shared/components/todo-input/todo-input';
import { TodoListItem } from '../../shared/components/todo-list-item/todo-list-item';
import { TodoListDTO } from '../../shared/models/todolist';

@Component({
  selector: 'app-todo-list',
  imports: [
    TodoInput,
    TodoListItem
  ],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})
export class TodoList {

  searchTerm: string = '';
  todolist: TodoListDTO[] = [];
  editIndex: number | null = null;

  addListItems(newList: TodoListDTO) {
    if(this.editIndex !== null) {      
      this.todolist[this.editIndex] = {...this.todolist[this.editIndex], task: newList.task };
      this.editIndex = null;        
    } else {
      this.todolist.push({...newList });
    }
    this.searchTerm = '';
  }

  removeItem(index: number) {
    this.todolist.splice(index, 1);
  }

  editItem(item: TodoListDTO) {
    if(!item.completed) {
      this.editIndex = this.todolist.indexOf(item);
      this.searchTerm = item.task;
    }
  }

  isCompleted(item: TodoListDTO) {
    const index = this.todolist.indexOf(item);
    this.todolist[index] = {...this.todolist[index], completed: !this.todolist[index].completed };
    this.todolist = [...this.todolist];
  }

}
