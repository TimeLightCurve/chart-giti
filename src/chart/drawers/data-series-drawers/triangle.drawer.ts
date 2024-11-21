import { DataSeriesModel, VisualSeriesPoint } from '../../model/data-series.model';
import { ChartDrawerConfig, SeriesDrawer } from '../data-series.drawer';

export class TriangleDrawer implements SeriesDrawer {
	constructor() {}

	draw(
		ctx: CanvasRenderingContext2D,
		allPoints: VisualSeriesPoint[][],
		model: DataSeriesModel,
		drawerConfig: ChartDrawerConfig,
	): void {
		allPoints.forEach((points, idx) => {
			const config = model.getPaintConfig(idx);
			ctx.fillStyle = drawerConfig.singleColor ?? config.color;
			points.forEach(p => {
				const x = model.view.toX(p.centerUnit);
				const y = model.view.toY(p.close);
				this.drawCandleTriangle(ctx, x, y, config.lineWidth);
			});
		});
	}

	private drawCandleTriangle(ctx: CanvasRenderingContext2D, x: number, y: number, triangleWidth: number) {
		ctx.beginPath();
		ctx.moveTo(x - triangleWidth / 2, y);
		ctx.lineTo(x, y - triangleWidth);
		ctx.lineTo(x + triangleWidth / 2, y);
		ctx.fill();
	}
}
