import { Routes } from '@angular/router';
import { TodoList } from './pages/todo-list/todo-list';
import { DynamicForm } from './pages/dynamic-form/dynamic-form';
import { BasicForm } from './pages/basic-form/basic-form';

export const routes: Routes = [
    { path: '', redirectTo: 'todo-list', pathMatch: 'full' },
    { path: 'todo-list', component: TodoList },
    { path: 'dynamic-form', component: DynamicForm },
    { path: 'basic-form', component: BasicForm },
    { path: '**', redirectTo: 'todo-list' }
];
