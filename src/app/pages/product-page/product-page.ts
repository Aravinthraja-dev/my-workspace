import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ProductForm } from '../../shared/components/product-form/product-form';
import { ProductMaster } from '../../shared/models/product-master';
import { ProductMasterService } from '../../shared/services/product-master.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { UOM } from '../../shared/models/settings-config';


@Component({
  selector: 'app-product-page',
  imports: [
    TableModule,
    TagModule,
    RatingModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    DialogModule,
    ProductForm
  ],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss'
})
export class ProductPage implements OnInit, OnDestroy {

  products!: ProductMaster[];
  displayDialog = false;
  isEditMode = false;
  selectedProduct: ProductMaster | null = null;
  UOMList: UOM[] = [];
  productTypeOptions: { label: string, value: string }[] = []
  private unsubscribe$ = new Subject<void>();

  constructor(private productMaster: ProductMasterService, private configService: ConfigurationService) { }

  ngOnInit(): void {
    this.productTypeOptions = [
      { label: 'Finished Good', value: 'FG' },
      { label: 'Raw Material', value: 'RM' },
      { label: 'Semi-Finished', value: 'SF' }
    ]
    this.configService.getAllUOM()
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((result: UOM[]) => {
          this.UOMList = result;
          return this.productMaster.getAll();
        })
      )
      .subscribe({
        next: (result: ProductMaster[]) => {
          this.products = result;
          console.log('Products:', this.products);
        },
        error: (err) => {
          console.error('Error fetching data:', err);
        }
      })
  }

  openAddDialog() {
    this.isEditMode = false;
    this.selectedProduct = null;
    this.displayDialog = true;
  }

  openEditDialog(product: ProductMaster) {
    this.isEditMode = true;
    this.selectedProduct = { ...product };
    this.displayDialog = true;
  }

  closeDialog() {
    this.displayDialog = false;
  }

  onRowSelect(event: any) {
    this.isEditMode = true;
    this.selectedProduct = event.data
    this.displayDialog = true;
  }

  saveProduct(product: ProductMaster) {
    if (this.isEditMode) {
      // update logic
    } else {
      // add logic
      this.productMaster.create(product).subscribe({
        next: () => {
          console.log('Product Added')
        }
      })
    }
    this.displayDialog = false;
  }

  confirmDelete(product: ProductMaster) {
    // use PrimeNG ConfirmDialog or ConfirmationService
  }

  getUOMName(id: number) {
    const uom = this.UOMList.find((x: UOM) => x.id === id)
    return uom ? uom.id : ''
  }

  getProductTypeLabel(value: string): string {
    const option = this.productTypeOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
