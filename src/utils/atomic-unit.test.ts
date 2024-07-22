import { describe, it, expect, vi } from 'vitest';

import BigNumber from 'bignumber.js';

import { convertNumberToAtomicUnit, convertAtomicUnitToBigNumber } from './atomic-unit';

describe('Atomic unit helpers', () => {
	describe('convertNumberToAtomicUnit', () => {
		it('should return an object', () => {
			expect(typeof convertNumberToAtomicUnit(0)).toBe('object');
		});

		it('should convert 0 to atomic unit', () => {
			const RESULT = convertNumberToAtomicUnit(0);
			expect(RESULT).toEqual({ value: '0', precision: 0, originalValue: '0', isValid: true });
		});

		it('should convert a valid string to atomic unit', () => {
			const RESULT = convertNumberToAtomicUnit('1234.567');
			expect(RESULT).toEqual({ value: '1234567', precision: 3, originalValue: '1234.567', isValid: true });
		});

		it('should convert a simple number to atomic unit', () => {
			const RESULT = convertNumberToAtomicUnit(1234);
			expect(RESULT).toEqual({ value: '1234', precision: 0, originalValue: '1234', isValid: true });
		});

		it('should convert a valid number to atomic unit', () => {
			const RESULT = convertNumberToAtomicUnit(1234.567);
			expect(RESULT).toEqual({ value: '1234567', precision: 3, originalValue: '1234.567', isValid: true });
		});

		it('should convert a negative number to atomic unit', () => {
			const RESULT = convertNumberToAtomicUnit(-1234.567);
			expect(RESULT).toEqual({ value: '-1234567', precision: 3, originalValue: '-1234.567', isValid: true });
		});

		it('should convert a negative string to atomic unit', () => {
			const RESULT = convertNumberToAtomicUnit('-1234.564');
			expect(RESULT).toEqual({ value: '-1234564', precision: 3, originalValue: '-1234.564', isValid: true });
		});

		it('should handle small number with precision', () => {
			const RESULT = convertNumberToAtomicUnit(0.00000001);
			expect(RESULT).toEqual({ value: '1', precision: 8, originalValue: '0.00000001', isValid: true });
		});

		it('should handle BigNumber', () => {
			const RESULT = convertNumberToAtomicUnit(new BigNumber(100000000000000.11));
			expect(RESULT).toEqual({
				value: '10000000000000011',
				precision: 2,
				originalValue: '100000000000000.11',
				isValid: true,
			});
		});

		it('should handle BigNumber with precision', () => {
			const RESULT = convertNumberToAtomicUnit(new BigNumber(0.00000001));
			expect(RESULT).toEqual({ value: '1', precision: 8, originalValue: '0.00000001', isValid: true });
		});

		it('should handle undefined input by returning invalid atomic unit', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error');
			const RESULT = convertNumberToAtomicUnit(undefined);
			expect(RESULT).toEqual({ value: '0', precision: 0, originalValue: '0', isValid: false });
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('convertNumberToAtomicUnit: invalid number parameter');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should handle empty string input as invalid', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error');
			const RESULT = convertNumberToAtomicUnit('');
			expect(RESULT).toEqual({ value: '0', precision: 0, originalValue: '0', isValid: false });
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('convertNumberToAtomicUnit: invalid number parameter');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should reject non-numeric string with error', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error');
			const RESULT = convertNumberToAtomicUnit('abc');
			expect(RESULT).toEqual({ value: '0', precision: 0, originalValue: '0', isValid: false });
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('convertNumberToAtomicUnit: invalid number parameter');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('convertAtomicUnitToBigNumber', () => {
		it('should return an object when not using toNumber()', () => {
			const ATOMIC_UNIT = { value: '0', precision: 0, isValid: true, originalValue: '0' };
			expect(typeof convertAtomicUnitToBigNumber(ATOMIC_UNIT)).toBe('object');
		});

		it('should return a number when using toNumber()', () => {
			const ATOMIC_UNIT = { value: '0', precision: 0, isValid: true, originalValue: '0' };
			expect(typeof convertAtomicUnitToBigNumber(ATOMIC_UNIT).toNumber()).toBe('number');
		});

		it('should return a string when using toFixed()', () => {
			const ATOMIC_UNIT = { value: '0', precision: 0, isValid: true, originalValue: '0' };
			expect(typeof convertAtomicUnitToBigNumber(ATOMIC_UNIT).toFixed()).toBe('string');
		});

		it('should correctly convert from 0 atomic unit to BigNumber', () => {
			const ATOMIC_UNIT = { value: '0', precision: 0, isValid: true, originalValue: '0' };
			const RESULT = convertAtomicUnitToBigNumber(ATOMIC_UNIT);
			expect(RESULT.toNumber()).toBe(0);
		});

		it('should correctly convert from atomic unit to BigNumber', () => {
			const ATOMIC_UNIT = { value: '1234564', precision: 3, isValid: true, originalValue: '1234.564' };
			const RESULT = convertAtomicUnitToBigNumber(ATOMIC_UNIT);
			expect(RESULT.toFixed()).toBe('1234.564');
		});

		it('should correctly convert from atomic unit to BigNumber with no precision', () => {
			const ATOMIC_UNIT = { value: '1234', precision: 0, isValid: true, originalValue: '1234' };
			const RESULT = convertAtomicUnitToBigNumber(ATOMIC_UNIT);
			expect(RESULT.toNumber()).toBe(1234);
		});

		it('should correctly convert from atomic unit to BigNumber with negative value', () => {
			const ATOMIC_UNIT = { value: '-1234567', precision: 3, isValid: true, originalValue: '-1234.567' };
			const RESULT = convertAtomicUnitToBigNumber(ATOMIC_UNIT);
			expect(RESULT.toFixed()).toBe('-1234.567');
			expect(RESULT.toNumber()).toBe(-1234.567);
		});

		it('should correctly convert small atomic unit to BigNumber', () => {
			const ATOMIC_UNIT = { value: '1', precision: 8, isValid: true, originalValue: '0.00000001' };
			const RESULT = convertAtomicUnitToBigNumber(ATOMIC_UNIT);
			expect(RESULT.toNumber()).toBe(0.00000001);
		});

		it('should return 0 for invalid atomic unit', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error');
			const ATOMIC_UNIT = { value: '100', precision: 10, isValid: false, originalValue: '10000' };
			const RESULT = convertAtomicUnitToBigNumber(ATOMIC_UNIT);
			expect(RESULT.toNumber()).toBe(0);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('convertAtomicUnitToBigNumber: invalid atomic unit.');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should return 0 for invalid null atomic unit', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error');
			const ATOMIC_UNIT = { value: null, precision: null, isValid: false, originalValue: null };
			// @ts-expect-error testing invalid input
			const RESULT = convertAtomicUnitToBigNumber(ATOMIC_UNIT);
			expect(RESULT.toNumber()).toBe(0);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('convertAtomicUnitToBigNumber: invalid atomic unit.');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should log error when original value does not match', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error');
			const ATOMIC_UNIT = { value: '1234567', precision: 3, isValid: true, originalValue: '123.456' };
			const RESULT = convertAtomicUnitToBigNumber(ATOMIC_UNIT);
			expect(RESULT.toNumber()).toBe(0);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith(
				'convertAtomicUnitToBigNumber: originalValue 123.456 is not equal to value 1234.567',
			);
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});
});
