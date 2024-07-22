// Import all utility functions
import * as atomicUnit from './utils/atomic-unit';
import * as cookie from './utils/cookie';
import * as cryptocurrency from './utils/cryptocurrency';
import * as currency from './utils/currency';
import delay from './utils/delay'; // Default export
import * as email from './utils/email';
import * as number from './utils/number';
import * as object from './utils/object';
import * as string from './utils/string';
import * as time from './utils/time';

// Create the utilityBelt object
const utilityBelt = {
	...atomicUnit,
	...cookie,
	...cryptocurrency,
	...currency,
	delay, // No need to spread delay as it is a function because it exports a single default function
	...email,
	...number,
	...object,
	...string,
	...time,
};

// Default export
export default utilityBelt;

// Named exports for individual modules
export { atomicUnit, cookie, cryptocurrency, currency, delay, email, number, object, string, time };

// Named exports for individual functions
export { convertNumberToAtomicUnit, convertAtomicUnitToBigNumber } from './utils/atomic-unit';

export { parseValueFromCookie } from './utils/cookie';

export { cryptoMinusShiftedToBigNumberType, cryptoShiftedToBigNumberType } from './utils/cryptocurrency';

export { getCurrencyFullName, getCurrencySymbol, formatAndAddCurrencySymbol, labelCurrency } from './utils/currency';

export { isEmailValid } from './utils/email';

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
} from './utils/number';

export { isObjectEmpty, countValueInArrayOfObjects } from './utils/object';

export {
	capitalizeFirstLetterOnly,
	replaceLastCommaByDot,
	isStringContainsNumber,
	removeNonNumericCharactersFromString,
	removeNumbersFromString,
	numberToString,
	normalizeString,
	slugifyString,
} from './utils/string';

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
} from './utils/time';
