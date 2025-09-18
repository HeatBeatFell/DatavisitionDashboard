
import { NextResponse } from 'next/server'
import { prisma } from '@l/db'
import dayjs from 'dayjs';
import type { ScannerResponse } from '@t/scanner'


export async function GET() {
    try {
        // const Scanner = await prisma.t_ScanRecords_Boards.findFirst({
        //     orderBy: { Id: 'desc' }
        // })
        // let LastDate = Scanner.ScanTime==null? dayjs(Scanner.ScanTime).format('YYYY-MM-DD hh:mm:ss').toString():dayjs().format('YYYY-MM-DD hh:mm:ss').toString();
        // const BoardInfo = await prisma.t_BoardInfo.findFirst({ where: { UPID: Scanner.Upi } })
        // const response: ScannerResponse = {
        //     data: {
        //         id: Scanner.Id,
        //         Batch: BoardInfo.BatchId,
        //         Length: BoardInfo.Length,
        //         Width: BoardInfo.Width,
        //         Thickness: BoardInfo.Thickness,
        //         UPID: Scanner.Upi,
        //         LastDate,
        //         Consistency: 1
        //     },
        //     success: true,
        //     message: BoardInfo ? undefined : '未找到数据'
        // }
        // return NextResponse.json(response)
        return NextResponse.json({ message: '测试数据', success: true, data: null })
    } catch (error) {
        const response: ScannerResponse = {
            data: null,
            success: false,
            message: '查询失败'
        }
        return NextResponse.json(response, { status: 500 })
    }
}
