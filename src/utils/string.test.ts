import { describe, it, expect, vi } from 'vitest';

import BigNumber from 'bignumber.js';
import {
	capitalizeFirstLetterOnly,
	replaceLastCommaByDot,
	isStringContainsNumber,
	removeNonNumericCharactersFromString,
	removeNumbersFromString,
	slugifyString,
	numberToString,
	normalizeString,
} from './string';

describe('String Manipulation Utility Functions', () => {
	describe('capitalizeFirstLetterOnly', () => {
		it('should capitalize the first letter and lowercase the rest by default', () => {
			expect(capitalizeFirstLetterOnly('hELLO wORLD')).toBe('Hello world');
		});

		it('should capitalize the first letter and keep the rest unchanged when specified', () => {
			expect(capitalizeFirstLetterOnly('hELLO wORLD', false)).toBe('HELLO wORLD');
		});

		it('should return an empty string for non-string input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			// @ts-expect-error testing invalid input
			expect(capitalizeFirstLetterOnly(123)).toBe('');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('capitalizeFirstLetterOnly: invalid string');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should handle empty strings', () => {
			expect(capitalizeFirstLetterOnly('')).toBe('');
		});
	});

	describe('replaceLastCommaByDot', () => {
		it('should replace the last comma with a dot', () => {
			expect(replaceLastCommaByDot('1,000,000,00')).toBe('1000000.00');
		});

		it('should keep other commas when specified', () => {
			expect(replaceLastCommaByDot('1,000,000,00', false)).toBe('1,000,000.00');
		});

		it('should return the original string if no comma is present', () => {
			expect(replaceLastCommaByDot('100000.00')).toBe('100000.00');
		});

		it('should return an empty string for non-string input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			// @ts-expect-error testing invalid input
			expect(replaceLastCommaByDot(123)).toBe('');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('replaceLastCommaByDot: invalid string');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should handle empty strings', () => {
			expect(replaceLastCommaByDot('')).toBe('');
		});
	});

	describe('isStringContainsNumber', () => {
		it('should return true if the string contains a number', () => {
			expect(isStringContainsNumber('abc123')).toBe(true);
		});

		it('should return false if the string does not contain a number', () => {
			expect(isStringContainsNumber('abcdef')).toBe(false);
		});

		it('should return false for non-string input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			// @ts-expect-error testing invalid input
			expect(isStringContainsNumber(123)).toBe(false);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('isStringContainsNumber: invalid string');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should handle empty strings', () => {
			expect(isStringContainsNumber('')).toBe(false);
		});
	});

	describe('removeNonNumericCharactersFromString', () => {
		it('should remove non-numeric characters', () => {
			expect(removeNonNumericCharactersFromString('abc123.45def')).toBe('123.45');
		});

		it('should handle negative numbers', () => {
			expect(removeNonNumericCharactersFromString('-123.45')).toBe('-123.45');
		});

		it('should replace comma with dot when specified', () => {
			expect(removeNonNumericCharactersFromString('1,000,000,00')).toBe('1000000.00');
		});

		it('should return an empty string for non-string input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			// @ts-expect-error testing invalid input
			expect(removeNonNumericCharactersFromString(123)).toBe('');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('removeNonNumericCharactersFromString: invalid string');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should handle empty strings', () => {
			expect(removeNonNumericCharactersFromString('')).toBe('');
		});
	});

	describe('removeNumbersFromString', () => {
		it('should remove all numeric characters from a string', () => {
			expect(removeNumbersFromString('abc123def456')).toBe('abcdef');
		});

		it('should return an empty string for non-string input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			// @ts-expect-error testing invalid input
			expect(removeNumbersFromString(123)).toBe('');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('removeNumbersFromString: invalid string');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should handle empty strings', () => {
			expect(removeNumbersFromString('')).toBe('');
		});
	});

	describe('numberToString', () => {
		it('should convert a number to its string representation', () => {
			expect(numberToString(123.45)).toBe('123.45');
		});

		it('should handle BigNumber input', () => {
			expect(numberToString(new BigNumber('1e+20'))).toBe('100000000000000000000');
		});

		it('should return an empty string for null or undefined', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(numberToString(undefined)).toBe('');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('numberToString: invalid number');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should return an empty string for NaN', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(numberToString(NaN)).toBe('');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('numberToString: invalid number');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('normalizeString', () => {
		it('should remove diacritics, emojis, non-Latin characters, numbers, punctuation, and special characters by default', () => {
			expect(normalizeString('Héllø, @Wørld! 123 👋 大阪 ¥')).toBe('HelloWorld');
		});

		it('should replace spaces with underscores when specified', () => {
			expect(normalizeString('Hello World', 'underscore')).toBe('Hello_World');
		});

		it('should replace spaces with dashes when specified', () => {
			expect(normalizeString('Hello World', 'dash')).toBe('Hello-World');
		});

		it('should keep spaces when specified', () => {
			expect(normalizeString('Hello World', '')).toBe('Hello World');
		});

		it('should keep diacritics when specified', () => {
			expect(normalizeString('Héllø, Wørld!', 'remove', false)).toBe('HélloWorld');
		});

		it('should remove all emojis but keep number', () => {
			expect(normalizeString('"1😂💯♡⌨︎❄️🇫🌎🇨🇦🔥"', 'remove', true, true, true, false, true, true)).toBe('1');
		});

		it('should keep emojis when specified', () => {
			expect(normalizeString('Hello 👋 World!', 'remove', true, false)).toBe('Hello👋World');
		});

		it('should keep non-Latin characters when specified', () => {
			expect(normalizeString('Hello 大阪 World!', 'remove', true, true, false)).toBe('Hello大阪World');
		});

		it('should keep numbers when specified', () => {
			expect(normalizeString('Hello 123 World!', 'remove', true, true, true, false)).toBe('Hello123World');
		});

		it('should keep punctuation when specified', () => {
			expect(normalizeString('Hello, World!', 'remove', true, true, true, true, false)).toBe('Hello,World!');
		});

		it('should keep special characters when specified', () => {
			expect(normalizeString('Hello ¥ World!', 'remove', true, true, true, true, true, false)).toBe('Hello¥World');
		});

		it('should return an empty string for non-string input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			// @ts-expect-error testing invalid input
			expect(normalizeString(123)).toBe('');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('normalizeString: string parameter is not a string');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should handle empty strings', () => {
			expect(normalizeString('')).toBe('');
		});
	});

	describe('slugifyString', () => {
		it('should convert a string to a URL-friendly slug', () => {
			expect(slugifyString('Hello, World!')).toBe('hello-world');
		});

		it('should handle multiple spaces and special characters', () => {
			expect(slugifyString('  Hello,  _World.  ')).toBe('hello-world');
		});

		it('should handle multiple dash', () => {
			expect(slugifyString('  Hello,-  _World.  --')).toBe('hello-world');
		});

		it('should keep the letter capitalization', () => {
			expect(slugifyString('Hello, World!', false)).toBe('Hello-World');
		});

		it('should keep the letter uppercase', () => {
			expect(slugifyString('HELLO, WORLD!', false)).toBe('HELLO-WORLD');
		});

		it('should return an empty string for non-string input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			// @ts-expect-error testing invalid input
			expect(slugifyString(123)).toBe('');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('slugifyString: invalid string');
			CONSOLE_ERROR_SPY.mockRestore();
		});

		it('should handle empty strings', () => {
			expect(slugifyString('')).toBe('');
		});
	});
});
