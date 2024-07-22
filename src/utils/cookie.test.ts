import { describe, it, expect, vi } from 'vitest';

import { parseValueFromCookie } from './cookie';

describe('Cookie utils', () => {
	describe('parseValueFromCookie', () => {
		it('should return an string', () => {
			const COOKIE = 'user=JohnDoe; session=abc123; token=xyz789';
			expect(typeof parseValueFromCookie(COOKIE, 'session')).toBe('string');
		});

		it('should return an string even if the cookie is not parsed', () => {
			const COOKIE = 'user=JohnDoe; session=abc123; token=xyz789';
			expect(typeof parseValueFromCookie(COOKIE, 'test')).toBe('string');
		});

		it('should return an string even if the bad cookie is not successfully parsed', () => {
			const COOKIE = 12151;
			// @ts-expect-error Testing bad input
			expect(typeof parseValueFromCookie(COOKIE, 'test')).toBe('string');
		});

		it('should correctly parse a value by key from a well-formed cookie string', () => {
			const COOKIE = 'user=JohnDoe; session=abc123; token=xyz789';
			const VALUE = parseValueFromCookie(COOKIE, 'session');
			expect(VALUE).toBe('abc123');
		});

		it('should return an empty string if the key is not present in the cookie', () => {
			const COOKIE = 'user=JohnDoe; session=abc123; token=xyz789';
			const VALUE = parseValueFromCookie(COOKIE, 'notFound');
			expect(VALUE).toBe('');
		});

		it('should handle cookies without spaces after semicolons correctly', () => {
			const COOKIE = 'user=JohnDoe;session=abc123;token=xyz789';
			const VALUE = parseValueFromCookie(COOKIE, 'token');
			expect(VALUE).toBe('xyz789');
		});

		it('should return an empty string if the cookie string is empty', () => {
			const VALUE = parseValueFromCookie('', 'user');
			expect(VALUE).toBe('');
		});

		it('should return an empty string if the key is empty', () => {
			const COOKIE = 'user=JohnDoe; session=abc123; token=xyz789';
			const VALUE = parseValueFromCookie(COOKIE, '');
			expect(VALUE).toBe('');
		});

		it('should return an empty string for malformed key-value pairs', () => {
			const COOKIE = 'user; session=abc123; token';
			const VALUE = parseValueFromCookie(COOKIE, 'user');
			expect(VALUE).toBe('');
		});

		it('should handle a single COOKIE without a key-value pair correctly', () => {
			const COOKIE = 'session';
			const VALUE = parseValueFromCookie(COOKIE, 'session');
			expect(VALUE).toBe('');
		});

		it('should handle cookies with missing values correctly', () => {
			const COOKIE = 'user=; session=abc123; token=';
			const VALUE = parseValueFromCookie(COOKIE, 'user');
			expect(VALUE).toBe('');
		});

		it('should not crash or throw an error on malformed cookies', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error');
			const COOKIE = 'user==JohnDoe; session==abc123';
			const VALUE = parseValueFromCookie(COOKIE, 'user');
			expect(VALUE).toBe('');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledTimes(0);
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});
});
