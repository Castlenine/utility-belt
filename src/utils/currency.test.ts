import { describe, it, expect } from 'vitest';

import BigNumber from 'bignumber.js';

import {
	currencyExistsInIntl,
	getCurrencyFullName,
	getCurrencySymbol,
	formatAndAddCurrencySymbol,
	labelCurrency,
} from './currency'; // Adjust the import path as necessary

describe('Currency Manipulation Utility Functions', () => {
	describe('currencyExistsInIntl', () => {
		it('should return true for valid currency codes', () => {
			expect(currencyExistsInIntl('USD')).toBe(true);
			expect(currencyExistsInIntl('EUR')).toBe(true);
			expect(currencyExistsInIntl('JPY')).toBe(true);
			expect(currencyExistsInIntl('GBP')).toBe(true);
		});

		it('should return false for invalid currency codes', () => {
			expect(currencyExistsInIntl('XYZ')).toBe(false);
			expect(currencyExistsInIntl('ABC')).toBe(false);
			expect(currencyExistsInIntl('123')).toBe(false);
		});

		it('should handle lowercase currency codes', () => {
			expect(currencyExistsInIntl('usd')).toBe(true);
			expect(currencyExistsInIntl('eur')).toBe(true);
		});

		it('should handle currency codes with spaces', () => {
			expect(currencyExistsInIntl(' USD ')).toBe(true);
			expect(currencyExistsInIntl(' XYZ ')).toBe(false);
		});

		it('should return false for empty string', () => {
			expect(currencyExistsInIntl('')).toBe(false);
		});

		it('should return false for non-string inputs', () => {
			// @ts-expect-error Testing for invalid input
			expect(currencyExistsInIntl(123)).toBe(false);
			// @ts-expect-error Testing for invalid input
			expect(currencyExistsInIntl(null)).toBe(false);
			// @ts-expect-error Testing for invalid input
			expect(currencyExistsInIntl(undefined)).toBe(false);
		});

		it('should work with different language codes', () => {
			expect(currencyExistsInIntl('USD', 'fr')).toBe(true);
			expect(currencyExistsInIntl('EUR', 'de')).toBe(true);
			expect(currencyExistsInIntl('JPY', 'ja')).toBe(true);
		});

		it('should handle cryptocurrency codes', () => {
			// Note: Most cryptocurrency codes are not recognized by Intl.DisplayNames
			expect(currencyExistsInIntl('BTC')).toBe(false);
			expect(currencyExistsInIntl('ETH')).toBe(false);
		});

		it('should handle edge cases', () => {
			expect(currencyExistsInIntl('  ', 'en')).toBe(false); // String with only spaces
		});
	});

	describe('getCurrencyFullName', () => {
		it('should return correct full name for fiat currencies', () => {
			expect(getCurrencyFullName('USD')).toBe('US Dollar');
			expect(getCurrencyFullName('EUR')).toBe('Euro');
			expect(getCurrencyFullName('GBP')).toBe('British Pound');
			expect(getCurrencyFullName('CAD')).toBe('Canadian Dollar');
		});

		it('should return correct full name for fiat currencies in French', () => {
			expect(getCurrencyFullName('USD', 'fr')).toBe('Dollar des États-Unis');
			expect(getCurrencyFullName('EUR', 'fr')).toBe('Euro');
			expect(getCurrencyFullName('GBP', 'fr')).toBe('Livre sterling');
			expect(getCurrencyFullName('CAD', 'fr')).toBe('Dollar canadien');
		});

		it('should return correct full name for cryptocurrencies', () => {
			expect(getCurrencyFullName('BTC')).toBe('Bitcoin');
			expect(getCurrencyFullName('ETH')).toBe('Ethereum');
			expect(getCurrencyFullName('ADA')).toBe('Cardano');
			expect(getCurrencyFullName('DOGE')).toBe('Dogecoin');
			expect(getCurrencyFullName('XTZ')).toBe('Tezos');
		});

		it('should return correct full name for precious metals', () => {
			expect(getCurrencyFullName('XAU')).toBe('Gold Troy Ounce');
			expect(getCurrencyFullName('XAG')).toBe('Silver Troy Ounce');
		});

		it('should return correct full name for testnet cryptocurrencies', () => {
			expect(getCurrencyFullName('TBTC')).toBe('Testnet Bitcoin');
			expect(getCurrencyFullName('TETH')).toBe('Testnet Ethereum');
			expect(getCurrencyFullName('TUSDC')).toBe('Testnet USD Coin');
		});

		it('should return plural form when specified', () => {
			expect(getCurrencyFullName('USD', 'en', true)).toBe('US dollars');
			expect(getCurrencyFullName('USD', 'fr', true)).toBe('Dollars des États-Unis');
			expect(getCurrencyFullName('EUR', 'fr', true)).toBe('Euros');
			expect(getCurrencyFullName('BTC', 'en', true)).toBe('Bitcoins');
			expect(getCurrencyFullName('DOGE', 'en', true)).toBe('Dogecoins');
		});

		it('should handle case-insensitive input', () => {
			// @ts-expect-error Testing for invalid input
			expect(getCurrencyFullName('usd')).toBe('US Dollar');
			// @ts-expect-error Testing for invalid input
			expect(getCurrencyFullName('btc')).toBe('Bitcoin');
			// @ts-expect-error Testing for invalid input
			expect(getCurrencyFullName('XaU')).toBe('Gold Troy Ounce');
		});

		it('should handle currencies with spaces', () => {
			// @ts-expect-error Testing for invalid input
			expect(getCurrencyFullName(' USD ')).toBe('US Dollar');
			// @ts-expect-error Testing for invalid input
			expect(getCurrencyFullName(' BTC ')).toBe('Bitcoin');
		});

		it('should return correct full name for new cryptocurrencies', () => {
			expect(getCurrencyFullName('ALGO')).toBe('Algorand');
			expect(getCurrencyFullName('ARB')).toBe('Arbitrum');
			expect(getCurrencyFullName('ATOM')).toBe('Cosmos');
			expect(getCurrencyFullName('AVAX')).toBe('Avalanche');
			expect(getCurrencyFullName('MATIC')).toBe('Polygon');
			expect(getCurrencyFullName('NEAR')).toBe('Near');
			expect(getCurrencyFullName('OP')).toBe('Optimism');
			expect(getCurrencyFullName('SOL')).toBe('Solana');
		});

		it('should return correct full name for new testnet cryptocurrencies', () => {
			expect(getCurrencyFullName('TALGO')).toBe('Testnet Algorand');
			expect(getCurrencyFullName('TARB')).toBe('Testnet Arbitrum');
			expect(getCurrencyFullName('TATOM')).toBe('Testnet Cosmos');
			expect(getCurrencyFullName('TAVAX')).toBe('Testnet Avalanche');
			expect(getCurrencyFullName('TMATIC')).toBe('Testnet Polygon');
			expect(getCurrencyFullName('TNEAR')).toBe('Testnet Near');
			expect(getCurrencyFullName('TOP')).toBe('Testnet Optimism');
			expect(getCurrencyFullName('TSOL')).toBe('Testnet Solana');
		});

		it('should return the original code for unknown currencies', () => {
			// @ts-expect-error Testing for invalid input
			expect(getCurrencyFullName('XYZ')).toBe('XYZ');
		});
	});

	describe('getCurrencySymbol', () => {
		it('should return correct symbol for fiat currencies', () => {
			expect(getCurrencySymbol('USD')).toBe('$US');
			expect(getCurrencySymbol('EUR')).toBe('€');
			expect(getCurrencySymbol('GBP')).toBe('£GB');
			expect(getCurrencySymbol('JPY')).toBe('JPY');
		});

		it('should return correct symbol for cryptocurrencies', () => {
			expect(getCurrencySymbol('BTC')).toBe('₿');
			expect(getCurrencySymbol('SAT')).toBe('丰');
			expect(getCurrencySymbol('ADA')).toBe('₳');
			expect(getCurrencySymbol('DOGE')).toBe('Ð');
			expect(getCurrencySymbol('ETH')).toBe('Ξ');
			expect(getCurrencySymbol('LTC')).toBe('Ł');
			expect(getCurrencySymbol('XTZ')).toBe('ꜩ');
			expect(getCurrencySymbol('USDT')).toBe('₮');
		});

		it('should return correct symbol for testnet cryptocurrencies', () => {
			expect(getCurrencySymbol('TBTC')).toBe('t₿');
			expect(getCurrencySymbol('TSAT')).toBe('t丰');
			expect(getCurrencySymbol('TADA')).toBe('t₳');
			expect(getCurrencySymbol('TDOGE')).toBe('tÐ');
			expect(getCurrencySymbol('TETH')).toBe('tΞ');
			expect(getCurrencySymbol('TLTC')).toBe('tŁ');
			expect(getCurrencySymbol('TXTZ')).toBe('tꜩ');
			expect(getCurrencySymbol('TUSDT')).toBe('t₮');
		});

		it('should handle case-insensitive input', () => {
			// @ts-expect-error Testing for invalid input
			expect(getCurrencySymbol('usd')).toBe('$US');
			// @ts-expect-error Testing for invalid input
			expect(getCurrencySymbol('btc')).toBe('₿');
			// @ts-expect-error Testing for invalid input
			expect(getCurrencySymbol('tETh')).toBe('tΞ');
		});

		it('should handle currencies with spaces', () => {
			// @ts-expect-error Testing for invalid input
			expect(getCurrencySymbol(' USD ')).toBe('$US');
			// @ts-expect-error Testing for invalid input
			expect(getCurrencySymbol(' BTC ')).toBe('₿');
		});

		it('should return the currency code for fiat currencies without a specific symbol', () => {
			// Some currencies might not have a specific symbol and return the code instead
			expect(getCurrencySymbol('RUB')).toBe('RUB');
		});

		it('should handle Intl.NumberFormat fallback for unknown currencies', () => {
			// This test assumes that 'ABC' is not a known currency code
			// @ts-expect-error Testing for invalid input
			expect(getCurrencySymbol('ABC')).toBe('ABC');
		});
	});

	describe('formatAndAddCurrencySymbol', () => {
		it('should format fiat currencies correctly', () => {
			expect(formatAndAddCurrencySymbol(1234.56, 'USD')).toBe('1\u202f234.56 USD');
			expect(formatAndAddCurrencySymbol(1234.56, 'EUR')).toBe('1\u202f234.56 EUR');
			expect(formatAndAddCurrencySymbol(1234.56, 'GBP')).toBe('1\u202f234.56 GBP');
		});

		it('should format cryptocurrencies correctly', () => {
			expect(formatAndAddCurrencySymbol(1.23456789, 'BTC')).toBe('1.23 BTC');
			expect(formatAndAddCurrencySymbol(1234.56, 'ETH')).toBe('1\u202f234.56 ETH');
			expect(formatAndAddCurrencySymbol(1000000, 'DOGE')).toBe('1\u202f000\u202f000.00 DOGE');
		});

		it('should format testnet cryptocurrencies correctly', () => {
			expect(formatAndAddCurrencySymbol(1.23456789, 'TBTC')).toBe('1.23 TBTC');
			expect(formatAndAddCurrencySymbol(1234.56, 'TETH')).toBe('1\u202f234.56 TETH');
		});

		it('should handle different currency display modes', () => {
			expect(formatAndAddCurrencySymbol(1234.56, 'USD', false, 2, 2, 'code')).toBe('1\u202f234.56 USD');
			expect(formatAndAddCurrencySymbol(1234.56, 'USD', false, 2, 2, 'narrowSymbol')).toBe('1\u202f234.56 $');
			expect(formatAndAddCurrencySymbol(1234.56, 'USD', false, 2, 2, 'symbol')).toBe('1\u202f234.56 $US');
			expect(formatAndAddCurrencySymbol(1234.56, 'USD', false, 2, 2, 'symbol', 'en-US')).toBe('$1,234.56');
		});

		it('should use custom format', () => {
			expect(formatAndAddCurrencySymbol(1234.56, 'USD', false, 2, 2, 'code', 'en-US')).toBe('USD 1,234.56');
		});

		it('should handle rounding correctly', () => {
			expect(formatAndAddCurrencySymbol(1234.56789, 'USD', true, 2, 2)).toBe('1\u202f234.57 USD');
			expect(formatAndAddCurrencySymbol(1234.56489, 'USD', true, 3, 3)).toBe('1\u202f234.565 USD');
		});

		it('should handle different decimal places', () => {
			expect(formatAndAddCurrencySymbol(1234.56789, 'USD', false, 4, 2)).toBe('1\u202f234.5678 USD');
			expect(formatAndAddCurrencySymbol(1234.56, 'USD', false, 2, 0)).toBe('1\u202f234.56 USD');
		});

		it('should handle BigNumber input', () => {
			expect(formatAndAddCurrencySymbol(BigNumber('1234.56789'), 'USD')).toBe('1\u202f234.56 USD');
		});

		it('should handle invalid input', () => {
			expect(formatAndAddCurrencySymbol('invalid', 'USD')).toBe('invalid');
			expect(formatAndAddCurrencySymbol(NaN, 'USD')).toBe('NaN');
		});

		it('should handle negative numbers', () => {
			expect(formatAndAddCurrencySymbol(-1234.56, 'USD')).toBe('-1\u202f234.56 USD');
		});

		it('should handle zero correctly', () => {
			expect(formatAndAddCurrencySymbol(0, 'USD')).toBe('0.00 USD');
			expect(formatAndAddCurrencySymbol(-0, 'USD')).toBe('0.00 USD');
		});

		it('should handle cryptocurrency symbols correctly', () => {
			expect(formatAndAddCurrencySymbol(1234.56, 'BTC', false, 2, 2, 'narrowSymbol')).toBe('1\u202f234.56 ₿');
			expect(formatAndAddCurrencySymbol(1234.56, 'ETH', false, 2, 2, 'narrowSymbol')).toBe('1\u202f234.56 Ξ');
		});

		it('should handle invalid decimal parameters', () => {
			expect(formatAndAddCurrencySymbol(1234.56, 'USD', false, -1, 2)).toBe('1234.56');
			expect(formatAndAddCurrencySymbol(1234.56, 'USD', false, 2, -1)).toBe('1234.56');
		});

		it('should handle minimum decimal greater than maximum decimal', () => {
			expect(formatAndAddCurrencySymbol(1234.56, 'USD', false, 2, 4)).toBe('1\u202f234.56 USD');
		});
	});

	describe('labelCurrency', () => {
		it('should label fiat currencies correctly', () => {
			expect(labelCurrency(1000000, 'en', 'USD')).toBe('1.00 Million USD');
			expect(labelCurrency(1000000000, 'en', 'EUR')).toBe('1.00 Billion EUR');
			expect(labelCurrency(1000000000000, 'en', 'GBP')).toBe('1.00 Trillion GBP');
		});

		it('should label cryptocurrencies correctly', () => {
			expect(labelCurrency(1000000, 'en', 'BTC')).toBe('1.00 Million BTC');
			expect(labelCurrency(1000000000, 'en', 'ETH')).toBe('1.00 Billion ETH');
			expect(labelCurrency(1000000000000, 'en', 'DOGE')).toBe('1.00 Trillion DOGE');
		});

		it('should handle different currency display modes', () => {
			expect(labelCurrency(1000000, 'en', 'USD', 'code')).toBe('1.00 Million USD');
			expect(labelCurrency(1000000, 'en', 'USD', 'narrowSymbol')).toBe('1.00 Million $');
			expect(labelCurrency(1000000, 'en', 'USD', 'symbol')).toBe('1.00 Million $US');
			expect(labelCurrency(1000000, 'en', 'USD', 'name')).toBe('1.00 Million US dollars');
			expect(labelCurrency(1000000, 'en', 'USD', 'none')).toBe('1.00 Million');
		});

		it('should use short labels when specified', () => {
			expect(labelCurrency(1000000, 'en', 'USD', 'code', true)).toBe('1.00 M USD');
			expect(labelCurrency(1000000000, 'en', 'USD', 'code', true)).toBe('1.00 B USD');
			expect(labelCurrency(1000000000000, 'en', 'USD', 'code', true)).toBe('1.00 T USD');
		});

		it('should handle French language correctly', () => {
			expect(labelCurrency(1000000, 'fr', 'EUR', 'name')).toBe("1.00 Million d'Euros");
			expect(labelCurrency(1000000000, 'fr', 'USD', 'name')).toBe('1.00 Milliard de Dollars des États-Unis');
			expect(labelCurrency(1000000000000, 'fr', 'BTC', 'name')).toBe('1.00 Trillion de Bitcoins');
		});

		it('should handle rounding correctly', () => {
			expect(labelCurrency(1234567, 'en', 'USD', 'code', false, true, 2, 2)).toBe('1.23 Million USD');
			expect(labelCurrency(1234567, 'en', 'USD', 'code', false, true, 0, 0)).toBe('1 Million USD');
			expect(labelCurrency(1234567, 'en', 'USD', 'code', false, true, 4, 4)).toBe('1.2346 Million USD');
		});

		it('should handle different decimal places', () => {
			expect(labelCurrency(1234567, 'en', 'USD', 'code', false, false, 4, 2)).toBe('1.2345 Million USD');
			expect(labelCurrency(1234567, 'en', 'USD', 'code', false, false, 2, 0)).toBe('1.23 Million USD');
		});

		it('should handle BigNumber input', () => {
			expect(labelCurrency(new BigNumber('1234567890'), 'en', 'USD')).toBe('1.23 Billion USD');
		});

		it('should handle invalid input', () => {
			expect(labelCurrency('invalid', 'en', 'USD')).toBe('invalid');
			expect(labelCurrency(NaN, 'en', 'USD')).toBe('NaN');
		});

		it('should handle negative numbers', () => {
			expect(labelCurrency(-1000000, 'en', 'USD')).toBe('-1.00 Million USD');
		});

		it('should handle small numbers', () => {
			expect(labelCurrency(0.01, 'en', 'USD', 'code')).toBe('0.01 USD');
			expect(labelCurrency(0.1, 'en', 'BTC', 'narrowSymbol')).toBe('0.10 ₿');
		});

		it('should handle zero correctly', () => {
			expect(labelCurrency(0, 'en', 'USD')).toBe('0.00 USD');
			expect(labelCurrency(-0, 'en', 'USD')).toBe('0.00 USD');
		});

		it('should handle invalid decimal parameters', () => {
			expect(labelCurrency(1234567, 'en', 'USD', 'code', false, false, -1, 2)).toBe('1234567');
			expect(labelCurrency(1234567, 'en', 'USD', 'code', false, false, 2, -1)).toBe('1234567');
		});

		it('should handle minimum decimal greater than maximum decimal', () => {
			expect(labelCurrency(1234567, 'en', 'USD', 'code', false, false, 2, 4)).toBe('1.23 Million USD');
		});
	});
});
