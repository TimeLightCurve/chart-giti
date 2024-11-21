import { CanvasBoundsContainer } from '../../canvas/canvas-bounds-container';
import { FullChartConfig } from '../../chart.config';
import { Drawer, DrawingManager } from '../../drawers/drawing-manager';
import EventBus from '../../events/event-bus';
import { CanvasModel } from '../../model/canvas.model';
import { ChartBaseElement } from '../../model/chart-base-element';
import { ChartModel } from '../chart/chart.model';
import { HighlightsDrawer } from './highlights.drawer';
import { Highlight, HighlightsModel } from './highlights.model';

const HIGHLIGHTS_DRAWER_TYPE = 'HIGHLIGHTS_PLUGIN';

export class HighlightsComponent extends ChartBaseElement {
	private readonly highlightsModel: HighlightsModel;
	private highLightsDrawer: Drawer;
	constructor(
		private eventBus: EventBus,
		private config: FullChartConfig,
		chartModel: ChartModel,
		canvasModel: CanvasModel,
		canvasBoundsContainer: CanvasBoundsContainer,
		drawingManager: DrawingManager,
	) {
		super();
		this.highlightsModel = new HighlightsModel(chartModel);
		this.addChildEntity(this.highlightsModel);
		this.highLightsDrawer = new HighlightsDrawer(
			this.highlightsModel,
			chartModel,
			canvasModel,
			canvasBoundsContainer,
			config,
		);
		drawingManager.addDrawer(this.highLightsDrawer, HIGHLIGHTS_DRAWER_TYPE);
	}

	/**
	 * Returns the highlights from the highlightsModel
	 * @returns {Array} An array of highlights
	 */
	public getHighlights() {
		return this.highlightsModel.getHighlights();
	}

	/**
	 * Sets the highlights of the highlights model.
	 * @param {Highlight[]} highlights - An array of Highlight objects to be set as the highlights of the model.
	 * @returns {void}
	 */
	public setHighlights(highlights: Highlight[]): void {
		this.highlightsModel.setHighlights(highlights);
	}

	/**
	 * Sets the visibility of the highlights component.
	 * @param {boolean} visible - A boolean value indicating whether the highlights should be visible or not. Default value is true.
	 * @returns {void}
	 */
	public setHighlightsVisible(visible: boolean = true): void {
		this.config.components.highlights.visible = visible;
		this.eventBus.fireDraw(this.highLightsDrawer.getCanvasIds());
	}

	/**
	 * Returns an observable that emits when the highlights are updated.
	 * @returns {Observable} An observable that emits when the highlights are updated.
	 */
	public observeHighlightsUpdated() {
		return this.highlightsModel.observeHighlightsUpdated();
	}
}
