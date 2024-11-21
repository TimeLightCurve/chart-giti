

export const debounce = <T extends (...args: any[]) => any>(callback: T, waitFor: number) => {
	let timeout = 0;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = +setTimeout(() => callback(...args), waitFor);
	};
};
