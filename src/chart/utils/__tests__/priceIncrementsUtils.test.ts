
import { PriceIncrementsUtils } from '../price-increments.utils';

describe('PriceIncrementsUtils', () => {
	describe('autoDetectIncrementOfValueRange', () => {
		it('should return increment=0.01 for range=0', () => {
			const result = PriceIncrementsUtils.autoDetectIncrementOfValueRange(0);
			expect(result).toBeCloseTo(0.01, 10);
		});
		it('should return increment=10 for range=6300.02931', () => {
			const result = PriceIncrementsUtils.autoDetectIncrementOfValueRange(6300.02931);
			expect(result).toBeCloseTo(10, 10);
		});
		it('should return increment=1 for range=124.14', () => {
			const result = PriceIncrementsUtils.autoDetectIncrementOfValueRange(124.14);
			expect(result).toBeCloseTo(1, 10);
		});
		it('should return increment=0.01 for range=5', () => {
			const result = PriceIncrementsUtils.autoDetectIncrementOfValueRange(5);
			expect(result).toBeCloseTo(0.01, 10);
		});
		it('should return increment=0.001 for range=0.5', () => {
			const result = PriceIncrementsUtils.autoDetectIncrementOfValueRange(0.5);
			expect(result).toBeCloseTo(0.001, 10);
		});
		it('should return increment=0.00001 for range=0.0018', () => {
			const result = PriceIncrementsUtils.autoDetectIncrementOfValueRange(0.0018);
			expect(result).toBeCloseTo(0.00001, 10);
		});
	});
});
