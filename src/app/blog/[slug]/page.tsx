'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { useSyntaxHighlighting } from '@/lib/utils/useSyntaxHighlighting'

interface BlogPost {
	id: string
	title: string
	slug: string
	excerpt: string
	content: string
	htmlContent?: string
	status: string
	publishedAt: string | null
	createdAt: string
	updatedAt: string
	tags: string[]
	mediaItems?: Array<{
		id: string
		file: File
		type: 'image' | 'video' | 'audio'
		caption?: string
	}>
}

interface BlogPostPageProps {
	params: Promise<{ slug: string }>
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
	const [post, setPost] = useState<BlogPost | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Apply syntax highlighting to code blocks
	useSyntaxHighlighting()

	useEffect(() => {
		async function loadPost() {
			try {
				const { slug } = await params

				// Fetch the specific blog post by slug
				const response = await fetch(`/api/blog/${slug}`)

				if (!response.ok) {
					if (response.status === 404) {
						notFound()
					}
					throw new Error('Failed to load blog post')
				}

				const postData = await response.json()
				setPost(postData)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred')
			} finally {
				setLoading(false)
			}
		}

		loadPost()
	}, [params])

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="animate-pulse">
						<div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
						<div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-8"></div>
						<div className="space-y-4">
							<div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
							<div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
							<div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
						<h1 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
							Error Loading Post
						</h1>
						<p className="text-red-700 dark:text-red-300">{error}</p>
					</div>
				</div>
			</div>
		)
	}

	if (!post) {
		notFound()
	}

	// Format the publish date
	const publishDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}) : null

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12">
			<article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<header className="mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-tight">
						{post.title}
					</h1>

					{post.excerpt && (
						<p className="text-xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
							{post.excerpt}
						</p>
					)}

					{/* Meta Information */}
					<div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
						{publishDate && (
							<time dateTime={post.publishedAt!} className="flex items-center gap-2">
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								{publishDate}
							</time>
						)}

						<span className={`px-2 py-1 rounded-full text-xs font-medium ${post.status === 'published'
							? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
							: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
							}`}>
							{post.status}
						</span>
					</div>

					{/* Tags */}
					{post.tags.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{post.tags.map((tag) => (
								<span
									key={tag}
									className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
								>
									#{tag}
								</span>
							))}
						</div>
					)}
				</header>

				{/* Content */}
				<div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 md:p-12">
					<div className="prose-custom">

						{post.htmlContent ? (
							/* Render HTML content with media support */
							<div
								dangerouslySetInnerHTML={{ __html: post.htmlContent }}
								className="[&_.media-figure]:my-8 [&_.media-figure]:text-center
									[&_.media-image]:w-full [&_.media-image]:max-w-2xl [&_.media-image]:mx-auto [&_.media-image]:rounded-lg [&_.media-image]:shadow-md [&_.media-image]:border [&_.media-image]:border-slate-200 [&_.media-image]:dark:border-slate-700
									[&_.media-video]:w-full [&_.media-video]:max-w-2xl [&_.media-video]:mx-auto [&_.media-video]:rounded-lg [&_.media-video]:shadow-md 
									[&_.media-audio]:w-full [&_.media-audio]:max-w-lg [&_.media-audio]:mx-auto
									[&_.media-caption]:text-center [&_.media-caption]:text-sm [&_.media-caption]:text-slate-600 [&_.media-caption]:dark:text-slate-400 [&_.media-caption]:mt-3 [&_.media-caption]:italic [&_.media-caption]:leading-relaxed
									[&_.media-error]:bg-red-50 [&_.media-error]:dark:bg-red-900/20 [&_.media-error]:border [&_.media-error]:border-red-200 [&_.media-error]:dark:border-red-800 [&_.media-error]:text-red-700 [&_.media-error]:dark:text-red-300 [&_.media-error]:px-4 [&_.media-error]:py-3 [&_.media-error]:rounded-lg [&_.media-error]:text-center"
							/>
						) : (
							/* Fallback to markdown content */
							<div className="whitespace-pre-wrap">
								{post.content}
							</div>
						)}
					</div>
				</div>

				{/* Footer Navigation */}
				<footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
					<div className="flex justify-between items-center">
						<a
							href="/blog"
							className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
							Back to Blog
						</a>

						<div className="text-sm text-slate-500 dark:text-slate-400">
							Last updated: {new Date(post.updatedAt).toLocaleDateString()}
						</div>
					</div>
				</footer>
			</article>
		</div>
	)
}
