/* Utility functions for email manipulation */

// Thanks to:
// http://fightingforalostcause.net/misc/2006/compare-email-regex.php
// http://thedailywtf.com/Articles/Validating_Email_Addresses.aspx
// http://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses/201378#201378
// https://en.wikipedia.org/wiki/Email_address
// The format of an email address is account-part@domain, where the
// Account part may be up to 64 octets long and the domain may have a maximum of 255 octets.[4]

const EMAIL_REGEX =
	// eslint-disable-next-line security/detect-unsafe-regex
	/^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

/*
 * Validates whether a given email address is in a valid format.
 *
 * This function checks several criteria for email validity:
 * - The email should be a non-empty string.
 * - It must contain exactly one '@' character, dividing the account part and the domain part.
 * - The account part (before the '@') must not exceed 64 characters.
 * - The domain part (after the '@') must not exceed 255 characters.
 * - Each domain label (separated by '.') must not exceed 63 characters.
 * - The email must pass a regular expression check for additional format validation.
 *
 * @param email - The email address to be validated. Can be `undefined`.
 *
 * @returns `true` if the email is in a valid format, otherwise `false`.
 */
const isEmailValid = (email: string | undefined): boolean => {
	if (typeof email !== 'string' || !email.trim()) return false;

	const [ACCOUNT, DOMAIN] = email.split('@');

	if (!ACCOUNT || !DOMAIN) return false;

	if (ACCOUNT.length > 64 || DOMAIN.length > 255) return false;

	if (DOMAIN.split('.').some((part) => part.length > 63)) return false;

	return EMAIL_REGEX.test(email);
};

export { isEmailValid };
