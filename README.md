
## Overview

Get started with Giti-Chart, install the library and configure it as you want.

-   🚀 [Quick start](#quick-start)
    -   📦 [Installation](#installation)
    -   🛠️ [Create Chart](#create-chart)
    -   📈 [Set data](#set-data)
    -   📄 [HTML markup](#html-markup)
-   ⚙️ [Configuration](#configuration)
-   🔌 [API](#api)
-   📒 [Examples](#examples)
-   🧮 [Demo](#demo)

## Quick-start

### Installation

Install library to your project:

```js
npm install @timelightcurve/giti-next-chart
```

Your `package.json` after installation:

```json
"dependencies": {
	"@timelightcurve/giti-next-chart": "1.0.0",
	...
}
```

### Create chart

If you use webpack or any other bundler - import `createChart` method and pass element where the chart will be rendered as a first argument.

```js
export const createChartInstance = () => {
	const container = document.getElementById('chart_container');
	const chartInstance = DXChart.createChart(container);
	return chartInstance;
};
```

`createChart` - method, that creates a new chart instance using ChartBootstrap class and returns it.

Method accepts 2 parameters:

-   `element` - The HTML element where the chart will be rendered
-   `config` (optional) - instance of [ChartConfig](/chart/chart-config/overview)

> Also, please, set `width: 100%` and `height: 100%` for parent container
> by default chart is auto-resizing to parent
> you can change it by setting `fixedSize` in config

Now you should have empty chart on screen.

### Set data

Let's pass in some data i.e. `Candles`. You can use bundled function to generate some mock data.
Import `generateCandlesData` and call it to generate candles.

```js
export const generateMockData = () => {
	const candles = generateCandlesData();
	chart.setData({ candles });
};
```

Now you should see chart just like image below:

### HTML-markup

Here is full quick-start code example:
