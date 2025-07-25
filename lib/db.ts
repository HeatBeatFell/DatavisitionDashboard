
import { PrismaClient } from './generated/prisma'

// 全局变量声明
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}
// 创建 Prisma 客户端实例
export const prisma = globalThis.prisma || new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

// 在开发环境中，将实例保存到全局变量以避免热重载时创建多个实例
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

// 数据库连接测试函数
export async function testConnection() {
  try {
    await prisma.$connect()
    console.log('✅ 数据库连接成功')
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