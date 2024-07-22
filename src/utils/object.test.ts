import { describe, it, expect } from 'vitest';

import { isObjectEmpty, countValueInArrayOfObjects } from './object';

describe('Object Manipulation Utility Functions', () => {
	describe('isObjectEmpty', () => {
		it('should return true for an empty object', () => {
			expect(isObjectEmpty({})).toBe(true);
		});

		it('should return false for a non-empty object', () => {
			expect(isObjectEmpty({ key: 'value' })).toBe(false);
		});

		it('should return true for null', () => {
			expect(isObjectEmpty(null)).toBe(true);
		});

		it('should return true for undefined', () => {
			expect(isObjectEmpty(undefined)).toBe(true);
		});

		it('should return false for an object with inherited properties', () => {
			const PROTO = { inheritedProp: 'value' };
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const OBJECT = Object.create(PROTO);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			expect(isObjectEmpty(OBJECT)).toBe(true);
		});

		it('should return false for an object with non-enumerable properties', () => {
			const OBJECT = {};
			Object.defineProperty(OBJECT, 'nonEnumProp', {
				value: 'value',
				enumerable: false,
			});
			expect(isObjectEmpty(OBJECT)).toBe(true);
		});
	});

	describe('countValueInArrayOfObjects', () => {
		const TEST_ARRAY = [
			{ id: 1, status: 'active', type: 'user' },
			{ id: 2, status: 'inactive', type: 'admin' },
			{ id: 3, status: 'active', type: 'user' },
			{ id: 4, status: 'active', type: 'admin' },
		];

		it('should correctly count occurrences of a value', () => {
			expect(countValueInArrayOfObjects(TEST_ARRAY, 'status', 'active')).toBe(3);
		});

		it('should return 0 when the value is not found', () => {
			expect(countValueInArrayOfObjects(TEST_ARRAY, 'status', 'pending')).toBe(0);
		});

		it('should handle different value types', () => {
			expect(countValueInArrayOfObjects(TEST_ARRAY, 'id', 2)).toBe(1);
		});

		it('should return 0 when the key does not exist in any object', () => {
			expect(countValueInArrayOfObjects(TEST_ARRAY, 'nonexistent', 'value')).toBe(0);
		});

		it('should handle an empty array', () => {
			expect(countValueInArrayOfObjects([], 'key', 'value')).toBe(0);
		});

		it('should handle objects with missing keys', () => {
			const ARRAY_WITH_MISSING_KEYS = [{ id: 1, status: 'active' }, { id: 2 }, { id: 3, status: 'active' }];

			expect(countValueInArrayOfObjects(ARRAY_WITH_MISSING_KEYS, 'status', 'active')).toBe(2);
		});
	});
});
