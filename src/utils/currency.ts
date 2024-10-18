/* Utility functions for currency manipulation */

import BigNumber from 'bignumber.js';

import { absoluteToBigNumber, roundUpNumberToBigNumber, truncateNumberToBigNumber, formatNumber } from './number';

import { capitalizeFirstLetterOnly } from './string';

// Useful link: https://www.xe.com/symbols.php

const CRYPTOCURRENCIES_SYMBOLS: Readonly<Record<string, string>> = {
	BTC: '₿', // Bitcoin
	SAT: '丰', // Satoshi
	ADA: '₳', // Cardano
	DOGE: 'Ð', // Dogecoin
	ETH: 'Ξ', // Ethereum
	LTC: 'Ł', // Litecoin
	XTZ: 'ꜩ', // Tezos
	USDT: '₮', // Tether
	TBTC: 't₿', // Testnet Bitcoin
	TSAT: 't丰', // Testnet Satoshi
	TADA: 't₳', // Testnet Cardano
	TDOGE: 'tÐ', // Testnet Dogecoin
	TETH: 'tΞ', // Testnet Ethereum
	TLTC: 'tŁ', // Testnet Litecoin
	TXTZ: 'tꜩ', // Testnet Tezos
	TUSDT: 't₮', // Testnet Tether
};

/**
 * Checks if a given currency code exists in Intl.DisplayNames.
 *
 * @param currency - The currency code to check.
 * @param lang - The language code for localization.
 *
 * @returns True if the currency exists, false otherwise.
 */
const currencyExistsInIntl = (currency: string, lang: string = 'en'): boolean => {
	try {
		const UPPERCASE_CURRENCY = currency.toUpperCase().trim() as Currency;

		const DISPLAY_NAME = new Intl.DisplayNames([lang], { type: 'currency' }).of(UPPERCASE_CURRENCY);

		return DISPLAY_NAME !== UPPERCASE_CURRENCY; // If the result is the same as the input, it's not a valid currency
	} catch (_error) {
		return false;
	}
};

/*
 * Retrieves the full name of a given currency code in a specified language.
 * The function supports various fiat currencies and cryptocurrencies.
 * If the currency code is not recognized, it simply returns the original currency code.
 * The function supports localization for English and French ('en' and 'fr').
 *
 * @param currency - The currency code (e.g.: 'USD', 'EUR', 'BTC'). The function converts the code to uppercase so it's case-insensitive.
 * It's recommended to use uppercase currency codes for consistency.
 * @param lang - Optional. The language code ('en' for English, 'fr' for French). Defaults to 'en'. The function converts the code to lowercase so it's case-insensitive.
 * It's recommended to use lowercase language codes for consistency.
 * @param plural - Optional. If true, returns the plural form of the currency name. Defaults to false.
 *
 * @returns The full name of the currency in the specified language, or the currency code if it's not recognized.
 *
 * @remarks
 * The function supports the fiat currency with Intl.NumberFormat, so it should work with any currency supported by the browser.
 * The function supports gold and silver commodities.
 * The function supports the following cryptocurrencies: BTC, SAT, ADA, ALGO, ARB, ATOM, AVAX, BNB, DOGE, DOT, ETH, FTM, LTC, MATIC, NEAR, OP, SOL, TRX, VET, XLM, XRP, XTZ, USDC, USDT
 * The function also supports testnet versions of TBTC, TSAT, TADA, TALGO, TARB, TATOM, TAVAX, TBNB, TDOGE, TDOT, TETH, TFTM, TLTC, TMATIC, TNEAR, TOP, TSOL, TTRX, TVET, TXLM, TXRP, TXTZ, TUSDC, TUSDT
 */
const getCurrencyFullName = (currency: Currency, lang: Locales = 'en', plural = false): string => {
	const UPPERCASE_CURRENCY = currency.toUpperCase().trim() as Currency;
	const LOWERCASE_LANG = lang.toLowerCase();

	switch (UPPERCASE_CURRENCY) {
		case 'BTC':
			return `Bitcoin${plural ? 's' : ''}`; // There is no second best, Buy bitcoin

		case 'SAT':
			return `Satoshi${plural ? 's' : ''}`;

		case 'XAU':
			return LOWERCASE_LANG === 'fr' ? `Once${plural ? 's' : ''} troy d'or` : `Gold Troy Ounce${plural ? 's' : ''}`;

		case 'XAG':
			return LOWERCASE_LANG === 'fr'
				? `Once${plural ? 's' : ''} troy d'argent`
				: `Silver Troy Ounce${plural ? 's' : ''}`;

		case 'ADA':
			return 'Cardano';

		case 'ALGO':
			return 'Algorand';

		case 'ARB':
			return 'Arbitrum';

		case 'ATOM':
			return 'Cosmos';

		case 'AVAX':
			return 'Avalanche';

		case 'BNB':
			return `Binance Coin${plural ? 's' : ''}`;

		case 'DOGE':
			return `Dogecoin${plural ? 's' : ''}`;

		case 'DOT':
			return 'Polkadot';

		case 'ETH':
			return 'Ethereum';

		case 'FTM':
			return 'Fantom';

		case 'LTC':
			return `Litecoin${plural ? 's' : ''}`;

		case 'MATIC':
			return 'Polygon';

		case 'NEAR':
			return 'Near';

		case 'OP':
			return 'Optimism';

		case 'SOL':
			return 'Solana';

		case 'TRX':
			return 'Tron';

		case 'VET':
			return 'VeChain';

		case 'XLM':
			return 'Stellar';

		case 'XRP':
			return 'Ripple';

		case 'XTZ':
			return 'Tezos';

		case 'USDC':
			return `USD Coin${plural ? 's' : ''}`;

		case 'USDT':
			return `Tether${plural ? 's' : ''}`;

		case 'TBTC':
			return `Testnet Bitcoin${plural ? 's' : ''}`;

		case 'TSAT':
			return `Testnet Satoshi${plural ? 's' : ''}`;

		case 'TADA':
			return 'Testnet Cardano';

		case 'TALGO':
			return 'Testnet Algorand';

		case 'TARB':
			return 'Testnet Arbitrum';

		case 'TATOM':
			return 'Testnet Cosmos';

		case 'TAVAX':
			return 'Testnet Avalanche';

		case 'TBNB':
			return `Testnet Binance Coin${plural ? 's' : ''}`;

		case 'TDOGE':
			return `Testnet Dogecoin${plural ? 's' : ''}`;

		case 'TDOT':
			return 'Testnet Polkadot';

		case 'TETH':
			return 'Testnet Ethereum';

		case 'TFTM':
			return 'Testnet Fantom';

		case 'TLTC':
			return `Testnet Litecoin${plural ? 's' : ''}`;

		case 'TMATIC':
			return 'Testnet Polygon';

		case 'TNEAR':
			return 'Testnet Near';

		case 'TOP':
			return 'Testnet Optimism';

		case 'TSOL':
			return 'Testnet Solana';

		case 'TTRX':
			return 'Testnet Tron';

		case 'TVET':
			return 'Testnet VeChain';

		case 'TXLM':
			return 'Testnet Stellar';

		case 'TXRP':
			return 'Testnet Ripple';

		case 'TXTZ':
			return 'Testnet Tezos';

		case 'TUSDC':
			return `Testnet USD Coin${plural ? 's' : ''}`;

		case 'TUSDT':
			return `Testnet Tether${plural ? 's' : ''}`;

		default:
			try {
				if (plural) {
					const DISPLAY_NAME = new Intl.NumberFormat(LOWERCASE_LANG, {
						style: 'currency',
						currency: UPPERCASE_CURRENCY,
						currencyDisplay: 'name',
					});

					const PLURAL_NAME = DISPLAY_NAME.formatToParts(2).find((part) => part.type === 'currency')?.value;

					return currencyExistsInIntl(UPPERCASE_CURRENCY)
						? capitalizeFirstLetterOnly(PLURAL_NAME, false)
						: UPPERCASE_CURRENCY;
				} else {
					const SINGULAR_NAME = new Intl.DisplayNames([LOWERCASE_LANG], { type: 'currency' }).of(UPPERCASE_CURRENCY);

					return currencyExistsInIntl(UPPERCASE_CURRENCY)
						? capitalizeFirstLetterOnly(SINGULAR_NAME, false)
						: UPPERCASE_CURRENCY;
				}
			} catch (error) {
				console.error('getCurrencyFullName unsuccessful:', error);

				return UPPERCASE_CURRENCY;
			}
	}
};

/*
 * Retrieves the symbol associated with a given currency code.
 * This function supports a variety of fiat and cryptocurrencies, and returns the corresponding symbol.
 * For unrecognized currencies, it returns the original currency code.
 *
 * @param currency - The currency code (e.g.: 'USD', 'EUR', 'BTC'). The function converts the code to uppercase so it's case-insensitive.
 * It's recommended to use uppercase currency codes for consistency.
 * @param isNarrowSymbol - Optional. If true, returns the narrow symbol of the currency. Defaults to false. Example: '$' instead of 'US$'.
 * @param format - Optional. The locale format to use for the number. Defaults to 'en-US'.
 *
 * @returns The symbol of the currency if recognized, otherwise returns the original currency code.
 *
 * @remarks
 * The function supports the fiat currency with Intl.NumberFormat, so it should work with any currency supported by the browser.
 * The function supports the following cryptocurrencies: BTC, SAT, ADA, DOGE, ETH, LTC, XTZ, USDT
 * The function also supports testnet versions of TBTC, TSAT, TADA, TDOGE, TETH, TLTC, TXTZ, TUSDT
 */
const getCurrencySymbol = (currency: Currency, isNarrowSymbol = false, localeFormat = 'en-US'): string => {
	const UPPERCASE_CURRENCY = currency.toUpperCase().trim() as Currency;

	try {
		// eslint-disable-next-line security/detect-object-injection
		const CURRENT_CRYPTOCURRENCY_SYMBOL = CRYPTOCURRENCIES_SYMBOLS[UPPERCASE_CURRENCY] || '';

		if (CURRENT_CRYPTOCURRENCY_SYMBOL !== '') {
			return CURRENT_CRYPTOCURRENCY_SYMBOL;
		} else {
			const FIAT_SYMBOL = new Intl.NumberFormat(localeFormat, {
				style: 'currency',
				currency: UPPERCASE_CURRENCY,
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
				currencyDisplay: isNarrowSymbol ? 'narrowSymbol' : 'symbol',
			})
				.format(0)
				.replace(/\d/g, '')
				.trim();

			return FIAT_SYMBOL || UPPERCASE_CURRENCY;
		}
	} catch (error) {
		console.error('getCurrencySymbol unsuccessful:', error);

		return UPPERCASE_CURRENCY;
	}
};

/*
 * Formats a numerical amount by adding thousand separators and a decimal separator, and appends the currency symbol or ISO currency code.
 * The function handles rounding and specifies the number of decimal places. It can display either short or full currency symbols, and it also supports ISO currency codes.
 *
 * @param amount - The amount to be formatted. Can be a number or a string representation of a number. Defaults to 0.
 * @param currency - The currency code (e.g.: 'USD', 'EUR', 'BTC'). Defaults to 'EUR'. The function converts the code to uppercase so it's case-insensitive.
 * It's recommended to use uppercase currency codes for consistency.
 * @param isRounded - If true, rounds the number to the specified number of decimals. Defaults to false.
 * @param maximumDecimal - The maximum number of decimal places to display. Should be greater than or equal to minimumDecimal. Defaults to 2.
 * @param minimumDecimal - The minimum number of decimal places to display. Should be less than or equal to maximumDecimal. Defaults to 2.
 * @param currencyDisplay - The currency display mode. Can be 'code' (ISO currency code, e.g.: 'USD'), 'narrowSymbol' (e.g.: '$') or 'symbol' (e.g.: 'US$'). Defaults to 'code'.
 * @param minusInFrontOfNumber - If true, adds a minus sign in front of the number if the amount is negative. Defaults to true.
 * @param localeFormat - The locale format to use for the number. Defaults to 'en-US'.
 *
 * @returns The formatted amount with the desired currency display.
 */
const formatAndAddCurrencySymbol = (
	amount: string | number | BigNumber | undefined,
	currency: Currency = 'EUR',
	isRounded = false,
	maximumDecimal = 2,
	minimumDecimal = 2,
	currencyDisplay: 'code' | 'narrowSymbol' | 'symbol' = 'code',
	minusInFrontOfNumber = true,
	localeFormat = 'en-US',
): string => {
	try {
		if (amount == null || (typeof amount === 'string' && !amount.trim()) || BigNumber(amount).isNaN()) {
			console.error('formatAndAddCurrencySymbol: invalid amount or string representation of number');

			return `${String(amount)}`;
		}

		if (!Number.isInteger(maximumDecimal) || maximumDecimal < 0) {
			console.error(
				`formatAndAddCurrencySymbol: invalid maximumDecimal parameter ${maximumDecimal}. Must be a non-negative integer`,
			);

			return `${String(amount)}`;
		}

		if (!Number.isInteger(minimumDecimal) || minimumDecimal < 0) {
			console.error(
				`formatAndAddCurrencySymbol: invalid minimumDecimal parameter ${minimumDecimal}. Must be a non-negative integer`,
			);

			return `${String(amount)}`;
		}

		if (maximumDecimal < minimumDecimal) {
			console.error(
				'formatAndAddCurrencySymbol: maximumDecimal must be greater than or equal to minimumDecimal. Setting minimumDecimal to maximumDecimal.',
			);
			minimumDecimal = maximumDecimal;
		}

		const BIG_NUMBER = BigNumber(amount);

		// Force number type for Intl.NumberFormat with roundUpNumberToBigNumber() or truncateNumberToBigNumber()
		let formattedNumber = isRounded
			? roundUpNumberToBigNumber(BIG_NUMBER, maximumDecimal)
			: truncateNumberToBigNumber(BIG_NUMBER, maximumDecimal);

		if (formattedNumber.isEqualTo(0) || formattedNumber.isEqualTo(-0)) {
			formattedNumber = BigNumber(0);
		}

		// Normalize the currency to uppercase
		const UPPERCASE_CURRENCY = currency.toUpperCase().trim() as Currency;

		const CURRENT_CRYPTOCURRENCY_SYMBOL =
			(currencyDisplay === 'narrowSymbol' || currencyDisplay === 'symbol') &&
			UPPERCASE_CURRENCY in CRYPTOCURRENCIES_SYMBOLS
				? // eslint-disable-next-line security/detect-object-injection
				CRYPTOCURRENCIES_SYMBOLS[UPPERCASE_CURRENCY]
				: '';

		// Ensure it's a maximum of 3 characters, to respect the ISO 4217 currency standard limit of 3 characters
		const SHORTED_CURRENCY = UPPERCASE_CURRENCY.substring(UPPERCASE_CURRENCY.length - 3) as Currency;

		// We replace the decimal comma by a dot, because it's scientifically superior ;)
		let formattedAmountString = new Intl.NumberFormat(localeFormat, {
			style: 'currency',
			currency: SHORTED_CURRENCY,
			minimumFractionDigits: minimumDecimal,
			maximumFractionDigits: maximumDecimal,
			currencyDisplay:
				currencyDisplay === 'symbol' ? 'symbol' : currencyDisplay === 'narrowSymbol' ? 'narrowSymbol' : 'code',
		}).format(formattedNumber.toNumber());

		if (CURRENT_CRYPTOCURRENCY_SYMBOL !== '') {
			formattedAmountString = formattedAmountString.replace(SHORTED_CURRENCY, CURRENT_CRYPTOCURRENCY_SYMBOL);
		} else {
			// Replace the 3 character currency name by its full name
			formattedAmountString = formattedAmountString.replace(SHORTED_CURRENCY, UPPERCASE_CURRENCY);
		}

		// Mostly useful when using the code format
		if (
			minusInFrontOfNumber &&
			BIG_NUMBER.isNegative() &&
			!formattedNumber.isEqualTo(0) &&
			!formattedNumber.isEqualTo(-0)
		) {
			// Move the minus sign to the front of the number
			formattedAmountString = formattedAmountString.replace('-', '');

			// Find the first number in the string
			const FIRST_NUMBER_INDEX = formattedAmountString.search(/\d/);

			if (FIRST_NUMBER_INDEX !== -1) {
				// Insert the minus sign at the correct position
				formattedAmountString =
					formattedAmountString.slice(0, FIRST_NUMBER_INDEX) + '-' + formattedAmountString.slice(FIRST_NUMBER_INDEX);
			}
		}

		return formattedAmountString;
	} catch (error) {
		console.error('formatAndAddCurrencySymbol unsuccessful. Fallback to just amount:', error);

		return `${String(amount)}`;
	}
};

/*
 * Label a currency amount by million, billion, trillion, also add a space as a thousand separator and a dot as a decimal separator.
 *
 * @param amount - The amount to be labeled. Can be a number or a string representation of a number. Defaults to 0.
 * @param lang - The language to be used for formatting the time. Defaults to 'en' (English).
 * @param currency - The currency code (e.g.: 'USD', 'EUR', 'BTC'). Defaults to 'EUR'. The function converts the code to uppercase so it's case-insensitive.
 * It's recommended to use uppercase currency codes for consistency.
 * @param currencyDisplay - The currency display mode. Can be 'code' (ISO currency code, e.g.: 'USD'), 'narrowSymbol' (e.g.: '$'), 'symbol' (e.g.: 'US$'),
 * `name` for the full currency name or `none` to not show the currency string. Defaults to 'code'.
 * @param shortLabel - Whether to use short labels (e.g.: 'M' for million, 'B' for billion, 'T' for trillion). Default is false.
 * @param isRounded - If true, rounds the amount to the specified number of decimals. Defaults to false.
 * @param maximumDecimal - The maximum number of decimal places to display. Should be greater than or equal to minimumDecimal. Defaults to 2.
 * @param minimumDecimal - The minimum number of decimal places to display. Should be less than or equal to maximumDecimal. Defaults to 2.
 *
 * @returns The labelled amount as a string.
 *
 * @remarks
 * Only the 'en' and 'fr' languages are supported. If an unsupported locale is provided, the function defaults to 'en'.
 */
const labelCurrency = (
	amount: string | number | BigNumber | undefined,
	lang: Locales = 'en',
	currency: Currency = 'EUR',
	currencyDisplay: 'code' | 'narrowSymbol' | 'symbol' | 'name' | 'none' = 'code',
	shortLabel = false,
	isRounded = false,
	maximumDecimal = 2,
	minimumDecimal = 2,
): string => {
	try {
		if (amount == null || (typeof amount === 'string' && !amount.trim()) || BigNumber(amount).isNaN()) {
			console.error('labelCurrency: invalid amount or string representation of number');

			return `${String(amount)}`;
		}

		if (
			!Number.isInteger(maximumDecimal) ||
			maximumDecimal < 0 ||
			!Number.isInteger(minimumDecimal) ||
			minimumDecimal < 0
		) {
			console.error(`labelCurrency: invalid decimal parameters. Must be non-negative integers.`);

			return `${String(amount)}`;
		}

		if (maximumDecimal < minimumDecimal) {
			console.error(
				'labelCurrency: maximumDecimal must be greater than or equal to minimumDecimal. Setting minimumDecimal to maximumDecimal.',
			);
			minimumDecimal = maximumDecimal;
		}

		const SHORT_LABELS: Record<Locales, LanguageNumberShortLabels> = {
			en: { trillion: 'T', billion: 'B', million: 'M' },
			fr: { trillion: 'T', billion: 'G', million: 'M' },
		};

		const LABELS: Record<Locales, LanguageNumberLabels> = {
			en: { trillion: 'Trillion', billion: 'Billion', million: 'Million' },
			fr: { trillion: 'Trillion', billion: 'Milliard', million: 'Million' },
		};

		const UPPERCASE_CURRENCY = currency.toUpperCase().trim() as Currency;
		const LOWERCASE_LANG = lang.toLowerCase() as Locales;

		const getCurrencyText = (): string => {
			if (currencyDisplay === 'name') {
				const PREFIX = LOWERCASE_LANG === 'fr' ? (UPPERCASE_CURRENCY === 'EUR' ? "d'" : 'de ') : '';

				return ` ${PREFIX}${getCurrencyFullName(UPPERCASE_CURRENCY, LOWERCASE_LANG, BigNumber(amount).toNumber() > 1)}`;
			}

			if (currencyDisplay === 'narrowSymbol' || currencyDisplay === 'symbol') {
				return ` ${getCurrencySymbol(UPPERCASE_CURRENCY, currencyDisplay === 'narrowSymbol')}`;
			}

			if (currencyDisplay === 'code') {
				return ` ${UPPERCASE_CURRENCY}`;
			}

			return '';
		};

		const CURRENCY_TEXT = getCurrencyText();

		const LANG_STRINGS = shortLabel
			? // eslint-disable-next-line security/detect-object-injection
			SHORT_LABELS[LOWERCASE_LANG] || SHORT_LABELS['en']
			: // eslint-disable-next-line security/detect-object-injection
			LABELS[LOWERCASE_LANG] || LABELS['en'];

		const ABSOLUTE_NUMBER = absoluteToBigNumber(amount);
		const NUMBER = BigNumber(amount);

		const formatLabeledValue = (value: BigNumber, label: string): string => {
			const FORMAT_VALUE = formatNumber(value, isRounded, maximumDecimal, minimumDecimal);
			const PLURAL_SUFFIX = !shortLabel && LOWERCASE_LANG === 'fr' && value.isGreaterThanOrEqualTo(2) ? 's' : '';

			return `${FORMAT_VALUE} ${label}${PLURAL_SUFFIX}${CURRENCY_TEXT}`;
		};

		if (ABSOLUTE_NUMBER.isGreaterThanOrEqualTo(1e12)) {
			return formatLabeledValue(NUMBER.dividedBy(1e12), LANG_STRINGS.trillion);
		} else if (ABSOLUTE_NUMBER.isGreaterThanOrEqualTo(1e9)) {
			return formatLabeledValue(NUMBER.dividedBy(1e9), LANG_STRINGS.billion);
		} else if (ABSOLUTE_NUMBER.isGreaterThanOrEqualTo(1e6)) {
			return formatLabeledValue(NUMBER.dividedBy(1e6), LANG_STRINGS.million);
		} else {
			return `${formatNumber(amount, isRounded, maximumDecimal, minimumDecimal)}${CURRENCY_TEXT}`;
		}
	} catch (error) {
		console.error('labelCurrency unsuccessful:', error);

		return `${String(amount)}`;
	}
};

export { currencyExistsInIntl, getCurrencyFullName, getCurrencySymbol, formatAndAddCurrencySymbol, labelCurrency };
