export interface ScannerData {
  id: number;
  Batch: string;
  Length: number;
  Width: number;
  Thickness: number;
  Consistency: number;
  UPID: string;
  LastDate?: string;
}
export interface ScanRecords {
  Upi: string;
  Batch: String;
}
// 扫描数据响应
export interface ScannerResponse {
  data: ScannerData | null;
  success: boolean;
  message?: string;
} 