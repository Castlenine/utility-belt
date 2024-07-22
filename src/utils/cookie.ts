/* Utility functions for cookie manipulation */

/*
 * Parses a cookie value to extract a specific key.
 *
 * @param cookieValue - Cookie value to search.
 * @param searchKey - Key to search in cookie.
 *
 * @returns Value from cookie or an empty string if not found.
 */
const parseValueFromCookie = (cookieValue: string, searchKey: string): string => {
	if (!cookieValue || !searchKey) return '';

	try {
		const KEY_PREFIX = searchKey.includes('=') ? searchKey : `${searchKey}=`;
		const PART = cookieValue.split(';').find((p) => p.trim().startsWith(KEY_PREFIX));

		return PART ? PART.split('=')[1].trim() : '';
	} catch (error) {
		console.error('Error parsing cookie value:', error);

		return '';
	}
};

export { parseValueFromCookie };
