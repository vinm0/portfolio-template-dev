"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { markdownToHtml, markdownToHtmlPreview, extractMediaPlaceholders } from '@/lib/markdown'

interface MediaItem {
	id: string
	title: string
	type: 'image' | 'video' | 'audio'
	file: File
	caption?: string
}

interface BlogFormData {
	title: string
	slug: string
	excerpt: string
	content: string
	htmlContent?: string
	tags: string[]
	status: 'published' | 'draft'
	publishedAt: string | null
	mediaItems: MediaItem[]
}

interface MediaModalData {
	file: File
	type: 'image' | 'video' | 'audio'
	title: string
	id: string
	caption: string
}

export default function NewBlogPost() {
	const [formData, setFormData] = useState<BlogFormData>({
		title: '',
		slug: '',
		excerpt: '',
		content: '',
		tags: [],
		status: 'draft',
		publishedAt: null,
		mediaItems: []
	})
	const [tagInput, setTagInput] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [previewMode, setPreviewMode] = useState(false)
	const [previewHtml, setPreviewHtml] = useState('')

	// Media modal state
	const [showMediaModal, setShowMediaModal] = useState(false)
	const [mediaModalData, setMediaModalData] = useState<MediaModalData | null>(null)
	const [editingMediaId, setEditingMediaId] = useState<string | null>(null)

	const router = useRouter()

	const generateSlug = (title: string) => {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)+/g, '')
	}

	const handleTitleChange = (title: string) => {
		setFormData(prev => ({
			...prev,
			title,
			slug: generateSlug(title)
		}))
	}

	const addTag = () => {
		if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
			setFormData(prev => ({
				...prev,
				tags: [...prev.tags, tagInput.trim()]
			}))
			setTagInput('')
		}
	}

	const removeTag = (tagToRemove: string) => {
		setFormData(prev => ({
			...prev,
			tags: prev.tags.filter(tag => tag !== tagToRemove)
		}))
	}

	// Media handling functions
	const handleMediaAttach = (file: File, type: 'image' | 'video' | 'audio') => {
		const defaultTitle = file.name.split('.')[0]
		const defaultId = defaultTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')

		setMediaModalData({
			file,
			type,
			title: defaultTitle,
			id: defaultId,
			caption: ''
		})
		setEditingMediaId(null)
		setShowMediaModal(true)
	}

	const handleEditMedia = (mediaId: string) => {
		const media = formData.mediaItems.find(item => item.id === mediaId)
		if (!media) return

		setMediaModalData({
			file: media.file,
			type: media.type,
			title: media.title,
			id: media.id,
			caption: media.caption || ''
		})
		setEditingMediaId(mediaId)
		setShowMediaModal(true)
	}

	const handleSaveMedia = () => {
		if (!mediaModalData) return

		const newMediaItem: MediaItem = {
			id: mediaModalData.id,
			title: mediaModalData.title,
			type: mediaModalData.type,
			file: mediaModalData.file,
			caption: mediaModalData.caption || undefined
		}

		setFormData(prev => ({
			...prev,
			mediaItems: editingMediaId
				? prev.mediaItems.map(item => item.id === editingMediaId ? newMediaItem : item)
				: [...prev.mediaItems.filter(item => item.id !== mediaModalData.id), newMediaItem]
		}))

		setShowMediaModal(false)
		setMediaModalData(null)
		setEditingMediaId(null)
	}

	const handleCancelMedia = () => {
		setShowMediaModal(false)
		setMediaModalData(null)
		setEditingMediaId(null)
	}

	const removeMediaItem = (mediaId: string) => {
		setFormData(prev => ({
			...prev,
			mediaItems: prev.mediaItems.filter(item => item.id !== mediaId)
		}))
	}	// Generate preview HTML
	useEffect(() => {
		if (previewMode && formData.content) {
			markdownToHtmlPreview(formData.content, formData.mediaItems)
				.then(html => setPreviewHtml(html))
		}
	}, [previewMode, formData.content, formData.mediaItems])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			// Convert markdown to HTML and process media placeholders
			const { html, mediaUsed } = await markdownToHtml(formData.content, formData.mediaItems)

			// Filter media items to only include used ones
			const usedMediaItems = formData.mediaItems.filter(item => mediaUsed.includes(item.id))

			// TODO: In production, upload media files here and get real URLs
			// For now, we'll simulate the upload process
			const uploadedMediaItems = await Promise.all(
				usedMediaItems.map(async (media) => {
					// Simulate media upload - in production, upload to your storage service
					const formData = new FormData()
					formData.append('file', media.file)
					formData.append('type', media.type)
					formData.append('title', media.title)
					formData.append('id', media.id)

					// TODO: Replace with actual upload API call
					// const uploadResponse = await fetch('/api/admin/media/upload', { method: 'POST', body: formData })
					// const { url } = await uploadResponse.json()

					// For now, create a mock URL
					const mockUrl = `api/admin/uploads/${media.id}.${media.file.name.split('.').pop()}`

					return {
						id: media.id,
						title: media.title,
						type: media.type,
						filename: media.file.name,
						url: mockUrl,
						caption: media.caption
					}
				})
			)

			const submitData = {
				...formData,
				htmlContent: html,
				mediaItems: uploadedMediaItems,
				publishedAt: formData.status === 'published' ? new Date().toISOString() : null
			}

			const response = await fetch('/api/admin/blog', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(submitData),
			})

			if (response.ok) {
				router.push('/admin/blog')
			} else {
				throw new Error('Failed to create post')
			}
		} catch (error) {
			console.error('Failed to create post:', error)
			alert('Failed to create post. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="px-4 py-6 sm:px-6 lg:px-8 max-w-4xl mx-auto">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
						Create New Blog Post
					</h1>
					<button
						type="button"
						onClick={() => setPreviewMode(!previewMode)}
						className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
					>
						{previewMode ? 'Edit' : 'Preview'}
					</button>
				</div>

				{!previewMode ? (
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Title */}
						<div>
							<label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
								Title
							</label>
							<input
								type="text"
								id="title"
								value={formData.title}
								onChange={(e) => handleTitleChange(e.target.value)}
								className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
								placeholder="Enter post title..."
								required
							/>
						</div>

						{/* Slug */}
						<div>
							<label htmlFor="slug" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
								URL Slug
							</label>
							<input
								type="text"
								id="slug"
								value={formData.slug}
								onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
								className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
								placeholder="url-friendly-slug"
								required
							/>
						</div>

						{/* Excerpt */}
						<div>
							<label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
								Excerpt
							</label>
							<textarea
								id="excerpt"
								value={formData.excerpt}
								onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
								rows={3}
								className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
								placeholder="Brief description of the post..."
								required
							/>
						</div>

						{/* Content */}
						<div>
							<label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
								Content (Markdown supported)
							</label>
							<textarea
								id="content"
								value={formData.content}
								onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
								rows={20}
								className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
								placeholder="Write your post content in Markdown..."
								required
							/>
							<div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
								<p>Tip: Attach media files, then use <code>{'{{media:your-media-id}}'}</code> in your content to embed them.</p>
								<p>You can also add captions: <code>{'{{media:your-media-id:Your caption text}}'}</code></p>
							</div>
						</div>

						{/* Media Upload */}
						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
								Media Attachments
							</label>
							<div className="space-y-4">
								{/* Upload Controls */}
								<div className="flex flex-wrap gap-2">
									<label className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-md cursor-pointer text-sm font-medium">
										📷 Attach Image
										<input
											type="file"
											accept="image/*"
											className="hidden"
											onChange={(e) => {
												const file = e.target.files?.[0]
												if (file) {
													handleMediaAttach(file, 'image')
												}
											}}
										/>
									</label>
									<label className="bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-800 dark:text-green-300 px-4 py-2 rounded-md cursor-pointer text-sm font-medium">
										🎥 Attach Video
										<input
											type="file"
											accept="video/*"
											className="hidden"
											onChange={(e) => {
												const file = e.target.files?.[0]
												if (file) {
													handleMediaAttach(file, 'video')
												}
											}}
										/>
									</label>
									<label className="bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-md cursor-pointer text-sm font-medium">
										🎵 Attach Audio
										<input
											type="file"
											accept="audio/*"
											className="hidden"
											onChange={(e) => {
												const file = e.target.files?.[0]
												if (file) {
													handleMediaAttach(file, 'audio')
												}
											}}
										/>
									</label>
								</div>

								{/* Media Library */}
								{formData.mediaItems.length > 0 && (
									<div>
										<h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
											Attached Media ({formData.mediaItems.length})
										</h4>
										<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
											{formData.mediaItems.map((media) => (
												<div key={media.id} className="border border-slate-200 dark:border-slate-600 rounded-lg p-3">
													{/* Media Preview */}
													<div className="mb-2">
														{media.type === 'image' && (
															<img
																src={URL.createObjectURL(media.file)}
																alt={media.title}
																className="w-full h-24 object-cover rounded"
															/>
														)}
														{media.type === 'video' && (
															<video
																src={URL.createObjectURL(media.file)}
																className="w-full h-24 object-cover rounded"
															/>
														)}
														{media.type === 'audio' && (
															<div className="w-full h-24 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center">
																<span className="text-2xl">🎵</span>
															</div>
														)}
													</div>

													{/* Media Info */}
													<div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
														<p className="truncate font-medium">{media.title}</p>
														<p className="capitalize">{media.type}</p>
														<p className="text-slate-500">ID: {media.id}</p>
														<p>{(media.file.size / 1024 / 1024).toFixed(1)} MB</p>
														{media.caption && (
															<p className="italic">Caption: {media.caption}</p>
														)}
													</div>

													{/* Actions */}
													<div className="flex justify-between items-center gap-1">
														<button
															type="button"
															onClick={() => {
																const placeholder = `{{media:${media.id}}}`
																setFormData(prev => ({
																	...prev,
																	content: prev.content + '\n\n' + placeholder + '\n\n'
																}))
															}}
															className="text-xs bg-blue-100 dark:bg-blue-700 hover:bg-blue-200 dark:hover:bg-blue-600 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"
														>
															Insert
														</button>
														<button
															type="button"
															onClick={() => handleEditMedia(media.id)}
															className="text-xs bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 px-2 py-1 rounded"
														>
															Edit
														</button>
														<button
															type="button"
															onClick={() => removeMediaItem(media.id)}
															className="text-xs text-red-600 hover:text-red-800 px-2 py-1"
														>
															Remove
														</button>
													</div>
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Tags */}
						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
								Tags
							</label>
							<div className="flex items-center space-x-2 mb-2">
								<input
									type="text"
									value={tagInput}
									onChange={(e) => setTagInput(e.target.value)}
									onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
									className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
									placeholder="Add a tag..."
								/>
								<button
									type="button"
									onClick={addTag}
									className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600"
								>
									Add
								</button>
							</div>
							{formData.tags.length > 0 && (
								<div className="flex flex-wrap gap-2">
									{formData.tags.map((tag) => (
										<span
											key={tag}
											className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
										>
											{tag}
											<button
												type="button"
												onClick={() => removeTag(tag)}
												className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
											>
												×
											</button>
										</span>
									))}
								</div>
							)}
						</div>

						{/* Status */}
						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
								Status
							</label>
							<select
								value={formData.status}
								onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'published' | 'draft' }))}
								className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
							>
								<option value="draft">Draft</option>
								<option value="published">Published</option>
							</select>
						</div>

						{/* Actions */}
						<div className="flex justify-between">
							<button
								type="button"
								onClick={() => router.back()}
								className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={isLoading}
								className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-md font-medium"
							>
								{isLoading ? 'Creating...' : 'Create Post'}
							</button>
						</div>
					</form>
				) : (
					/* Preview Mode */
					<div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
						<h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
							{formData.title || 'Untitled Post'}
						</h1>
						<p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
							{formData.excerpt || 'No excerpt provided.'}
						</p>
						{formData.tags.length > 0 && (
							<div className="flex flex-wrap gap-2 mb-6">
								{formData.tags.map((tag) => (
									<span
										key={tag}
										className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md text-sm"
									>
										{tag}
									</span>
								))}
							</div>
						)}

						{/* Rendered HTML Content */}
						<div className="prose prose-lg dark:prose-invert max-w-none
							prose-headings:text-slate-900 dark:prose-headings:text-slate-100
							prose-p:text-slate-700 dark:prose-p:text-slate-300
							prose-a:text-blue-600 dark:prose-a:text-blue-400
							prose-code:text-pink-600 dark:prose-code:text-pink-400
							prose-pre:bg-slate-800 prose-pre:text-slate-100">

							{previewHtml ? (
								<div
									dangerouslySetInnerHTML={{ __html: previewHtml }}
									className="[&_.media-figure]:my-6 [&_.media-image]:w-full [&_.media-image]:rounded-lg [&_.media-image]:shadow-md 
										[&_.media-video]:w-full [&_.media-video]:rounded-lg [&_.media-audio]:w-full 
										[&_.media-caption]:text-center [&_.media-caption]:text-sm [&_.media-caption]:text-slate-600 [&_.media-caption]:mt-2 [&_.media-caption]:italic
										[&_.media-error]:bg-red-100 [&_.media-error]:border [&_.media-error]:border-red-300 [&_.media-error]:text-red-700 [&_.media-error]:px-4 [&_.media-error]:py-2 [&_.media-error]:rounded"
								/>
							) : (
								<div className="text-slate-500 dark:text-slate-400 italic">
									Loading preview...
								</div>
							)}
						</div>

						{/* Media Usage Info */}
						{formData.mediaItems.length > 0 && (
							<div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700">
								<h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
									Media Usage
								</h4>
								<div className="text-xs text-slate-500 dark:text-slate-400">
									{extractMediaPlaceholders(formData.content).map(({ id, caption }) => {
										const media = formData.mediaItems.find(m => m.id === id)
										return (
											<div key={id} className="flex items-center space-x-2 mb-1">
												<span className={media ? 'text-green-600' : 'text-red-600'}>
													{media ? '✓' : '✗'}
												</span>
												<span>{id}</span>
												{caption && <span className="italic">({caption})</span>}
												{!media && <span className="text-red-600">- Media not found</span>}
											</div>
										)
									})}
								</div>
							</div>
						)}
					</div>
				)}
			</motion.div>

			{/* Media Metadata Modal */}
			{showMediaModal && mediaModalData && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md mx-4">
						<div className="p-6">
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
									{editingMediaId ? 'Edit Media' : 'Add Media'}
								</h3>
								<button
									onClick={handleCancelMedia}
									className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
								>
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>

							{/* Media Preview */}
							<div className="mb-4">
								<div className="w-full h-32 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center overflow-hidden">
									{mediaModalData.type === 'image' && (
										<img
											src={URL.createObjectURL(mediaModalData.file)}
											alt="Preview"
											className="w-full h-32 object-cover rounded-lg"
										/>
									)}
									{mediaModalData.type === 'video' && (
										<video
											src={URL.createObjectURL(mediaModalData.file)}
											className="w-full h-32 object-cover rounded-lg"
										/>
									)}
									{mediaModalData.type === 'audio' && (
										<div className="text-center">
											<span className="text-4xl mb-2 block">🎵</span>
											<p className="text-sm text-slate-600 dark:text-slate-400">Audio File</p>
										</div>
									)}
								</div>
								<p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
									{mediaModalData.file.name} • {(mediaModalData.file.size / 1024 / 1024).toFixed(1)} MB
								</p>
							</div>

							{/* Form Fields */}
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
										Title
									</label>
									<input
										type="text"
										value={mediaModalData.title}
										onChange={(e) => setMediaModalData(prev => prev ? { ...prev, title: e.target.value } : null)}
										className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
										placeholder="Enter media title..."
										required
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
										ID (for placeholders)
									</label>
									<input
										type="text"
										value={mediaModalData.id}
										onChange={(e) => setMediaModalData(prev => prev ? { ...prev, id: e.target.value } : null)}
										className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
										placeholder="media-id"
										pattern="[a-z0-9-]+"
										required
									/>
									<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
										Use lowercase letters, numbers, and hyphens only. This will be used in {`{{media:${mediaModalData.id || 'id'}}}`}
									</p>
								</div>

								<div>
									<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
										Default Caption (optional)
									</label>
									<textarea
										value={mediaModalData.caption}
										onChange={(e) => setMediaModalData(prev => prev ? { ...prev, caption: e.target.value } : null)}
										rows={2}
										className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
										placeholder="Enter default caption..."
									/>
									<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
										This caption will be used unless overridden in the placeholder: {`{{media:${mediaModalData.id || 'id'}:custom caption}}`}
									</p>
								</div>
							</div>

							{/* Actions */}
							<div className="flex justify-end space-x-3 mt-6">
								<button
									onClick={handleCancelMedia}
									className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
								>
									Cancel
								</button>
								<button
									onClick={handleSaveMedia}
									disabled={!mediaModalData.title.trim() || !mediaModalData.id.trim()}
									className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md font-medium"
								>
									{editingMediaId ? 'Save Changes' : 'Add Media'}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
