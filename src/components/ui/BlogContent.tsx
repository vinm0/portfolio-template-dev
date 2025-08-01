"use client"

import { useEffect, useRef } from 'react'
import CodeBlock from './CodeBlock'

interface BlogContentProps {
	html: string
	className?: string
}

export default function BlogContent({ html, className = '' }: BlogContentProps) {
	const contentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!contentRef.current) return

		// Find all code block placeholders and replace them with syntax-highlighted components
		const codeBlocks = contentRef.current.querySelectorAll('[data-code-block]')

		codeBlocks.forEach((element) => {
			const language = element.getAttribute('data-language') || 'text'
			const encodedCode = element.getAttribute('data-code') || ''
			const code = decodeURIComponent(encodedCode)

			// Create a container for the React component
			const container = document.createElement('div')
			container.className = 'syntax-highlight-container'

			// Replace the placeholder with our container
			element.parentNode?.replaceChild(container, element)

			// We'll render the CodeBlock component here
			import('react-dom/client').then(({ createRoot }) => {
				const root = createRoot(container)
				root.render(<CodeBlock language={language}>{code}</CodeBlock>)
			}).catch(console.error)
		})
	}, [html])

	return (
		<div
			ref={contentRef}
			className={className}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	)
}
