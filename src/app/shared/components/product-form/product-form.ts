import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductMaster } from '../../models/product-master';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { } from 'primeng/';
import { CommonModule } from '@angular/common';
import { ConfigurationService } from '../../services/configuration.service';
import { UOM } from '../../models/settings-config';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, SelectModule, InputNumberModule, CheckboxModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})


export class ProductForm implements OnInit, OnChanges {
  @Input() product: ProductMaster | null = null;
  @Input() productTypeOptions: { label: string; value: string }[] = []
  @Output() onSave = new EventEmitter<ProductMaster>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<ProductMaster>();

  form!: FormGroup;

  companyOptions: { label: string; value: string }[] = [];
  divisionOptions: { label: string; value: string }[] = [];
  productGroupOptions: { label: string; value: string }[] = [];
  productCategoryOptions: { label: string; value: string }[] = [];
  productBrandOptions: { label: string; value: string }[] = [];
  unitOptions: UOM[] = [];
  
  constructor(private fb: FormBuilder, private configService: ConfigurationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['productTypeOptions']) {
      this.productTypeOptions = changes['productTypeOptions'].currentValue
    }

    if(changes['product']) {
      console.log('Product ', changes['product'].currentValue)
      this.product = changes['product'].currentValue
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      ProductID: [null], 
      ProductCode: ['', Validators.required],
      ProductName: ['', Validators.required],
      CompanyID: [null], 
      DivisionID: [null], 
      ProductType: ['FG', Validators.required], 
      UOM: [null, Validators.required],
      IsActive: [true], 

      AliasName: [''],
      PrintName: [''],

      ProductGroupID: [null],
      ProductCategoryID: [null],
      ProductBrandID: [null],
      UnitID: [null],

      MinSalesRate: [null],
      MaxDiscountRate: [null],
      Rate: [0],
      CostRate: [0],
      MRP: [0],

      Weight: [null],
      Length: [null],
      Breadth: [null],
      Height: [null],
      Thickness: [null],
      Volume: [null],

      Description: [''],
      ShortDescription: [''],
      PictureName: [''],
      ImageFileAsBase64: [''],

      BatchWeightRequired: [false],
      MaintainBatchwise: [false],
      HasExpiryDate: [false],
      HasMfgDate: [false],
      DoNotMaintainInventory: [false],

      CreatedByID: [null],
      ApprovedByID: [null],
      ApprovedDate: [null],
      ModifiedDateTime: [null], 
    });

    this.configService.getAllUOM().subscribe({
      next: (result: UOM[]) => {
        this.unitOptions = result
      }
    })

    if(this.product) this.form.patchValue(this.product)

  }

  submit() {
    if (this.form.valid){
       this.onSave.emit(this.form.value);
       this.form.reset();
    }
  }

  onDeleteProduct() {
    if(this.form.valid) {
      this.onDelete.emit(this.form.value);
      this.form.reset();
    }
  }

}
