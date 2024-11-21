import { Observable } from 'rxjs';
import { CanvasBoundsContainer, CanvasElement } from '../../canvas/canvas-bounds-container';
import { CursorHandler } from '../../canvas/cursor.handler';
import { FullChartConfig } from '../../chart.config';
import { DrawingManager } from '../../drawers/drawing-manager';
import { CanvasModel } from '../../model/canvas.model';
import { ChartBaseElement } from '../../model/chart-base-element';
import { DateTimeFormatter, DateTimeFormatterFactory, recalculateXFormatter } from '../../model/date-time.formatter';
import { HitTestCanvasModel } from '../../model/hit-test-canvas.model';
import { merge } from '../../utils/merge.utils';
import { ChartModel } from '../chart/chart.model';
import { EventsHitTestDrawer } from './events-hit-test.drawer';
import { EventsDrawer } from './events.drawer';
import { EconomicEvent, EventType, EventWithId, EventsModel } from './events.model';

export class EventsComponent extends ChartBaseElement {
	eventsModel: EventsModel;
	private eventsXAxisLabelFormatterProvider: () => DateTimeFormatter;

	constructor(
		private config: FullChartConfig,
		private canvasModel: CanvasModel,
		hitTestCanvasModel: HitTestCanvasModel,
		chartModel: ChartModel,
		private canvasBoundsContainer: CanvasBoundsContainer,
		private drawingManager: DrawingManager,
		private formatterFactory: DateTimeFormatterFactory,
		cursorHandler: CursorHandler,
	) {
		super();
		this.eventsXAxisLabelFormatterProvider = () =>
			recalculateXFormatter(
				this.config.components.events.xAxisLabelFormat,
				chartModel.getPeriod(),
				this.formatterFactory,
			);
		const eventsModel = new EventsModel(canvasModel);
		this.eventsModel = eventsModel;
		this.addChildEntity(eventsModel);
		hitTestCanvasModel.addSubscriber(eventsModel);

		const eventsDrawer = new EventsDrawer(
			canvasModel,
			chartModel,
			config,
			canvasBoundsContainer,
			eventsModel,
			this.eventsXAxisLabelFormatterProvider,
		);
		this.drawingManager.addDrawer(eventsDrawer, 'EVENTS');

		const eventsHitTestDrawer = new EventsHitTestDrawer(
			hitTestCanvasModel,
			chartModel,
			config,
			canvasBoundsContainer,
			eventsModel,
			() => hitTestCanvasModel.hitTestDrawersPredicateSubject.getValue(),
		);
		this.drawingManager.addDrawerBefore(eventsHitTestDrawer, 'HIT_TEST_EVENTS', 'HIT_TEST_DRAWINGS');
		cursorHandler.setCursorForCanvasEl(CanvasElement.EVENTS, config.components.events.cursor);
	}

	/**
	 * Sets the new event list.
	 * @param events
	 */
	public setEvents(events: EconomicEvent[]) {
		this.eventsModel.setEvents(events);
		this.canvasModel.fireDraw();
	}

	/**
	 * Changes the component visibility.
	 * @param visible
	 */
	public setVisible(visible: boolean) {
		this.config.components.events.visible = visible;
		this.canvasBoundsContainer.recalculateBounds();
		this.canvasModel.fireDraw();
	}

	/**
	 * Changes visibility for the specific event type.
	 * For example, to turn off dividends visibility you can call this method with { dividends: false } argument
	 */
	public setEventTypeVisible(eventsVisibility: Partial<Record<EventType, boolean>>) {
		merge(this.config.components.events.eventsVisibility, eventsVisibility, {
			overrideExisting: true,
			addIfMissing: false,
		});
		this.canvasModel.fireDraw();
	}

	/**
	 * Observes hovered event when mouse moves in, and provides null when mouse moves out.
	 */
	public observeEventHovered(): Observable<EventWithId | null> {
		return this.eventsModel.hoveredEvent.asObservable();
	}
}
