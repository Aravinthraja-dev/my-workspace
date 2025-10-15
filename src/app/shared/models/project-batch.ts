export interface ProjectBatch {
  BatchID: number;
  ProjectID?: number;
  ProjectName?: string;
  BOMID: number;
  MixDesignID?: number;
  BatchCode: string;
  BatchDate: Date;
  ProducedQty: number;
  Unit: string;
  Status: 'Planned' | 'InProgress' | 'Completed';
  OperatorID?: number;
  Remarks?: string;

  MaterialConsumption: BatchMaterialUsage[];
}

export interface BatchMaterialUsage {
  MaterialID: number;
  MaterialName: string;
  PlannedQty: number;
  ActualQty: number;
  UOM: string;
  Variance: number;
}
