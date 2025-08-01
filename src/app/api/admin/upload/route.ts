import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { checkAuthFromCookies } from '@/lib/utils/auth'

export async function POST(request: NextRequest) {
	const cookieStore = await cookies()

	if (!await checkAuthFromCookies(cookieStore)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const formData = await request.formData()
	const file = formData.get('file') as File

	if (!file) {
		return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
	}

	try {
		// Handle file upload logic here
	} catch (error) {
		return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
	}

	return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 })
}