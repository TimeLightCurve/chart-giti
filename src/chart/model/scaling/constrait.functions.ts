import { at } from '../../utils/array.utils';
import { Bounds } from '../bounds.model';
import VisualCandle from '../visual-candle';
import { ViewportModelState, pixelsToUnits } from './viewport.model';

/**
 * Return constraited state that handled zooming and moving chart near first/last candles
 * this and other constraits that works with state should mutate and return state
 * @param initialState
 * @param state
 * @param visualCandlesCoordinates
 * @param candleLimit
 * @param bounds
 * @returns
 * @doc-tags viewport,zoom,scaling
 */

export const candleEdgesConstrait = (
	state: ViewportModelState,
	visualCandlesCoordinates: VisualCandle[],
	candleLimit: number,
	bounds: Bounds,
) => {
	const newState = {
		...state,
	};

	const leftConstraitCoordinate = visualCandlesCoordinates[candleLimit]?.startUnit ?? 0;
	const rightConstraintCoordinate = at(-candleLimit, visualCandlesCoordinates)?.startUnit ?? 0;

	let normalizedXStart = state.xStart;
	let normalizedXEnd = state.xEnd;
	if (newState.xStart >= rightConstraintCoordinate) {
		normalizedXStart = rightConstraintCoordinate;
		normalizedXEnd = normalizedXEnd - (newState.xStart - rightConstraintCoordinate);
	}
	if (newState.xEnd < leftConstraitCoordinate) {
		normalizedXStart = leftConstraitCoordinate - pixelsToUnits(bounds.width, newState.zoomX);
		normalizedXEnd = leftConstraitCoordinate;
	}
	newState.xStart = normalizedXStart;
	newState.xEnd = normalizedXEnd;
	return newState;
};
