import { ViewportPercent } from '../scale.model';
import { ViewportModel, ViewportModelState } from './viewport.model';

/**
 * Zooms to percentage of viewport proportionally.
 * @param vm
 * @param state
 * @param viewportPercent
 * @param zoomStrength - 0..1 number, 1=max strength
 * @param zoomIn
 * @doc-tags viewport,zoom,scaling
 */
export const zoomXToPercentViewportCalculator = (
	vm: ViewportModel,
	state: ViewportModelState,
	viewportPercent: ViewportPercent,
	zoomStrength: number,
	zoomIn: boolean,
): ViewportModelState => {
	const deltaWidth = (state.xEnd - state.xStart) * zoomStrength;
	const deltaStart = deltaWidth * viewportPercent;
	const deltaEnd = deltaWidth * (1 - viewportPercent);
	if (zoomIn) {
		state.xStart = state.xStart + deltaStart;
		state.xEnd = state.xEnd - deltaEnd;
	} else {
		state.xStart = state.xStart - deltaStart;
		state.xEnd = state.xEnd + deltaEnd;
	}
	state.zoomX = vm.calculateZoomX(state.xStart, state.xEnd);
	return state;
};

/**
 * Zooms to viewports end.
 * @param vm
 * @param state
 * @param zoomStrength - 0..1 number, 1=max strength
 * @param zoomIn
 * @doc-tags viewport,zoom,scaling
 */
export const zoomXToEndViewportCalculator = (
	vm: ViewportModel,
	state: ViewportModelState,
	zoomStrength: number,
	zoomIn: boolean,
) => {
	return zoomXToPercentViewportCalculator(vm, state, 1, zoomStrength, zoomIn);
};
