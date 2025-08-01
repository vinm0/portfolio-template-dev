"use client"

import { useEffect } from 'react'

// Simple regex-based syntax highlighting for common languages
const syntaxHighlighting = {
	javascript: {
		keyword: /\b(const|let|var|function|if|else|for|while|return|class|extends|import|export|from|default|async|await|try|catch|finally|throw|new|this|super|static|public|private|protected)\b/g,
		string: /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g,
		comment: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
		function: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
		number: /\b\d+\.?\d*\b/g,
		operator: /[+\-*/%=<>!&|?:]/g,
	},
	typescript: {
		keyword: /\b(const|let|var|function|if|else|for|while|return|class|extends|import|export|from|default|async|await|try|catch|finally|throw|new|this|super|static|public|private|protected|interface|type|enum|namespace|module|declare|readonly|abstract)\b/g,
		string: /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g,
		comment: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
		function: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
		number: /\b\d+\.?\d*\b/g,
		operator: /[+\-*/%=<>!&|?:]/g,
	},
	python: {
		keyword: /\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|raise|with|lambda|yield|global|nonlocal|pass|break|continue|and|or|not|in|is|True|False|None)\b/g,
		string: /(["'])(?:(?!\1)[^\\]|\\.)*\1|"""[\s\S]*?"""|'''[\s\S]*?'''/g,
		comment: /#.*$/gm,
		function: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g,
		number: /\b\d+\.?\d*\b/g,
		operator: /[+\-*/%=<>!&|]/g,
	},
	css: {
		keyword: /\b(color|background|margin|padding|border|font|display|position|width|height|top|left|right|bottom|z-index|opacity|transform|transition|animation)\b/g,
		string: /(["'])(?:(?!\1)[^\\]|\\.)*\1/g,
		comment: /(\/\*[\s\S]*?\*\/)/g,
		function: /([a-zA-Z-]+)\s*(?=\()/g,
		number: /\b\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|deg|s|ms)?\b/g,
		operator: /[{}:;,]/g,
	},
}

function highlightCode(code: string, language: string): string {
	const lang = language.toLowerCase()
	const rules = syntaxHighlighting[lang as keyof typeof syntaxHighlighting]

	if (!rules) return code

	// Create an array to store all matches with their positions
	const matches: Array<{
		start: number
		end: number
		type: string
		text: string
	}> = []

	// Find all matches for each rule type
	Object.entries(rules).forEach(([type, regex]) => {
		// Reset regex to avoid issues with global flag
		regex.lastIndex = 0
		let match
		while ((match = regex.exec(code)) !== null) {
			matches.push({
				start: match.index,
				end: match.index + match[0].length,
				type: type,
				text: match[0]
			})
			// Prevent infinite loop on zero-length matches
			if (match.index === regex.lastIndex) {
				regex.lastIndex++
			}
		}
	})

	// Sort matches by start position
	matches.sort((a, b) => a.start - b.start)

	// Remove overlapping matches (keep the first one)
	const filteredMatches = []
	let lastEnd = 0

	for (const match of matches) {
		if (match.start >= lastEnd) {
			filteredMatches.push(match)
			lastEnd = match.end
		}
	}

	// Build the highlighted string
	let result = ''
	let currentPos = 0

	for (const match of filteredMatches) {
		// Add text before the match
		result += code.slice(currentPos, match.start)
		// Add the highlighted match
		result += `<span class="${match.type}">${match.text}</span>`
		currentPos = match.end
	}

	// Add remaining text
	result += code.slice(currentPos)

	return result
} export function useSyntaxHighlighting() {
	useEffect(() => {
		// Find all code blocks and apply syntax highlighting
		const codeBlocks = document.querySelectorAll('.prose-custom pre code')

		codeBlocks.forEach((block) => {
			const pre = block.parentElement as HTMLPreElement
			if (!pre || pre.dataset.highlighted === 'true') return

			// Extract language from class name
			const className = block.className
			const languageMatch = className.match(/language-(\w+)/)
			const language = languageMatch ? languageMatch[1] : 'text'

			// Get the code content
			const code = block.textContent || ''

			if (language !== 'text' && code.trim()) {
				// Apply syntax highlighting
				const highlightedCode = highlightCode(code, language)
				block.innerHTML = highlightedCode

				// Add language label
				pre.setAttribute('data-language', language)
				pre.dataset.highlighted = 'true'
			}
		})
	})
}
