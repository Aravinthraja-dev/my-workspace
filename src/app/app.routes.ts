import { Routes } from '@angular/router';
import { TodoList } from './pages/todo-list/todo-list';

export const routes: Routes = [
    { path: '', redirectTo: 'todo-list', pathMatch: 'full' },
    { path: 'todo-list', component: TodoList }
];
