import AnimatedModal from "./animations/AnimatedModal";

export interface ModalData {
	title: string;
	body: {
		[section: string]: string | string[];
	};
	tags?: {
		[category: string]: string[];
	};
	description?: string;
	actionButtons?: React.ReactNode;
}

interface ModalProps extends ModalData {
	isOpen: boolean;
	onClose: () => void;
}

function Modal({
	title,
	body,
	tags = {},
	description = "",
	actionButtons,
	isOpen,
	onClose,
}: ModalProps) {
	return (
		<AnimatedModal
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="p-8">
				<div className="flex items-start justify-between mb-6">
					<h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
						{title}
					</h3>
					<button
						onClick={onClose}
						className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
					>
						✕
					</button>
				</div>

				<p className="text-slate-600 dark:text-slate-400 mb-6">
					{description}
				</p>

				<div className="grid md:grid-cols-2 gap-8">
					{Object.entries(body).map(([section, content]) => (
						<div key={section}>
							<h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
								{section}
							</h4>
							{Array.isArray(content) ? (
								<ul className="list-disc pl-5 space-y-2">
									{content.map((item, index) => (
										<li key={index} className="text-slate-600 dark:text-slate-400 text-sm">
											{item}
										</li>
									))}
								</ul>
							) : (
								<p className="text-slate-600 dark:text-slate-400 text-sm">{content}</p>
							)}
						</div>
					))}
				</div>

				{Object.keys(tags).length > 0 && (
					<div className="mt-8">
						{Object.entries(tags).map(([category, items]) => (
							<div key={category}>
								<h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
									{category}
								</h4>
								<div className="flex flex-wrap gap-2">
									{items.map((item) => (
										<span
											key={item}
											className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md"
										>
											{item}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				)}

				{actionButtons && (
					<div className="mt-8 flex gap-4">
						{actionButtons}
					</div>
				)}
			</div>
		</AnimatedModal>
	);
}

Modal.displayName = "Modal";
export default Modal;