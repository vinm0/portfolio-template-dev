import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import { unified } from 'unified'

interface MediaItem {
	id: string
	title: string
	type: 'image' | 'video' | 'audio'
	file: File
	caption?: string
}

/**
 * Convert markdown to HTML with media placeholder processing for final submission
 * This function processes the content for final storage, uploading media and replacing placeholders
 */
export async function markdownToHtml(
	markdown: string,
	mediaItems: MediaItem[] = []
): Promise<{ html: string; mediaUsed: string[]; processedContent: string }> {
	const mediaUsed: string[] = []
	let processedMarkdown = markdown

	// Extract all media placeholders from the content
	const placeholders = extractMediaPlaceholders(markdown)

	// Process each placeholder
	for (const { id, caption } of placeholders) {
		const mediaItem = mediaItems.find(item => item.id === id)

		if (!mediaItem) {
			// Remove placeholder if no corresponding media found
			const placeholderRegex = new RegExp(`\\{\\{media:${id}(?::[^}]*)?\\}\\}`, 'g')
			processedMarkdown = processedMarkdown.replace(placeholderRegex, '')
			continue
		}

		mediaUsed.push(id)

		// For now, we'll create object URLs for the preview/submission
		// In production, you would upload the file here and get a real URL
		const objectUrl = URL.createObjectURL(mediaItem.file)
		const captionText = caption || mediaItem.caption || mediaItem.title || ''

		// Replace placeholder with appropriate HTML tag
		const placeholderRegex = new RegExp(`\\{\\{media:${id}(?::[^}]*)?\\}\\}`, 'g')

		let mediaHtml = ''
		switch (mediaItem.type) {
			case 'image':
				mediaHtml = `
<figure class="media-figure">
  <img 
    src="${objectUrl}" 
    alt="${mediaItem.title}" 
    class="media-image"
    loading="lazy"
  />
  ${captionText ? `<figcaption class="media-caption">${captionText}</figcaption>` : ''}
</figure>`.trim()
				break

			case 'video':
				mediaHtml = `
<figure class="media-figure">
  <video 
    src="${objectUrl}" 
    controls 
    class="media-video"
  >
    Your browser does not support the video tag.
  </video>
  ${captionText ? `<figcaption class="media-caption">${captionText}</figcaption>` : ''}
</figure>`.trim()
				break

			case 'audio':
				mediaHtml = `
<figure class="media-figure">
  <audio src="${objectUrl}" controls class="media-audio">
    Your browser does not support the audio tag.
  </audio>
  ${captionText ? `<figcaption class="media-caption">${captionText}</figcaption>` : ''}
</figure>`.trim()
				break

			default:
				mediaHtml = `<div class="media-error">Unsupported media type: ${mediaItem.type}</div>`
		}

		processedMarkdown = processedMarkdown.replace(placeholderRegex, mediaHtml)
	}

	// Convert markdown to HTML
	const result = await remark()
		.use(remarkGfm) // Support for tables, strikethrough, etc.
		.use(remarkHtml, {
			sanitize: false // We'll sanitize later if needed
		})
		.process(processedMarkdown)

	return {
		html: result.toString(),
		mediaUsed,
		processedContent: processedMarkdown
	}
}

/**
 * Preview function for showing content without processing media uploads
 */
export async function markdownToHtmlPreview(
	markdown: string,
	mediaItems: MediaItem[] = []
): Promise<string> {
	let processedMarkdown = markdown

	// For preview, replace placeholders with preview representations
	const placeholders = extractMediaPlaceholders(markdown)

	for (const { id, caption } of placeholders) {
		const mediaItem = mediaItems.find(item => item.id === id)
		const placeholderRegex = new RegExp(`\\{\\{media:${id}(?::[^}]*)?\\}\\}`, 'g')

		if (!mediaItem) {
			// Show placeholder not found message
			processedMarkdown = processedMarkdown.replace(
				placeholderRegex,
				`<div class="media-error">Media not found: ${id}</div>`
			)
			continue
		}

		const objectUrl = URL.createObjectURL(mediaItem.file)
		const captionText = caption || mediaItem.caption || mediaItem.title || ''

		let previewHtml = ''
		switch (mediaItem.type) {
			case 'image':
				previewHtml = `
<figure class="media-figure">
  <img 
    src="${objectUrl}" 
    alt="${mediaItem.title}" 
    class="media-image"
    loading="lazy"
  />
  ${captionText ? `<figcaption class="media-caption">${captionText}</figcaption>` : ''}
</figure>`.trim()
				break

			case 'video':
				previewHtml = `
<figure class="media-figure">
  <video src="${objectUrl}" controls class="media-video">
    Your browser does not support the video tag.
  </video>
  ${captionText ? `<figcaption class="media-caption">${captionText}</figcaption>` : ''}
</figure>`.trim()
				break

			case 'audio':
				previewHtml = `
<figure class="media-figure">
  <audio src="${objectUrl}" controls class="media-audio">
    Your browser does not support the audio tag.
  </audio>
  ${captionText ? `<figcaption class="media-caption">${captionText}</figcaption>` : ''}
</figure>`.trim()
				break

			default:
				previewHtml = `<div class="media-error">Unsupported media type: ${mediaItem.type}</div>`
		}

		processedMarkdown = processedMarkdown.replace(placeholderRegex, previewHtml)
	}

	// Convert markdown to HTML
	const result = await remark()
		.use(remarkGfm)
		.use(remarkHtml, {
			sanitize: false
		})
		.process(processedMarkdown)

	return result.toString()
}

/**
 * Extract media placeholders from markdown content
 */
export function extractMediaPlaceholders(markdown: string): Array<{ id: string; caption?: string }> {
	const mediaPlaceholderRegex = /\{\{media:([^:}]+)(?::([^}]*))?\}\}/g
	const placeholders: Array<{ id: string; caption?: string }> = []

	let match
	while ((match = mediaPlaceholderRegex.exec(markdown)) !== null) {
		placeholders.push({
			id: match[1],
			caption: match[2] || undefined
		})
	}

	return placeholders
}

/**
 * Sanitize HTML content (optional security layer)
 */
export function sanitizeHtml(html: string): string {
	// In production, you might want to use a library like DOMPurify
	// For now, we'll do basic sanitization
	return html
		.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
		.replace(/javascript:/gi, '')
		.replace(/on\w+\s*=/gi, '')
}

/**
 * Generate a unique media ID
 */
export function generateMediaId(): string {
	return `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
