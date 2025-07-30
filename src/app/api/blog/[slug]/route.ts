import { NextRequest, NextResponse } from 'next/server'

// Mock data storage (in production, use a database)
// This should match the data structure from the admin blog route
const blogPosts: any[] = [
	{
		id: '1',
		title: 'Getting Started with Next.js 15',
		slug: 'getting-started-nextjs-15',
		excerpt: 'Learn the fundamentals of Next.js 15 and build modern web applications.',
		content: '# Getting Started with Next.js 15\n\nNext.js 15 brings exciting new features...',
		htmlContent: '<h1>Getting Started with Next.js 15</h1><p>Next.js 15 brings exciting new features...</p>',
		status: 'published',
		publishedAt: '2024-01-15T10:00:00Z',
		createdAt: '2024-01-15T10:00:00Z',
		updatedAt: '2024-01-15T10:00:00Z',
		tags: ['nextjs', 'react', 'tutorial']
	},
	{
		id: '2',
		title: 'TypeScript Best Practices',
		slug: 'typescript-best-practices',
		excerpt: 'Essential TypeScript patterns every developer should know.',
		content: '# TypeScript Best Practices\n\nTypeScript helps catch errors early...',
		htmlContent: '<h1>TypeScript Best Practices</h1><p>TypeScript helps catch errors early...</p>',
		status: 'published',
		publishedAt: '2024-01-10T14:30:00Z',
		createdAt: '2024-01-10T14:30:00Z',
		updatedAt: '2024-01-10T14:30:00Z',
		tags: ['typescript', 'javascript', 'best-practices']
	}
]

interface BlogPostParams {
	slug: string
}

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<BlogPostParams> }
) {
	try {
		const { slug } = await params

		// Find the blog post by slug
		const post = blogPosts.find(p => p.slug === slug && p.status === 'published')

		if (!post) {
			return NextResponse.json(
				{ error: 'Blog post not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json(post)
	} catch (error) {
		console.error('Error fetching blog post:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
