import { ChartBaseModel } from '../components/chart/chart-base.model';
import { ChartInstrument } from '../components/chart/chart.component';
import { CandleWidthCalculator, VisualCandleCalculator } from '../components/chart/chart.model';
import { YExtentComponent } from '../components/pane/extent/y-extent-component';
import EventBus from '../events/event-bus';
import { CandleSeriesColors, CandleSeriesModel } from './candle-series.model';
import { Candle } from './candle.model';
import { DataSeriesType } from './data-series.config';
import { ScaleModel } from './scale.model';
import VisualCandle from './visual-candle';

/**
 * This model represents main chart data series and is highly tied to chartBaseModel, @see ChartBaseModel
 */
export class MainCandleSeriesModel extends CandleSeriesModel {
	constructor(
		private readonly baseModel: ChartBaseModel<'candle'>,
		extentComponent: YExtentComponent,
		id: string,
		htId: number,
		eventBus: EventBus,
		scale: ScaleModel,
		instrument: ChartInstrument,
		candlesTransformersByChartType: Partial<Record<DataSeriesType, VisualCandleCalculator>>,
		candleWidthByChartType: Partial<Record<DataSeriesType, CandleWidthCalculator>>,
		colors: CandleSeriesColors,
	) {
		super(
			extentComponent,
			id,
			htId,
			eventBus,
			scale,
			instrument,
			candlesTransformersByChartType,
			candleWidthByChartType,
			colors,
		);
	}

	set visualPoints(candles: VisualCandle[] | VisualCandle[][]) {
		super.visualPoints = candles;
		// super.visualPoints will transform 2D array if necessary to 1D array
		this.baseModel.mainVisualPoints = super.visualPoints;
	}

	get visualPoints(): VisualCandle[] {
		return super.visualPoints;
	}

	set dataPoints(candles: Candle[] | Candle[][]) {
		super.dataPoints = candles;
		this.baseModel.mainDataPoints = super.dataPoints;
	}

	get dataPoints(): Candle[] {
		return super.dataPoints;
	}

	public recalculateMeanCandleWidth(visualCandles: VisualCandle[]) {
		super.recalculateMeanCandleWidth(visualCandles);
		this.baseModel.meanDataWidth = this.meanCandleWidth;
	}
}
