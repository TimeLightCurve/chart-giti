
export interface Unsubscriber {
	(): void;
}

export function clearerSafe(arr: Array<Unsubscriber>): Unsubscriber {
	return function doClearSafe(): void {
		arr.forEach(f => typeof f === 'function' && f());
		arr.length = 0;
	};
}

export function identity<T>(x: T): T {
	return x;
}

export function notEmpty<T>(value: T | null | undefined): value is T {
	return value !== null && value !== undefined;
}

export const constVoid = () => void 0;

export function nonNullableTypeGuard<T>(x: T | undefined | null): x is T {
	return x !== undefined && x !== null;
}
