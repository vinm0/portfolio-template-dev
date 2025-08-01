// Analytics API Route
import { NextRequest, NextResponse } from 'next/server'
import { withMongoDB } from '@/lib/utils/database'

function getClientIP(request: NextRequest): string {
	const forwarded = request.headers.get('x-forwarded-for')
	const realIP = request.headers.get('x-real-ip')

	if (forwarded) {
		return forwarded.split(',')[0].trim()
	}

	if (realIP) {
		return realIP
	}

	return 'unknown'
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()

		const result = await withMongoDB(async (db) => {
			const eventData = {
				...body,
				timestamp: new Date(),
				ip: getClientIP(request),
				userAgent: request.headers.get('user-agent')
			}

			return await db.collection('analytics').insertOne(eventData)
		})

		return NextResponse.json({
			message: 'Event tracked successfully',
			id: result.insertedId
		})
	} catch (error) {
		console.error('Analytics error:', error)
		return NextResponse.json(
			{ error: 'Failed to track event' },
			{ status: 500 }
		)
	}
}

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const limit = parseInt(searchParams.get('limit') || '100')
		const skip = parseInt(searchParams.get('skip') || '0')

		const events = await withMongoDB(async (db) => {
			return await db.collection('analytics')
				.find({})
				.sort({ timestamp: -1 })
				.skip(skip)
				.limit(limit)
				.toArray()
		})

		return NextResponse.json({ events })
	} catch (error) {
		console.error('Analytics fetch error:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch events' },
			{ status: 500 }
		)
	}
}
