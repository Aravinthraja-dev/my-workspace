import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { DynamicFormService } from '../../shared/services/dynamic-form.service';
import { FormField } from '../../shared/models/dynamic-form';

@Component({
  selector: 'app-basic-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './basic-form.html',
  styleUrl: './basic-form.scss'
})
export class BasicForm implements OnInit {
  formData!: FormGroup;
  FormConfig: FormField[] = []
  EditID!: number

  constructor(private fb: FormBuilder, private dynamicFormService: DynamicFormService) { }

  ngOnInit() {
    this.createForm();
    this.getFormFields();
  }

  createForm() {
    this.formData = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z_][a-zA-Z0-9_]*$/)]],
      field: ['', Validators.required],
      requiredYn: ['', Validators.required],
      errorMessage: ['', [Validators.required]],
      inline: ['', [Validators.required]],
      toasterMessage: ['', [Validators.maxLength(100)]],
      options: this.fb.array([]) // will handle separately
    });
  }

  get options(): FormArray {
    return this.formData.get('options') as FormArray;
  }

  addOption(option?: any) {
    const optionGroup = this.fb.group({
      id: [option?.id || 0],
      name: [option?.name || '', Validators.required]
    });
    this.options.push(optionGroup);
  }

  onSubmit() {
    if (this.formData.valid) {
      console.log('✅ Form Data:', this.formData.value);
      const payload = this.formData.value;

      if (this.EditID) {
        this.dynamicFormService.update(this.EditID, payload).subscribe({
          next: () => {
            console.log('Data is updated')
          },
          error: (err) => {
            console.error('Data is not updated ', err)
          }
        })
      } else {
        this.dynamicFormService.create(this.formData.value).subscribe({
          next: () => {
            console.log('Data is Saved')
            this.formData.reset();
          },
          error: (err) => {
            console.error('Data is not saved ', err)
          }
        });
      }
    } else {
      this.formData.markAllAsTouched();
    }
  }

  getFormFields() {
    this.dynamicFormService.getAll().subscribe((fields: FormField[]) => {
      this.FormConfig = fields;
    });
  }

  onEdit(id: number, field: FormField) {
    this.EditID = id;
    this.options.clear();
    if (field.options && field.options.length > 0) {
      field.options.forEach(opt => this.addOption(opt))
    }
    this.formData.patchValue({
      label: field.label,
      name: field.name,
      field: field.field,
      requiredYn: field.requiredYn,
      errorMessage: field.errorMessage,
      inline: field.inline,
      toasterMessage: field.toasterMessage
    })
  }

  onDelete(id: number) {
    if (id < 0) return

    this.dynamicFormService.delete(id).subscribe({
      next: () => {
        console.log('Data deleted')
      },
      error: (err) => {
        console.error('Data is not deleted ', err)
      }
    })
  }
}
