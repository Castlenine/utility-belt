import { describe, it, expect, vi } from 'vitest';

import { cryptoMinusShiftedToBigNumberType, cryptoShiftedToBigNumberType } from './cryptocurrency';

describe('Bitcoin helpers', () => {
	describe('cryptoMinusShiftedToBigNumberType', () => {
		it('should return an object when not using toNumber()', () => {
			expect(typeof cryptoMinusShiftedToBigNumberType(0)).toBe('object');
		});

		it('should return a number when using toNumber()', () => {
			expect(typeof cryptoMinusShiftedToBigNumberType(0).toNumber()).toBe('number');
		});

		it('should return a string when using toFixed()', () => {
			expect(typeof cryptoMinusShiftedToBigNumberType(0).toFixed()).toBe('string');
		});

		it('should correctly covert 0 satoshis to 0 bitcoins', () => {
			const RESULT = cryptoMinusShiftedToBigNumberType(0);
			expect(RESULT.toNumber()).toBe(0); // 0 bitcoins
		});

		it('should correctly convert small satoshis to bitcoins', () => {
			const RESULT = cryptoMinusShiftedToBigNumberType(1);
			expect(RESULT.toNumber()).toBe(0.00000001); // 0.00000001 bitcoins
		});

		it('should correctly convert negative small satoshis to bitcoins', () => {
			const RESULT = cryptoMinusShiftedToBigNumberType(-1);
			expect(RESULT.toNumber()).toBe(-0.00000001); // -0.00000001 bitcoins
		});

		it('should correctly convert satoshis to bitcoins', () => {
			const RESULT = cryptoMinusShiftedToBigNumberType(100000000);
			expect(RESULT.toNumber()).toBe(1); // 1 bitcoin
		});

		it('should handle string input converting from satoshis to bitcoins', () => {
			const RESULT = cryptoMinusShiftedToBigNumberType('500000000');
			expect(RESULT.toFixed()).toBe('5'); // 5 bitcoins
		});

		it('should handle string input converting from satoshis to bitcoins with decimal', () => {
			const RESULT = cryptoMinusShiftedToBigNumberType('50000000');
			expect(RESULT.toFixed()).toBe('0.5'); // 0.5 bitcoins
		});

		it('should correctly convert negative satoshis to bitcoins', () => {
			const RESULT = cryptoMinusShiftedToBigNumberType(-100000000);
			expect(RESULT.toNumber()).toBe(-1); // -1 bitcoin
		});

		it('should handle string input converting from negative satoshis to bitcoins', () => {
			const RESULT = cryptoMinusShiftedToBigNumberType('-500000000');
			expect(RESULT.toFixed()).toBe('-5'); // -5 bitcoins
		});

		it('should handle input smaller than 1 satoshi', () => {
			const RESULT = cryptoMinusShiftedToBigNumberType(0.000000001);
			expect(RESULT.toNumber()).toBe(0); // 0 bitcoins
		});

		it('should handle input with minus shift of 12', () => {
			const RESULT = cryptoMinusShiftedToBigNumberType(2000000000000, 12);
			console.log(RESULT.toNumber());
			expect(RESULT.toNumber()).toBe(2);
		});

		it('should return 0 for undefined input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error');
			const RESULT = cryptoMinusShiftedToBigNumberType(undefined);
			expect(RESULT.toNumber()).toBe(0);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('cryptoMinusShiftedToBigNumberType: invalid amount parameter');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should return 0 for empty string input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error');
			const RESULT = cryptoMinusShiftedToBigNumberType('');
			expect(RESULT.toNumber()).toBe(0);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('cryptoMinusShiftedToBigNumberType: invalid amount parameter');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should return 0 for non-numeric string', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error');
			const RESULT = cryptoMinusShiftedToBigNumberType('abc');
			expect(RESULT.toNumber()).toBe(0);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('cryptoMinusShiftedToBigNumberType: invalid amount parameter');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should return 0 for negative shiftFactor', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error');
			const RESULT = cryptoMinusShiftedToBigNumberType(100000000, -8);
			expect(RESULT.toNumber()).toBe(0);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith(
				'cryptoMinusShiftedToBigNumberType: invalid shiftFactor parameter. Must be a positive integer bigger than 0',
			);
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('cryptoShiftedToBigNumberType', () => {
		it('should return an object when not using toNumber()', () => {
			expect(typeof cryptoShiftedToBigNumberType(0)).toBe('object');
		});

		it('should return a number when using toNumber()', () => {
			expect(typeof cryptoShiftedToBigNumberType(0).toNumber()).toBe('number');
		});

		it('should return a string when using toFixed()', () => {
			expect(typeof cryptoShiftedToBigNumberType(0).toFixed()).toBe('string');
		});

		it('should correctly convert 0 bitcoins to 0 satoshis', () => {
			const RESULT = cryptoShiftedToBigNumberType(0);
			expect(RESULT.toNumber()).toBe(0); // 0 satoshis
		});

		it('should correctly convert small bitcoins to satoshis', () => {
			const RESULT = cryptoShiftedToBigNumberType(0.00000001);
			expect(RESULT.toNumber()).toBe(1); // 1 satoshi
		});

		it('should correctly convert small negative bitcoins to satoshis', () => {
			const RESULT = cryptoShiftedToBigNumberType(-0.00000001);
			expect(RESULT.toNumber()).toBe(-1); // -1 satoshi
		});

		it('should correctly convert bitcoins to satoshis', () => {
			const RESULT = cryptoShiftedToBigNumberType(1);
			expect(RESULT.toNumber()).toBe(100000000); // 100 million satoshis
		});

		it('should correctly convert negative bitcoins to satoshis', () => {
			const RESULT = cryptoShiftedToBigNumberType(-1);
			expect(RESULT.toNumber()).toBe(-100000000); // -100 million satoshis
		});

		it('should handle string input converting from bitcoins to satoshis', () => {
			const RESULT = cryptoShiftedToBigNumberType('0.5');
			expect(RESULT.toNumber()).toBe(50000000); // 50 million satoshis
		});

		it('should handle string input converting from negative bitcoins to satoshis', () => {
			const RESULT = cryptoShiftedToBigNumberType('-0.5');
			expect(RESULT.toNumber()).toBe(-50000000); // -50 million satoshis
		});

		it('should handle input smaller than 1 satoshi', () => {
			const RESULT = cryptoShiftedToBigNumberType(0.000000001);
			expect(RESULT.toNumber()).toBe(0); // 0 satoshis
		});

		it('should handle input with shift of 12', () => {
			const RESULT = cryptoShiftedToBigNumberType(0.000000000001, 12);
			expect(RESULT.toNumber()).toBe(1);
		});

		it('should return 0 for undefined input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error');
			const RESULT = cryptoShiftedToBigNumberType(undefined);
			expect(RESULT.toNumber()).toBe(0);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('cryptoShiftedToBigNumberType: invalid amount parameter');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should return 0 for empty string input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error');
			const RESULT = cryptoShiftedToBigNumberType('');
			expect(RESULT.toNumber()).toBe(0);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('cryptoShiftedToBigNumberType: invalid amount parameter');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should return 0 for non-numeric string', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error');
			const RESULT = cryptoShiftedToBigNumberType('hello');
			expect(RESULT.toNumber()).toBe(0);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('cryptoShiftedToBigNumberType: invalid amount parameter');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should return 0 for negative shiftFactor', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error');
			const RESULT = cryptoShiftedToBigNumberType(1, -8);
			expect(RESULT.toNumber()).toBe(0);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith(
				'cryptoShiftedToBigNumberType: invalid shiftFactor parameter. Must be a positive integer bigger than 0',
			);
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});
});
