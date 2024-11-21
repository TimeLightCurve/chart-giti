import { FullChartConfig } from '../../chart.config';
import { DataSeriesModel, VisualSeriesPoint } from '../../model/data-series.model';
import { calculateSymbolHeight, calculateTextWidth } from '../../utils/canvas/canvas-font-measure-tool.utils';
import { ChartDrawerConfig, SeriesDrawer } from '../data-series.drawer';

export class TextDrawer implements SeriesDrawer {
	constructor(private config: FullChartConfig) {}

	draw(
		ctx: CanvasRenderingContext2D,
		allPoints: VisualSeriesPoint[][],
		model: DataSeriesModel,
		drawerConfig: ChartDrawerConfig,
	): void {
		ctx.save();
		allPoints.forEach((points, idx) => {
			const config = model.getPaintConfig(idx);
			ctx.fillStyle = drawerConfig.singleColor ?? config.color;
			const font = config.lineWidth + 'px ' + this.config.components.yAxis.fontFamily;
			ctx.font = font;
			points.forEach(p => {
				const text = model.getTextForPoint(p);
				const textWidth = calculateTextWidth(text, ctx, font);
				const textHeight = calculateSymbolHeight(font, ctx);
				const x = model.view.toX(p.centerUnit) - textWidth / 2;
				const y = model.view.toY(p.close) + textHeight;
				ctx.fillText(text, x, y);
			});
		});
		ctx.restore();
	}
}
