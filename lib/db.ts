import { PrismaClient } from '@prisma/client'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import ws from 'ws'

neonConfig.webSocketConstructor = ws

const connectionString = process.env.DATABASE_URL

const prismaClientSingleton = () => {
    if (!connectionString) {
        // Return a PrismaClient that will fail fast on any query
        // rather than hanging for 60+ seconds trying to connect to localhost
        console.warn('DATABASE_URL is not set — Prisma queries will fail.')
        return new PrismaClient()
    }
    // We create a serverless pooled connection that uses WebSocket over port 443
    // completely bypassing the port 5432 restrictions on standard Wi-Fi networks.
    const pool = new Pool({ connectionString, connectionTimeoutMillis: 5000 })
    const adapter = new PrismaNeon(pool as any)
    return new PrismaClient({ adapter })
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
