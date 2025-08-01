import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
	process.env.JWT_SECRET || 'default-secret-change-in-production'
)

export async function createAuthToken(username: string) {
	try {
		const token = await new SignJWT({
			username,
			role: 'admin',
			iat: Math.floor(Date.now() / 1000)
		})
			.setProtectedHeader({ alg: 'HS256' })
			.setExpirationTime('7d') // 7 days
			.setIssuedAt()
			.sign(secret)

		return token
	} catch (error) {
		console.error('Error creating auth token:', error)
		throw new Error('Failed to create authentication token')
	}
}

export async function verifyAuthToken(token: string) {
	try {
		const { payload } = await jwtVerify(token, secret)

		// Check if token is for admin role
		if (payload.role !== 'admin') {
			return null
		}

		return payload
	} catch (error) {
		// Token is invalid, expired, or malformed
		return null
	}
}

export async function checkAuthFromCookies(cookieStore: any) {
	const authToken = cookieStore.get('admin-auth')?.value

	if (!authToken) {
		return false
	}

	const payload = await verifyAuthToken(authToken)
	return payload !== null
}
