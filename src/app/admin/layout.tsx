// This is a minimal admin layout that doesn't enforce authentication
// Individual pages will handle their own auth requirements

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="min-h-screen bg-slate-50 dark:bg-slate-900">
			{children}
		</div>
	)
}
