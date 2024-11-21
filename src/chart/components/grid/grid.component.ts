import { FullChartConfig, YAxisConfig } from '../../chart.config';
import { CompositeDrawer } from '../../drawers/composite.drawer';
import { DrawingManager } from '../../drawers/drawing-manager';
import { BoundsProvider } from '../../model/bounds.model';
import { CanvasModel } from '../../model/canvas.model';
import { ChartBaseElement } from '../../model/chart-base-element';
import { Unit, ViewportModel } from '../../model/scaling/viewport.model';
import { NumericAxisLabel } from '../labels_generator/numeric-axis-labels.generator';
import { GridDrawer } from './grid.drawer';

export class GridComponent extends ChartBaseElement {
	private readonly drawer: GridDrawer;
	constructor(
		canvasModel: CanvasModel,
		viewportModel: ViewportModel,
		config: FullChartConfig,
		yAxisState: YAxisConfig,
		private drawerName: string,
		private drawingManager: DrawingManager | CompositeDrawer,
		xBoundsProvider: BoundsProvider,
		yBoundsProvider: BoundsProvider,
		xLabelsProvider: () => NumericAxisLabel[],
		yLabelsProvider: () => NumericAxisLabel[],
		getBaseline?: () => Unit,
		drawPredicate?: () => boolean,
	) {
		super();
		this.drawer = new GridDrawer(
			canvasModel,
			viewportModel,
			config,
			yAxisState,
			xBoundsProvider,
			yBoundsProvider,
			xLabelsProvider,
			yLabelsProvider,
			drawPredicate,
			getBaseline,
		);
	}

	/**
	 * This method is used to deactivate the drawer and remove it from the drawing manager.
	 * @protected
	 * @function
	 * @name doDeactivate
	 * @returns {void}
	 */
	protected doDeactivate() {
		super.doDeactivate();
		this.drawingManager.removeDrawer(this.drawer);
	}

	/**
	 * This method is used to activate the drawer. It calls the parent class's doActivate method and adds the drawer to the drawing manager.
	 * @protected
	 * @function
	 * @returns {void}
	 */
	protected doActivate() {
		super.doActivate();
		this.drawingManager.addDrawer(this.drawer, this.drawerName);
	}
}
