export interface BOMEntry {
  BOMID: number;
  ProductID: number;
  ProductName?: string;
  Version: string;
  EffectiveFrom: Date;
  EffectiveTo?: Date;
  Remarks?: string;
  CreatedByID: number;
  ApprovedByID?: number;
  ApprovedDate?: Date;
  TotalCost?: number;
  Status: 'Draft' | 'Approved' | 'Inactive';

  Components: BOMComponent[];
}

export interface BOMComponent {
  ComponentID: number;
  ComponentName?: string;
  Quantity: number;
  UOM: string;
  Rate: number;
  Cost: number;
  WastePercentage?: number;
  Remarks?: string;
}
