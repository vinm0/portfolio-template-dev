import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { checkAuthFromCookies } from '@/lib/utils/auth'

export async function GET() {
	const cookieStore = await cookies()

	if (!await checkAuthFromCookies(cookieStore)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}	// In a real application, you would fetch this data from a database
	// For now, returning mock data
	const stats = {
		totalPosts: 12,
		publishedPosts: 8,
		draftPosts: 4,
		totalProjects: 6,
		recentActivity: [
			{
				id: '1',
				action: 'Published blog post',
				description: 'Advanced React Patterns',
				timestamp: '2 hours ago'
			},
			{
				id: '2',
				action: 'Updated project',
				description: 'Portfolio Website',
				timestamp: '1 day ago'
			},
			{
				id: '3',
				action: 'Created draft',
				description: 'TypeScript Best Practices',
				timestamp: '3 days ago'
			}
		]
	}

	return NextResponse.json(stats)
}
