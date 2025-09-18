import useSWR from 'swr'
import type { ScannerResponse, ScannerData } from '@t/scanner'

// 通用 fetcher
const fetcher = (url: string) => fetch(url).then(res => res.json())


const defaultScannerData: ScannerData = {
  id: 0,
  Batch: '',
  Length: 0,
  Width: 0,
  Thickness: 0,
  Consistency: 1,
  UPID: ''
}

// 扫描数据 Hook
export function useScannerData(url: string = '/api/scanner') {
  const { data, ...rest } = useSWR<ScannerResponse>(
    url,
    fetcher,
    {
      refreshInterval: 2000, // 5秒自动刷新
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
  )

  return {
    data: data?.data ?? defaultScannerData,
    ...rest
  }
}

