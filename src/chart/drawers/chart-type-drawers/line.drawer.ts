import { ChartConfigComponentsChart } from '../../chart.config';
import { CandleSeriesModel } from '../../model/candle-series.model';
import { DataSeriesModel, VisualSeriesPoint } from '../../model/data-series.model';
import VisualCandle from '../../model/visual-candle';
import { flat } from '../../utils/array.utils';
import { ChartDrawerConfig, SeriesDrawer, setLineWidth } from '../data-series.drawer';

export class LineDrawer implements SeriesDrawer {
	constructor(private config: ChartConfigComponentsChart) {}

	public draw(
		ctx: CanvasRenderingContext2D,
		points: VisualSeriesPoint[][],
		candleSeries: DataSeriesModel,
		drawerConfig: ChartDrawerConfig,
	) {
		if (candleSeries instanceof CandleSeriesModel) {
			// @ts-ignore
			const visualCandles: VisualCandle[] = flat(points);
			// TODO rework, make sure drawing is precise
			setLineWidth(ctx, this.config.lineWidth, candleSeries, drawerConfig, this.config.selectedWidth);
			const lineTheme = candleSeries.colors.lineTheme;
			// make style changes outside loop to improve performance
			ctx.lineCap = 'round';
			if (drawerConfig.singleColor) {
				ctx.strokeStyle = drawerConfig.singleColor;
			}
			for (let i = 1; i < visualCandles.length; i++) {
				const prev = visualCandles[i - 1];
				const vc = visualCandles[i];
				const direction = vc.name;
				if (!drawerConfig.singleColor) {
					ctx.strokeStyle = lineTheme[`${direction}Color`];
				}
				const prevX = candleSeries.view.toX(prev.centerUnit);
				const prevY = candleSeries.view.toY(prev.close);
				const x = candleSeries.view.toX(vc.centerUnit);
				const y = candleSeries.view.toY(vc.close);

				ctx.beginPath();
				ctx.moveTo(prevX, prevY);
				ctx.lineTo(x, y);
				ctx.stroke();
			}
		}
	}
}
