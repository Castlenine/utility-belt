/* Utility functions for cryptocurrency manipulation */

import BigNumber from 'bignumber.js';

/*
 * Converts smallest unit of cryptocurrency to the largest unit of cryptocurrency and returns the result as a BigNumber.
 *
 * This function uses BigNumber for precise arithmetic to handle large numbers.
 * The conversion is done by shifting the decimal point `shiftFactor` places to the left.
 *
 * @param amount - The amount to be minus shifted.
 * @param shiftFactor - The number of places to shift the decimal point to the left. Must be a positive integer. Default value is 8.
 *
 * @returns The BigNumber of the amount. If the amount is invalid, the function returns 0.
 *
 * @example
 * cryptoMinusShiftedToBigNumberType(100000000, 8) // returns 1 as 100000000 satoshis is 1 bitcoin
 *
 * @remarks
 * Use .toNumber() to get the number representation of the BigNumber.
 * Use .toFixed() to get the string representation of the BigNumber. toFixed() is recommended over toString().
 */
const cryptoMinusShiftedToBigNumberType = (
	amount: number | BigNumber | string | undefined,
	shiftFactor = 8,
): BigNumber => {
	if (amount == null || (typeof amount === 'string' && !amount.trim()) || BigNumber(amount).isNaN()) {
		console.error('cryptoMinusShiftedToBigNumberType: invalid amount parameter');

		return BigNumber(0);
	}

	if (shiftFactor <= 0 || !Number.isInteger(shiftFactor)) {
		console.error(
			'cryptoMinusShiftedToBigNumberType: invalid shiftFactor parameter. Must be a positive integer bigger than 0',
		);

		return BigNumber(0);
	}

	return BigNumber(amount).integerValue(BigNumber.ROUND_DOWN).shiftedBy(-shiftFactor);
};

/*
 * Converts the amount in the smallest unit of cryptocurrency to the largest unit of cryptocurrency and returns the result as a BigNumber.
 *
 * By using BigNumber, the function can accurately handle conversions involving large or small values.
 * The conversion involves shifting the decimal point 8 places to the right.
 *
 * @param amount - The amount to be shifted.
 * @param shiftFactor - The number of places to shift the decimal point to the right. Must be a positive integer. Default value is 8.
 *
 * @example
 * cryptoShiftedToBigNumberType(1, 8) // returns 100000000 as 1 bitcoin is 100000000 satoshis
 *
 * @returns The BigNumber of the amount. If the amount is invalid, the function returns 0.
 *
 * @remarks
 * Use .toNumber() to get the number representation of the BigNumber.
 * Use .toFixed() to get the string representation of the BigNumber. toFixed() is recommended over toString().
 */
const cryptoShiftedToBigNumberType = (amount: number | BigNumber | string | undefined, shiftFactor = 8): BigNumber => {
	if (amount == null || (typeof amount === 'string' && !amount.trim()) || BigNumber(amount).isNaN()) {
		console.error('cryptoShiftedToBigNumberType: invalid amount parameter');

		return BigNumber(0);
	}

	if (shiftFactor <= 0 || !Number.isInteger(shiftFactor)) {
		console.error(
			'cryptoShiftedToBigNumberType: invalid shiftFactor parameter. Must be a positive integer bigger than 0',
		);

		return BigNumber(0);
	}

	return BigNumber(amount).shiftedBy(shiftFactor).integerValue(BigNumber.ROUND_DOWN);
};

export { cryptoMinusShiftedToBigNumberType, cryptoShiftedToBigNumberType };
