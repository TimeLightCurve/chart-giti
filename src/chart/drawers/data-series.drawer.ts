import { DynamicModelDrawer } from '../components/dynamic-objects/dynamic-objects.drawer';
import { PaneManager } from '../components/pane/pane-manager.component';
import { CanvasModel } from '../model/canvas.model';
import { DataSeriesModel, VisualSeriesPoint } from '../model/data-series.model';
import { clipToBounds } from '../utils/canvas/canvas-drawing-functions.utils';

export interface ChartDrawerConfig {
	singleColor?: string;
	forceBold?: number;
}

export interface SeriesDrawer {
	draw: (
		ctx: CanvasRenderingContext2D,
		/**
		 * You can pass two-dimension array to divide series into multiple parts
		 */
		points: VisualSeriesPoint[][],
		model: DataSeriesModel,
		drawerConfig: ChartDrawerConfig,
	) => void;
}

export const transformToTwoDimension = (
	points: VisualSeriesPoint[] | VisualSeriesPoint[][],
	// @ts-ignore
): VisualSeriesPoint[][] => (Array.isArray(points[0]) ? points : [points]);

/**
 * Basic data series drawer.
 * Have multiple paint tools: linear, histogram, points, text above/below candle and others.
 *
 * (may support multiple layers in future)
 */
export class DataSeriesDrawer implements DynamicModelDrawer<DataSeriesModel> {
	constructor(private paneManager: PaneManager, private readonly seriesDrawers: Record<string, SeriesDrawer>) {}

	draw(canvasModel: CanvasModel, model: DataSeriesModel, paneUUID?: string) {
		const ctx = canvasModel.ctx;
		const pane = paneUUID && this.paneManager.panes[paneUUID];

		if (model) {
			ctx.save();
			pane && clipToBounds(ctx, pane.getBounds());
			this.drawSeries(ctx, model);
			ctx.restore();
		}
	}

	public drawSeries(ctx: CanvasRenderingContext2D, series: DataSeriesModel) {
		if (series.config.visible) {
			const paintTool = series.config.type;
			const drawer = this.seriesDrawers[paintTool];
			if (drawer) {
				const viewportSeries = series.getSeriesInViewport(series.scale.xStart - 1, series.scale.xEnd + 1);
				if (viewportSeries && viewportSeries.length >= 1) {
					// +- 1 to correctly draw points which are partly inside bounds
					drawer.draw(ctx, viewportSeries, series, {});
				}
			} else {
				console.error(`Data series drawer with type ${paintTool} isn't registered!`);
			}
		}
	}
}

export const setLineWidth = (
	ctx: CanvasRenderingContext2D,
	lineWidth: number,
	dataSeries: DataSeriesModel,
	drawerConfig: ChartDrawerConfig,
	seriesSelectedWidth: number = lineWidth,
) => {
	if (drawerConfig.forceBold) {
		ctx.lineWidth = drawerConfig.forceBold;
	} else if (dataSeries.highlighted) {
		ctx.lineWidth = lineWidth !== seriesSelectedWidth ? lineWidth + 1 : seriesSelectedWidth;
	} else {
		ctx.lineWidth = lineWidth;
	}
};
