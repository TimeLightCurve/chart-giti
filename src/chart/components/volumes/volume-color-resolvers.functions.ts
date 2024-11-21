import Color from 'color';
import { FullChartColors } from '../../chart.config';
import { PriceMovement } from '../../model/candle-series.model';
import { VolumeColorResolver } from './volumes.component';

export const VOLUMES_COLOR_OPACITY = 0.3;

export const resolveColorForBar: VolumeColorResolver = (priceMovement: PriceMovement, colors: FullChartColors) => {
	const color = colors.barTheme[`${priceMovement}Color`];
	return Color(color).alpha(VOLUMES_COLOR_OPACITY).toString();
};

export const resolveColorUsingConfig: VolumeColorResolver = (priceMovement: PriceMovement, colors: FullChartColors) => {
	const color = colors.volume[`${priceMovement}BarColor`];
	return Color(color).alpha(VOLUMES_COLOR_OPACITY).toString();
};

export const resolveColorForLine: VolumeColorResolver = (priceMovement: PriceMovement, colors: FullChartColors) => {
	const color = colors.lineTheme[`${priceMovement}Color`];
	return Color(color).alpha(VOLUMES_COLOR_OPACITY).toString();
};

export const resolveColorForCandle: VolumeColorResolver = (priceMovement: PriceMovement, colors: FullChartColors) => {
	const color = colors.candleTheme[`${priceMovement}Color`];
	return Color(color).alpha(VOLUMES_COLOR_OPACITY).toString();
};
