import { distinctUntilChanged, map } from 'rxjs/operators';
import { FullChartConfig } from '../chart.config';
import { ChartModel } from '../components/chart/chart.model';
import { CanvasInputListenerComponent } from '../inputlisteners/canvas-input-listener.component';
import { ChartBaseElement } from '../model/chart-base-element';

export class CandleTapHandler extends ChartBaseElement {
	constructor(
		mainCanvasParent: Element,
		chartModel: ChartModel,
		canvasInputListeners: CanvasInputListenerComponent,
		config: FullChartConfig,
	) {
		super();
		canvasInputListeners
			.observeTouchStart()
			.pipe(
				map(e => (config.components.chart.highlightActiveCandle ? e : undefined)),
				distinctUntilChanged(),
			)
			.subscribe(e => {
				if (e) {
					this.setCandleAsActive(e, mainCanvasParent, chartModel);
				}
			});
	}

	/**
	 * Sets the candle as active when a touch event occurs on the chart.
	 * @param {TouchEvent} e - The touch event that occurred on the chart.
	 * @param {Element} mainCanvasParent - The parent element of the main canvas.
	 * @param {ChartModel} chartModel - The chart model object.
	 */
	private setCandleAsActive(e: TouchEvent, mainCanvasParent: Element, chartModel: ChartModel) {
		if (e.touches.length === 1) {
			const touch = e.touches.item(0);
			if (touch !== null) {
				const xTouchPosition = this.getTouchXPosition(touch, mainCanvasParent);
				const candle = chartModel.candleFromX(xTouchPosition);
				if (candle) {
					chartModel.mainCandleSeries.setActiveCandle(candle);
				}
			}
		}
	}

	// TO DO: check if this body calculations can potentially works wrong in widget
	/**
	 * Calculates the X position of a touch event relative to the main canvas parent element.
	 * @param {Touch} touch - The touch event object.
	 * @param {Element} mainCanvasParent - The parent element of the main canvas.
	 * @returns {number} - The X position of the touch event relative to the main canvas parent element.
	 * @todo Check if this body calculations can potentially work incorrectly in the widget.
	 */
	private getTouchXPosition(touch: Touch, mainCanvasParent: Element) {
		const rect = mainCanvasParent.getBoundingClientRect();
		const scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
		return touch.pageX - rect.left - scrollLeft;
	}
}
