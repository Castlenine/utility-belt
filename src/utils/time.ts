/* Utility functions for time manipulation */

import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isYesterday from 'dayjs/plugin/isYesterday';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import 'dayjs/locale/fr'; // French locale

dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isYesterday);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(isLeapYear);
dayjs.extend(timezone);
dayjs.extend(utc);

const VALID_GRANULARITIES: dayjs.UnitTypeLong[] = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'];

/*
 * Formats a given date into a human-readable string representing the time elapsed or remaining from now, in a specified language.
 *
 * @param date - The date to be formatted. Expected in a format recognized by `dayjs`.
 * @param lang - The language to be used for formatting the time. Defaults to 'en' (English).
 * @param withoutSuffix - Whether to exclude the suffix in the output. Defaults to `false`.
 *
 * @returns A string representing the time elapsed or remaining from the given date, in the specified language.
 * If the date is invalid, the function returns an empty string.
 */
const getStringDifferenceFromNow = (date: dayjs.ConfigType, lang: Locales = 'en', withoutSuffix = false): string => {
	if (date == null || !dayjs(date).isValid()) {
		console.error('getStringDifferenceFromNow: invalid from date');

		return '';
	}

	return dayjs(date).locale(lang).fromNow(withoutSuffix);
};

/*
 * Formats a given date into a human-readable string representing the time elapsed or remaining to now, in a specified language.
 *
 * @param date - The date to be formatted. Expected in a format recognized by `dayjs`.
 * @param lang - The language to be used for formatting the time. Defaults to 'en' (English).
 * @param withoutSuffix - Whether to exclude the suffix in the output. Defaults to `false`.
 *
 * @returns A string representing the time elapsed or remaining from the given date, in the specified language.
 * If the date is invalid, the function returns an empty string.
 */
const getStringDifferenceToNow = (date: dayjs.ConfigType, lang: Locales = 'en', withoutSuffix = false): string => {
	if (date == null || !dayjs(date).isValid()) {
		console.error('getStringDifferenceToNow: invalid from date');

		return '';
	}

	return dayjs(date).locale(lang).toNow(withoutSuffix);
};

/*
 * Formats a given date into a human-readable string representing the time elapsed or remaining from that date, in a specified language.
 *
 * @param from - The date to be formatted. Expected in a format recognized by `dayjs`.
 * @param baseDate - The base date to be used for the calculation. Expected in a format recognized by `dayjs`. Defaults to 'undefined' (current time).
 * @param lang - The language to be used for formatting the time. Defaults to 'en' (English).
 * @param withoutSuffix - Whether to exclude the suffix in the output. Defaults to `false`.
 *
 * @returns A string representing the time elapsed or remaining from the given date, in the specified language.
 * If the date is invalid, the function returns an empty string.
 *
 * The function calculates the difference in years, months, days, hours, minutes ans seconds between the current time and the given date.
 * It then returns a localized string describing this difference, such as "2 hours" or "3 days".
 * If the given date is the current time (less than 5 seconds), it returns a localized string for 'now'.
 */
const getStringDifferenceFromDateTime = (
	from: dayjs.ConfigType,
	baseDate: dayjs.ConfigType = undefined,
	lang: Locales = 'en',
	withoutSuffix = false,
): string => {
	// If baseDate is null or invalid, return an empty string (okay if undefined)
	if (!dayjs(baseDate).isValid()) {
		console.error('getStringDifferenceFromDateTime: invalid from date');

		return '';
	}

	// If from is null, undefined or invalid, return an empty string
	if (from == null || !dayjs(from).isValid()) {
		console.error('getStringDifferenceFromDateTime: invalid from date');

		return '';
	}

	if (baseDate === undefined) {
		return dayjs().locale(lang).from(dayjs(from), withoutSuffix);
	}

	return dayjs(baseDate).locale(lang).from(dayjs(from), withoutSuffix);
};

/*
 * Formats a given date into a human-readable string representing the time elapsed or remaining to that date, in a specified language.
 *
 * @param to - The date to be formatted. Expected in a format recognized by `dayjs`.
 * @param baseDate - The base date to be used for the calculation. Expected in a format recognized by `dayjs`. Defaults to 'undefined' (current time).
 * @param lang - The language to be used for formatting the time. Defaults to 'en' (English).
 * @param withoutSuffix - Whether to exclude the suffix in the output. Defaults to `false`.
 *
 * @returns A string representing the time elapsed or remaining to the given date, in the specified language.
 * If the date is invalid, the function returns an empty string.
 *
 * The function calculates the difference in years, months, days, hours, minutes ans seconds between the current time and the given date.
 * It then returns a localized string describing this difference, such as "2 hours" or "3 days".
 * If the given date is the current time (less than 5 seconds), it returns a localized string for 'now'.
 */
const getStringDifferenceToDateTime = (
	to: dayjs.ConfigType,
	baseDate: dayjs.ConfigType = undefined,
	lang: Locales = 'en',
	withoutSuffix = false,
): string => {
	// If baseDate is null or invalid, return an empty string (okay if undefined)
	if (!dayjs(baseDate).isValid()) {
		console.error('getStringDifferenceToDateTime: invalid from date');

		return '';
	}

	// If from is null, undefined or invalid, return an empty string
	if (to == null || !dayjs(to).isValid()) {
		console.error('getStringDifferenceToDateTime: invalid from date');

		return '';
	}

	if (baseDate === undefined) {
		return dayjs().locale(lang).to(dayjs(to), withoutSuffix);
	}

	return dayjs(baseDate).locale(lang).to(dayjs(to), withoutSuffix);
};

/*
 * Verifies if a given date is between two other dates.
 *
 * @param date - The date to be verified. Expected in a format recognized by `dayjs`.
 * @param startDate - The start date. Expected in a format recognized by `dayjs`.
 * @param endDate - The end date. Expected in a format recognized by `dayjs`.
 * @param granularity - The granularity to be used for the comparison. Defaults to 'day'.
 * The `granularity` parameter can be set to 'year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'.
 * @param inclusiveCheck - The type of inclusive check to be performed. Defaults to '()' meaning excludes start and end date.
 * The `inclusiveCheck` parameter can be set to '()', '[]', '[)' or '(]'. '[' means inclusive, '(' exclusive.
 * '()' excludes start and end date
 * '[]' includes start and end date
 * '[)' includes start date, excludes end date
 * '(]' excludes start date, includes end date
 *
 * @returns a boolean representing whether the given date is between the start and end dates.
 * If any of the dates is invalid, the function returns `false`.
 */
const isDateBetween = (
	date: dayjs.ConfigType,
	startDate: dayjs.ConfigType,
	endDate: dayjs.ConfigType,
	granularity: dayjs.UnitTypeLong = 'day',
	inclusiveCheck: '()' | '[]' | '[)' | '(]' = '()',
): boolean => {
	if (!dayjs(date).isValid() || !dayjs(startDate).isValid() || !dayjs(endDate).isValid()) {
		console.error('isDateBetween: invalid date');

		return false;
	}

	if (inclusiveCheck !== '()' && inclusiveCheck !== '[]' && inclusiveCheck !== '[)' && inclusiveCheck !== '(]') {
		return false;
	}

	if (!VALID_GRANULARITIES.includes(granularity)) {
		console.error('isDateBetween: invalid granularity');

		return false;
	}

	return dayjs(date).isBetween(startDate, endDate, granularity, inclusiveCheck);
};

/*
 * Verifies if a given date is the same as another date.
 *
 * @param date - The date to be verified. Expected in a format recognized by `dayjs`.
 * @param dateToCompare - The date to be compared. Expected in a format recognized by `dayjs`.
 * @param granularity - The granularity to be used for the comparison. Defaults to 'day'.
 * The `granularity` parameter can be set to 'year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'.
 *
 * @returns a boolean representing whether the given date is the same as the date to compare.
 * If any of the dates is invalid, the function returns `false`.
 */
const isDateSame = (
	date: dayjs.ConfigType,
	dateToCompare: dayjs.ConfigType,
	granularity: dayjs.UnitTypeLong = 'day',
): boolean => {
	if (!dayjs(date).isValid() || !dayjs(dateToCompare).isValid()) {
		console.error('isDateSame: invalid date');

		return false;
	}

	if (!VALID_GRANULARITIES.includes(granularity)) {
		console.error('isDateSame: invalid granularity');

		return false;
	}

	return dayjs(date).isSame(dateToCompare, granularity);
};

/*
 * Verifies if a given date is the same or before another date.
 *
 * @param date - The date to be verified. Expected in a format recognized by `dayjs`.
 * @param dateToCompare - The date to be compared. Expected in a format recognized by `dayjs`.
 * @param granularity - The granularity to be used for the comparison. Defaults to 'day'.
 * The `granularity` parameter can be set to 'year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'.
 *
 * @returns a boolean representing whether the given date is the same or before the date to compare.
 * If any of the dates is invalid, the function returns `false`.
 */
const isDateSameOrBefore = (
	date: dayjs.ConfigType,
	dateToCompare: dayjs.ConfigType,
	granularity: dayjs.UnitTypeLong = 'day',
): boolean => {
	if (!dayjs(date).isValid() || !dayjs(dateToCompare).isValid()) {
		console.error('isDateSameOrBefore: invalid date');

		return false;
	}

	if (!VALID_GRANULARITIES.includes(granularity)) {
		console.error('isDateSameOrBefore: invalid granularity');

		return false;
	}

	return dayjs(date).isSameOrBefore(dateToCompare, granularity);
};

/*
 * Verifies if a given date is the same or after another date.
 *
 * @param date - The date to be verified. Expected in a format recognized by `dayjs`.
 * @param dateToCompare - The date to be compared. Expected in a format recognized by `dayjs`.
 * @param granularity - The granularity to be used for the comparison. Defaults to 'day'.
 * The `granularity` parameter can be set to 'year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'.
 *
 * @returns a boolean representing whether the given date is the same or after the date to compare.
 * If any of the dates is invalid, the function returns `false`.
 */
const isDateSameOrAfter = (
	date: dayjs.ConfigType,
	dateToCompare: dayjs.ConfigType,
	granularity: dayjs.UnitTypeLong = 'day',
): boolean => {
	if (!dayjs(date).isValid() || !dayjs(dateToCompare).isValid()) {
		console.error('isDateSameOrAfter: invalid date');

		return false;
	}

	if (!VALID_GRANULARITIES.includes(granularity)) {
		console.error('isDateSameOrAfter: invalid granularity');

		return false;
	}

	return dayjs(date).isSameOrAfter(dateToCompare, granularity);
};

/*
 * Verifies if a given date is yesterday.
 *
 * @param date - The date to be verified. Expected in a format recognized by `dayjs`.
 *
 * @returns a boolean representing whether the given date is yesterday.
 * If the date is invalid, the function returns `false`.
 */
const isDateYesterday = (date: dayjs.ConfigType): boolean => {
	if (!dayjs(date).isValid()) {
		console.error('isDateYesterday: invalid date');

		return false;
	}

	return dayjs(date).isYesterday();
};

/*
 * Verifies if a given date is today.
 *
 * @param date - The date to be verified. Expected in a format recognized by `dayjs`.
 *
 * @returns a boolean representing whether the given date is today.
 * If the date is invalid, the function returns `false`.
 */
const isDateToday = (date: dayjs.ConfigType): boolean => {
	if (!dayjs(date).isValid()) {
		console.error('isDateToday: invalid date');

		return false;
	}

	return dayjs(date).isToday();
};

/*
 * Verifies if a given date is tomorrow.
 *
 * @param date - The date to be verified. Expected in a format recognized by `dayjs`.
 *
 * @returns a boolean representing whether the given date is tomorrow.
 * If the date is invalid, the function returns `false`.
 */
const isDateTomorrow = (date: dayjs.ConfigType): boolean => {
	if (!dayjs(date).isValid()) {
		console.error('isDateTomorrow: invalid date');

		return false;
	}

	return dayjs(date).isTomorrow();
};

/*
 * Verifies if a given date is a leap year.
 *
 * @param date - The date to be verified. Expected in a format recognized by `dayjs`.
 *
 * @returns a boolean representing whether the given date is a leap year.
 */
const isDateLeapYear = (date: dayjs.ConfigType): boolean => {
	if (!dayjs(date).isValid()) {
		console.error('isDateLeapYear: invalid date');

		return false;
	}

	return dayjs(date).isLeapYear();
};

/*
 * Verifies how many years have a leap day (February 29th) in the last X years. Normal years have 365 days, while leap years have 366 days.
 *
 * @param years - The number of years to go back in time to verify how many leap days have occurred.
 * @param fromToday - Whether to calculate the years from today or from the start of the current year. Defaults to `true`.
 *
 * @returns a number representing the number of leap days in the last X years.
 * If the years parameter is invalid, the function returns 0.
 *
 * @remarks
 * You can use dayjs().get('year') to get the current year.
 */
const howManyLeapDayInLastYears = (years: number, fromToday = true): number => {
	if (typeof years !== 'number' || years < 1) {
		console.error('howManyLeapDayInLastYears: Invalid years parameter. Expected a positive number bigger than 1.');

		return 0;
	}

	const INITIAL_DATE = fromToday ? dayjs() : dayjs().startOf('year');

	const START_OF_X_YEARS_AGO = INITIAL_DATE.subtract(years, 'year');

	return INITIAL_DATE.diff(START_OF_X_YEARS_AGO, 'day') % 365;
};

/*
 * Calculates the number of days in the current year. Normal years have 365 days, while leap years have 366 days.
 *
 * @returns a number representing the number of days in the current year.
 */
const daysInCurrentYear = (): number => {
	return dayjs().isLeapYear() ? 366 : 365;
};

/*
 * Calculates the number of days since the start of the current year.
 *
 * @returns a number representing the number of days since the start of the current year.
 */
const daysSinceStartOfCurrentYear = (): number => {
	const NOW = dayjs();

	const START_OF_CURRENT_YEAR = NOW.startOf('year');

	// Difference in days
	return NOW.diff(START_OF_CURRENT_YEAR, 'day');
};

/*
 * Guesses the user's timezone based on the browser's settings.
 *
 * @returns a string representing the user's timezone.
 */
const guessUserTimezone = (): string => {
	return dayjs.tz.guess();
};

/*
 * Changes the timezone of a given date.
 *
 * @param date - The date to be formatted. Expected in a format recognized by `dayjs`.
 * @param timezone - The timezone to be used for the date. Expected in a format recognized by `dayjs`.
 * @param haveSameTime - Whether to keep the same time or not. Defaults to `false`.
 *
 * @returns a `dayjs` object representing the date in the specified timezone.
 * If the date is invalid, the function returns the current time.
 */
const changeTimezone = (date: dayjs.ConfigType, timezone: string, haveSameTime = false): string => {
	if (!dayjs(date).isValid()) {
		console.error('changeTimezone: invalid date');

		return '';
	}

	return dayjs(date).tz(timezone, haveSameTime).format();
};

/*
 * Returns the current time in UTC format.
 *
 * @returns a string representing the current time in UTC format.
 */
const currentUtcTime = (): string => {
	return dayjs().utc().format();
};

/*
 * Verifies if a given date is in UTC format.
 *
 * @param date - The date to be verified. Expected to be a `dayjs` object.
 *
 * @returns a boolean representing whether the given date is in UTC format.
 * If the date is invalid, the function returns `false`.
 */
const isDateUtc = (date: dayjs.Dayjs): boolean => {
	if (!dayjs(date).isValid()) {
		console.error('isDateUtc: invalid date');

		return false;
	}

	return dayjs(date).isUTC();
};

/*
 * Converts a given date to UTC format.
 *
 * @param date - The date to be formatted. Expected in a format recognized by `dayjs`.
 *
 * @returns a string representing the date in UTC format.
 * If the date is invalid, the function returns the current time.
 */
const convertDateToUTC = (date: dayjs.ConfigType): string => {
	if (!dayjs(date).isValid()) {
		console.error('convertDateToUTC: invalid date');

		return '';
	}

	return dayjs(date).utc().format();
};

/*
 * Converts a given date to local time.
 *
 * @param date - The date to be formatted. Expected in a format recognized by `dayjs`.
 *
 * @returns a string representing the date in local time.
 * If the date is invalid, the function returns the current time.
 */
const convertDateToLocalTime = (date: dayjs.ConfigType): string => {
	if (!dayjs(date).isValid()) {
		console.error('convertDateToLocalTime: invalid date');

		return '';
	}

	return dayjs(date).utc().local().format();
};

export {
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
};
