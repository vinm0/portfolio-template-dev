'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface BlogPostSummary {
	id: string
	title: string
	slug: string
	excerpt: string
	publishedAt: string
	tags: string[]
}

export default function BlogPage() {
	const [posts, setPosts] = useState<BlogPostSummary[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function loadPosts() {
			try {
				const response = await fetch('/api/blog')

				if (!response.ok) {
					throw new Error('Failed to load blog posts')
				}

				const postsData = await response.json()
				setPosts(postsData)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred')
			} finally {
				setLoading(false)
			}
		}

		loadPosts()
	}, [])

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="animate-pulse space-y-8">
						<div className="h-12 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<div key={i} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
									<div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
									<div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
									<div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-4"></div>
									<div className="flex gap-2">
										<div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
										<div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
						<h1 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
							Error Loading Blog Posts
						</h1>
						<p className="text-red-700 dark:text-red-300">{error}</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<header className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
						Blog
					</h1>
					<p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
						Thoughts, tutorials, and insights about web development, technology, and software engineering.
					</p>
				</header>

				{/* Blog Posts */}
				{posts.length === 0 ? (
					<div className="text-center py-16">
						<div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-12 max-w-md mx-auto">
							<div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
								<svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
							</div>
							<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
								No Posts Yet
							</h3>
							<p className="text-slate-600 dark:text-slate-400">
								Check back soon for new content!
							</p>
						</div>
					</div>
				) : (
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{posts.map((post) => (
							<article
								key={post.id}
								className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
							>
								<div className="p-6">
									<header className="mb-4">
										<h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 leading-tight">
											<Link
												href={`/blog/${post.slug}`}
												className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
											>
												{post.title}
											</Link>
										</h2>

										<time
											dateTime={post.publishedAt}
											className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2"
										>
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
											</svg>
											{new Date(post.publishedAt).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'long',
												day: 'numeric'
											})}
										</time>
									</header>

									<p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 leading-relaxed">
										{post.excerpt}
									</p>

									{/* Tags */}
									{post.tags.length > 0 && (
										<div className="flex flex-wrap gap-2 mb-4">
											{post.tags.slice(0, 3).map((tag) => (
												<span
													key={tag}
													className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md text-xs font-medium"
												>
													#{tag}
												</span>
											))}
											{post.tags.length > 3 && (
												<span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-md text-xs">
													+{post.tags.length - 3} more
												</span>
											)}
										</div>
									)}

									<Link
										href={`/blog/${post.slug}`}
										className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
									>
										Read more
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
										</svg>
									</Link>
								</div>
							</article>
						))}
					</div>
				)}

				{/* Back to Home */}
				<div className="text-center mt-16">
					<Link
						href="/"
						className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
						Back to Home
					</Link>
				</div>
			</div>
		</div>
	)
}
