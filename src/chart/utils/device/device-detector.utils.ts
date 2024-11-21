
export type Devices = 'apple' | 'mobile' | 'other';

/**
 * Detects the user device. Naive approach.
 * @doc-tags tricky,mobile
 */
export const deviceDetector = (): Devices => {
	const isApple = /Mac|iPod|iPhone|iPad/i.test(navigator.userAgent);

	const mobileMatch = [/Android/i, /webOS/i, /BlackBerry/i, /Windows Phone/i];
	const isMobile = mobileMatch.some(os => {
		return navigator.userAgent.match(os);
	});

	if (isApple) {
		return 'apple';
	}

	if (isMobile) {
		return 'mobile';
	}

	return 'other';
};

export const multiplyZoomByDevice = (device: Devices, defaultValue: number): number => {
	if (device === 'apple' || device === 'mobile') {
		return 3;
	}
	return defaultValue;
};
