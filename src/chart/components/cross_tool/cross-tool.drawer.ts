import { FullChartConfig } from '../../chart.config';
import { Drawer } from '../../drawers/drawing-manager';
import { CanvasModel } from '../../model/canvas.model';
import { CrossToolHover, CrossToolModel, CrossToolType } from './cross-tool.model';

export interface CrossToolTypeDrawer {
	draw: (ctx: CanvasRenderingContext2D, hover: CrossToolHover) => void;
}

export class CrossToolDrawer implements Drawer {
	constructor(
		private model: CrossToolModel,
		private config: FullChartConfig,
		private crossToolCanvasModel: CanvasModel,
		private readonly crossToolTypeDrawers: Record<CrossToolType, CrossToolTypeDrawer>,
	) {}

	/**
	 * Draws the cross tool on the canvas.
	 * @function
	 * @name draw
	 * @memberof CrossToolCanvasView
	 * @instance
	 * @returns {void}
	 */
	draw() {
		const drawer = this.crossToolTypeDrawers[this.config.components.crossTool.type];
		if (drawer) {
			this.model.currentHover && drawer.draw(this.crossToolCanvasModel.ctx, this.model.currentHover);
		} else {
			console.error(
				`No cross tool drawer type registered for drawer type ${this.config.components.crossTool.type}`,
			);
		}
	}

	/**
	 * Returns an array of string containing the canvas ID of the crossToolCanvasModel.
	 *
	 * @returns {Array<string>} An array of string containing the canvas ID of the crossToolCanvasModel.
	 */
	getCanvasIds(): Array<string> {
		return [this.crossToolCanvasModel.canvasId];
	}
}
