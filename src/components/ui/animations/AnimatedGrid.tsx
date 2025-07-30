import useResponsiveClasses from "lib/hooks/useResponsiveClasses"
import { motion, AnimatePresence, AnimatePresenceProps } from "framer-motion"
import React, { useEffect, useState } from "react"

interface AnimatedGridProps<T> extends AnimatePresenceProps {
	items: T[]
	gridClassName?: string
	itemClassName?: string
	renderItem: (item: T, index: number) => React.ReactNode
	getItemKey?: (item: T, index: number) => React.Key
}

export function AnimatedGrid<T>({
	items,
	gridClassName = '',
	itemClassName,
	renderItem,
	getItemKey,
	mode = "wait",
	...props
}: AnimatedGridProps<T>) {
	const [isTransitioning, setIsTransitioning] = useState(false)

	useEffect(() => {
		setIsTransitioning(true)

		// Delay the category change to allow exit animation
		setTimeout(() => {
			setIsTransitioning(false)
		}, 200)
	}, [items])

	return (
		<AnimatePresence mode={mode} {...props}>
			{!isTransitioning && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 10 }}
					transition={{ duration: 0.21 }}
					className={`grid ${gridClassName}`}
				>
					{items.map((item, index) => {
						const itemKey = getItemKey ? getItemKey(item, index) : index

						return (
							<motion.div
								key={itemKey}
								initial={{ x: 30 }}
								animate={{ x: 0 }}
								transition={{
									duration: 0.2,
									delay: index * 0.05,
									ease: "easeInOut"
								}}
								className="relative overflow-hidden p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-lg transition-all duration-400 cursor-pointer group"
							>
								{/* Shimmer effect */}
								<motion.div
									initial={{ x: "-100%" }}
									animate={{ x: "100%" }}
									transition={{
										duration: 0.5,
										delay: index * 0.05,
										ease: "easeInOut"
									}}
									className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
								/>

								{/* Item content */}
								{renderItem(item, index)}
							</motion.div>
						)
					})}
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default AnimatedGrid
