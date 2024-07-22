import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

import MockDate from 'mockdate';

import {
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
} from './time';

describe('Time Manipulation Utility Functions', () => {
	beforeAll(() => {
		// Mock the current date to a fixed value for consistent testing
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		MockDate.set('2023-05-15T12:00:00Z');
	});

	afterAll(() => {
		// Restore the original Date object
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		MockDate.reset();
	});

	describe('getStringDifferenceFromNow', () => {
		it('should return correct difference for past date in English', () => {
			expect(getStringDifferenceFromNow('2023-05-14T12:00:00Z')).toBe('a day ago');
		});

		it('should return correct difference for future date in English', () => {
			expect(getStringDifferenceFromNow('2023-05-16T12:00:00Z')).toBe('in a day');
		});

		it('should return correct difference for past date in French', () => {
			expect(getStringDifferenceFromNow('2023-05-14T12:00:00Z', 'fr')).toBe('il y a un jour');
		});

		it('should return correct difference for future date in French', () => {
			expect(getStringDifferenceFromNow('2023-05-16T12:00:00Z', 'fr')).toBe('dans un jour');
		});

		it('should return correct difference without suffix in English', () => {
			expect(getStringDifferenceFromNow('2023-05-14T12:00:00Z', 'en', true)).toBe('a day');
		});

		it('should return correct difference without suffix in French', () => {
			expect(getStringDifferenceFromNow('2023-05-14T12:00:00Z', 'fr', true)).toBe('un jour');
		});

		it('should return empty string for invalid date', () => {
			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(getStringDifferenceFromNow('invalid-date')).toBe('');
			expect(consoleSpy).toHaveBeenCalledWith('getStringDifferenceFromNow: invalid from date');
			consoleSpy.mockRestore();
		});
	});

	describe('getStringDifferenceToNow', () => {
		it('should return correct difference for past date in English', () => {
			expect(getStringDifferenceToNow('2023-05-14T12:00:00Z')).toBe('in a day');
		});

		it('should return correct difference for future date in English', () => {
			expect(getStringDifferenceToNow('2023-05-16T12:00:00Z')).toBe('a day ago');
		});

		it('should return correct difference for past date in French', () => {
			expect(getStringDifferenceToNow('2023-05-14T12:00:00Z', 'fr')).toBe('dans un jour');
		});

		it('should return correct difference for future date in French', () => {
			expect(getStringDifferenceToNow('2023-05-16T12:00:00Z', 'fr')).toBe('il y a un jour');
		});

		it('should return correct difference without suffix in English', () => {
			expect(getStringDifferenceToNow('2023-05-14T12:00:00Z', 'en', true)).toBe('a day');
		});

		it('should return correct difference without suffix in French', () => {
			expect(getStringDifferenceToNow('2023-05-14T12:00:00Z', 'fr', true)).toBe('un jour');
		});

		it('should return empty string for invalid date', () => {
			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(getStringDifferenceToNow('invalid-date')).toBe('');
			expect(consoleSpy).toHaveBeenCalledWith('getStringDifferenceToNow: invalid from date');
			consoleSpy.mockRestore();
		});
	});

	describe('getStringDifferenceFromDateTime', () => {
		it('should return correct difference between two dates in English', () => {
			expect(getStringDifferenceFromDateTime('2023-05-14T12:00:00Z', '2023-05-15T12:00:00Z')).toBe('in a day');
		});

		it('should return correct difference between two dates in French', () => {
			expect(getStringDifferenceFromDateTime('2023-05-14T12:00:00Z', '2023-05-15T12:00:00Z', 'fr')).toBe(
				'dans un jour',
			);
		});

		it('should return correct difference without suffix in English', () => {
			expect(getStringDifferenceFromDateTime('2023-05-14T12:00:00Z', '2023-05-15T12:00:00Z', 'en', true)).toBe('a day');
		});

		it('should return correct difference without suffix in French', () => {
			expect(getStringDifferenceFromDateTime('2023-05-14T12:00:00Z', '2023-05-15T12:00:00Z', 'fr', true)).toBe(
				'un jour',
			);
		});

		it('should return empty string for invalid date', () => {
			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(getStringDifferenceFromDateTime('invalid-date', '2023-05-15T12:00:00Z')).toBe('');
			expect(consoleSpy).toHaveBeenCalledWith('getStringDifferenceFromDateTime: invalid from date');
			consoleSpy.mockRestore();
		});
	});

	describe('getStringDifferenceToDateTime', () => {
		it('should return correct difference between two dates in English', () => {
			expect(getStringDifferenceToDateTime('2023-05-16T12:00:00Z', '2023-05-15T12:00:00Z')).toBe('in a day');
		});

		it('should return correct difference between two dates in French', () => {
			expect(getStringDifferenceToDateTime('2023-05-16T12:00:00Z', '2023-05-15T12:00:00Z', 'fr')).toBe('dans un jour');
		});

		it('should return correct difference without suffix in English', () => {
			expect(getStringDifferenceToDateTime('2023-05-16T12:00:00Z', '2023-05-15T12:00:00Z', 'en', true)).toBe('a day');
		});

		it('should return correct difference without suffix in French', () => {
			expect(getStringDifferenceToDateTime('2023-05-16T12:00:00Z', '2023-05-15T12:00:00Z', 'fr', true)).toBe('un jour');
		});

		it('should return empty string for invalid date', () => {
			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(getStringDifferenceToDateTime('invalid-date', '2023-05-15T12:00:00Z')).toBe('');
			expect(consoleSpy).toHaveBeenCalledWith('getStringDifferenceToDateTime: invalid from date');
			consoleSpy.mockRestore();
		});
	});

	describe('isDateBetween', () => {
		it('should return true for date between start and end', () => {
			expect(isDateBetween('2023-05-15T12:00:00Z', '2023-05-14T12:00:00Z', '2023-05-16T12:00:00Z')).toBe(true);
		});

		it('should return false for date outside range', () => {
			expect(isDateBetween('2023-05-17T12:00:00Z', '2023-05-14T12:00:00Z', '2023-05-16T12:00:00Z')).toBe(false);
		});

		it('should return false for invalid date', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(isDateBetween('invalid-date', '2023-05-14T12:00:00Z', '2023-05-16T12:00:00Z')).toBe(false);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('isDateBetween: invalid date');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('isDateSame', () => {
		it('should return true for same dates', () => {
			expect(isDateSame('2023-05-15T12:00:00Z', '2023-05-15T12:00:00Z')).toBe(true);
		});

		it('should return false for different dates', () => {
			expect(isDateSame('2023-05-15T12:00:00Z', '2023-05-16T12:00:00Z')).toBe(false);
		});

		it('should return false for invalid date', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(isDateSame('invalid-date', '2023-05-15T12:00:00Z')).toBe(false);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('isDateSame: invalid date');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('isDateSameOrBefore', () => {
		it('should return true for same date', () => {
			expect(isDateSameOrBefore('2023-05-15T12:00:00Z', '2023-05-15T12:00:00Z')).toBe(true);
		});

		it('should return true for earlier date', () => {
			expect(isDateSameOrBefore('2023-05-14T12:00:00Z', '2023-05-15T12:00:00Z')).toBe(true);
		});

		it('should return false for later date', () => {
			expect(isDateSameOrBefore('2023-05-16T12:00:00Z', '2023-05-15T12:00:00Z')).toBe(false);
		});

		it('should return false for invalid date', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(isDateSameOrBefore('invalid-date', '2023-05-15T12:00:00Z')).toBe(false);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('isDateSameOrBefore: invalid date');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('isDateSameOrAfter', () => {
		it('should return true for same date', () => {
			expect(isDateSameOrAfter('2023-05-15T12:00:00Z', '2023-05-15T12:00:00Z')).toBe(true);
		});

		it('should return true for later date', () => {
			expect(isDateSameOrAfter('2023-05-16T12:00:00Z', '2023-05-15T12:00:00Z')).toBe(true);
		});

		it('should return false for earlier date', () => {
			expect(isDateSameOrAfter('2023-05-14T12:00:00Z', '2023-05-15T12:00:00Z')).toBe(false);
		});

		it('should return false for invalid date', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(isDateSameOrAfter('invalid-date', '2023-05-15T12:00:00Z')).toBe(false);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('isDateSameOrAfter: invalid date');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('isDateYesterday', () => {
		it('should return true for yesterday', () => {
			expect(isDateYesterday('2023-05-14T12:00:00Z')).toBe(true);
		});

		it('should return false for today', () => {
			expect(isDateYesterday('2023-05-15T12:00:00Z')).toBe(false);
		});

		it('should return false for invalid date', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(isDateYesterday('invalid-date')).toBe(false);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('isDateYesterday: invalid date');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('isDateToday', () => {
		it('should return true for today', () => {
			expect(isDateToday('2023-05-15T12:00:00Z')).toBe(true);
		});

		it('should return false for yesterday', () => {
			expect(isDateToday('2023-05-14T12:00:00Z')).toBe(false);
		});

		it('should return false for invalid date', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(isDateToday('invalid-date')).toBe(false);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('isDateToday: invalid date');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('isDateTomorrow', () => {
		it('should return true for tomorrow', () => {
			expect(isDateTomorrow('2023-05-16T12:00:00Z')).toBe(true);
		});

		it('should return false for today', () => {
			expect(isDateTomorrow('2023-05-15T12:00:00Z')).toBe(false);
		});

		it('should return false for invalid date', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(isDateTomorrow('invalid-date')).toBe(false);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('isDateTomorrow: invalid date');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('isDateLeapYear', () => {
		it('should return true for leap year', () => {
			expect(isDateLeapYear('2024-01-01')).toBe(true);
		});

		it('should return false for non-leap year', () => {
			expect(isDateLeapYear('2023-01-01')).toBe(false);
		});

		it('should return false for invalid date', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(isDateLeapYear('invalid-date')).toBe(false);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('isDateLeapYear: invalid date');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('howManyLeapDayInLastYears', () => {
		it('should return correct number of leap days', () => {
			expect(howManyLeapDayInLastYears(5)).toBe(1); // Assuming current year is 2023
		});

		it('should return 0 for invalid input', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(howManyLeapDayInLastYears(-1)).toBe(0);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith(
				'howManyLeapDayInLastYears: Invalid years parameter. Expected a positive number bigger than 1.',
			);
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('daysInCurrentYear', () => {
		it('should return 365 for non-leap year', () => {
			expect(daysInCurrentYear()).toBe(365); // Assuming current year is 2023
		});
	});

	describe('daysSinceStartOfCurrentYear', () => {
		it('should return correct number of days', () => {
			expect(daysSinceStartOfCurrentYear()).toBe(134); // May 15th is the 135th day of the year
		});
	});

	describe('guessUserTimezone', () => {
		it('should return a string', () => {
			expect(typeof guessUserTimezone()).toBe('string');
		});
	});

	describe('changeTimezone', () => {
		it('should change timezone correctly', () => {
			expect(changeTimezone('2023-05-15T12:00:00Z', 'America/New_York')).toBe('2023-05-15T08:00:00-04:00');
		});

		it('should return empty string for invalid date', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(changeTimezone('invalid-date', 'America/New_York')).toBe('');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('changeTimezone: invalid date');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('currentUtcTime', () => {
		it('should return current time in UTC', () => {
			expect(currentUtcTime()).toBe('2023-05-15T12:00:00Z');
		});
	});

	describe('isDateUtc', () => {
		it('should return true for UTC date', () => {
			expect(isDateUtc(dayjs.utc())).toBe(true);
		});

		it('should return false for non-UTC date', () => {
			expect(isDateUtc(dayjs.utc().local())).toBe(false);
		});

		it('should return false for invalid date', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			// @ts-expect-error Testing invalid input
			expect(isDateUtc('invalid-date')).toBe(false);
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('isDateUtc: invalid date');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('convertDateToUTC', () => {
		it('should convert date to UTC', () => {
			expect(convertDateToUTC('2023-05-15T08:00:00-04:00')).toBe('2023-05-15T12:00:00Z');
		});

		it('should return empty string for invalid date', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(convertDateToUTC('invalid-date')).toBe('');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('convertDateToUTC: invalid date');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});

	describe('convertDateToLocalTime', () => {
		it('should convert UTC date to local time', () => {
			// Note: This test assumes the local timezone is UTC. Adjust as necessary.
			const LOCAL_DATE = dayjs().format();
			const UTC_DATE = dayjs.utc().format();
			expect(convertDateToLocalTime(UTC_DATE)).toBe(dayjs(LOCAL_DATE).format());
		});

		it('should return empty string for invalid date', () => {
			const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
			expect(convertDateToLocalTime('invalid-date')).toBe('');
			expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('convertDateToLocalTime: invalid date');
			CONSOLE_ERROR_SPY.mockRestore();
		});
	});
});
