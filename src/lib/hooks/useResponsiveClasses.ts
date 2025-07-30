import { useState, useEffect } from 'react';

type ResponsiveClasses = number | {
	base: number;
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
	xxl?: number;
}

const CLASS_MAP: Record<string, Record<number, string>> = {
	'grid-cols': {
		1: 'grid-cols-1',
		2: 'grid-cols-2',
		3: 'grid-cols-3',
		4: 'grid-cols-4',
		5: 'grid-cols-5',
		6: 'grid-cols-6',
	},
	'gap': {
		1: 'gap-1',
		2: 'gap-2',
		4: 'gap-4',
		6: 'gap-6',
		8: 'gap-8',
	}
} as const;

function useResponsiveClasses(data: ResponsiveClasses, baseClass: string): string {
	const [responsiveData, setResponsiveData] = useState<ResponsiveClasses>(data);
	const [classNames, setClassNames] = useState<string>('');

	// Update the responsive classes whenever the data changes
	useEffect(() => {
		setResponsiveData(data);
	}, [data]);

	// Generate the class names based on the responsive data
	useEffect(() => {
		if (typeof responsiveData === 'number') {
			setClassNames(`${baseClass}-${responsiveData}`);
			return;
		}

		const classList: string[] = [];

		for (const res in responsiveData) {
			const resolution = res as keyof ResponsiveClasses;

			if (resolution === 'base') {
				classList.push(`${baseClass}-${responsiveData[resolution]}`);
			} else if (responsiveData[resolution] !== undefined) {
				const className = CLASS_MAP[baseClass]?.[responsiveData[resolution]];
				if (className) {
					classList.push(`${resolution}:${className}`);
				}
			}
		}

		setClassNames(classList.join(' '));
	}, [data, baseClass]);

	return classNames;
}

useResponsiveClasses.displayName = 'useResponsiveClasses';
export default useResponsiveClasses;
