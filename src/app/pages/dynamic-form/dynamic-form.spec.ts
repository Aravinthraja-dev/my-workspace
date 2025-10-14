import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicForm } from './dynamic-form';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('DynamicForm', () => {
  let component: DynamicForm;
  let fixture: ComponentFixture<DynamicForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicForm, ReactiveFormsModule],
      providers: [FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with name and one skill control', () => {
    expect(component.form).toBeDefined();
    expect(component.form.contains('name')).toBe(true);
    expect(component.form.contains('skills')).toBe(true);
    expect(component.skills.length).toBe(1);
  })

  it('should add a new skill control when add() is called', () => {
    const initialLength = component.skills.length;
    component.add();
    expect(component.skills.length).toBe(initialLength + 1);
  })

  it('should remove a skill control when remove() is called and more than one exists', () => {
    component.add();
    expect(component.skills.length).toBe(2)

    component.remove(0);
    expect(component.skills.length).toBe(1)
  })

  it('should not remove the last skill control', () => {
    expect(component.skills.length).toBe(1);
    component.remove(0);
    expect(component.skills.length).toBe(1)
  })

  it('should mark form invalid if name is empty', () => {
    component.form.get('name')?.setValue('');
    expect(component.form.valid).toBe(false);
  })

  it('should mark form valid if name is provided', () => {
    component.form.get('name')?.setValue('Mai');
    expect(component.form.valid).toBe(true)
  })

  it('should have correct default form value', () => {
    expect(component.form.value).toEqual({
      name: '',
      skills: [''],
    });
  })

  it('should call add() when invoked', () => {
    const spy = jest.spyOn(component, 'add');
    component.add();
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should call remove() when invoked', () => {
    const spy = jest.spyOn(component, 'remove');
    component.add();
    component.remove(0);
    expect(spy).toHaveBeenCalledWith(0)
  })
});
