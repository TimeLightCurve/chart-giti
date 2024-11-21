import { CanvasAnimation } from '../../animation/canvas-animation';
import { CanvasBoundsContainer, CanvasElement } from '../../canvas/canvas-bounds-container';
import { FullChartConfig } from '../../chart.config';
import EventBus from '../../events/event-bus';
import { MainCanvasTouchHandler } from '../../inputhandlers/main-canvas-touch.handler';
import { CanvasInputListenerComponent } from '../../inputlisteners/canvas-input-listener.component';
import { ChartBaseElement } from '../../model/chart-base-element';
import { HitTestCanvasModel } from '../../model/hit-test-canvas.model';
import { ScaleModel } from '../../model/scale.model';
import { ChartAreaPanHandler } from '../chart/chart-area-pan.handler';
import { BaseType, ChartBaseModel } from '../chart/chart-base.model';

export class ChartPanComponent extends ChartBaseElement {
	public chartAreaPanHandler: ChartAreaPanHandler;
	public mainCanvasTouchHandler: MainCanvasTouchHandler;
	constructor(
		private eventBus: EventBus,
		private mainScale: ScaleModel,
		private canvasBoundsContainer: CanvasBoundsContainer,
		private config: FullChartConfig,
		private canvasAnimation: CanvasAnimation,
		private canvasInputListener: CanvasInputListenerComponent,
		private mainCanvasParent: Element,
		public chartBaseModel: ChartBaseModel<BaseType>,
		private hitTestCanvasModel: HitTestCanvasModel,
	) {
		super();
		this.chartAreaPanHandler = new ChartAreaPanHandler(
			this.eventBus,
			this.config,
			this.mainScale,
			this.canvasInputListener,
			this.canvasBoundsContainer,
			this.canvasAnimation,
			this,
			this.hitTestCanvasModel,
		);
		this.addChildEntity(this.chartAreaPanHandler);

		this.mainCanvasTouchHandler = new MainCanvasTouchHandler(
			this.chartAreaPanHandler,
			this.mainScale,
			this.canvasInputListener,
			this.mainCanvasParent,
			this.canvasBoundsContainer.getBoundsHitTest(CanvasElement.ALL_PANES),
		);
		this.addChildEntity(this.mainCanvasTouchHandler);
	}

	/**
	 * Activates user mouse handlers on main chart view.
	 * @function
	 * @name activateChartPanHandlers
	 * @memberof [object Object]
	 * @instance
	 * @returns {void}
	 */
	public activateChartPanHandlers() {
		this.activate();
	}

	/**
	 * Deactivates all the pan handlers of the chart.
	 */
	public deactivatePanHandlers() {
		this.deactivate();
	}

	public setChartPanningOptions(horizontal: boolean, vertical: boolean) {
		this.chartAreaPanHandler.chartPanningOptions = { horizontal, vertical };
	}
}
