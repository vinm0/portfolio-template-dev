"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { AUTHOR } from "@/lib/constants/brand"
import Link from "next/link"

const roles = [
	"Full-Stack Engineer",
	"UI/UX Engineer",
	"Cloud Architect",
	"Problem Solver",
	"Innovation Catalyst"
]

const floatingElements = [
	{ emoji: "⚡", delay: 0 },
	{ emoji: "🚀", delay: 0.5 },
	{ emoji: "💡", delay: 1 },
	{ emoji: "✨", delay: 1.5 },
	{ emoji: "🎯", delay: 2 },
	{ emoji: "🌟", delay: 2.5 }
]

const techBadges = [
	{ name: "React", color: "bg-blue-500", delay: 0.1 },
	{ name: "TypeScript", color: "bg-indigo-500", delay: 0.2 },
	{ name: "Node.js", color: "bg-yellow-500", delay: 0.3 },
	{ name: "Python", color: "bg-green-700", delay: 0.4 },
	{ name: "AWS", color: "bg-orange-500", delay: 0.5 },
	{ name: "Docker", color: "bg-cyan-500", delay: 0.6 }
]

export function HeroSectionNew() {
	const [currentRole, setCurrentRole] = useState(0)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [isHovering, setIsHovering] = useState(false)

	// Memoize random values to prevent recalculation on every render
	const floatingPositions = useMemo(() => {
		return floatingElements.map(() => {
			const angle = Math.random() * 360 * (Math.PI / 180)
			const photoRadius = 160
			const minDistance = photoRadius + 20
			const maxDistance = photoRadius + 100
			const distance = minDistance + Math.random() * (maxDistance - minDistance)
			return {
				x: Math.cos(angle) * distance,
				y: Math.sin(angle) * distance,
				scale: 0.8 + Math.random() * 0.4,
				delay: Math.random() * 1.5
			}
		})
	}, [isHovering])

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentRole((prev) => (prev + 1) % roles.length)
		}, 3000)
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY })
		}
		window.addEventListener("mousemove", handleMouseMove)
		return () => window.removeEventListener("mousemove", handleMouseMove)
	}, [])

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				{/* Floating Geometric Shapes */}
				<motion.div
					className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
					animate={{
						y: [0, -20, 0],
						scale: [1, 1.1, 1],
						rotate: [0, 180, 360]
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				/>
				<motion.div
					className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl"
					animate={{
						y: [0, 20, 0],
						scale: [1, 0.9, 1],
						rotate: [360, 180, 0]
					}}
					transition={{
						duration: 6,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				/>

				{/* Interactive Mouse Follower */}
				<motion.div
					className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl pointer-events-none"
					animate={{
						x: mousePosition.x - 192,
						y: mousePosition.y - 192,
					}}
					transition={{
						type: "spring",
						stiffness: 150,
						damping: 15
					}}
				/>
			</div>

			<div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Left Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="text-center lg:text-left"
					>
						{/* Greeting Animation */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.6 }}
							className="mb-6"
						>
							<span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-sm font-medium text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
								<motion.span
									animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
									transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
									className="text-lg"
								>
									👋
								</motion.span>
								Hello, I'm {AUTHOR.SHORT_NAME}
							</span>
						</motion.div>

						{/* Main Title */}
						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.8 }}
							className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6"
						>
							Software Engineer{" "}
							<span className="relative">
								<span className="inline-block mt-1 pb-2">
									<AnimatePresence mode="wait">
										<motion.span
											key={currentRole}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -20 }}
											transition={{ duration: 0.5 }}
											className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight"
											style={{
												WebkitBackgroundClip: 'text',
												backgroundClip: 'text',
												paddingBottom: '0.1em'
											}}
										>
											{roles[currentRole]}
										</motion.span>
									</AnimatePresence>
								</span>
								<motion.div
									className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
									initial={{ width: 0 }}
									animate={{ width: "100%" }}
									transition={{ delay: 0.8, duration: 0.8 }}
								/>
							</span>
						</motion.h1>

						{/* Description */}
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.6 }}
							className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed"
						>
							Crafting digital experiences that blend{" "}
							<span className="font-semibold text-blue-600 dark:text-blue-400">innovation</span>,{" "}
							<span className="font-semibold text-purple-600 dark:text-purple-400">functionality</span>, and{" "}
							<span className="font-semibold text-indigo-600 dark:text-indigo-400">beautiful design</span>.
							Let's build something amazing together! 🚀
						</motion.p>

						{/* Tech Badges */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.8, duration: 0.6 }}
							className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start"
						>
							{techBadges.map((tech, index) => (
								<motion.span
									key={tech.name}
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 1 + tech.delay, duration: 0.4 }}
									whileHover={{
										scale: 1.1,
										y: -2,
										transition: { duration: 0.2 }
									}}
									className={cn(
										"px-3 py-1 rounded-full text-white text-sm font-medium cursor-pointer",
										tech.color
									)}
								>
									{tech.name}
								</motion.span>
							))}
						</motion.div>

						{/* CTA Buttons */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
						>
							<Link href="#contact" shallow>
								<motion.button
									whileHover={{ scale: 1.1, y: -2, all: "ease-in-out" }}
									whileTap={{ scale: 0.95 }}
									transition={{ duration: 0.2 }}
									className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:to-blue-600 hover:from-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer"
								>
									Let's Connect
								</motion.button>

							</Link>
							<Link href="#projects" shallow>
								<motion.button
									whileHover={{ scale: 1.1, y: -2 }}
									whileTap={{ scale: 0.95 }}
									transition={{ duration: 0.2 }}
									className="px-8 py-4 border-2 border-slate-300 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-all cursor-pointer"
								>
									View My Work
								</motion.button>
							</Link>
						</motion.div>
					</motion.div>

					{/* Right Content - Profile Photo */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="relative flex justify-center"
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={() => setIsHovering(false)}
					>
						{/* Floating Emojis around photo */}
						{floatingElements.map((element, index) => {
							const position = floatingPositions[index]

							return (
								<motion.div
									key={index}
									className="absolute text-2xl"
									style={{
										left: '50%',
										top: '50%',
									}}
									initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
									animate={{
										opacity: isHovering ? 1 : 0,
										scale: isHovering ? position.scale : 0,
										x: isHovering ? position.x : 0,
										y: isHovering ? position.y : 0,
									}}
									transition={{
										delay: position.delay,
										duration: 0.6,
										type: "tween",
										ease: "easeInOut"
									}}
								>
									<motion.span
										animate={{
											y: [0, -5 - Math.random() * 10, 0], // Random float range
											rotate: [-15 + Math.random() * 30, 15 - Math.random() * 30, -15 + Math.random() * 30], // Random rotation
										}}
										transition={{
											duration: 1.5 + Math.random() * 1.5, // Random duration 1.5-3s
											repeat: Infinity,
											delay: Math.random() * 2, // Random animation delay
											ease: "easeInOut"
										}}
									>
										{element.emoji}
									</motion.span>
								</motion.div>
							)
						})}

						{/* Main Photo Container */}
						<div className="relative">
							{/* Glow Effect */}
							<motion.div
								className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-full blur-xl opacity-30"
								animate={{
									scale: isHovering ? 1.1 : 1,
									opacity: isHovering ? 0.5 : 0.3
								}}
								transition={{ duration: 0.3 }}
							/>

							{/* Photo Frame */}
							<motion.div
								className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl"
								whileHover={{
									scale: 1.05,
									rotate: 2,
									transition: { duration: 0.3 }
								}}
								animate={{
									y: [0, -10, 0],
								}}
								transition={{
									duration: 4,
									repeat: Infinity,
									ease: "easeInOut"
								}}
							>
								{/* Replace the above div with actual photo */}

								<Image
									// src="/static/images/WebCover2-1_1.png"
									src="/static/images/brand-profile-offset.jpg"
									// src="/static/images/Screenshot 2025-07-24 165440.png"
									alt="Vincent - Professional Photo"
									fill
									className="object-cover"
									priority
								/>

							</motion.div>

							{/* Animated Ring */}
							<motion.div
								className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400/50"
								animate={{ rotate: 360 }}
								transition={{
									duration: 20,
									repeat: Infinity,
									ease: "linear"
								}}
							/>
						</div>

						{/* Status Badge */}
						<motion.div
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 1.5, duration: 0.5 }}
							className="absolute bottom-8 right-8 bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg flex items-center gap-2"
						>
							<motion.div
								className="w-2 h-2 bg-white rounded-full"
								animate={{ scale: [1, 1.2, 1] }}
								transition={{ duration: 2, repeat: Infinity }}
							/>
							<a href="/#contact">
								Available for projects
							</a>
						</motion.div>
					</motion.div>
				</div>
			</div>

			{/* Scroll Indicator */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 2, duration: 0.6 }}
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
			>
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 1.5, repeat: Infinity }}
					className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400"
				>
					<span className="text-sm font-medium">Scroll to explore</span>
					<div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-600 rounded-full flex justify-center">
						<motion.div
							animate={{ y: [0, 12, 0] }}
							transition={{ duration: 1.5, repeat: Infinity }}
							className="w-1 h-3 bg-slate-400 dark:bg-slate-500 rounded-full mt-2"
						/>
					</div>
				</motion.div>
			</motion.div>
		</section>
	)
}
