import { describe, it, expect } from 'vitest';

import { isEmailValid } from './email';

describe('Email validation utils tests', () => {
	it('should return a boolean', () => {
		expect(typeof isEmailValid('email@email.com')).toBe('boolean');
		expect(typeof isEmailValid('')).toBe('boolean');
		expect(typeof isEmailValid('email')).toBe('boolean');
	});

	it('should return true for valid email addresses', () => {
		const VALIDE_EMAILS = [
			' satoshi@domain.com',
			' satoshi@domain.com ',
			'satoshi@domain.com',
			'd@domain.com',
			'dev@domain.com',
			'test@example.com',
			'test@example.fr',
			'test@example.de',
			'test@example.be',
			'test@example.io',
			'com@com.com',
			'mr.test@example.com',
			'mr.test@example.io',
			'hello.mr.test@example.io',
			'user.name+tag+sorting@example.com',
			'x@example.co.uk',
			'x+tag@example.com',
			'name+tag@example.com',
			'x.y+z@example.com.ph',
		];

		VALIDE_EMAILS.forEach((email) => {
			// Email is normally trimmed before validation
			expect(isEmailValid(email.trim())).toBe(true);
		});
	});

	it('should return true for emails with multiple domain extensions', () => {
		const MULTI_DOMAIN_EMAILS = ['email@domain.co.uk', 'firstname.lastname@domain.ac.in'];

		MULTI_DOMAIN_EMAILS.forEach((email) => {
			expect(isEmailValid(email)).toBe(true);
		});
	});

	it('should return false for empty strings', () => {
		expect(isEmailValid('')).toBe(false);
	});

	it('should return false for space strings', () => {
		expect(isEmailValid(' ')).toBe(false);
	});

	it('should return false for undefined', () => {
		expect(isEmailValid(undefined)).toBe(false);
	});

	it('should return false for invalid email formats', () => {
		const INVALID_EMAILS = [
			'test',
			'test@.com',
			'test@',
			'example.com',
			'@example.com',
			'test@com',
			'plainaddress',
			'@missingusername.com',
			'satoshi@domain.c',
			'satoshi@domain.com@domain.com',
			'satoshi@domain .com',
			'satoshi @domain.com',
			'username@.com',
			'username@.com.com',
			'.username@yahoo.com',
			'username@yahoo.com.',
			'username@yahoo..com',
			'username@yahoo.c',
		];

		INVALID_EMAILS.forEach((email) => {
			expect(isEmailValid(email)).toBe(false);
		});
	});

	it('should return true for an account with exactly 64 characters', () => {
		const EXACT_ACCOUNT_EMAIL = `${'a'.repeat(64)}@example.com`;
		expect(isEmailValid(EXACT_ACCOUNT_EMAIL)).toBe(true);
	});

	it('should return true for a domain label with exactly 63 characters + extension', () => {
		const EXACT_DOMAIN_EMAIL = `test@${'a'.repeat(63)}.com`;
		expect(isEmailValid(EXACT_DOMAIN_EMAIL)).toBe(true);
	});

	it('should return true for a domain label with exactly 63 characters and extension with 63 characters', () => {
		const EXACT_LABEL_DOMAIN = `test@${'a'.repeat(63)}.${'b'.repeat(63)}`;
		expect(isEmailValid(EXACT_LABEL_DOMAIN)).toBe(true);
	});

	it('should return true for a domain label with exactly 63 characters and two extension with 63 characters', () => {
		const EXACT_LABEL_DOMAIN = `test@${'a'.repeat(63)}.${'b'.repeat(63)}.${'b'.repeat(63)}`;
		expect(isEmailValid(EXACT_LABEL_DOMAIN)).toBe(true);
	});

	it('should return false for an account with more than 64 characters', () => {
		const LONG_ACCOUNT_EMAIL = `${'a'.repeat(65)}@example.com`;
		expect(isEmailValid(LONG_ACCOUNT_EMAIL)).toBe(false);
	});

	it('should return false for a domain label with more than 255 characters', () => {
		const LONG_ADDRESS_EMAIL = `test@${'a'.repeat(256)}.com`;
		expect(isEmailValid(LONG_ADDRESS_EMAIL)).toBe(false);
	});

	it('should return false for a domain label with more than 63 characters', () => {
		const LONG_LABEL_DOMAIN = `test@${'a'.repeat(64)}.com`;
		expect(isEmailValid(LONG_LABEL_DOMAIN)).toBe(false);
	});

	it('should return true for a domain label with exactly 63 characters and extension with 63 characters but more than 255 characters in total', () => {
		const LONG_EMAIL = `test@${'a'.repeat(63)}.${'b'.repeat(63)}.${'b'.repeat(63)}.${'b'.repeat(63)}.${'b'.repeat(63)}`;
		expect(isEmailValid(LONG_EMAIL)).toBe(false);
	});
});
