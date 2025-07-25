
// 模拟 Prisma 客户端
const mockPrismaClient = {
  t_Scanner: {
    findFirst: async (options: { orderBy?: { id: 'asc' | 'desc' } }) => {
      console.log('查询选项:', options)
      return {
        id: 1,
        Batch: "B12345",
        Length: "100",
        Width: "50",
        Thickness: "10",
        Consistency: 95,
        UPID: "UP123456789"
      }
    }
  },
  $connect: async () => {
    console.log('✅ 模拟数据库连接成功')
    return true
  },
  $disconnect: async () => {
    console.log('✅ 模拟数据库断开连接')
    return true
  }
}

// 导出模拟的 Prisma 客户端
export const prisma = mockPrismaClient

// 数据库连接测试函数
export async function testConnection() {
  try {
    await prisma.$connect()
    return true
  } catch (error) {
    console.error('❌ 数据库连接失败:', error)
    return false
  }
}

// 关闭数据库连接
export async function closeConnection() {
  await prisma.$disconnect()
} 