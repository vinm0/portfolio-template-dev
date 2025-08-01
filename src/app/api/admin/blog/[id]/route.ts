import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { checkAuthFromCookies } from '@/lib/utils/auth'

// Mock data storage - in production, this would be imported from the main blog route
// For now, we'll need to implement a shared data store or database
let blogPosts: any[] = []

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const cookieStore = await cookies()

	if (!await checkAuthFromCookies(cookieStore)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	try {
		const postId = params.id

		// Find the post index
		const postIndex = blogPosts.findIndex(post => post.id === postId)
		if (postIndex === -1) {
			return NextResponse.json({ error: 'Post not found' }, { status: 404 })
		}

		// Remove the post
		blogPosts.splice(postIndex, 1)

		return NextResponse.json({ success: true })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to delete post' },
			{ status: 500 }
		)
	}
}

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const cookieStore = await cookies()

	if (!await checkAuthFromCookies(cookieStore)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	try {
		const postId = params.id
		const post = blogPosts.find(post => post.id === postId)

		if (!post) {
			return NextResponse.json({ error: 'Post not found' }, { status: 404 })
		}

		return NextResponse.json(post)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch post' },
			{ status: 500 }
		)
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const cookieStore = await cookies()

	if (!await checkAuthFromCookies(cookieStore)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	try {
		const postId = params.id
		const updateData = await request.json()

		const postIndex = blogPosts.findIndex(post => post.id === postId)
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
