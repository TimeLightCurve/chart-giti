
import { createChart } from './index';
import ChartBootstrap from './chart/bootstrap';
import { generateCandlesDataTS } from './chart/utils/candles-generator-ts.utils';

const container = document.createElement('div');
document.body.append(container);

document.body.style.height = '100vh';
document.body.style.margin = '0';
document.body.style.backgroundColor = '#ffffff';
container.style.overflow = 'hidden';
// DXChart sizes
container.style.width = '100vw';
container.style.height = '100vh';
container.style.overflow = 'hidden';

// DXChart init
const chart: ChartBootstrap = createChart(container);
const candles = generateCandlesDataTS({ quantity: 1000, withVolume: true });
chart.setData({ candles });

// for debugging
// @ts-ignore
window['CHART'] = chart;
