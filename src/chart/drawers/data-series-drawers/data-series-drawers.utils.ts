import { VisualSeriesPoint } from '../../model/data-series.model';
import { Viewable } from '../../model/scaling/viewport.model';

export const buildLinePath = (points: VisualSeriesPoint[], ctx: CanvasRenderingContext2D, view: Viewable) => {
	if (points.length !== 0) {
		// Recognizing line gaps by candles idx.
		points.forEach((p, idx) => {
			const { centerUnit, close } = p;
			const x = view.toX(centerUnit);
			const y = view.toY(close);
			if (idx === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
		});
	}
};
