"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface DashboardStats {
	totalPosts: number
	publishedPosts: number
	draftPosts: number
	totalProjects: number
	recentActivity: Array<{
		id: string
		action: string
		timestamp: string
		description: string
	}>
}

export default function AdminDashboard() {
	const [stats, setStats] = useState<DashboardStats>({
		totalPosts: 0,
		publishedPosts: 0,
		draftPosts: 0,
		totalProjects: 0,
		recentActivity: []
	})

	useEffect(() => {
		// Load dashboard stats
		const loadStats = async () => {
			try {
				const response = await fetch('/api/admin/dashboard')
				if (response.ok) {
					const data = await response.json()
					setStats(data)
				}
			} catch (error) {
				console.error('Failed to load dashboard stats:', error)
			}
		}

		loadStats()
	}, [])

	const quickActions = [
		{
			title: 'Create Blog Post',
			description: 'Write a new blog post',
			href: '/admin/blog/new',
			icon: '📝',
			color: 'bg-blue-500 hover:bg-blue-600'
		},
		{
			title: 'Manage Projects',
			description: 'Update project information',
			href: '/admin/projects',
			icon: '🚀',
			color: 'bg-green-500 hover:bg-green-600'
		},
		{
			title: 'Site Settings',
			description: 'Configure site preferences',
			href: '/admin/settings',
			icon: '⚙️',
			color: 'bg-purple-500 hover:bg-purple-600'
		},
		{
			title: 'View Portfolio',
			description: 'See your live site',
			href: '/',
			icon: '👁️',
			color: 'bg-slate-500 hover:bg-slate-600'
		}
	]

	return (
		<div className="px-4 py-6 sm:px-6 lg:px-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
					Dashboard
				</h1>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="bg-white dark:bg-slate-800 rounded-lg shadow p-6"
					>
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<div className="text-2xl">📄</div>
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
										Total Posts
									</dt>
									<dd className="text-lg font-medium text-slate-900 dark:text-slate-100">
										{stats.totalPosts}
									</dd>
								</dl>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="bg-white dark:bg-slate-800 rounded-lg shadow p-6"
					>
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<div className="text-2xl">✅</div>
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
										Published
									</dt>
									<dd className="text-lg font-medium text-slate-900 dark:text-slate-100">
										{stats.publishedPosts}
									</dd>
								</dl>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="bg-white dark:bg-slate-800 rounded-lg shadow p-6"
					>
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<div className="text-2xl">📝</div>
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
										Drafts
									</dt>
									<dd className="text-lg font-medium text-slate-900 dark:text-slate-100">
										{stats.draftPosts}
									</dd>
								</dl>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="bg-white dark:bg-slate-800 rounded-lg shadow p-6"
					>
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<div className="text-2xl">🚀</div>
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
										Projects
									</dt>
									<dd className="text-lg font-medium text-slate-900 dark:text-slate-100">
										{stats.totalProjects}
									</dd>
								</dl>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Quick Actions */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="mb-8"
				>
					<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
						Quick Actions
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{quickActions.map((action, index) => (
							<motion.a
								key={action.title}
								href={action.href}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
								className={`${action.color} text-white rounded-lg p-6 block hover:scale-105 transition-all duration-200 shadow-lg`}
							>
								<div className="text-3xl mb-2">{action.icon}</div>
								<h3 className="font-semibold text-lg mb-1">{action.title}</h3>
								<p className="text-sm opacity-90">{action.description}</p>
							</motion.a>
						))}
					</div>
				</motion.div>

				{/* Recent Activity */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.7 }}
					className="bg-white dark:bg-slate-800 rounded-lg shadow"
				>
					<div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
						<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
							Recent Activity
						</h2>
					</div>
					<div className="p-6">
						{stats.recentActivity.length > 0 ? (
							<div className="space-y-4">
								{stats.recentActivity.map((activity) => (
									<div key={activity.id} className="flex items-center space-x-3">
										<div className="flex-shrink-0">
											<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
										</div>
										<div className="min-w-0 flex-1">
											<p className="text-sm font-medium text-slate-900 dark:text-slate-100">
												{activity.action}
											</p>
											<p className="text-sm text-slate-500 dark:text-slate-400">
												{activity.description}
											</p>
										</div>
										<div className="flex-shrink-0 text-sm text-slate-500 dark:text-slate-400">
											{activity.timestamp}
										</div>
									</div>
								))}
							</div>
						) : (
							<p className="text-slate-500 dark:text-slate-400 text-center py-8">
								No recent activity to show.
							</p>
						)}
					</div>
				</motion.div>
			</motion.div>
		</div>
	)
}
