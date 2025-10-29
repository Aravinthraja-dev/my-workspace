import { Routes } from '@angular/router';
import { TodoList } from './pages/todo-list/todo-list';
import { DynamicForm } from './pages/dynamic-form/dynamic-form';
import { BasicForm } from './pages/basic-form/basic-form';
import { ProductPage } from './pages/product-page/product-page';
import { Configurations } from './pages/configurations/configurations';
import { MixDesign } from './pages/mix-design/mix-design';

export const routes: Routes = [
    { path: '', redirectTo: 'product-inventory', pathMatch: 'full' },
    { path: 'todo-list', component: TodoList },
    { path: 'dynamic-form', component: DynamicForm },
    { path: 'basic-form', component: BasicForm },
    { path: 'product-inventory', component: ProductPage },
    { path: 'configurations', component: Configurations },
    { path: 'mix-design', component: MixDesign },
    { path: '**', redirectTo: 'product-inventory' }
];
