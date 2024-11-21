import { Candle, hollowDirection, nameDirection } from '../../model/candle.model';
import VisualCandle from '../../model/visual-candle';
import { VisualCandleCalculator } from './chart.model';

export const defaultCandleTransformer: VisualCandleCalculator = (candle, { x, width, activeCandle }) =>
	new VisualCandle(
		x,
		width,
		candle.open,
		candle.close,
		candle.hi,
		candle.lo,
		nameDirection(candle.open, candle.close),
		candle,
		true,
		getCandleIsActive(candle, activeCandle),
	);

export const hollowCandleTransformer: VisualCandleCalculator = (candle, { x, width, activeCandle, prevCandle }) =>
	new VisualCandle(
		x,
		width,
		candle.open,
		candle.close,
		candle.hi,
		candle.lo,
		hollowDirection(prevCandle?.close ?? candle.close, candle.close),
		candle,
		true,
		getCandleIsActive(candle, activeCandle),
		candle.close > candle.open,
	);

export const trendCandleTransformer: VisualCandleCalculator = (candle, { x, width, activeCandle, prevCandle }) =>
	new VisualCandle(
		x,
		width,
		candle.open,
		candle.close,
		candle.hi,
		candle.lo,
		nameDirection(prevCandle?.close ?? candle.close, candle.close),
		candle,
		true,
		getCandleIsActive(candle, activeCandle),
		candle.close > candle.open,
	);

export const lineCandleTransformer = trendCandleTransformer;

export const getCandleIsActive = (candle: Candle, activeCandle?: Candle): boolean => {
	const isActive = activeCandle && activeCandle.id === candle.id;
	return isActive ?? false;
};
