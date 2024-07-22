import { describe, it, expect } from 'vitest';

import { getCurrencyFullName, getCurrencySymbol, formatAndAddCurrencySymbol, labelCurrency } from './currency'; // Adjust the import path as necessary

describe('Currency Manipulation Utility Functions', () => {
	describe('getCurrencyFullName', () => {
		it('should return correct full name for fiat currencies', () => {
			expect(getCurrencyFullName('USD')).toBe('US Dollar');
			expect(getCurrencyFullName('EUR')).toBe('Euro');
			expect(getCurrencyFullName('GBP')).toBe('British Pound Sterling');
			expect(getCurrencyFullName('CAD')).toBe('Canadian Dollar');
		});

		it('should return correct full name for fiat currencies in French', () => {
			expect(getCurrencyFullName('USD', 'fr')).toBe('Dollar américain');
			expect(getCurrencyFullName('EUR', 'fr')).toBe('Euro');
			expect(getCurrencyFullName('GBP', 'fr')).toBe('Livre sterling');
			expect(getCurrencyFullName('CAD', 'fr')).toBe('Dollar canadien');
			expect(getCurrencyFullName('GBP', 'fr')).toBe('Livre sterling');
			expect(getCurrencyFullName('XAU', 'fr')).toBe("Once troy d'or");
		});

		it('should return correct full name for cryptocurrencies in plural', () => {
			expect(getCurrencyFullName('BTC', 'en', true)).toBe('Bitcoins');
			expect(getCurrencyFullName('ETH', 'en', true)).toBe('Ethereum');
			expect(getCurrencyFullName('LTC', 'en', true)).toBe('Litecoins');
			expect(getCurrencyFullName('DOGE', 'en', true)).toBe('Dogecoins');
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
		});

		it('should return plural form when specified', () => {
			expect(getCurrencyFullName('USD', 'en', true)).toBe('US Dollars');
			expect(getCurrencyFullName('EUR', 'fr', true)).toBe('Euros');
			expect(getCurrencyFullName('BTC', 'en', true)).toBe('Bitcoins');
		});

		it('should return the original code for unknown currencies', () => {
			//@ts-expect-error Testing for invalid input
			expect(getCurrencyFullName('XYZ')).toBe('XYZ');
		});
	});

	describe('getCurrencySymbol', () => {
		it('should return correct symbol for fiat currencies', () => {
			expect(getCurrencySymbol('USD')).toBe('USD');
			expect(getCurrencySymbol('EUR')).toBe('EUR');
			expect(getCurrencySymbol('GBP')).toBe('GBP');
		});

		it('should return correct symbol for cryptocurrencies', () => {
			expect(getCurrencySymbol('BTC')).toBe('₿');
			expect(getCurrencySymbol('ETH')).toBe('Ξ');
			expect(getCurrencySymbol('LTC')).toBe('Ł');
			expect(getCurrencySymbol('DOGE')).toBe('Ð');
		});

		it('should return correct symbol for testnet cryptocurrencies', () => {
			expect(getCurrencySymbol('TBTC')).toBe('t₿');
			expect(getCurrencySymbol('TETH')).toBe('tΞ');
		});

		it('should return the original code for unknown currencies', () => {
			//@ts-expect-error Testing for invalid input
			expect(getCurrencySymbol('XYZ')).toBe('XYZ');
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
			expect(formatAndAddCurrencySymbol(1234.56, 'USDC')).toBe('1\u202f234.56 USDC');
			expect(formatAndAddCurrencySymbol(1234.56, 'USDT')).toBe('1\u202f234.56 USDT');
		});

		it('should format testnet cryptocurrencies correctly', () => {
			expect(formatAndAddCurrencySymbol(1.23456789, 'TBTC')).toBe('1.23 TBTC');
			expect(formatAndAddCurrencySymbol(1234.56, 'TETH')).toBe('1\u202f234.56 TETH');

			expect(formatAndAddCurrencySymbol(1234.56, 'TUSDC')).toBe('1\u202f234.56 TUSDC');
			expect(formatAndAddCurrencySymbol(1234.56, 'TUSDT')).toBe('1\u202f234.56 TUSDT');
		});

		it('should format precious metals correctly', () => {
			expect(formatAndAddCurrencySymbol(1234.56, 'XAU')).toBe('1\u202f234.56 XAU');
			expect(formatAndAddCurrencySymbol(1234.56, 'XAG')).toBe('1\u202f234.56 XAG');
		});

		it('should use short symbols when specified', () => {
			expect(formatAndAddCurrencySymbol(1234.56, 'USD', false, 2, 2, false, true)).toBe('1\u202f234.56 $');
			expect(formatAndAddCurrencySymbol(1.23456789, 'BTC', false, 2, 2, false, true)).toBe('1.23 ₿');
			expect(formatAndAddCurrencySymbol(1234.56, 'USDC', false, 2, 2, false, true)).toBe('1\u202f234.56 USDC');
			expect(formatAndAddCurrencySymbol(1234.56, 'USDT', false, 2, 2, false, true)).toBe('1\u202f234.56 ₮');
		});

		it('should use short symbols when specified for testnet currencies', () => {
			expect(formatAndAddCurrencySymbol(1234.56, 'TBTC', false, 2, 2, false, true)).toBe('1\u202f234.56 t₿');
			expect(formatAndAddCurrencySymbol(1.23456789, 'TETH', false, 2, 2, false, true)).toBe('1.23 tΞ');
			expect(formatAndAddCurrencySymbol(1234.56, 'TUSDC', false, 2, 2, false, true)).toBe('1\u202f234.56 TUSDC');
			expect(formatAndAddCurrencySymbol(1234.56, 'TUSDT', false, 2, 2, false, true)).toBe('1\u202f234.56 t₮');
		});

		it('should return symbol only when specified', () => {
			expect(formatAndAddCurrencySymbol(1234.56, 'USD', false, 2, 2, false, false)).toBe('1\u202f234.56 $US');
			expect(formatAndAddCurrencySymbol(1.23456789, 'CAD', false, 2, 2, false, false)).toBe('1.23 $CA');
			expect(formatAndAddCurrencySymbol(1.23456789, 'BTC', false, 2, 2, false, false)).toBe('1.23 BTC');
			expect(formatAndAddCurrencySymbol(1234.56, 'USDC', false, 2, 2, false, false)).toBe('1\u202f234.56 USDC');
			expect(formatAndAddCurrencySymbol(1234.56, 'USDT', false, 2, 2, false, false)).toBe('1\u202f234.56 USDT');
		});

		it('should handle negative numbers for various currencies', () => {
			expect(formatAndAddCurrencySymbol(-1234.56, 'USD')).toBe('-1\u202f234.56 USD');
			expect(formatAndAddCurrencySymbol(-1.23456789, 'BTC')).toBe('-1.23 BTC');
			expect(formatAndAddCurrencySymbol(-1234.56, 'XAU')).toBe('-1\u202f234.56 XAU');
		});

		it('should handle truncating correctly', () => {
			expect(formatAndAddCurrencySymbol(1234.56789, 'USD')).toBe('1\u202f234.56 USD');
			expect(formatAndAddCurrencySymbol(1234.56789, 'BTC')).toBe('1\u202f234.56 BTC');
			expect(formatAndAddCurrencySymbol(1234.56789, 'XAU')).toBe('1\u202f234.56 XAU');
		});

		it('should handle rounding correctly', () => {
			expect(formatAndAddCurrencySymbol(1234.56789, 'USD', true, 2, 2, true)).toBe('1\u202f234.57 USD');
			expect(formatAndAddCurrencySymbol(1234.56489, 'USD', true, 2, 2, true)).toBe('1\u202f234.57 USD');
			expect(formatAndAddCurrencySymbol(1234.56789, 'USD', true, 0, 0, true)).toBe('1\u202f235 USD');
			expect(formatAndAddCurrencySymbol(1234.56789, 'USD', true, 4, 4, true)).toBe('1\u202f234.5679 USD');
		});
	});

	describe('labelCurrency', () => {
		it('should label fiat currencies correctly', () => {
			expect(labelCurrency(1000000, 'en', 'USD', false, true, false)).toBe('1.00 Million US Dollars');
			expect(labelCurrency(1000000000, 'en', 'EUR', false, true, false)).toBe('1.00 Billion Euros');
			expect(labelCurrency(1000000000000, 'en', 'GBP', false, true, false)).toBe(
				'1.00 Trillion British Pounds Sterling',
			);
			expect(labelCurrency(1000000000000, 'en', 'USDT', false, true, false)).toBe('1.00 Trillion Tethers');
		});

		it('should label fiat currencies in ISO format correctly', () => {
			expect(labelCurrency(1000000, 'en', 'USD', false, true, true)).toBe('1.00 Million USD');
			expect(labelCurrency(1000000000, 'en', 'EUR', false, true, true)).toBe('1.00 Billion EUR');
			expect(labelCurrency(1000000000000, 'en', 'GBP', false, true, true)).toBe('1.00 Trillion GBP');
		});

		it('should label cryptocurrencies correctly', () => {
			expect(labelCurrency(1000000, 'en', 'BTC', false, true, false)).toBe('1.00 Million Bitcoins');
			expect(labelCurrency(1000000000, 'en', 'ETH', false, true, false)).toBe('1.00 Billion Ethereum');
			expect(labelCurrency(1000000000000, 'en', 'DOGE', false, true, false)).toBe('1.00 Trillion Dogecoins');
		});

		it('should label testnet cryptocurrencies correctly', () => {
			expect(labelCurrency(1000000, 'en', 'TBTC', false, true, false)).toBe('1.00 Million Testnet Bitcoins');
			expect(labelCurrency(1000000000, 'en', 'TETH', false, true, false)).toBe('1.00 Billion Testnet Ethereum');
		});

		it('should label precious metals correctly', () => {
			expect(labelCurrency(1000000, 'en', 'XAU', false, true, false)).toBe('1.00 Million Gold Troy Ounces');
			expect(labelCurrency(1000000000, 'en', 'XAG', false, true, false)).toBe('1.00 Billion Silver Troy Ounces');
		});

		it('should label currencies correctly in French', () => {
			expect(labelCurrency(1000000, 'fr', 'USD', false, true, false)).toBe('1.00 Million de Dollars américain');
			expect(labelCurrency(1000000000, 'fr', 'EUR', false, true, false)).toBe("1.00 Milliard d'Euros");
			expect(labelCurrency(1000000000000, 'fr', 'BTC', false, true, false)).toBe('1.00 Trillion de Bitcoins');
		});

		it('should use short labels when specified', () => {
			expect(labelCurrency(1000000, 'en', 'USD', true)).toBe('1.00 M USD');
			expect(labelCurrency(1000000000, 'en', 'BTC', true)).toBe('1.00 B ₿');
			expect(labelCurrency(1000000000000, 'en', 'XAU', true)).toBe('1.00 T XAU');
		});

		it('should handle negative numbers for various currencies', () => {
			expect(labelCurrency(-1000000, 'en', 'USD', false, true, false)).toBe('-1.00 Million US Dollars');
			expect(labelCurrency(-1000000000, 'en', 'BTC', false, true, false)).toBe('-1.00 Billion Bitcoins');
			expect(labelCurrency(-1000000000000, 'en', 'XAU', false, true, false)).toBe('-1.00 Trillion Gold Troy Ounces');
		});

		it('should handle truncating correctly', () => {
			expect(labelCurrency(1234567, 'en', 'USD', false, true, false)).toBe('1.23 Million US Dollars');
			expect(labelCurrency(1234567, 'en', 'BTC', false, true, false)).toBe('1.23 Million Bitcoins');
			expect(labelCurrency(1234567, 'en', 'XAU', false, true, false)).toBe('1.23 Million Gold Troy Ounces');
		});

		it('should handle rounding correctly', () => {
			expect(labelCurrency(1234567, 'en', 'USD', false, true, false, true, 2)).toBe('1.23 Million US Dollars');
			expect(labelCurrency(1234567, 'en', 'USD', false, true, false, true, 0)).toBe('1 Million US Dollars');
			expect(labelCurrency(1234567, 'en', 'USD', false, true, false, true, 4)).toBe('1.2346 Million US Dollars');
		});
	});
});
