import { HitBoundsTest } from '../../canvas/canvas-bounds-container';
import { CanvasInputListenerComponent, Point } from '../../inputlisteners/canvas-input-listener.component';
import { ChartBaseElement } from '../../model/chart-base-element';
import { ChartPanComponent } from '../pan/chart-pan.component';

export interface DragInfo {
	delta: number;
	draggedPixels: number;
}

export interface DragComponentOptions {
	dragPredicate: () => boolean;
}

export interface DragNDropComponentCallbacks {
	onDragStart?: (point: Point) => void;
	onDragTick: (dragInfo: DragInfo) => void;
	onDragEnd?: (draggedPixels: number) => void;
}

export const defaultDragComponentOptions: DragComponentOptions = {
	dragPredicate: () => true,
};

export class DragNDropComponent extends ChartBaseElement {
	dragging: boolean = false;
	draggedPixels: number = 0;
	constructor(
		protected hitTest: HitBoundsTest,
		protected dragCallbacks: DragNDropComponentCallbacks,
		protected canvasInputListener: CanvasInputListenerComponent,
		protected chartPanComponent: ChartPanComponent,
		private dragComponentOptions: DragComponentOptions,
	) {
		super();
	}

	protected onDragStart = (point: Point) => {
		if (this.dragComponentOptions.dragPredicate()) {
			this.dragging = true;
			this.draggedPixels = 0;
			this.dragCallbacks.onDragStart && this.dragCallbacks.onDragStart(point);
		}
	};

	protected onDragTick = (yDelta: number) => {
		if (this.dragComponentOptions.dragPredicate()) {
			if (this.dragging) {
				this.draggedPixels += yDelta;
				this.dragCallbacks.onDragTick({
					delta: yDelta,
					draggedPixels: this.draggedPixels,
				});
			}
		}
	};

	protected onDragEnd = () => {
		if (this.dragComponentOptions.dragPredicate()) {
			if (this.dragging) {
				this.dragging = false;
				this.dragCallbacks.onDragEnd && this.dragCallbacks.onDragEnd(this.draggedPixels);
			}
		}
	};
}
