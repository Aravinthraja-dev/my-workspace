import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
import { RadioButton, RadioButtonModule } from 'primeng/radiobutton';
import { Select, SelectModule } from 'primeng/select';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SettingsConfigDTO, UOM } from '../../shared/models/settings-config';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { Subject, takeUntil } from 'rxjs';
import { Dialog, DialogModule } from 'primeng/dialog';
import { Button, ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-configurations',
  imports: [
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    RadioButtonModule,
    InputNumberModule,
    SelectModule,
    ToggleButtonModule
  ],
  templateUrl: './configurations.html',
  styleUrl: './configurations.scss'
})
export class Configurations implements OnInit, OnDestroy {
  ConfigForm!: FormGroup
  currencies: { label: string; value: string }[] = [];
  uomList: UOM[] = [];
  displayBOMSettings: boolean = false;
  settingsId!: number;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder, 
    protected configService: ConfigurationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.createConfigForm();

    this.currencies = [
      { label: 'Indian Rupee (INR)', value: 'INR' },
      { label: 'US Dollar (USD)', value: 'USD' },
      { label: 'Euro (EUR)', value: 'EUR' },
      { label: 'British Pound (GBP)', value: 'GBP' },
      { label: 'Japanese Yen (JPY)', value: 'JPY' }
    ]

    this.configService.getAllUOM().pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result: UOM[]) => {
          this.uomList = result
        },
        error: (err) => {
          console.error('Data not found')
        }
      })

    this.configService.getSettings()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result: SettingsConfigDTO[]) => {
          console.log('Result settings ', result)
          if (result && result.length > 0) {
            const settings = result[0];
            this.ConfigForm.patchValue({
              ...settings,
              DefaultUOM: settings.DefaultUOM?.id ?? null
            });
            this.settingsId = settings.id; // store for update
          } else {
            this.settingsId = 0; // no data found, will create
          }
        },
        error: (err) => {
          console.error('Failed to load settings', err);
        }
      });
  }

  createConfigForm() {
    this.ConfigForm = this.fb.group({
      CompanyID: [null],
      DefaultCurrency: ['', Validators.required],
      DefaultUOM: [null, Validators.required],
      EnableVersionControl: [false],
      AutoApproveBOM: [false],
      CostingMethod: ['Standard', Validators.required],
      RoundingPrecision: [2, [Validators.required, Validators.min(0), Validators.max(5)]],
      EnableWasteTracking: [false],
      EnableBatchControl: [false],
      EnableMultiLevelBOM: [true],
      LastModifiedByID: [null],
      LastModifiedDate: [null]
    });
  }

  onRestoreDefaults() {
    this.ConfigForm.reset({
      DefaultCurrency: null,
      DefaultUOM: null,
      RoundingPrecision: 0,
      CostingMethod: 'Standard',
      AutoApproveBOM: false,
      EnableVersionControl: false,
      EnableMultiLevelBOM: false,
      EnableBatchControl: false,
      EnableWasteTracking: false
    });
  }

  onSave(): void {
    if (this.ConfigForm.invalid) {
      this.ConfigForm.markAllAsTouched();
      console.warn('Form is invalid!');
      return;
    }

    const formData = {
      ...this.ConfigForm.value,
      CompanyID: 1, // 👈 Add this
    };
    console.log('Form submitted', formData);

    if (this.settingsId) {
      // 🔹 Update existing record
      this.configService.updateSettings(this.settingsId, formData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (result) => {
            this.displayBOMSettings = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Updated',
              detail: 'BOM Settings updated successfully'
            });
          },
          error: (err) => {
            console.error('Update failed', err);
          }
        });
    } else {
      // 🔹 Create new record
      this.configService.createSettings(formData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (result) => {
            this.displayBOMSettings = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Created',
              detail: 'BOM Settings saved successfully'
            });
          },
          error: (err) => {
            console.error('Create failed', err);
          }
        });
    }
  }

  onCancel() {
    this.displayBOMSettings = false;
    this.ConfigForm.reset();
  }

  openOption(option: string) {
    if (option === 'BOMSettings') {
      this.displayBOMSettings = true;
    }
    // You can add more options here
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
