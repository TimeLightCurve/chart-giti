import { ChartConfigComponentsChart } from '../../chart.config';
import { CandleSeriesModel } from '../../model/candle-series.model';
import { DataSeriesModel, VisualSeriesPoint } from '../../model/data-series.model';
import { flat } from '../../utils/array.utils';
import { floor } from '../../utils/math.utils';
import { ChartDrawerConfig, SeriesDrawer } from '../data-series.drawer';

export class AreaDrawer implements SeriesDrawer {
	constructor(private config: ChartConfigComponentsChart) {}

	public draw(
		ctx: CanvasRenderingContext2D,
		points: VisualSeriesPoint[][],
		model: DataSeriesModel,
		drawerConfig: ChartDrawerConfig,
	) {
		if (model instanceof CandleSeriesModel) {
			// @ts-ignore
			const visualCandles = flat(points);
			if (visualCandles.length === 0) {
				return;
			}
			if (drawerConfig.singleColor) {
				ctx.strokeStyle = drawerConfig.singleColor;
			} else {
				ctx.strokeStyle = model.colors.areaTheme.lineColor;
			}
			if (model.highlighted) {
				ctx.lineWidth = this.config.selectedWidth;
			} else {
				ctx.lineWidth = this.config.areaLineWidth;
			}
			const paneBounds = model.extentComponent.getBounds();
			const first = visualCandles[0];
			const firstLineX = model.view.toX(first.centerUnit);

			let previousX = 0;
			let previousY = 0;

			for (let i = 0; i < visualCandles.length; i++) {
				const prev = visualCandles[i - 1];
				const next = visualCandles[i + 1];
				const visualCandle = visualCandles[i];
				const lineX = model.view.toX(visualCandle.centerUnit);
				const closeY = model.view.toY(visualCandle.close);
				const bottomY = paneBounds.y + paneBounds.height;

				if (prev === void 0) {
					// Start of the path
					ctx.beginPath();
					ctx.lineTo(floor(lineX), bottomY); // Move to the bottom
					ctx.moveTo(floor(lineX), closeY); // Move to the first point
				} else if (next === void 0) {
					// End of the path
					ctx.bezierCurveTo(
						previousX,
						previousY, // Control point 1
						lineX,
						closeY, // Control point 2
						floor(lineX),
						closeY, // End point
					);
					ctx.stroke();
					ctx.lineTo(floor(lineX), bottomY);
					ctx.lineTo(floor(firstLineX), bottomY);
					ctx.closePath();

					// Fill the area
					let fillColor;
					if (drawerConfig.singleColor) {
						ctx.fillStyle = drawerConfig.singleColor;
					} else {
						ctx.fillStyle =
							model.colors.areaTheme.startColor && model.colors.areaTheme.stopColor
								? ((fillColor = ctx.createLinearGradient(0, 0, 0, paneBounds.height)),
								  fillColor.addColorStop(0, model.colors.areaTheme.startColor),
								  fillColor.addColorStop(1, model.colors.areaTheme.stopColor),
								  fillColor)
								: '';
					}
					ctx.fill();
				} else {
					// Use bezierCurveTo for smooth curves
					const midX = (lineX + model.view.toX(prev.centerUnit)) / 2; // Midpoint for smooth curve
					const midY = (closeY + model.view.toY(prev.close)) / 2; // Midpoint for smooth curve

					ctx.quadraticCurveTo(
						previousX ?? midX,
						previousY ?? midY, // Control point
						midX,
						midY, // End point
					);
				}

				// Store the current point as the previous for the next iteration
				previousX = lineX;
				previousY = closeY;
			}
		}
	}
}
