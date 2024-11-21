import { BehaviorSubject, merge } from 'rxjs';
import { ChartBaseElement } from '../../model/chart-base-element';
import { ScaleModel } from '../../model/scale.model';
import { HighLowProvider } from '../../model/scaling/auto-scale.model';
import { Unit } from '../../model/scaling/viewport.model';
import VisualCandle from '../../model/visual-candle';
import { firstOf, maxMin } from '../../utils/array.utils';
import { ChartComponent } from '../chart/chart.component';

const volumeMaxMinFn = maxMin<VisualCandle>(candle => candle.candle.volume);

export const VOLUMES_UUID = 'volumes';
export class VolumesModel extends ChartBaseElement {
	public readonly id = VOLUMES_UUID;
	// max volume in all data series
	volumeMax = new BehaviorSubject<Unit>(0);
	highLowProvider: HighLowProvider = {
		calculateHighLow: () => ({ high: this.volumeMax.getValue(), low: 0 }),
		isHighLowActive: () => true,
	};
	constructor(private chartComponent: ChartComponent, private scale: ScaleModel) {
		super();
	}

	protected doActivate() {
		super.doActivate();
		this.addRxSubscription(
			merge(this.chartComponent.chartModel.observeCandlesChanged(), this.scale.xChanged).subscribe(() =>
				this.updateVolumeMax(),
			),
		);
		this.addRxSubscription(
			this.chartComponent.chartModel.mainCandleSeries
				.observeLastVisualCandleChanged()
				.subscribe(() => this.recalculateLastVisualVolume()),
		);
	}

	/**
	 * Used for optimization when we have to update only the last candle
	 * Doesn't work for line chart types
	 * @doc-tags tricky
	 */
	private recalculateLastVisualVolume() {
		// TODO rework, move this logic to drawer
	}

	/**
	 * Updates the maximum volume value of the chart.
	 * @function
	 * @name updateVolumeMax
	 * @memberof ChartComponent
	 * @returns {void}
	 */
	updateVolumeMax() {
		this.volumeMax.next(
			firstOf(volumeMaxMinFn(this.chartComponent.chartModel.mainCandleSeries.getSeriesInViewport().flat())) ?? 0,
		);
	}
}
