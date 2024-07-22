import { describe, it, expect, vi } from 'vitest';

import BigNumber from 'bignumber.js';

import {
	isNumber,
	stringToBigNumber,
	absoluteToBigNumber,
	truncateNumberToBigNumber,
	roundNumberToBigNumber,
	roundUpNumberToBigNumber,
	roundDownNumberToBigNumber,
	formatNumber,
	countDecimalPlaces,
	labelNumber,
} from './number';

describe('Number Manipulation Utility Functions', () => {
	describe('isNumber', () => {
		it('should return true for valid numbers', () => {
			expect(isNumber(123)).toBe(true);
			expect(isNumber('123')).toBe(true);
			expect(isNumber('-123.45')).toBe(true);
			expect(isNumber(new BigNumber(123))).toBe(true);
		});

		it('should return false for invalid numbers', () => {
			expect(isNumber('abc')).toBe(false);
			expect(isNumber(null)).toBe(false);
			expect(isNumber(undefined)).toBe(false);
		});
	});

	describe('stringToBigNumber', () => {
		it('should convert valid string to BigNumber with toFixed()', () => {
			expect(stringToBigNumber('123.45').toFixed()).toBe('123.45');
			expect(stringToBigNumber('123.45456').toFixed()).toBe('123.45456');
		});

		it('should convert valid string to BigNumber with toNumber()', () => {
			expect(stringToBigNumber('123.45').toNumber()).toBe(123.45);
			expect(stringToBigNumber('123.45554').toNumber()).toBe(123.45554);
		});

		it('should convert valid negative string to BigNumber with toFixed()', () => {
			expect(stringToBigNumber('-123.45').toFixed()).toBe('-123.45');
			expect(stringToBigNumber('-123.455444').toFixed()).toBe('-123.455444');
		});

		it('should convert valid negative string to BigNumber with toNumber()', () => {
			expect(stringToBigNumber('-123.455444').toNumber()).toBe(-123.455444);
		});

		it('should return 0 for invalid input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(stringToBigNumber('abc').toFixed()).toBe('0');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith(
				'stringToBigNumber: invalid string parameter representation of number',
			);
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('absoluteToBigNumber', () => {
		it('should return absolute value with toFixed()', () => {
			expect(absoluteToBigNumber(-123.45).toFixed()).toBe('123.45');
			expect(absoluteToBigNumber('123.45').toFixed()).toBe('123.45');
		});

		it('should return absolute value with toNumber()', () => {
			expect(absoluteToBigNumber(-123.45).toNumber()).toBe(123.45);
			expect(absoluteToBigNumber('123.45').toNumber()).toBe(123.45);
		});

		it('should return 0 for invalid input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(absoluteToBigNumber('abc').toFixed()).toBe('0');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith(
				'absoluteToBigNumber: invalid string representation of number parameter',
			);
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('truncateNumberToBigNumber', () => {
		it('should not truncate number because of the same decimal precision', () => {
			expect(truncateNumberToBigNumber('123.456', 3).toFixed()).toBe('123.456');
			expect(truncateNumberToBigNumber(123.456, 3).toFixed()).toBe('123.456');
			expect(truncateNumberToBigNumber('123.456', 3).toNumber()).toBe(123.456);
			expect(truncateNumberToBigNumber(123.456, 3).toNumber()).toBe(123.456);
		});

		it('should truncate number correctly with toFixed()', () => {
			expect(truncateNumberToBigNumber('123.45689', 2).toFixed()).toBe('123.45');
			expect(truncateNumberToBigNumber('123.45', 2).toFixed()).toBe('123.45');
			expect(truncateNumberToBigNumber(123.45689, 2).toFixed()).toBe('123.45');
			expect(truncateNumberToBigNumber(123.456, 2).toFixed()).toBe('123.45');
		});

		it('should truncate number correctly with toNumber()', () => {
			expect(truncateNumberToBigNumber('123.45689', 2).toNumber()).toBe(123.45);
			expect(truncateNumberToBigNumber(123.456, 2).toNumber()).toBe(123.45);
			expect(truncateNumberToBigNumber(123.45644, 4).toNumber()).toBe(123.4564);
		});

		it('should return 0 for invalid input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(truncateNumberToBigNumber('abc').toFixed()).toBe('0');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith(
				'truncateNumberToBigNumber: invalid string representation of number parameter',
			);
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('roundNumberToBigNumber', () => {
		it('should not round number because of the same decimal precision', () => {
			expect(roundNumberToBigNumber('123.456', 3).toFixed()).toBe('123.456');
			expect(roundNumberToBigNumber(123.456, 3).toFixed()).toBe('123.456');
			expect(roundNumberToBigNumber('123.456', 3).toNumber()).toBe(123.456);
			expect(roundNumberToBigNumber(123.456, 3).toNumber()).toBe(123.456);
			expect(roundNumberToBigNumber(123.4564, 4).toNumber()).toBe(123.4564);
		});

		it('should round number correctly with toFixed()', () => {
			expect(roundNumberToBigNumber('123.4567', 2).toFixed()).toBe('123.46');
			expect(roundNumberToBigNumber(123.456, 2).toFixed()).toBe('123.46');
			expect(roundNumberToBigNumber(123.454445, 2).toFixed()).toBe('123.45');
			expect(roundNumberToBigNumber(123.45599, 2).toFixed()).toBe('123.46');
			expect(roundNumberToBigNumber(123.454445, 4).toFixed()).toBe('123.4544');
		});

		it('should round number correctly with toNumber()', () => {
			expect(roundNumberToBigNumber('123.454', 2).toNumber()).toBe(123.45);
			expect(roundNumberToBigNumber(123.454, 2).toNumber()).toBe(123.45);
			expect(roundNumberToBigNumber(123.456, 2).toNumber()).toBe(123.46);
			expect(roundNumberToBigNumber(123.454445, 2).toNumber()).toBe(123.45);
			expect(roundNumberToBigNumber(123.45599, 2).toNumber()).toBe(123.46);
			expect(roundNumberToBigNumber(123.45499, 2).toNumber()).toBe(123.45);
			expect(roundNumberToBigNumber(123.454445, 4).toNumber()).toBe(123.4544);
		});

		it('should round number correctly with toNumber() for negative numbers', () => {
			expect(roundNumberToBigNumber('-123.454', 2).toNumber()).toBe(-123.45);
			expect(roundNumberToBigNumber(-123.454, 2).toNumber()).toBe(-123.45);
			expect(roundNumberToBigNumber(-123.456, 2).toNumber()).toBe(-123.46);
			expect(roundNumberToBigNumber(-123.454445, 2).toNumber()).toBe(-123.45);
			expect(roundNumberToBigNumber(-123.45599, 2).toNumber()).toBe(-123.46);
			expect(roundNumberToBigNumber(-123.45499, 2).toNumber()).toBe(-123.45);
			expect(roundNumberToBigNumber(-123.454445, 4).toNumber()).toBe(-123.4544);
		});

		it('should return 0 for invalid input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(roundNumberToBigNumber('abc').toFixed()).toBe('0');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('roundNumberToBigNumber: invalid string representation of number');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('roundUpNumberToBigNumber', () => {
		it('should not round number because of the same decimal precision', () => {
			expect(roundUpNumberToBigNumber('123.456', 3).toFixed()).toBe('123.456');
			expect(roundUpNumberToBigNumber(123.456, 3).toFixed()).toBe('123.456');
			expect(roundUpNumberToBigNumber('123.456', 3).toNumber()).toBe(123.456);
			expect(roundUpNumberToBigNumber(123.456, 3).toNumber()).toBe(123.456);
		});

		it('should round number correctly with toFixed()', () => {
			expect(roundUpNumberToBigNumber('123.456', 2).toFixed()).toBe('123.46');
			expect(roundUpNumberToBigNumber(123.456, 2).toFixed()).toBe('123.46');
			expect(roundUpNumberToBigNumber(123.458455, 4).toFixed()).toBe('123.4585');
			expect(roundUpNumberToBigNumber(123.458955, 5).toFixed()).toBe('123.45896');
		});

		it('should round number correctly with toNumber()', () => {
			expect(roundUpNumberToBigNumber('123.454', 2).toNumber()).toBe(123.46);
			expect(roundUpNumberToBigNumber(123.454, 2).toNumber()).toBe(123.46);
			expect(roundUpNumberToBigNumber(123.456, 2).toNumber()).toBe(123.46);
			expect(roundUpNumberToBigNumber(123.45499, 2).toNumber()).toBe(123.46);
			expect(roundUpNumberToBigNumber(123.454955, 4).toNumber()).toBe(123.455);
			expect(roundUpNumberToBigNumber(123.458955, 5).toNumber()).toBe(123.45896);
		});

		it('should round number correctly with toNumber() for negative numbers', () => {
			expect(roundUpNumberToBigNumber('-123.454', 2).toNumber()).toBe(-123.46);
			expect(roundUpNumberToBigNumber(-123.454, 2).toNumber()).toBe(-123.46);
			expect(roundUpNumberToBigNumber(-123.456, 2).toNumber()).toBe(-123.46);
			expect(roundUpNumberToBigNumber(-123.45499, 2).toNumber()).toBe(-123.46);
			expect(roundUpNumberToBigNumber(-123.458955, 4).toNumber()).toBe(-123.459);
			expect(roundUpNumberToBigNumber(-123.458955, 5).toNumber()).toBe(-123.45896);
		});

		it('should return 0 for invalid input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(roundUpNumberToBigNumber('abc').toFixed()).toBe('0');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith(
				'roundUpNumberToBigNumber: invalid string representation of number',
			);
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('roundDownNumberToBigNumber', () => {
		it('should not round number because of the same decimal precision', () => {
			expect(roundDownNumberToBigNumber('123.456', 3).toFixed()).toBe('123.456');
			expect(roundDownNumberToBigNumber(123.456, 3).toFixed()).toBe('123.456');
			expect(roundDownNumberToBigNumber('123.456', 3).toNumber()).toBe(123.456);
			expect(roundDownNumberToBigNumber(123.456, 3).toNumber()).toBe(123.456);
		});

		it('should round number correctly with toFixed()', () => {
			expect(roundDownNumberToBigNumber('123.456', 2).toFixed()).toBe('123.45');
			expect(roundDownNumberToBigNumber(123.456, 2).toFixed()).toBe('123.45');
			expect(roundDownNumberToBigNumber(123.458955, 4).toFixed()).toBe('123.4589');
			expect(roundDownNumberToBigNumber(123.458955, 5).toFixed()).toBe('123.45895');
		});

		it('should round number correctly with toNumber()', () => {
			expect(roundDownNumberToBigNumber('123.454', 2).toNumber()).toBe(123.45);
			expect(roundDownNumberToBigNumber(123.454, 2).toNumber()).toBe(123.45);
			expect(roundDownNumberToBigNumber(123.456, 2).toNumber()).toBe(123.45);
			expect(roundDownNumberToBigNumber(123.45499, 2).toNumber()).toBe(123.45);
			expect(roundDownNumberToBigNumber(123.458955, 4).toNumber()).toBe(123.4589);
		});

		it('should round number correctly with toNumber() for negative numbers', () => {
			expect(roundDownNumberToBigNumber('-123.454', 2).toNumber()).toBe(-123.45);
			expect(roundDownNumberToBigNumber(-123.454, 2).toNumber()).toBe(-123.45);
			expect(roundDownNumberToBigNumber(-123.456, 2).toNumber()).toBe(-123.45);
			expect(roundDownNumberToBigNumber(-123.45499, 2).toNumber()).toBe(-123.45);
			expect(roundDownNumberToBigNumber(-123.458955, 4).toNumber()).toBe(-123.4589);
			expect(roundDownNumberToBigNumber(-123.458955, 5).toNumber()).toBe(-123.45895);
		});

		it('should return 0 for invalid input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(roundDownNumberToBigNumber('abc').toFixed()).toBe('0');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith(
				'roundDownNumberToBigNumber: invalid string representation of number',
			);
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('formatNumber', () => {
		it('should format number correctly', () => {
			expect(formatNumber(1234567.89)).toBe('1\u202f234\u202f567.89');
		});

		it('should handle rounding', () => {
			expect(formatNumber(1234567.89, true, 1)).toBe('1\u202f234\u202f567.9');
		});

		it('should handle minimum and maximum decimals', () => {
			expect(formatNumber(1234.5123, false, 3, 1)).toBe('1\u202f234.512');
		});

		it('should return string representation for invalid input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(formatNumber('abc')).toBe('abc');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('formatNumber: invalid number or string representation of number');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('countDecimalPlaces', () => {
		it('should count decimal places correctly', () => {
			expect(countDecimalPlaces(123.456)).toBe(3);
			expect(countDecimalPlaces('123.4567')).toBe(4);
		});

		it('should handle numbers without decimals', () => {
			expect(countDecimalPlaces(123)).toBe(0);
		});

		it('should return 0 for invalid input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(countDecimalPlaces('abc')).toBe(0);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('countDecimalPlaces: invalid string representation of number');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('labelNumber', () => {
		it('should label numbers correctly in English', () => {
			expect(labelNumber(1000000)).toBe('1.00 Million');
			expect(labelNumber(1000000000)).toBe('1.00 Billion');
			expect(labelNumber(1000000000000)).toBe('1.00 Trillion');
		});

		it('should label numbers correctly in French', () => {
			expect(labelNumber(1000000, 'fr')).toBe('1.00 Million');
			expect(labelNumber(1000000000, 'fr')).toBe('1.00 Milliard');
			expect(labelNumber(1000000000000, 'fr')).toBe('1.00 Trillion');
		});

		it('should use short labels when specified in english', () => {
			expect(labelNumber(1000000, 'en', true)).toBe('1.00 M');
			expect(labelNumber(1000000000, 'en', true)).toBe('1.00 B');
			expect(labelNumber(1000000000000, 'en', true)).toBe('1.00 T');
		});

		it('should use short labels when specified in french', () => {
			expect(labelNumber(1000000, 'fr', true)).toBe('1.00 M');
			expect(labelNumber(1000000000, 'fr', true)).toBe('1.00 G');
			expect(labelNumber(1000000000000, 'fr', true, true, 1)).toBe('1.0 T');
		});

		it('should handle negative numbers', () => {
			expect(labelNumber(-1000000)).toBe('-1.00 Million');
			expect(labelNumber(-1000000000)).toBe('-1.00 Billion');
			expect(labelNumber(-1000000000000)).toBe('-1.00 Trillion');
		});

		it('should handle rounding and decimal places', () => {
			expect(labelNumber(1234567, 'en', false, true, 1)).toBe('1.2 Million');
		});

		it('should return string representation for invalid input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(labelNumber('abc')).toBe('abc');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('labelNumber: invalid number or string representation of number');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});
});
