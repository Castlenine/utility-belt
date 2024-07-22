import * as atomicUnit from './utils/atomic-unit';
import * as cookie from './utils/cookie';
import * as cryptocurrency from './utils/cryptocurrency';
import * as currency from './utils/currency';
import * as delay from './utils/delay';
import * as email from './utils/email';
import * as number from './utils/number';
import * as object from './utils/object';
import * as string from './utils/string';
import * as time from './utils/time';

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

export default utilityBelt;

// Named exports for individual modules
export { atomicUnit, cookie, cryptocurrency, currency, delay, email, number, object, string, time };
