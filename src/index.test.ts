// Test importation of the module with individual import
import { describe, it, expect } from 'vitest';

// All modules
import utilityBelt from './modules';

// Named exports for individual modules
import { atomicUnit, cookie, cryptocurrency, currency, delay, email, number, object, string, time } from './modules';

// Named exports for individual functions
import {
	convertNumberToAtomicUnit,
	convertAtomicUnitToBigNumber,
	parseValueFromCookie,
	cryptoMinusShiftedToBigNumberType,
	cryptoShiftedToBigNumberType,
	getCurrencyFullName,
	getCurrencySymbol,
	formatAndAddCurrencySymbol,
	labelCurrency,
	delay as delayFunction,
	isEmailValid,
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
	isObjectEmpty,
	countValueInArrayOfObjects,
	capitalizeFirstLetterOnly,
	replaceLastCommaByDot,
	isStringContainsNumber,
	removeNonNumericCharactersFromString,
	removeNumbersFromString,
	numberToString,
	normalizeString,
	slugifyString,
	getStringDifferenceFromNow,
	getStringDifferenceToNow,
	getStringDifferenceFromDateTime,
	getStringDifferenceToDateTime,
	isDateBetween,
	isDateSame,
	isDateSameOrBefore,
	isDateSameOrAfter,
	isDateYesterday,
	isDateToday,
	isDateTomorrow,
	isDateLeapYear,
	howManyLeapDayInLastYears,
	daysInCurrentYear,
	daysSinceStartOfCurrentYear,
	guessUserTimezone,
	changeTimezone,
	currentUtcTime,
	isDateUtc,
	convertDateToUTC,
	convertDateToLocalTime,
} from './index';

describe('all modules importing', () => {
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

describe('Named exports for individual modules importing', () => {
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

describe('Named exports for individual functions importing', () => {
	it('should import with individual import convertNumberToAtomicUnit', () => {
		expect(convertNumberToAtomicUnit).toBeDefined();
	});

	it('should import with individual import convertAtomicUnitToBigNumber', () => {
		expect(convertAtomicUnitToBigNumber).toBeDefined();
	});

	it('should import with individual import parseValueFromCookie', () => {
		expect(parseValueFromCookie).toBeDefined();
	});

	it('should import with individual import cryptoMinusShiftedToBigNumberType', () => {
		expect(cryptoMinusShiftedToBigNumberType).toBeDefined();
	});

	it('should import with individual import cryptoShiftedToBigNumberType', () => {
		expect(cryptoShiftedToBigNumberType).toBeDefined();
	});

	it('should import with individual import getCurrencyFullName', () => {
		expect(getCurrencyFullName).toBeDefined();
	});

	it('should import with individual import getCurrencySymbol', () => {
		expect(getCurrencySymbol).toBeDefined();
	});

	it('should import with individual import formatAndAddCurrencySymbol', () => {
		expect(formatAndAddCurrencySymbol).toBeDefined();
	});

	it('should import with individual import labelCurrency', () => {
		expect(labelCurrency).toBeDefined();
	});

	it('should import with individual import isEmailValid', () => {
		expect(isEmailValid).toBeDefined();
	});

	it('should import with individual import delay', () => {
		// Default export
		expect(delayFunction).toBeDefined();
	});

	it('should import with individual import isNumber', () => {
		expect(isNumber).toBeDefined();
	});

	it('should import with individual import stringToBigNumber', () => {
		expect(stringToBigNumber).toBeDefined();
	});

	it('should import with individual import absoluteToBigNumber', () => {
		expect(absoluteToBigNumber).toBeDefined();
	});

	it('should import with individual import truncateNumberToBigNumber', () => {
		expect(truncateNumberToBigNumber).toBeDefined();
	});

	it('should import with individual import roundNumberToBigNumber', () => {
		expect(roundNumberToBigNumber).toBeDefined();
	});

	it('should import with individual import roundUpNumberToBigNumber', () => {
		expect(roundUpNumberToBigNumber).toBeDefined();
	});

	it('should import with individual import roundDownNumberToBigNumber', () => {
		expect(roundDownNumberToBigNumber).toBeDefined();
	});

	it('should import with individual import formatNumber', () => {
		expect(formatNumber).toBeDefined();
	});

	it('should import with individual import countDecimalPlaces', () => {
		expect(countDecimalPlaces).toBeDefined();
	});

	it('should import with individual import labelNumber', () => {
		expect(labelNumber).toBeDefined();
	});

	it('should import with individual import isObjectEmpty', () => {
		expect(isObjectEmpty).toBeDefined();
	});

	it('should import with individual import countValueInArrayOfObjects', () => {
		expect(countValueInArrayOfObjects).toBeDefined();
	});

	it('should import with individual import capitalizeFirstLetterOnly', () => {
		expect(capitalizeFirstLetterOnly).toBeDefined();
	});

	it('should import with individual import replaceLastCommaByDot', () => {
		expect(replaceLastCommaByDot).toBeDefined();
	});

	it('should import with individual import isStringContainsNumber', () => {
		expect(isStringContainsNumber).toBeDefined();
	});

	it('should import with individual import removeNonNumericCharactersFromString', () => {
		expect(removeNonNumericCharactersFromString).toBeDefined();
	});

	it('should import with individual import removeNumbersFromString', () => {
		expect(removeNumbersFromString).toBeDefined();
	});

	it('should import with individual import numberToString', () => {
		expect(numberToString).toBeDefined();
	});

	it('should import with individual import normalizeString', () => {
		expect(normalizeString).toBeDefined();
	});

	it('should import with individual import slugifyString', () => {
		expect(slugifyString).toBeDefined();
	});

	it('should import with individual import getStringDifferenceFromNow', () => {
		expect(getStringDifferenceFromNow).toBeDefined();
	});

	it('should import with individual import getStringDifferenceToNow', () => {
		expect(getStringDifferenceToNow).toBeDefined();
	});

	it('should import with individual import getStringDifferenceFromDateTime', () => {
		expect(getStringDifferenceFromDateTime).toBeDefined();
	});

	it('should import with individual import getStringDifferenceToDateTime', () => {
		expect(getStringDifferenceToDateTime).toBeDefined();
	});

	it('should import with individual import isDateBetween', () => {
		expect(isDateBetween).toBeDefined();
	});

	it('should import with individual import isDateSame', () => {
		expect(isDateSame).toBeDefined();
	});

	it('should import with individual import isDateSameOrBefore', () => {
		expect(isDateSameOrBefore).toBeDefined();
	});

	it('should import with individual import isDateSameOrAfter', () => {
		expect(isDateSameOrAfter).toBeDefined();
	});

	it('should import with individual import isDateYesterday', () => {
		expect(isDateYesterday).toBeDefined();
	});

	it('should import with individual import isDateToday', () => {
		expect(isDateToday).toBeDefined();
	});

	it('should import with individual import isDateTomorrow', () => {
		expect(isDateTomorrow).toBeDefined();
	});

	it('should import with individual import isDateLeapYear', () => {
		expect(isDateLeapYear).toBeDefined();
	});

	it('should import with individual import howManyLeapDayInLastYears', () => {
		expect(howManyLeapDayInLastYears).toBeDefined();
	});

	it('should import with individual import daysInCurrentYear', () => {
		expect(daysInCurrentYear).toBeDefined();
	});

	it('should import with individual import daysSinceStartOfCurrentYear', () => {
		expect(daysSinceStartOfCurrentYear).toBeDefined();
	});

	it('should import with individual import guessUserTimezone', () => {
		expect(guessUserTimezone).toBeDefined();
	});

	it('should import with individual import changeTimezone', () => {
		expect(changeTimezone).toBeDefined();
	});

	it('should import with individual import currentUtcTime', () => {
		expect(currentUtcTime).toBeDefined();
	});

	it('should import with individual import isDateUtc', () => {
		expect(isDateUtc).toBeDefined();
	});

	it('should import with individual import convertDateToUTC', () => {
		expect(convertDateToUTC).toBeDefined();
	});

	it('should import with individual import convertDateToLocalTime', () => {
		expect(convertDateToLocalTime).toBeDefined();
	});

	it('should import with individual import convertDateToLocalTime', () => {
		expect(convertDateToLocalTime).toBeDefined();
	});
});
