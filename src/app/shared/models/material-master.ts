export interface MaterialMaster {
  MaterialID: number;
  MaterialCode: string;
  MaterialName: string;
  CategoryID?: number;
  CategoryName?: string;
  Unit: string;
  CostRate: number;
  StockQty: number;
  SupplierID?: number;
  SupplierName?: string;
  LeadTimeDays?: number;
  MinStockLevel?: number;
  MaxStockLevel?: number;
  Remarks?: string;
  IsActive: boolean;
}
