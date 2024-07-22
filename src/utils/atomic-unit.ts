/* Utility functions for Atomic Unit manipulation */

import BigNumber from 'bignumber.js';

import { replaceLastCommaByDot } from './string';

/*
 * Converts a number or a string representation of a number to an atomic unit.
 * The function handles different string formats by normalizing decimal separators and removing underscores.
 *
 * @param number - The number to be converted. Can be a number, string representation of a number, or undefined.
 *
 * @returns An object representing the atomic unit, containing the atomic value as a string, the precision as a number, the original value as a string and a boolean to confirm that the conversion to atomic unit was successful.
 * If the input is invalid, it logs an error and returns an atomic unit with a value of '0', precision 0 and originalValue '0' with isValid false.
 *
 * @remarks
 * Numbers in JavaScript have limitations, so we use string representation for the value of the AtomicUnit, but it's "technically" a number.
 * You can use `stringToBigNumber` to convert the value to a number type.
 * Ensure you're sending a valid string representation of a number. Non-numeric strings will result in an error. Use `removeNonNumericCharactersFromString` to clean the string before using this function.
 *
 * @example
 * convertNumberToAtomicUnit("1,234.567") // returns { value: "1234567", precision: 3, originalValue: "1234.567", isValid: true }
 * convertNumberToAtomicUnit(1234) // returns { value: "1234", precision: 0 , originalValue: "1234", isValid: true }
 * convertNumberToAtomicUnit(undefined) // returns { value: "0", precision: 0, originalValue: "0", isValid: false }
 */
const convertNumberToAtomicUnit = (number: number | BigNumber | string | undefined): AtomicUnit => {
	if (number == null || (typeof number === 'string' && !number.trim()) || BigNumber(number).isNaN()) {
		console.error('convertNumberToAtomicUnit: invalid number parameter');

		return { value: '0', precision: 0, originalValue: '0', isValid: false };
	}

	const BIG_NUMBER = BigNumber(
		typeof number === 'string' ? replaceLastCommaByDot(number.replace(/_/g, '').trim()) : number,
	);

	const NUMBER_STRING = BIG_NUMBER.toFixed();
	const PRECISION = NUMBER_STRING.includes('.') ? NUMBER_STRING.split('.')[1].length : 0;

	return {
		value: BIG_NUMBER.multipliedBy(BigNumber(10).pow(PRECISION)).integerValue(BigNumber.ROUND_FLOOR).toFixed(),
		precision: PRECISION,
		originalValue: NUMBER_STRING,
		isValid: true,
	};
};

/*
 * Converts a value from its atomic unit representation to a BigNumber, considering the specified precision.
 *
 * @param AtomicUnit - An object representing the atomic unit.
 * value - The atomic unit value to convert.
 * precision - The precision for the conversion.
 * isValid - The boolean to confirm that the conversion to atomic unit was successful.
 * originalValue - The original value before converting to atomic unit.
 * @param haveCompareOriginalValue - If true, compare the original value with the value. Default is true.
 *
 * @returns The BigNumber of the value in non-atomic units. If the value is invalid, returns 0.
 *
 * @remarks
 * Use .toNumber() to get the number representation of the BigNumber.
 * Use .toFixed() to get the string representation of the BigNumber. toFixed() is recommended over toString().
 */
const convertAtomicUnitToBigNumber = (
	{ value, precision, isValid, originalValue }: AtomicUnit,
	haveCompareOriginalValue = true,
): BigNumber => {
	if (
		!isValid ||
		value == null ||
		precision == null ||
		(haveCompareOriginalValue && originalValue == null) ||
		BigNumber(value).isNaN() ||
		!Number.isInteger(precision) ||
		(haveCompareOriginalValue && BigNumber(originalValue).isNaN())
	) {
		console.error('convertAtomicUnitToBigNumber: invalid atomic unit.');

		return BigNumber(0);
	}

	const BIG_NUMBER = BigNumber(value).dividedBy(BigNumber(10).pow(precision));

	if (haveCompareOriginalValue && !BIG_NUMBER.isEqualTo(originalValue)) {
		console.error(
			`convertAtomicUnitToBigNumber: originalValue ${originalValue} is not equal to value ${BIG_NUMBER.toFixed()}`,
		);

		return BigNumber(0);
	}

	return BIG_NUMBER;
};

export { convertNumberToAtomicUnit, convertAtomicUnitToBigNumber };
