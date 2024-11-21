import { CanvasBoundsContainer } from '../../canvas/canvas-bounds-container';
import { FullChartConfig } from '../../chart.config';
import { DrawingManager } from '../../drawers/drawing-manager';
import { CanvasModel } from '../../model/canvas.model';
import { ChartBaseElement } from '../../model/chart-base-element';
import { ChartModel } from '../chart/chart.model';
import { HighLowDrawer } from './high-low.drawer';

/**
 * Shows the highest and lowest prices labels over all candles in chart (not only in viewport).
 */
export class HighLowComponent extends ChartBaseElement {
	constructor(
		config: FullChartConfig,
		canvasModel: CanvasModel,
		chartModel: ChartModel,
		canvasBoundsContainer: CanvasBoundsContainer,
		drawingManager: DrawingManager,
	) {
		super();
		const hiLowDrawer = new HighLowDrawer(canvasModel, chartModel, config, canvasBoundsContainer);
		drawingManager.addDrawer(hiLowDrawer, 'HIGH_LOW');
	}
}
