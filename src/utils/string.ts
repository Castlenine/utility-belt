/* Utility functions for string manipulation */

import BigNumber from 'bignumber.js';

/*
 * Capitalizes the first letter of a string. Optionally, converts the rest of the string to lowercase.
 *
 * @param string - The string to be modified.
 * @param isRestBecomeLowercase - If true (default), the rest of the string becomes lowercase. If false, the rest of the string remains unchanged.
 *
 * @returns The modified string with the first letter capitalized. If the input is not a string or is an empty string, an empty string is returned.
 */
const capitalizeFirstLetterOnly = (string: string | undefined, isRestBecomeLowercase = true): string => {
	if (typeof string !== 'string') {
		console.error('capitalizeFirstLetterOnly: invalid string');

		return '';
	}

	if (!string.trim()) {
		return string;
	}

	return string.charAt(0).toUpperCase() + (isRestBecomeLowercase ? string.slice(1).toLowerCase() : string.slice(1));
};

/*
 * Replaces the last comma in a string with a dot.
 * This can be useful for formatting strings that represent numbers,
 * where the comma is used as a decimal separator and needs to be converted to a dot for certain languages or systems.
 *
 * @param string - The string in which the last comma is to be replaced with a dot.
 * @param removeOtherCommas - If true, removes all other commas from the string. Useful to remove thousands separators. Defaults to true.
 *
 * @returns A new string with the last comma replaced by a dot. If no comma is present in the input string, the original string is returned unchanged.
 * If the input is not a string or is an empty string, an empty string is returned.
 */
const replaceLastCommaByDot = (string: string | undefined, removeOtherCommas = true): string => {
	if (typeof string !== 'string') {
		console.error('replaceLastCommaByDot: invalid string');

		return '';
	}

	if (!string.trim()) {
		return string;
	}

	const LAST_INDEX_OF_COMMA = string.lastIndexOf(',');

	if (LAST_INDEX_OF_COMMA === -1) {
		return string; // No comma found, return original string
	}

	const STRING_FORMATTED = `${string.substring(0, LAST_INDEX_OF_COMMA)}.${string.substring(LAST_INDEX_OF_COMMA + 1)}`;

	return removeOtherCommas ? STRING_FORMATTED.replace(/,/g, '') : STRING_FORMATTED;
};

/*
 * Checks if a string contains any numeric characters.
 *
 * @param string - The string to be tested.
 *
 * @returns `true` if the string contains a number, otherwise `false`. If the input is not a string or is an empty string, `false` is returned.
 */
const isStringContainsNumber = (string: string | undefined): boolean => {
	if (typeof string !== 'string') {
		console.error('isStringContainsNumber: invalid string');

		return false;
	}

	if (!string.trim()) {
		return false;
	}

	return /\d/.test(string);
};

/*
 * Removes all non-numeric characters from a string, preserving decimal points and negative signs.
 *
 * @param string - The string from which non-numeric characters will be removed.
 * @param haveReplaceLastCommaByDot - If true, replaces commas with dots. Defaults to true.
 * @param removeOtherCommas - If haveReplaceLastCommaByDot is true and this parameter is true, removes all other commas from the string. Useful to remove thousands separators. Defaults to true.
 *
 * @returns A new string containing only numeric characters. If the input is not a string or is an empty string, an empty string is returned.
 */
const removeNonNumericCharactersFromString = (
	string: string | undefined,
	haveReplaceLastCommaByDot = true,
	removeOtherCommas = true,
): string => {
	if (typeof string !== 'string') {
		console.error('removeNonNumericCharactersFromString: invalid string');

		return '';
	}

	if (!string.trim()) {
		return string;
	}

	if (haveReplaceLastCommaByDot) {
		string = replaceLastCommaByDot(string, removeOtherCommas);
	}

	const IS_NEGATIVE = string.startsWith('-');

	return string.replace(IS_NEGATIVE ? /[^\d.-]/g : /[^\d.]/g, '');
};

/*
 * Removes all numeric characters from a string.
 *
 * @param string - The string from which numbers will be removed.
 *
 * @returns A new string with all numeric characters removed. If the input is not a string or is an empty string, an empty string is returned.
 */
const removeNumbersFromString = (string: string | undefined): string => {
	if (typeof string !== 'string') {
		console.error('removeNumbersFromString: invalid string');

		return '';
	}

	if (!string.trim()) {
		return string;
	}

	return string.replace(/\d/g, '');
};

/*
 * Converts a number to its string representation using BigNumber.js to handle large or small decimal numbers.
 *
 * @param number - The number to convert to a string. Can be undefined.
 *
 * @returns The string representation of the number, or an empty string if the number is null, undefined, or NaN.
 *
 * @remarks
 * This function is useful to circumvent the limitations of JavaScript's Number type, which cannot handle large or small numbers accurately.
 * Strings don't have this limitation.
 * You may need to use BigNumber to handle the result if you need to perform further arithmetic operations.
 */
const numberToString = (number: number | BigNumber | undefined): string => {
	if (number == null || BigNumber(number).isNaN()) {
		console.error('numberToString: invalid number');

		return '';
	}

	return BigNumber(number).toFixed();
};

/*
 * Normalize a string by removing diacritics, emojis, non-Latin characters, numbers, punctuation, special characters and replacing spaces
 * It doesn't change the case of the characters
 *
 * @param string - The string to normalize
 * @param spaceReplacementType - The type of replacement to use for spaces. It can be 'remove', 'underscore' or 'dash'. Set an empty string to keep spaces (`''`). Default is 'remove'
 * @param haveRemoveDiacritic - Flag to indicate if diacritics should be removed. Default is true
 * @param haveRemoveEmoji - Flag to indicate if emojis should be removed. Default is true
 * @param haveRemoveNonLatin - Flag to indicate if non-Latin characters should be removed. Default is true
 * @param haveRemoveNumber - Flag to indicate if numbers should be removed. Default is true
 * @param haveRemovePunctuation - Flag to indicate if punctuation should be removed. Default is true
 * @param haveRemoveSpecialCharacters - Flag to indicate if special characters should be removed. Default is true
 *
 * @returns The normalized string
 *
 * @example
 * normalizeString('Hello, World!'); // 'HelloWorld'
 * normalizeString('Hello, World!', 'underscore'); // 'Hello_World'
 * normalizeString('A ticket to 大阪 costs ¥2000 👌.'); // 'Atickettocosts'
 */
const normalizeString = (
	string: string | undefined,
	spaceReplacementType: 'remove' | 'underscore' | 'dash' | '' = 'remove',
	haveRemoveDiacritic = true,
	haveRemoveEmoji = true,
	haveRemoveNonLatin = true,
	haveRemoveNumber = true,
	haveRemovePunctuation = true,
	haveRemoveSpecialCharacters = true,
): string => {
	if (typeof string !== 'string') {
		console.error('normalizeString: string parameter is not a string');

		return '';
	}

	if (!string.trim()) {
		return string;
	}

	let normalizedString = string.normalize('NFD'); // Normalize to decomposed form

	if (haveRemoveDiacritic) {
		normalizedString = normalizedString.replace(/\p{Diacritic}/gu, ''); // Remove diacritics
	}

	if (haveRemoveEmoji) {
		normalizedString = normalizedString.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, ''); // Remove emojis
	}

	if (haveRemoveNonLatin) {
		normalizedString = normalizedString.replace(/ø/giu, 'o'); // Replace ø with o, case-insensitive
		normalizedString = normalizedString.replace(
			/[^A-Za-z\s\d\p{P}\p{Sc}\p{Diacritic}\p{Emoji}\p{Emoji_Presentation}]+/gu,
			'',
		); // Remove non-Latin characters, except spaces, numbers, punctuation, diacritics, emojis, and special characters
	}

	if (haveRemoveNumber) {
		normalizedString = normalizedString.replace(/\d/g, ''); // Remove numbers
	}

	if (haveRemovePunctuation) {
		normalizedString = normalizedString.replace(/\p{P}/gu, ''); // Remove punctuation
	}

	if (haveRemoveSpecialCharacters) {
		normalizedString = normalizedString.replace(/\p{Sc}/gu, ''); // Remove special characters
	}

	switch (spaceReplacementType) {
		case 'remove':
			normalizedString = normalizedString.trim().replace(/\s+/g, ''); // Remove spaces

			break;

		case 'underscore':
			normalizedString = normalizedString.trim().replace(/\s+/g, '_'); // Replace spaces with underscores

			break;

		case 'dash':
			normalizedString = normalizedString.trim().replace(/\s+/g, '-'); // Replace spaces with dashes

			break;
		// Default case: do nothing, keep spaces as they are
	}

	return normalizedString;
};

/*
 * Converts a string to a URL-friendly slug format. This involves lowercasing all characters,
 * and replacing spaces, dots, commas, and underscores with dashes.
 *
 * @param string - The string to slugify.
 * @param isBecomeLowercase - If true (default), the string is converted to lowercase. If false, the string remains unchanged.
 *
 * @returns A slugified version of the input string. If the input is not a string or is an empty string, an empty string is returned.
 */
const slugifyString = (string: string | undefined, isBecomeLowercase = true): string => {
	if (typeof string !== 'string') {
		console.error('slugifyString: invalid string');

		return '';
	}

	if (!string.trim()) {
		return string;
	}

	return isBecomeLowercase ? normalizeString(string, 'dash').toLowerCase() : normalizeString(string, 'dash');
};

export {
	capitalizeFirstLetterOnly,
	replaceLastCommaByDot,
	isStringContainsNumber,
	removeNonNumericCharactersFromString,
	removeNumbersFromString,
	numberToString,
	normalizeString,
	slugifyString,
};
