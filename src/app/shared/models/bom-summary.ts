export interface BOMSummary {
  BOMID: number;
  ProductID: number;
  ProductName: string;
  Version: string;
  TotalMaterialCost: number;
  TotalLaborCost?: number;
  TotalOverheadCost?: number;
  TotalCost: number;
  CreatedDate: Date;
  ApprovedBy?: string;
  Status: string;
}

export interface Costing {
  BOMID: number;
  ProductID: number;
  MaterialCostDetails: CostComponent[];
  LaborCostDetails: CostComponent[];
  OverheadCostDetails: CostComponent[];
  TotalCost: number;
}

export interface CostComponent {
  ComponentType: 'Material' | 'Labor' | 'Overhead';
  ComponentID: number;
  ComponentName: string;
  Quantity?: number;
  UOM?: string;
  Rate: number;
  Cost: number;
}
