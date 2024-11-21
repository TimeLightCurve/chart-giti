import { ViewportModel, ViewportModelState } from '../model/scaling/viewport.model';
import { CanvasAnimation, VIEWPORT_ANIMATION_ID } from './canvas-animation';

const VIEWPORT_ANIMATION_DURATION = 20;

/**
 * Starts the animation for chart viewport movement.
 * @param canvasAnimation
 * @param viewportModel
 * @param state
 * @doc-tags animation,viewport
 */
export const startViewportModelAnimation = (
	canvasAnimation: CanvasAnimation,
	viewportModel: ViewportModel,
	state: ViewportModelState,
) => {
	const animation = canvasAnimation.startViewportMovementAnimation(
		viewportModel,
		{
			duration: VIEWPORT_ANIMATION_DURATION,
			targetXStart: state.xStart,
			targetXEnd: state.xEnd,
			targetYStart: state.yStart,
			targetYEnd: state.yEnd,
			targetZoomX: state.zoomX,
			targetZoomY: state.zoomY,
		},
		VIEWPORT_ANIMATION_ID,
		() =>
			viewportModel.xStart === state.xStart &&
			viewportModel.xEnd === state.xEnd &&
			viewportModel.yStart === state.yStart &&
			viewportModel.yEnd === state.yEnd,
	);
	viewportModel.currentAnimation = animation;
};
