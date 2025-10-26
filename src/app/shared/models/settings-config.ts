export interface SettingsConfigDTO {
  id: number;
  CompanyID: number;
  DefaultCurrency: string;
  EnableVersionControl: boolean;
  AutoApproveBOM: boolean;
  CostingMethod: 'Standard' | 'Actual' | 'WeightedAverage';
  RoundingPrecision: number;
  EnableWasteTracking: boolean;
  EnableBatchControl: boolean;
  DefaultUOM: UOM;
  DefaultUOM_id: number;
  EnableMultiLevelBOM: boolean;
  LastModifiedByID?: number;
  LastModifiedDate?: Date;
}

export interface UOM {
  id: number;
  UOMCode: string;
  UOMName: string;
}