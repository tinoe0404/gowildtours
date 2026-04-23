import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

neonConfig.webSocketConstructor = ws

const prismaClientSingleton = () => {
    const connectionString = process.env.DATABASE_URL
    console.log("Initializing Prisma with DATABASE_URL length:", connectionString?.length);
    
    if (!connectionString) {
        throw new Error('DATABASE_URL is not set')
    }
    
    // In Prisma 6+, PrismaNeon takes a PoolConfig object instead of a Pool instance
    const adapter = new PrismaNeon({ connectionString })
    return new PrismaClient({ adapter })
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
