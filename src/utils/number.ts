/* Utility functions for Number manipulation */

import BigNumber from 'bignumber.js';

import { replaceLastCommaByDot } from './string';

/*
 * Verify if a value is a number.
 *
 * @param value - The value to verify.
 *
 * @returns True if the value is a number, false otherwise.
 *
 * @remarks
 * Ensure that the value is a valid string representation of a number. Non-numeric strings will return false.
 * You can use `removeNonNumericCharactersFromString` to clean the string before using this function.
 */
const isNumber = (value: string | number | BigNumber | null | undefined): boolean => {
	if (value == null) {
		return false;
	}

	return !BigNumber(value).isNaN();
};

/*
 * Converts a string representation of a number to a number type.
 * This function utilizes BigNumber.js for precision, making it capable of handling very large numbers and numbers with small decimals.
 *
 * @param stringNumber - The string representation of the number to convert. Can be undefined. Must be a valid string representation of a number.
 *
 * @returns The numerical value of the string as a BigNumber. Returns 0 if the parameter string is null, undefined, or an invalid string.
 *
 * @remarks
 * Make sure that you are sending a valid string representation of a number. Non-numeric strings will result in an error.
 * You can use `removeNonNumericCharactersFromString` to clean the string before using this function.
 * Need to use .toNumber() to get the number representation of the BigNumber.
 * Need to use .toFixed() to get the string representation of the BigNumber. toFixed() is recommended over toString().
 */
const stringToBigNumber = (stringNumber: string | undefined): BigNumber => {
	if (
		stringNumber == null ||
		(typeof stringNumber === 'string' && !stringNumber.trim()) ||
		BigNumber(stringNumber).isNaN()
	) {
		console.error('stringToBigNumber: invalid string parameter representation of number');

		return BigNumber(0);
	}

	return BigNumber(stringNumber);
};

/*
 * Returns the absolute value of a number.
 * This function uses BigNumber.js, allowing it to handle large numbers and numbers with small decimals more effectively than Math.abs().
 *
 * @param number - The number to find the absolute value of. Can be a number, a string, or undefined.
 *
 * @returns The absolute value in BigNumber type. Returns 0 if the parameter number is null, undefined, or an invalid string.
 *
 * @remarks
 * Need to use .toNumber() to get the number representation of the BigNumber.
 * Need to use .toFixed() to get the string representation of the BigNumber. toFixed() is recommended over toString().
 */
const absoluteToBigNumber = (number: number | string | BigNumber | undefined): BigNumber => {
	if (number == null || (typeof number === 'string' && !number.trim()) || BigNumber(number).isNaN()) {
		console.error('absoluteToBigNumber: invalid string representation of number parameter');

		return BigNumber(0);
	}

	return BigNumber(number).abs();
};

/*
 * Truncates a number to the specified number of decimal places without rounding.
 * For instance, truncating 123.456789 to 2 decimal places will result in 123.45.
 *
 * @param number - The number to be truncated. Can be a number, a string, or undefined.
 * @param decimal - The number of decimal places to keep after truncation. Must be a non-negative integer. Default is 2.
 *
 * @returns The truncated number as a BigNumber. Returns 0 if the parameter number is null, undefined, or an invalid string.
 *
 * @remarks
 * Need to use .toNumber() to get the number representation of the BigNumber.
 * Need to use .toFixed() to get the string representation of the BigNumber. toFixed() is recommended over toString().
 */
const truncateNumberToBigNumber = (number: number | string | BigNumber | undefined, decimal = 2): BigNumber => {
	if (number == null || (typeof number === 'string' && !number.trim()) || BigNumber(number).isNaN()) {
		console.error('truncateNumberToBigNumber: invalid string representation of number parameter');

		return BigNumber(0);
	}

	if (!Number.isInteger(decimal) || decimal < 0) {
		console.error(`truncateNumberToBigNumber: invalid decimal parameter ${decimal}. Must be a non-negative integer`);

		return BigNumber(0);
	}

	const FACTOR = BigNumber(10).pow(decimal);

	return BigNumber(number).multipliedBy(FACTOR).integerValue(BigNumber.ROUND_DOWN).dividedBy(FACTOR);
};

/*
 * Rounds a number while keeping the specified number of decimal places.
 * Will round from the next decimal places of the specified decimal places.
 * Meaning that the number is rounded down if the next decimal is less than 5, and rounded up if the next decimal is 5 or greater.
 * Anything after the next decimal places is truncated.
 * For instance, rounding 123.45499 to 2 decimal places will result in 123.45.
 *
 * @param number - The number (or its string representation) to round.
 * @param decimal - The number of decimal places to keep after rounding. Must be a non-negative integer. Default is 2.
 *
 * @returns The rounded number in BigNumber type. Returns 0 if the parameter number is null, undefined, or an invalid string.
 *
 * @remarks
 * Need to use .toNumber() to get the number representation of the BigNumber.
 * Need to use .toFixed() to get the string representation of the BigNumber. toFixed() is recommended over toString().
 */
const roundNumberToBigNumber = (number: number | string | BigNumber | undefined, decimal = 2): BigNumber => {
	if (number == null || (typeof number === 'string' && !number.trim()) || BigNumber(number).isNaN()) {
		console.error('roundNumberToBigNumber: invalid string representation of number');

		return BigNumber(0);
	}

	if (!Number.isInteger(decimal) || decimal < 0) {
		console.error(`roundNumberToBigNumber: invalid decimal parameter ${decimal}. Must be a non-negative integer`);

		return BigNumber(0);
	}

	const FACTOR = BigNumber(10).pow(decimal);

	return BigNumber(number).multipliedBy(FACTOR).decimalPlaces(0).dividedBy(FACTOR);
};

/*
 * Rounds a number up to the nearest specified decimal place.
 * For positive numbers, it behaves like a regular ceiling function.
 * For negative numbers, it rounds towards zero (i.e.: less negative).
 *
 * Contrary to the roundNumberToBigNumber function, this function will rounds up from every decimal place.
 * For instance, rounding 123.45499 to 2 decimal places will result in 123.46.
 *
 * @param number - The number (or its string representation) to round up.
 * @param decimal - The number of decimal places to round to. Must be a non-negative integer. Default is 2.
 *
 * @returns The rounded number in BigNumber type. Returns 0 if the parameter number is null, undefined, or an invalid string.
 *
 * @remarks
 * Need to use .toNumber() to get the number representation of the BigNumber.
 * Need to use .toFixed() to get the string representation of the BigNumber. toFixed() is recommended over toString().
 */
const roundUpNumberToBigNumber = (number: number | string | BigNumber | undefined, decimal = 2): BigNumber => {
	if (number == null || (typeof number === 'string' && !number.trim()) || BigNumber(number).isNaN()) {
		console.error('roundUpNumberToBigNumber: invalid string representation of number');

		return BigNumber(0);
	}

	if (!Number.isInteger(decimal) || decimal < 0) {
		console.error(`roundUpNumberToBigNumber: invalid decimal parameter ${decimal}. Must be a non-negative integer`);

		return BigNumber(0);
	}

	const FACTOR = BigNumber(10).pow(decimal);
	const DECIMAL_NUMBER = BigNumber(number);

	return DECIMAL_NUMBER.isNegative()
		? DECIMAL_NUMBER.multipliedBy(FACTOR).integerValue(BigNumber.ROUND_FLOOR).dividedBy(FACTOR)
		: DECIMAL_NUMBER.multipliedBy(FACTOR).integerValue(BigNumber.ROUND_CEIL).dividedBy(FACTOR);
};

/*
 * Rounds a number down to the nearest specified decimal place.
 * For positive numbers, it behaves like a regular floor function.
 * For negative numbers, it rounds away from zero (i.e.: more negative).
 *
 * Contrary to the roundNumberToBigNumber function, this function will rounds down from every decimal place.
 * For instance, rounding 123.45499 to 2 decimal places will result in 123.45.
 *
 * @param number - The number (or its string representation) to round down.
 * @param decimal - The number of decimal places to round to. Must be a non-negative integer. Default is 2.
 *
 * @returns The rounded number in BigNumber type. Returns 0 if the parameter number is null, undefined, or an invalid string.
 *
 * @remarks
 * Need to use .toNumber() to get the number representation of the BigNumber.
 * Need to use .toFixed() to get the string representation of the BigNumber. toFixed() is recommended over toString().
 */
const roundDownNumberToBigNumber = (number: number | string | BigNumber | undefined, decimal = 2): BigNumber => {
	if (number == null || (typeof number === 'string' && !number.trim()) || BigNumber(number).isNaN()) {
		console.error('roundDownNumberToBigNumber: invalid string representation of number');

		return BigNumber(0);
	}

	if (!Number.isInteger(decimal) || decimal < 0) {
		console.error(`roundDownNumberToBigNumber: invalid decimal parameter ${decimal}. Must be a non-negative integer`);

		return BigNumber(0);
	}

	const FACTOR = BigNumber(10).pow(decimal);
	const DECIMAL_NUMBER = BigNumber(number);

	return DECIMAL_NUMBER.isNegative()
		? DECIMAL_NUMBER.multipliedBy(FACTOR).integerValue(BigNumber.ROUND_CEIL).dividedBy(FACTOR)
		: DECIMAL_NUMBER.multipliedBy(FACTOR).integerValue(BigNumber.ROUND_FLOOR).dividedBy(FACTOR);
};

/*
 * Formats a number by adding a space as a thousand separator and a dot as a decimal separator.
 * Optionally handles rounding.
 *
 * @param number - The number (or its string representation) to format.
 * @param isRounded - Whether to round the number (default is false).
 * @param maximumDecimal - The maximum number of decimals to display. Must be a non-negative integer. Default is 2.
 * @param minimumDecimal - The minimum number of decimals to display. Must be a non-negative integer. Default is 2.
 *
 * @returns The formatted number as a string.
 */
const formatNumber = (
	number: number | string | BigNumber | undefined,
	isRounded = false,
	maximumDecimal = 2,
	minimumDecimal = 2,
): string => {
	if (number == null || (typeof number === 'string' && !number.trim()) || BigNumber(number).isNaN()) {
		console.error('formatNumber: invalid number or string representation of number');

		return `${String(number)}`;
	}

	if (!Number.isInteger(maximumDecimal) || maximumDecimal < 0) {
		console.error(`formatNumber: invalid maximumDecimal parameter ${maximumDecimal}. Must be a non-negative integer`);

		return `${String(number)}`;
	}

	if (!Number.isInteger(minimumDecimal) || minimumDecimal < 0) {
		console.error(`formatNumber: invalid minimumDecimal parameter ${minimumDecimal}. Must be a non-negative integer`);

		return `${String(number)}`;
	}

	if (maximumDecimal < minimumDecimal) {
		console.error(
			'formatNumber: maximumDecimal must be greater than or equal to minimumDecimal. Setting minimumDecimal to maximumDecimal.',
		);
		minimumDecimal = maximumDecimal;
	}

	const BIG_NUMBER = BigNumber(number);

	// Force number type for Intl.NumberFormat with roundNumberToBigNumber() or truncateNumberToBigNumber()
	let formattedNumber = isRounded
		? roundNumberToBigNumber(BIG_NUMBER, maximumDecimal)
		: truncateNumberToBigNumber(BIG_NUMBER, maximumDecimal);

	if (formattedNumber.toFixed() === '-0') {
		formattedNumber = BigNumber(0);
	}

	// We replace the decimal comma by a dot, because it's scientifically superior ;)
	const FORMATTED_STRING = new Intl.NumberFormat('fr-FR', {
		minimumFractionDigits: minimumDecimal,
		maximumFractionDigits: maximumDecimal,
	}).format(formattedNumber.toNumber());

	return replaceLastCommaByDot(FORMATTED_STRING);
};

/*
 * Counts the number of decimal places in a given number.
 * In case of a string representation of a number, it normalizes the format by replacing underscores with nothing and commas with dots before counting.
 * If the input is undefined or an empty string, the function returns 0.
 * This function is useful for determining the precision of decimal numbers in various formats.
 *
 * @param number - The number whose decimal places are to be counted. Can be a number, string representation of a number, or undefined.
 *
 * @returns The count of decimal places in the given number. Returns 0 if there are no decimal places or if the input is undefined or an empty string.
 *
 * @example
 * countDecimalPlaces("1,234.567") // returns 3
 * countDecimalPlaces(1234) // returns 0
 * countDecimalPlaces(undefined) // returns 0
 */
const countDecimalPlaces = (number: number | string | BigNumber | undefined): number => {
	if (number == null || (typeof number === 'string' && !number.trim()) || BigNumber(number).isNaN()) {
		console.error('countDecimalPlaces: invalid string representation of number');

		return 0;
	}

	let numberString = '';

	if (typeof number === 'string') {
		numberString = BigNumber(number.replace(/_/g, '').trim()).toFixed();
		numberString = replaceLastCommaByDot(numberString);
	} else {
		numberString = BigNumber(number).toFixed();
	}

	// Check if the number has a decimal point
	if (numberString.includes('.')) {
		// Split the string by the decimal point
		const PARTS = numberString.split('.');

		// The last part (after the decimal point) contains the decimal places
		const COUNTED_DECIMAL = PARTS[PARTS.length - 1].length;

		return COUNTED_DECIMAL;
	}

	// If there is no decimal point, return 0
	return 0;
};

/*
 * Label a number by million, billion, trillion, also add a space as a thousand separator and a dot as a decimal separator.
 *
 * @param number - The number (or its string representation) to label.
 * @param lang - The language to be used for formatting the time. Defaults to 'en' (English).
 * @param shortLabel - Whether to use short labels (e.g.: 'M' for million, 'B' for billion, 'T' for trillion). Default is false.
 * @param isRounded - Whether to round the number (default is false).
 * @param maximumDecimal - The maximum number of decimals to display. Must be a non-negative integer. Default is 2.
 * @param minimumDecimal - The minimum number of decimals to display. Must be a non-negative integer. Default is 2.
 *
 * @returns The labelled number as a string.
 *
 * @remarks
 * Only the 'en' and 'fr' languages are supported. If an unsupported locale is provided, the function defaults to 'en'.
 */
const labelNumber = (
	number: number | string | BigNumber | undefined,
	lang: Locales = 'en',
	shortLabel = false,
	isRounded = false,
	maximumDecimal = 2,
	minimumDecimal = 2,
): string => {
	if (number == null || (typeof number === 'string' && !number.trim()) || BigNumber(number).isNaN()) {
		console.error('labelNumber: invalid number or string representation of number');

		return `${String(number)}`;
	}

	if (!Number.isInteger(maximumDecimal) || maximumDecimal < 0) {
		console.error(`labelNumber: invalid maximumDecimal parameter ${maximumDecimal}. Must be a non-negative integer`);

		return `${String(number)}`;
	}

	if (!Number.isInteger(minimumDecimal) || minimumDecimal < 0) {
		console.error(`labelNumber: invalid minimumDecimal parameter ${minimumDecimal}. Must be a non-negative integer`);

		return `${String(number)}`;
	}

	if (maximumDecimal < minimumDecimal) {
		console.error(
			'labelNumber: maximumDecimal must be greater than or equal to minimumDecimal. Setting minimumDecimal to maximumDecimal.',
		);
		minimumDecimal = maximumDecimal;
	}

	const SHORT_LABELS: Record<Locales, LanguageNumberShortLabels> = {
		en: {
			trillion: 'T',
			billion: 'B',
			million: 'M',
		},
		fr: {
			trillion: 'T',
			billion: 'G',
			million: 'M',
		},
	};

	const LABELS: Record<Locales, LanguageNumberLabels> = {
		en: {
			trillion: 'Trillion',
			billion: 'Billion',
			million: 'Million',
		},
		fr: {
			trillion: 'Trillion',
			billion: 'Milliard',
			million: 'Million',
		},
	};

	// eslint-disable-next-line security/detect-object-injection
	const LANG_STRINGS = shortLabel ? SHORT_LABELS[lang] || SHORT_LABELS['en'] : LABELS[lang] || LABELS['en'];

	const ABSOLUTE_NUMBER = absoluteToBigNumber(number);
	const NUMBER = BigNumber(number);

	if (ABSOLUTE_NUMBER.isGreaterThanOrEqualTo(1e12)) {
		const VALUE = NUMBER.dividedBy(1e12);

		return `${formatNumber(VALUE, isRounded, maximumDecimal, minimumDecimal)} ${LANG_STRINGS.trillion}${!shortLabel && lang.toLowerCase() === 'fr' && VALUE.gte(2) ? 's' : ''}`;
	} else if (ABSOLUTE_NUMBER.isGreaterThanOrEqualTo(1e9)) {
		const VALUE = NUMBER.dividedBy(1e9);

		return `${formatNumber(VALUE, isRounded, maximumDecimal, minimumDecimal)} ${LANG_STRINGS.billion}${!shortLabel && lang.toLowerCase() === 'fr' && VALUE.gte(2) ? 's' : ''}`;
	} else if (ABSOLUTE_NUMBER.isGreaterThanOrEqualTo(1e6)) {
		const VALUE = NUMBER.dividedBy(1e6);

		return `${formatNumber(VALUE, isRounded, maximumDecimal, minimumDecimal)} ${LANG_STRINGS.million}${!shortLabel && lang.toLowerCase() === 'fr' && VALUE.gte(2) ? 's' : ''}`;
	} else {
		return formatNumber(number, isRounded, maximumDecimal, minimumDecimal);
	}
};

export {
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
};
