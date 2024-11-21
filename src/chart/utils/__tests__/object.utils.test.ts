

import { deepEqual } from '../object.utils';

describe('object', () => {
	describe('deepEqual', () => {
		it('should deeply compare objects', () => {
			expect(deepEqual({}, {})).toBeTruthy();
			expect(deepEqual({ a: { foo: 1 } }, { a: { foo: 1 } })).toBeTruthy(); //eslint-disable-line
			expect(deepEqual({ a: { foo: 1 } }, { a: { foo: 2 } })).toBeFalsy(); //eslint-disable-line
			expect(deepEqual({ a: { foo: 1 } }, { a: { bar: 1 } })).toBeFalsy(); //eslint-disable-line
		});
	});
});
