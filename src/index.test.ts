// Test importation of the module with individual import
import { describe, it, expect } from 'vitest';

// All modules
import utilityBelt from './index';

// Individual modules
import { atomicUnit, cookie, cryptocurrency, currency, delay, email, number, object, string, time } from './index';

describe('index importing', () => {
	it('should import all modules', () => {
		expect(utilityBelt).toBeDefined();
	});

	it('should import from all modules atomicUnit', () => {
		// @ts-expect-error atomicUnit is not defined
		expect(utilityBelt.atomicUnit).toBeUndefined();

		expect(utilityBelt.convertNumberToAtomicUnit).toBeDefined();
		expect(utilityBelt.convertAtomicUnitToBigNumber).toBeDefined();
	});

	it('should import from all modules cookie', () => {
		// @ts-expect-error cookie is not
		expect(utilityBelt.cookie).toBeUndefined();

		expect(utilityBelt.parseValueFromCookie).toBeDefined();
	});

	it('should import from all modules cryptocurrency', () => {
		// @ts-expect-error cryptocurrency is not defined
		expect(utilityBelt.cryptocurrency).toBeUndefined();

		expect(utilityBelt.cryptoMinusShiftedToBigNumberType).toBeDefined();
		expect(utilityBelt.cryptoShiftedToBigNumberType).toBeDefined();
	});

	it('should import from all modules currency', () => {
		// @ts-expect-error currency is not defined
		expect(utilityBelt.currency).toBeUndefined();

		expect(utilityBelt.getCurrencyFullName).toBeDefined();
		expect(utilityBelt.getCurrencySymbol).toBeDefined();
		expect(utilityBelt.formatAndAddCurrencySymbol).toBeDefined();
		expect(utilityBelt.labelCurrency).toBeDefined();
	});

	it('should import from all modules delay', () => {
		// Default export
		expect(utilityBelt.delay).toBeDefined();
	});

	it('should import from all modules email', () => {
		// @ts-expect-error email is not defined
		expect(utilityBelt.email).toBeUndefined();

		expect(utilityBelt.isEmailValid).toBeDefined();
	});

	it('should import from all modules number', () => {
		// @ts-expect-error number is not defined
		expect(utilityBelt.number).toBeUndefined();

		expect(utilityBelt.isNumber).toBeDefined();
		expect(utilityBelt.stringToBigNumber).toBeDefined();
		expect(utilityBelt.absoluteToBigNumber).toBeDefined();
		expect(utilityBelt.truncateNumberToBigNumber).toBeDefined();
		expect(utilityBelt.roundNumberToBigNumber).toBeDefined();
		expect(utilityBelt.roundUpNumberToBigNumber).toBeDefined();
		expect(utilityBelt.roundDownNumberToBigNumber).toBeDefined();
		expect(utilityBelt.formatNumber).toBeDefined();
		expect(utilityBelt.countDecimalPlaces).toBeDefined();
		expect(utilityBelt.labelNumber).toBeDefined();
	});

	it('should import from all modules object', () => {
		// @ts-expect-error object is not defined
		expect(utilityBelt.object).toBeUndefined();

		expect(utilityBelt.isObjectEmpty).toBeDefined();
		expect(utilityBelt.countValueInArrayOfObjects).toBeDefined();
	});

	it('should import from all modules string', () => {
		// @ts-expect-error string is not defined
		expect(utilityBelt.string).toBeUndefined();

		expect(utilityBelt.capitalizeFirstLetterOnly).toBeDefined();
		expect(utilityBelt.replaceLastCommaByDot).toBeDefined();
		expect(utilityBelt.isStringContainsNumber).toBeDefined();
		expect(utilityBelt.removeNonNumericCharactersFromString).toBeDefined();
		expect(utilityBelt.removeNumbersFromString).toBeDefined();
		expect(utilityBelt.numberToString).toBeDefined();
		expect(utilityBelt.normalizeString).toBeDefined();
		expect(utilityBelt.slugifyString).toBeDefined();
	});

	it('should import from all modules time', () => {
		// @ts-expect-error time is not defined
		expect(utilityBelt.time).toBeUndefined();

		expect(utilityBelt.getStringDifferenceFromNow).toBeDefined();
		expect(utilityBelt.getStringDifferenceToNow).toBeDefined();
		expect(utilityBelt.getStringDifferenceFromDateTime).toBeDefined();
		expect(utilityBelt.getStringDifferenceToDateTime).toBeDefined();
		expect(utilityBelt.isDateBetween).toBeDefined();
		expect(utilityBelt.isDateSame).toBeDefined();
		expect(utilityBelt.isDateSameOrBefore).toBeDefined();
		expect(utilityBelt.isDateSameOrAfter).toBeDefined();
		expect(utilityBelt.isDateYesterday).toBeDefined();
		expect(utilityBelt.isDateToday).toBeDefined();
		expect(utilityBelt.isDateTomorrow).toBeDefined();
		expect(utilityBelt.isDateLeapYear).toBeDefined();
		expect(utilityBelt.howManyLeapDayInLastYears).toBeDefined();
		expect(utilityBelt.daysInCurrentYear).toBeDefined();
		expect(utilityBelt.daysSinceStartOfCurrentYear).toBeDefined();
		expect(utilityBelt.guessUserTimezone).toBeDefined();
		expect(utilityBelt.changeTimezone).toBeDefined();
		expect(utilityBelt.currentUtcTime).toBeDefined();
		expect(utilityBelt.isDateUtc).toBeDefined();
		expect(utilityBelt.convertDateToUTC).toBeDefined();
		expect(utilityBelt.convertDateToLocalTime).toBeDefined();
	});
});

describe('index individual importing', () => {
	it('should import with individual import atomicUnit', () => {
		expect(atomicUnit).toBeDefined();

		expect(atomicUnit.convertNumberToAtomicUnit).toBeDefined();
		expect(atomicUnit.convertAtomicUnitToBigNumber).toBeDefined();
	});

	it('should import with individual import cookie', () => {
		expect(cookie).toBeDefined();

		expect(cookie.parseValueFromCookie).toBeDefined();
	});

	it('should import with individual import cryptocurrency', () => {
		expect(cryptocurrency).toBeDefined();

		expect(cryptocurrency.cryptoMinusShiftedToBigNumberType).toBeDefined();
		expect(cryptocurrency.cryptoShiftedToBigNumberType).toBeDefined();
	});

	it('should import with individual import currency', () => {
		expect(currency).toBeDefined();

		expect(currency.getCurrencyFullName).toBeDefined();
		expect(currency.getCurrencySymbol).toBeDefined();
		expect(currency.formatAndAddCurrencySymbol).toBeDefined();
		expect(currency.labelCurrency).toBeDefined();
	});

	it('should import with individual import delay', () => {
		// Default export
		expect(delay).toBeDefined();
	});

	it('should import with individual import email', () => {
		expect(email).toBeDefined();

		expect(email.isEmailValid).toBeDefined();
	});

	it('should import with individual import number', () => {
		expect(number).toBeDefined();

		expect(number.isNumber).toBeDefined();
		expect(number.stringToBigNumber).toBeDefined();
		expect(number.absoluteToBigNumber).toBeDefined();
		expect(number.truncateNumberToBigNumber).toBeDefined();
		expect(number.roundNumberToBigNumber).toBeDefined();
		expect(number.roundUpNumberToBigNumber).toBeDefined();
		expect(number.roundDownNumberToBigNumber).toBeDefined();
		expect(number.formatNumber).toBeDefined();
		expect(number.countDecimalPlaces).toBeDefined();
		expect(number.labelNumber).toBeDefined();
	});

	it('should import with individual import object', () => {
		expect(object).toBeDefined();

		expect(object.isObjectEmpty).toBeDefined();
		expect(object.countValueInArrayOfObjects).toBeDefined();
	});

	it('should import with individual import string', () => {
		expect(string).toBeDefined();

		expect(string.capitalizeFirstLetterOnly).toBeDefined();
		expect(string.replaceLastCommaByDot).toBeDefined();
		expect(string.isStringContainsNumber).toBeDefined();
		expect(string.removeNonNumericCharactersFromString).toBeDefined();
		expect(string.removeNumbersFromString).toBeDefined();
		expect(string.numberToString).toBeDefined();
		expect(string.normalizeString).toBeDefined();
		expect(string.slugifyString).toBeDefined();
	});

	it('should import with individual import time', () => {
		expect(time).toBeDefined();

		expect(time.getStringDifferenceFromNow).toBeDefined();
		expect(time.getStringDifferenceToNow).toBeDefined();
		expect(time.getStringDifferenceFromDateTime).toBeDefined();
		expect(time.getStringDifferenceToDateTime).toBeDefined();
		expect(time.isDateBetween).toBeDefined();
		expect(time.isDateSame).toBeDefined();
		expect(time.isDateSameOrBefore).toBeDefined();
		expect(time.isDateSameOrAfter).toBeDefined();
		expect(time.isDateYesterday).toBeDefined();
		expect(time.isDateToday).toBeDefined();
		expect(time.isDateTomorrow).toBeDefined();
		expect(time.isDateLeapYear).toBeDefined();
		expect(time.howManyLeapDayInLastYears).toBeDefined();
		expect(time.daysInCurrentYear).toBeDefined();
		expect(time.daysSinceStartOfCurrentYear).toBeDefined();
		expect(time.guessUserTimezone).toBeDefined();
		expect(time.changeTimezone).toBeDefined();
		expect(time.currentUtcTime).toBeDefined();
		expect(time.isDateUtc).toBeDefined();
		expect(time.convertDateToUTC).toBeDefined();
		expect(time.convertDateToLocalTime).toBeDefined();
	});
});
