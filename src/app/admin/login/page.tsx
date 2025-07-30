"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function AdminLogin() {
	const [credentials, setCredentials] = useState({
		username: '',
		password: ''
	})
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const router = useRouter()

	// Check if user is already logged in and redirect to dashboard
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await fetch('/api/admin/dashboard')
				if (response.ok) {
					// User is already authenticated, redirect to dashboard
					router.push('/admin/dashboard')
				}
			} catch (error) {
				// User is not authenticated, stay on login page
				console.log('User not authenticated')
			}
		}

		checkAuth()
	}, [router])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError('')

		try {
			const response = await fetch('/api/admin/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
			})

			if (response.ok) {
				router.push('/admin/dashboard')
			} else {
				const data = await response.json()
				setError(data.error || 'Invalid credentials')
			}
		} catch (error) {
			setError('Login failed. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="max-w-md w-full space-y-8"
			>
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-100">
						Admin Login
					</h2>
					<p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
						Sign in to manage your portfolio
					</p>
				</div>

				<motion.form
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mt-8 space-y-6"
					onSubmit={handleSubmit}
				>
					<div className="space-y-4">
						<div>
							<label htmlFor="username" className="sr-only">
								Username
							</label>
							<input
								id="username"
								name="username"
								type="text"
								required
								className="relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Username"
								value={credentials.username}
								onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								className="relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								value={credentials.password}
								onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
							/>
						</div>
					</div>

					{error && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded"
						>
							{error}
						</motion.div>
					)}

					<div>
						<button
							type="submit"
							disabled={isLoading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? (
								<div className="flex items-center">
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
									Signing in...
								</div>
							) : (
								'Sign in'
							)}
						</button>
					</div>

					<div className="text-center">
						<a
							href="/"
							className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
						>
							← Back to portfolio
						</a>
					</div>
				</motion.form>
			</motion.div>
		</div>
	)
}
