'use client';

import { AnimatePresence, AnimatePresenceProps, motion } from "framer-motion";

interface AnimatedModalProps extends AnimatePresenceProps {
	isOpen: boolean;
	children: React.ReactNode;
	onClose: () => void;
}

function AnimatedModal({ isOpen, children, onClose, ...props }: AnimatedModalProps) {
	return (
		<AnimatePresence {...props}>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
					onClick={onClose}
				>
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						className="bg-white dark:bg-slate-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

AnimatedModal.displayName = "AnimatedModal";
export default AnimatedModal;