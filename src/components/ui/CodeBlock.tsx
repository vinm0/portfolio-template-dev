"use client"

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useTheme } from 'next-themes'

// Import specific languages to keep bundle size smaller
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import sql from 'react-syntax-highlighter/dist/cjs/languages/prism/sql'
import yaml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'

// Register languages
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('js', javascript)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('ts', typescript)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('py', python)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('scss', scss)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('shell', bash)
SyntaxHighlighter.registerLanguage('sh', bash)
SyntaxHighlighter.registerLanguage('sql', sql)
SyntaxHighlighter.registerLanguage('yaml', yaml)
SyntaxHighlighter.registerLanguage('yml', yaml)
SyntaxHighlighter.registerLanguage('markdown', markdown)
SyntaxHighlighter.registerLanguage('md', markdown)

interface CodeBlockProps {
	children: string
	language?: string
	className?: string
}

export default function CodeBlock({ children, language, className }: CodeBlockProps) {
	const { theme } = useTheme()

	// Extract language from className if not provided (for markdown code blocks)
	const lang = language || className?.replace(/language-/, '') || 'text'

	// Clean up the code content
	const code = children.replace(/\n$/, '') // Remove trailing newline

	// Define custom styles to match your design
	const customStyle = {
		margin: 0,
		borderRadius: '0.5rem',
		fontSize: '0.875rem',
		lineHeight: '1.5',
	}

	const codeTagProps = {
		style: {
			fontFamily: 'var(--font-fira-code), "Fira Code", Consolas, "Monaco", "Courier New", monospace',
		}
	}

	return (
		<div className="relative group">
			{/* Language label */}
			{lang !== 'text' && (
				<div className="absolute top-2 right-2 z-10 bg-slate-700 dark:bg-slate-600 text-slate-200 text-xs px-2 py-1 rounded opacity-75 group-hover:opacity-100 transition-opacity">
					{lang}
				</div>
			)}

			<SyntaxHighlighter
				language={lang}
				style={theme === 'dark' ? vscDarkPlus : vs}
				customStyle={customStyle}
				codeTagProps={codeTagProps}
				showLineNumbers={false}
				wrapLines={true}
				wrapLongLines={true}
			>
				{code}
			</SyntaxHighlighter>
		</div>
	)
}
