import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import type { ScannerResponse } from '@/types/scanner'


export async function GET() {
    try {
        // 查询最后一条数据
        const data = await prisma.t_Scanner.findFirst({
            orderBy:{id:'desc'}
        })
        const response: ScannerResponse = {
            data,
            success: true,
            message: data ? undefined : '未找到数据'
        }
        return NextResponse.json(response)
    } catch (error) {
        console.error('查询失败:', error)
        const response: ScannerResponse = {
            data: null,
            success: false,
            message: '查询失败'
        }
        return NextResponse.json(response, { status: 500 })
    }
}
