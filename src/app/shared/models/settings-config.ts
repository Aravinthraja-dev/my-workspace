export interface SettingsConfigDTO {
  CompanyID: number;
  DefaultCurrency: string;
  EnableVersionControl: boolean;
  AutoApproveBOM: boolean;
  CostingMethod: 'Standard' | 'Actual' | 'WeightedAverage';
  RoundingPrecision: number;
  EnableWasteTracking: boolean;
  EnableBatchControl: boolean;
  DefaultUOM: string;
  EnableMultiLevelBOM: boolean;
  LastModifiedByID?: number;
  LastModifiedDate?: Date;
}
