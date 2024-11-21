export interface ChartElements {
	canvasArea?: HTMLElement;
	snapshotCanvas?: HTMLCanvasElement;
	backgroundCanvas?: HTMLCanvasElement;
	mainCanvas?: HTMLCanvasElement;
	dynamicObjectsCanvas?: HTMLCanvasElement;
	yAxisLabelsCanvas?: HTMLCanvasElement;
	xAxisLabelsCanvas?: HTMLCanvasElement;
	crossToolCanvas?: HTMLCanvasElement;
	hitTestCanvas?: HTMLCanvasElement;
	chartResizer?: HTMLElement;
	chartContainer?: HTMLElement;
}

export type ValidatedChartElements = Required<ChartElements>;

export const validateChartElements = (els: ChartElements): els is ValidatedChartElements => {
	const canvasAreaAvailable = els.canvasArea !== null;
	const snapshotCanvasAvailable = els.snapshotCanvas !== null;
	const backgroundCanvasAvailable = els.backgroundCanvas !== null;
	const mainCanvasAvailable = els.mainCanvas !== null;
	const yAxisLabelsCanvasAvailable = els.yAxisLabelsCanvas !== null;
	const crossToolCanvasAvailable = els.crossToolCanvas !== null;
	const hitTestCanvasAvailable = els.hitTestCanvas !== null;
	const chartResizerAvailable = els.chartResizer !== null;
	const chartContainerAvailable = els.chartContainer !== null;
	const dynamicObjectsCanvasAvailable = els.dynamicObjectsCanvas !== null;
	const xAxisLabelsCanvasAvailable = els.yAxisLabelsCanvas !== null;
	return (
		canvasAreaAvailable &&
		snapshotCanvasAvailable &&
		backgroundCanvasAvailable &&
		mainCanvasAvailable &&
		yAxisLabelsCanvasAvailable &&
		crossToolCanvasAvailable &&
		hitTestCanvasAvailable &&
		chartResizerAvailable &&
		chartContainerAvailable &&
		dynamicObjectsCanvasAvailable &&
		xAxisLabelsCanvasAvailable
	);
};
