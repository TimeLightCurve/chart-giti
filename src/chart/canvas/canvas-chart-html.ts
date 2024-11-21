export default (devexpertsPromoLink: boolean) =>
	'<div data-element="chartResizer" style="position: relative; min-height: 20px; height: 100%; width: 100%; touch-action: manipulation; z-index: 0;">\n' +
	'\t<div data-element="chartContainer" style="position: absolute; height: 100%; width: 100%;" class="chart chartArea--graph">\n' +
	'\t\t<div data-element="canvasArea" style="position: relative; height: 100%; width: 100%; touch-action: manipulation;">\n' +
	'\t\t\t<canvas data-element="snapshotCanvas"></canvas>\n' +
	'\t\t\t<canvas data-element="backgroundCanvas"></canvas>\n' +
	'\t\t\t<canvas data-element="mainCanvas"></canvas>\n' +
	'\t\t\t<canvas data-element="dynamicObjectsCanvas"></canvas>\n' +
	'\t\t\t<canvas data-element="xAxisLabelsCanvas"></canvas>\n' +
	'\t\t\t<canvas data-element="yAxisLabelsCanvas"></canvas>\n' +
	'\t\t\t<canvas data-element="crossToolCanvas"></canvas>\n' +
	'\t\t\t<canvas data-element="hitTestCanvas"></canvas>\n' +
	`${
		devexpertsPromoLink
			? '\t\t\t<p style="position: absolute; visibility: hidden;">If you have any suggestions or are experiencing any issues, please feel free to contact us at <a href="https://test.com">www.test.com</a></p>\n'
			: ''
	}` +
	'\t\t</div>\n' +
	'\t</div>\n' +
	'</div>\n';
