export interface ProductMaster {
  ProductID: number;
  ProductCode: string;
  ProductName: string;
  AliasName?: string;
  PrintName?: string;

  CompanyID: number;
  DivisionID: number;

  ProductType: 'FG' | 'RM' | 'SF'; 
  ProductGroupID?: number;
  ProductCategoryID?: number;
  ProductBrandID?: number;
  UOM: string;
  UnitID?: number;

  MinSalesRate?: number;
  MaxDiscountRate?: number;
  Rate?: number;
  CostRate?: number;
  MRP?: number;

  Weight?: number;
  Length?: number;
  Breadth?: number;
  Height?: number;
  Thickness?: number;
  Volume?: number;

  Description?: string;
  ShortDescription?: string;
  PictureName?: string;
  ImageFileAsBase64?: string;

  BatchWeightRequired?: boolean;
  MaintainBatchwise?: boolean;
  HasExpiryDate?: boolean;
  HasMfgDate?: boolean;
  DoNotMaintainInventory?: boolean;

  IsActive: boolean;
  CreatedByID?: number;
  ApprovedByID?: number;
  ApprovedDate?: Date;
  ModifiedDateTime?: Date;
}
