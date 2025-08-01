import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { checkAuthFromCookies } from '@/lib/utils/auth'

// Mock settings storage (in production, use a database)
let siteSettings = {
	siteName: 'My Portfolio',
	siteDescription: 'A modern software engineer portfolio showcasing my skills and projects.',
	contactEmail: 'contact@example.com',
	socialLinks: {
		github: 'https://github.com/username',
		linkedin: 'https://linkedin.com/in/username',
		twitter: 'https://twitter.com/username'
	},
	resumeUrl: 'https://example.com/resume.pdf',
	availabilityStatus: 'available'
}

export async function GET() {
	const cookieStore = await cookies()
	if (!await checkAuthFromCookies(cookieStore)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	return NextResponse.json(siteSettings)
}

export async function PUT(request: NextRequest) {
	const cookieStore = await cookies()
	if (!await checkAuthFromCookies(cookieStore)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	try {
		const updateData = await request.json()
		siteSettings = { ...siteSettings, ...updateData }

		return NextResponse.json(siteSettings)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to update settings' },
			{ status: 500 }
		)
	}
}
