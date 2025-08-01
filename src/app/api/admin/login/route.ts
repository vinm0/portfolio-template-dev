import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAuthToken } from '@/lib/utils/auth'

export async function POST(request: NextRequest) {
	try {
		const { username, password } = await request.json()

		// In a real application, you would:
		// 1. Hash the password and compare with stored hash
		// 2. Use a database to verify credentials
		// For now, using environment variables for simplicity

		const adminUsername = process.env.ADMIN_USERNAME || 'admin'
		const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

		if (username === adminUsername && password === adminPassword) {
			// Create a secure JWT token
			const authToken = await createAuthToken(username)

			const cookieStore = await cookies()
			cookieStore.set('admin-auth', authToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 * 7, // 1 week
				path: '/'
			})

			return NextResponse.json({ success: true })
		} else {
			return NextResponse.json(
				{ error: 'Invalid credentials' },
				{ status: 401 }
			)
		}
	} catch (error) {
		console.error('Login error:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}