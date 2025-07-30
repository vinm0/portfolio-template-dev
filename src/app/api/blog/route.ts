import { NextResponse } from 'next/server'

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
	},
	{
		id: '3',
		title: 'Draft Post',
		slug: 'draft-post',
		excerpt: 'This is a draft post that should not appear in public listings.',
		content: '# Draft Post\n\nThis is still being worked on...',
		htmlContent: '<h1>Draft Post</h1><p>This is still being worked on...</p>',
		status: 'draft',
		publishedAt: null,
		createdAt: '2024-01-20T09:00:00Z',
		updatedAt: '2024-01-20T09:00:00Z',
		tags: ['draft']
	}
]

export async function GET() {
	try {
		// Only return published posts for public API
		const publishedPosts = blogPosts
			.filter(post => post.status === 'published')
			.sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
			.map(post => ({
				id: post.id,
				title: post.title,
				slug: post.slug,
				excerpt: post.excerpt,
				publishedAt: post.publishedAt,
				tags: post.tags
			}))

		return NextResponse.json(publishedPosts)
	} catch (error) {
		console.error('Error fetching blog posts:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
