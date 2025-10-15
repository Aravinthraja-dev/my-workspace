export interface MixDesign {
  MixDesignID: number;
  MixCode: string;
  MixName: string;
  ProductID: number; // Linked to Finished Product
  Description?: string;
  Version: string;
  EffectiveFrom: Date;
  EffectiveTo?: Date;

  Components: MixDesignComponent[];
  TotalWeight?: number;
  TotalCost?: number;
  IsApproved: boolean;
}

export interface MixDesignComponent {
  MaterialID: number;
  MaterialName?: string;
  Quantity: number;
  UOM: string;
  CostRate?: number;
  TotalCost?: number;
}
