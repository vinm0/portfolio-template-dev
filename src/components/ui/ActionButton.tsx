import { cn } from '@/lib/utils';
import { Github } from 'lucide-react';
import Link, { LinkProps } from 'next/link';
import React, { ReactElement } from 'react';

interface ActionButtonProps extends LinkProps {
	href: string;
	text: string;
	external?: boolean;
	openInNewTab?: boolean;
	icon?: ReactElement | string;
	className?: string;
}

function ActionButton({ href, className, text, external, openInNewTab, icon, ...props }: ActionButtonProps) {
	return (
		<Link
			href={href}
			target={openInNewTab ? "_blank" : "_self"}
			role='button'
			rel={external ? "noopener noreferrer" : undefined}
			className={cn(
				"inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-colors",
				external
					? "bg-blue-600 text-white hover:bg-blue-700"
					: "bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600",
				"focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900",
				"shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200",
				className
			)}
			{...props}
		>
			{icon || <Github className="w-5 h-5" />}
			{text}
		</Link>
	)
}
