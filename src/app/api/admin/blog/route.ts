import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { checkAuthFromCookies } from '@/lib/auth'

// Mock data storage (in production, use a database)
let blogPosts: any[] = [
	{
		id: '1',
		title: 'Getting Started with Next.js 15',
		slug: 'getting-started-nextjs-15',
		excerpt: 'Learn the fundamentals of Next.js 15 and build modern web applications.',
		content: '# Getting Started with Next.js 15\n\nNext.js 15 brings exciting new features...',
		status: 'published',
		publishedAt: '2024-01-15T10:00:00Z',
		tags: ['nextjs', 'react', 'tutorial']
	},
	{
		id: '2',
		title: 'TypeScript Best Practices',
		slug: 'typescript-best-practices',
		excerpt: 'Essential TypeScript patterns every developer should know.',
		content: '# TypeScript Best Practices\n\nTypeScript helps catch errors early...',
		status: 'draft',
		publishedAt: null,
		tags: ['typescript', 'javascript', 'best-practices']
	}
]

export async function GET() {
	const cookieStore = await cookies()

	if (!await checkAuthFromCookies(cookieStore)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	return NextResponse.json(blogPosts)
}

export async function POST(request: NextRequest) {
	const cookieStore = await cookies()

	if (!await checkAuthFromCookies(cookieStore)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	try {
		const postData = await request.json()

		const newPost = {
			id: Date.now().toString(),
			...postData,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		}

		blogPosts.push(newPost)

		return NextResponse.json(newPost, { status: 201 })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to create post' },
			{ status: 500 }
		)
	}
}

export async function PUT(request: NextRequest) {
	const cookieStore = await cookies()

	if (!await checkAuthFromCookies(cookieStore)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	try {
		const { id, ...updateData } = await request.json()

		const postIndex = blogPosts.findIndex(post => post.id === id)
		if (postIndex === -1) {
			return NextResponse.json({ error: 'Post not found' }, { status: 404 })
		}

		blogPosts[postIndex] = {
			...blogPosts[postIndex],
			...updateData,
			updatedAt: new Date().toISOString()
		}

		return NextResponse.json(blogPosts[postIndex])
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to update post' },
			{ status: 500 }
		)
	}
}
