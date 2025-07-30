"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface BlogPost {
	id: string
	title: string
	slug: string
	excerpt: string
	status: 'published' | 'draft'
	publishedAt: string | null
	tags: string[]
}

export default function AdminBlog() {
	const [posts, setPosts] = useState<BlogPost[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

	useEffect(() => {
		loadPosts()
	}, [])

	const loadPosts = async () => {
		try {
			const response = await fetch('/api/admin/blog')
			if (response.ok) {
				const data = await response.json()
				setPosts(data)
			}
		} catch (error) {
			console.error('Failed to load posts:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleDelete = async (postId: string) => {
		if (!confirm('Are you sure you want to delete this post?')) return

		try {
			const response = await fetch(`/api/admin/blog/${postId}`, {
				method: 'DELETE',
			})
			if (response.ok) {
				setPosts(posts.filter(post => post.id !== postId))
			}
		} catch (error) {
			console.error('Failed to delete post:', error)
		}
	}

	const filteredPosts = posts.filter(post => {
		if (filter === 'all') return true
		return post.status === filter
	})

	if (isLoading) {
		return (
			<div className="px-4 py-6 sm:px-6 lg:px-8">
				<div className="animate-pulse">
					<div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-6"></div>
					<div className="space-y-4">
						{[...Array(5)].map((_, i) => (
							<div key={i} className="h-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
						))}
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="px-4 py-6 sm:px-6 lg:px-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
						Blog Management
					</h1>
					<Link
						href="/admin/blog/new"
						className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
					>
						New Post
					</Link>
				</div>

				{/* Filters */}
				<div className="mb-6">
					<div className="flex space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
						{(['all', 'published', 'draft'] as const).map((status) => (
							<button
								key={status}
								onClick={() => setFilter(status)}
								className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === status
										? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
										: 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
									}`}
							>
								{status.charAt(0).toUpperCase() + status.slice(1)}
								<span className="ml-2 text-xs bg-slate-200 dark:bg-slate-600 px-2 py-1 rounded-full">
									{status === 'all' ? posts.length : posts.filter(p => p.status === status).length}
								</span>
							</button>
						))}
					</div>
				</div>

				{/* Posts List */}
				<div className="space-y-4">
					{filteredPosts.length > 0 ? (
						filteredPosts.map((post, index) => (
							<motion.div
								key={post.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 hover:shadow-md transition-shadow"
							>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<div className="flex items-center space-x-3 mb-2">
											<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
												{post.title}
											</h3>
											<span
												className={`px-2 py-1 text-xs font-medium rounded-full ${post.status === 'published'
														? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
														: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
													}`}
											>
												{post.status}
											</span>
										</div>
										<p className="text-slate-600 dark:text-slate-400 mb-3">
											{post.excerpt}
										</p>
										<div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
											{post.publishedAt && (
												<span>Published: {new Date(post.publishedAt).toLocaleDateString()}</span>
											)}
											{post.tags.length > 0 && (
												<div className="flex items-center space-x-1">
													<span>Tags:</span>
													{post.tags.map((tag) => (
														<span
															key={tag}
															className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs"
														>
															{tag}
														</span>
													))}
												</div>
											)}
										</div>
									</div>
									<div className="flex items-center space-x-2 ml-4">
										<Link
											href={`/admin/blog/edit/${post.id}`}
											className="text-blue-600 hover:text-blue-700 text-sm font-medium"
										>
											Edit
										</Link>
										<Link
											href={`/blog/${post.slug}`}
											target="_blank"
											className="text-slate-600 hover:text-slate-700 text-sm font-medium"
										>
											View
										</Link>
										<button
											onClick={() => handleDelete(post.id)}
											className="text-red-600 hover:text-red-700 text-sm font-medium"
										>
											Delete
										</button>
									</div>
								</div>
							</motion.div>
						))
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-center py-12"
						>
							<div className="text-4xl mb-4">📝</div>
							<h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
								{filter === 'all' ? 'No posts yet' : `No ${filter} posts`}
							</h3>
							<p className="text-slate-600 dark:text-slate-400 mb-4">
								{filter === 'all'
									? 'Get started by creating your first blog post.'
									: `You don't have any ${filter} posts.`}
							</p>
							<Link
								href="/admin/blog/new"
								className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium inline-block"
							>
								Create New Post
							</Link>
						</motion.div>
					)}
				</div>
			</motion.div>
		</div>
	)
}
