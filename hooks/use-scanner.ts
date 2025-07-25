import useSWR from 'swr'
import type { ScannerResponse,ScannerData } from '@/types/scanner'

// 通用 fetcher
const fetcher = (url: string) => fetch(url).then(res => res.json())


const defaultScannerData: ScannerData = {
  id: 0,
  Batch: '',
  Length: '',
  Width: '',
  Thickness: '',
  Consistency: 1,
  UPID: ''
}

// 扫描数据 Hook
export function useScannerData(url: string = '/api/scanner') {
  const { data, ...rest } = useSWR<ScannerResponse>(
    url,
    fetcher,
    {
      refreshInterval: 5000, // 5秒自动刷新
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
  )

  return {
 data:data?.data ?? defaultScannerData,
    ...rest
  }
}

