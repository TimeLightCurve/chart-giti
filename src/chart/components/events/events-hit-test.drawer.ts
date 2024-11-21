import { CanvasBoundsContainer, CanvasElement } from '../../canvas/canvas-bounds-container';
import { FullChartConfig } from '../../chart.config';
import { Drawer } from '../../drawers/drawing-manager';
import { HitTestCanvasModel } from '../../model/hit-test-canvas.model';
import { ChartModel } from '../chart/chart.model';
import { getEventSize } from './events.drawer';
import { EventsModel } from './events.model';

const hoverExtendedAreaPixels = 5;

export class EventsHitTestDrawer implements Drawer {
	constructor(
		private hitTestCanvasModel: HitTestCanvasModel,
		private chartModel: ChartModel,
		private config: FullChartConfig,
		private canvasBoundsContainer: CanvasBoundsContainer,
		private model: EventsModel,
		private drawPredicate: () => boolean = () => true,
	) {}

	/**
     * Draws events on the hit test canvas.
     * @function
     * @name draw
     * @memberof CanvasElement.EVENTS
     * @instance
     * @returns {void}
      
    */
	draw(): void {
		if (this.drawPredicate()) {
			const ctx = this.hitTestCanvasModel.ctx;
			const bounds = this.canvasBoundsContainer.getBounds(CanvasElement.EVENTS);
			ctx.save();
			this.model.events.forEach((event, idx) => {
				const prevEvent = this.model.events[idx - 1];
				const prevX =
					prevEvent &&
					this.chartModel.candleFromTimestamp(prevEvent.timestamp).xCenter(this.chartModel.scale);
				const x = this.chartModel.candleFromTimestamp(event.timestamp).xCenter(this.chartModel.scale);
				if (x > bounds.x && x < bounds.x + bounds.width) {
					const color = this.config.colors.events[event.type].color;
					ctx.strokeStyle = color;
					ctx.fillStyle = color;
					const size = getEventSize(event);
					// draw hit test
					ctx.fillStyle = this.hitTestCanvasModel.idToColor(event.id);
					const hoverSize = (size + hoverExtendedAreaPixels) * 2;
					if (prevX !== undefined) {
						const prevSize = getEventSize(prevEvent);
						const isIntersectsWithPrev = prevX + prevSize > x - hoverSize / 2;
						if (isIntersectsWithPrev) {
							const hoverSize = size * 2 + hoverExtendedAreaPixels;
							ctx.fillRect(prevX + prevSize, bounds.y, hoverSize, bounds.height);
						} else {
							ctx.fillRect(x - size - hoverExtendedAreaPixels, bounds.y, hoverSize, bounds.height);
						}
					} else {
						ctx.fillRect(x - size - hoverExtendedAreaPixels, bounds.y, hoverSize, bounds.height);
					}
				}
			});
			ctx.restore();
		}
	}

	/**
	 * Returns an array of string containing the canvas ID of the hitTestCanvasModel.
	 * @returns {Array<string>} An array of string containing the canvas ID of the hitTestCanvasModel.
	 */
	getCanvasIds(): Array<string> {
		return [this.hitTestCanvasModel.canvasId];
	}
}
