import EventBus from '../../events/event-bus';
import { EVENT_DRAW } from '../../events/events';
import { ChartBaseElement } from '../../model/chart-base-element';
import { LabelAlign } from './x-axis-draw.functions';

export interface XAxisLabel {
	text: string;
	x: number;
	color: string;
	alignType?: LabelAlign;
	subGroupId?: number;
}

/***
 * If you want to define a new Labels Provider for X Axis, you must extend this interface.
 */
export interface XAxisLabelsProvider {
	readonly getUnorderedLabels: () => XAxisLabel[];
}

/**
 * Custom labels on X axis.
 */
export class XAxisLabelsModel extends ChartBaseElement {
	public labels: XAxisLabel[] = [];

	constructor(public eventBus: EventBus, readonly labelProviders: XAxisLabelsProvider[]) {
		super();
		this.initModel();
		/**
		 * TODO refactor this, should NOT be recalculated on each DRAW, rather coordinates should be updated in drawer
		 * @doc-tags refactor
		 */
		this.addSubscription(this.eventBus.on(EVENT_DRAW, () => this.recalculateLabels()));
	}

	/**
	 * Initializes the model by recalculating the labels.
	 */
	private initModel() {
		this.recalculateLabels();
	}

	/**
	 * Recalculates the labels by clearing the existing labels and adding new labels from the label providers.
	 * @returns {void}
	 */
	public recalculateLabels(): void {
		this.labels = [];
		for (const provider of this.labelProviders) {
			this.labels.push(...provider.getUnorderedLabels());
		}
	}
}
