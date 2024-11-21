import { Unit, ViewportModelState } from './viewport.model';

/**
 * Moves both xStart and xEnd without changing the viewport width (zoomX).
 * @param state
 * @param xStart - left starting point in units
 * @doc-tags scaling,viewport
 */
export const moveXStart = (state: ViewportModelState, xStart: Unit) => {
	const prev = state.xStart;
	state.xStart = xStart;
	state.xEnd = state.xEnd + (xStart - prev);
};

/**
 * Moves both yStart and yEnd without changing the viewport height (zoomY).
 * @param state
 * @param yStart - starting point in units
 * @doc-tags scaling,viewport
 */
export const moveYStart = (state: ViewportModelState, yStart: Unit) => {
	const prev = state.yStart;
	state.yStart = yStart;
	state.yEnd = state.yEnd + (yStart - prev);
};
