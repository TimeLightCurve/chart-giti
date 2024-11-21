import { DataSeriesPoint } from '../model/data-series.model';
import { binarySearch, BinarySearchResult, firstOf, lastOf } from './array.utils';
import { floor } from './math.utils';

export const searchCandleIndex = (
	timestamp: number,
	shouldExtrapolate: boolean,
	candles: DataSeriesPoint[],
	periodMs = 1000,
): BinarySearchResult => {
	const firstTimestamp = firstOf(candles)?.timestamp ?? 0;
	const lastTimestamp = lastOf(candles)?.timestamp ?? 0;
	if (timestamp > lastTimestamp) {
		// TODO rework the code below, it looks very very sus ( ≖.≖)
		if (shouldExtrapolate) {
			// div by 1000 because periodDuration is in seconds
			return {
				// -1 to skip fake candle and get the last existing/visible one if reached last index
				index: candles.length - 1 + Math.ceil((timestamp - lastTimestamp) / periodMs),
				exact: true,
			};
		} else {
			return {
				// -1 to skip fake candle and get the last existing/visible one if reached last index
				index: candles.length - 1,
				exact: true,
			};
		}
	} else if (timestamp < firstTimestamp) {
		if (shouldExtrapolate) {
			return {
				index: floor((timestamp - firstTimestamp) / periodMs),
				exact: true,
			};
		} else {
			return {
				index: -1,
				exact: true,
			};
		}
	} else {
		return binarySearch(candles, timestamp, candle => candle.timestamp);
	}
};
