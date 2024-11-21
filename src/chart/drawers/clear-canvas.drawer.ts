import { CanvasModel } from '../model/canvas.model';
import { Drawer } from './drawing-manager';

/**
 * Clears the canvas.
 */
export class ClearCanvasDrawer implements Drawer {
	constructor(private canvasModel: CanvasModel) {}

	draw(): void {
		this.canvasModel.clear();
	}

	getCanvasIds(): Array<string> {
		return [this.canvasModel.canvasId];
	}
}
