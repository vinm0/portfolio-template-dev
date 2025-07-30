import { motion } from "framer-motion";

interface CtaButtonProps {
	href: string;
	children?: React.ReactNode;
}

function CtaButton({ href, children }: CtaButtonProps) {
	return (
		<a href={href}>
			<motion.button
				whileHover={{ scale: 1.1, y: -2 }}
				whileTap={{ scale: 0.95 }}
				className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer"
			>
				{children}
				<motion.div
					className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
					whileHover={{ scale: 1.1 }}
				/>
			</motion.button>
		</a>
	)
}