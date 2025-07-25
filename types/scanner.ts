export interface ScannerData {
  id: number;
  Batch: string;
  Length: string;
  Width: string;
  Thickness: string;
  Consistency:number;
  UPID:string;
}

// 扫描数据响应
export interface ScannerResponse {
  data: ScannerData | null;
  success: boolean;
  message?: string;
} 