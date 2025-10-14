import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss'
})
export class DynamicForm implements OnInit {
  form!: FormGroup

  constructor(private fb: FormBuilder) { } 

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      skills: this.fb.array([this.fb.control('')])
    })
  }

  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  remove(index: number) {
    if(this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  add() {
    this.skills.push(this.fb.control(''));
  }
}
