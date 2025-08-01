import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { checkAuthFromCookies } from '@/lib/utils/auth'

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const cookieStore = await cookies()

	// Check if user is authenticated with valid JWT
	if (!await checkAuthFromCookies(cookieStore)) {
		redirect('/admin/login')
	}

	return (
		<>
			<nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
								Portfolio Admin
							</h1>
						</div>
						<div className="flex items-center space-x-4">
							<a
								href="/admin/dashboard"
								className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
							>
								Dashboard
							</a>
							<a
								href="/admin/blog"
								className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
							>
								Blog
							</a>
							<a
								href="/admin/projects"
								className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
							>
								Projects
							</a>
							<a
								href="/admin/settings"
								className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
							>
								Settings
							</a>
							<form action="/api/admin/logout" method="POST">
								<button
									type="submit"
									className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
								>
									Logout
								</button>
							</form>
						</div>
					</div>
				</div>
			</nav>
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				{children}
			</main>
		</>
	)
}
