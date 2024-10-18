/* Utility functions to generate UUIDs */

import { v4 as uuidv4 } from 'uuid';

/*
 * Generates a random UUID.
 *
 * @returns A string representing a UUID.
 */
const generateUUID = (): string => {
	return uuidv4();
};

/*
 * Generates a random UUID using the crypto API.
 *
 * @param haveFallback - If true, the function will use the crypto API if available, otherwise it will use the uuidv4 function.
 *
 * @returns A string representing a UUID.
 *
 * @throws If the crypto API is not available and fallback is disabled.
 */
const generateCryptoRandomUUID = (haveFallback = true): string => {
	try {
		return crypto.randomUUID();
	} catch (error) {
		if (haveFallback) {
			console.warn('Crypto random UUID not available, using fallback');

			return generateUUID();
		}

		console.error('Crypto random UUID not available, and fallback is disabled', error);

		throw error;
	}
};

export { generateUUID, generateCryptoRandomUUID };
