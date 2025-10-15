export interface ReportFilter {
  FromDate?: Date;
  ToDate?: Date;
  ProductID?: number;
  BOMID?: number;
  ProjectID?: number;
  Status?: string;
}

export interface Analytics {
  ProductName: string;
  TotalProductionQty: number;
  AverageCostPerUnit: number;
  MaterialCostVariance: number;
  EfficiencyPercentage: number;
  WastePercentage: number;
}