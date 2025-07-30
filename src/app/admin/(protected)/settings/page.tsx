"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface SiteSettings {
	siteName: string
	siteDescription: string
	contactEmail: string
	socialLinks: {
		github: string
		linkedin: string
		twitter: string
	}
	resumeUrl: string
	availabilityStatus: string
}

export default function AdminSettings() {
	const [settings, setSettings] = useState<SiteSettings>({
		siteName: '',
		siteDescription: '',
		contactEmail: '',
		socialLinks: {
			github: '',
			linkedin: '',
			twitter: ''
		},
		resumeUrl: '',
		availabilityStatus: ''
	})
	const [isLoading, setIsLoading] = useState(false)
	const [isSaved, setIsSaved] = useState(false)

	useEffect(() => {
		loadSettings()
	}, [])

	const loadSettings = async () => {
		try {
			const response = await fetch('/api/admin/settings')
			if (response.ok) {
				const data = await response.json()
				setSettings(data)
			}
		} catch (error) {
			console.error('Failed to load settings:', error)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setIsSaved(false)

		try {
			const response = await fetch('/api/admin/settings', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(settings),
			})

			if (response.ok) {
				setIsSaved(true)
				setTimeout(() => setIsSaved(false), 3000)
			}
		} catch (error) {
			console.error('Failed to save settings:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="px-4 py-6 sm:px-6 lg:px-8 max-w-2xl mx-auto">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
					Site Settings
				</h1>

				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Site Information */}
					<div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
						<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
							Site Information
						</h2>

						<div className="space-y-4">
							<div>
								<label htmlFor="siteName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
									Site Name
								</label>
								<input
									type="text"
									id="siteName"
									value={settings.siteName}
									onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
									className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
								/>
							</div>

							<div>
								<label htmlFor="siteDescription" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
									Site Description
								</label>
								<textarea
									id="siteDescription"
									value={settings.siteDescription}
									onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
									rows={3}
									className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
								/>
							</div>
						</div>
					</div>

					{/* Contact Information */}
					<div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
						<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
							Contact Information
						</h2>

						<div className="space-y-4">
							<div>
								<label htmlFor="contactEmail" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
									Contact Email
								</label>
								<input
									type="email"
									id="contactEmail"
									value={settings.contactEmail}
									onChange={(e) => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
									className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
								/>
							</div>

							<div>
								<label htmlFor="availabilityStatus" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
									Availability Status
								</label>
								<select
									id="availabilityStatus"
									value={settings.availabilityStatus}
									onChange={(e) => setSettings(prev => ({ ...prev, availabilityStatus: e.target.value }))}
									className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
								>
									<option value="available">Available for work</option>
									<option value="busy">Currently busy</option>
									<option value="unavailable">Not available</option>
								</select>
							</div>
						</div>
					</div>

					{/* Social Links */}
					<div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
						<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
							Social Links
						</h2>

						<div className="space-y-4">
							<div>
								<label htmlFor="github" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
									GitHub URL
								</label>
								<input
									type="url"
									id="github"
									value={settings.socialLinks.github}
									onChange={(e) => setSettings(prev => ({
										...prev,
										socialLinks: { ...prev.socialLinks, github: e.target.value }
									}))}
									className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
									placeholder="https://github.com/username"
								/>
							</div>

							<div>
								<label htmlFor="linkedin" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
									LinkedIn URL
								</label>
								<input
									type="url"
									id="linkedin"
									value={settings.socialLinks.linkedin}
									onChange={(e) => setSettings(prev => ({
										...prev,
										socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
									}))}
									className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
									placeholder="https://linkedin.com/in/username"
								/>
							</div>

							<div>
								<label htmlFor="twitter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
									Twitter URL
								</label>
								<input
									type="url"
									id="twitter"
									value={settings.socialLinks.twitter}
									onChange={(e) => setSettings(prev => ({
										...prev,
										socialLinks: { ...prev.socialLinks, twitter: e.target.value }
									}))}
									className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
									placeholder="https://twitter.com/username"
								/>
							</div>
						</div>
					</div>

					{/* Resume */}
					<div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
						<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
							Resume
						</h2>

						<div>
							<label htmlFor="resumeUrl" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
								Resume URL
							</label>
							<input
								type="url"
								id="resumeUrl"
								value={settings.resumeUrl}
								onChange={(e) => setSettings(prev => ({ ...prev, resumeUrl: e.target.value }))}
								className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
								placeholder="https://example.com/resume.pdf"
							/>
						</div>
					</div>

					{/* Submit Button */}
					<div className="flex justify-end">
						<button
							type="submit"
							disabled={isLoading}
							className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-md font-medium flex items-center space-x-2"
						>
							{isLoading && (
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
							)}
							<span>{isLoading ? 'Saving...' : 'Save Settings'}</span>
						</button>
					</div>

					{isSaved && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded"
						>
							Settings saved successfully!
						</motion.div>
					)}
				</form>
			</motion.div>
		</div>
	)
}
