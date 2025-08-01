// Database connection utilities
import { MongoClient, Db } from 'mongodb'
import { Pool } from 'pg'

// MongoDB connection
let mongoClient: MongoClient | null = null
let mongoDb: Db | null = null

export async function connectMongoDB(): Promise<Db> {
	if (!mongoClient) {
		mongoClient = new MongoClient(process.env.MONGODB_URI!)
		await mongoClient.connect()
		mongoDb = mongoClient.db('portfolio')
	}
	return mongoDb!
}

export async function disconnectMongoDB(): Promise<void> {
	if (mongoClient) {
		await mongoClient.close()
		mongoClient = null
		mongoDb = null
	}
}

// PostgreSQL connection
let pgPool: Pool | null = null

export function getPostgresPool(): Pool {
	if (!pgPool) {
		pgPool = new Pool({
			connectionString: process.env.DATABASE_URL,
			max: 20,
			idleTimeoutMillis: 30000,
			connectionTimeoutMillis: 2000,
		})
	}
	return pgPool
}

export async function disconnectPostgres(): Promise<void> {
	if (pgPool) {
		await pgPool.end()
		pgPool = null
	}
}

// Utility function for safe database operations
export async function withMongoDB<T>(
	operation: (db: Db) => Promise<T>
): Promise<T> {
	try {
		const db = await connectMongoDB()
		return await operation(db)
	} catch (error) {
		console.error('MongoDB operation failed:', error)
		throw error
	}
}

export async function withPostgres<T>(
	operation: (pool: Pool) => Promise<T>
): Promise<T> {
	try {
		const pool = getPostgresPool()
		return await operation(pool)
	} catch (error) {
		console.error('PostgreSQL operation failed:', error)
		throw error
	}
}
