export interface BoundsProvider {
	(): Bounds;
}

export interface Bounds {
	x: number;
	y: number;
	pageX: number;
	pageY: number;
	width: number;
	height: number;
}
