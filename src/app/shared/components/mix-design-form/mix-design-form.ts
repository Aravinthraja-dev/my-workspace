import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { DecimalPipe } from '@angular/common';
import { MixDesign, MixDesignComponent } from '../../models/mix-design';
import { MessageService } from 'primeng/api';
import { DatePickerModule } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-mix-design-form',
  imports: [
    CardModule,
    ReactiveFormsModule,
    Select,
    TableModule,
    DividerModule,
    DecimalPipe,
    DatePickerModule,
    CheckboxModule,
    ButtonModule  
  ],
  providers: [MessageService],
  templateUrl: './mix-design-form.html',
  styleUrl: './mix-design-form.scss'
})
export class MixDesignForm implements OnInit {
  mixDesignForm!: FormGroup;
  products: any[] = [];
  rawMaterials: any[] = [];

  constructor(private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.mixDesignForm = this.fb.group({
      ProductID: [null, Validators.required],
      MixCode: ['', Validators.required],
      MixName: ['', Validators.required],
      Version: ['1.0', Validators.required],
      Description: [''],
      EffectiveFrom: [new Date(), Validators.required],
      EffectiveTo: [null],
      IsApproved: [false],
      Components: this.fb.array([]),
      TotalCost: [0]
    });
    this.addComponent();
  }

  get components(): FormArray {
    return this.mixDesignForm.get('Components') as FormArray;
  }

  addComponent(comp?: MixDesignComponent) {
    this.components.push(
      this.fb.group({
        MaterialID: [comp?.MaterialID || null, Validators.required],
        Quantity: [comp?.Quantity || 0, Validators.required],
        UOM: [comp?.UOM || 'Kg', Validators.required],
        CostRate: [comp?.CostRate || 0],
        TotalCost: [comp?.TotalCost || 0]
      })
    );
  }

  removeComponent(index: number) {
    this.components.removeAt(index);
    this.updateTotalCost();
  }

  onMaterialChange(index: number) {
    const comp = this.components.at(index);
    const rate = 120; // mock value or fetched from DB
    comp.patchValue({ CostRate: rate });
    this.updateRowTotal(index);
  }

  updateRowTotal(index: number) {
    const comp = this.components.at(index).value;
    const total = comp.Quantity * comp.CostRate;
    this.components.at(index).patchValue({ TotalCost: total });
    this.updateTotalCost();
  }

  updateTotalCost() {
    const total = this.components.controls.reduce((acc, ctrl) => acc + ctrl.value.TotalCost, 0);
    this.mixDesignForm.patchValue({ TotalCost: total });
  }

  submit() {
    if (this.mixDesignForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Please fill all required fields' });
      return;
    }

    const payload: MixDesign = this.mixDesignForm.value;
    /* this.mixService.saveMixDesign(payload).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Mix Design saved successfully' });
      this.mixDesignForm.reset();
      this.components.clear();
    }); */
  }
}
