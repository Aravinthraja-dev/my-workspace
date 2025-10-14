import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInput } from './todo-input';

describe('TodoInput (isolated)', () => {
  let component: TodoInput;
  let fixture: ComponentFixture<TodoInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new task', () => {
    const newtask = 'Apple';
    const emitspy = jest.spyOn(component.listItems, 'emit');
    component.searchTerm = 'essential';
    component.addItems(newtask);
    
    expect(emitspy).toHaveBeenCalledWith({
      task: 'Apple',
      completed: false
    })

    expect(component.searchTerm).toBe('')
  })
});
