/* Utility functions for currency manipulation */

import BigNumber from 'bignumber.js';

import { absoluteToBigNumber, roundUpNumberToBigNumber, truncateNumberToBigNumber, formatNumber } from './number';

import { replaceLastCommaByDot } from './string';

// Useful link: https://www.xe.com/symbols.php

const CRYPTOCURRENCIES_SYMBOLS: Readonly<Record<string, string>> = {
	BTC: '₿',
	SAT: '丰',
	ADA: '₳',
	DOGE: 'Ð',
	ETH: 'Ξ',
	LTC: 'Ł',
	XTZ: 'ꜩ',
	USDT: '₮',
	TBTC: 't₿',
	TSAT: 't丰',
	TADA: 't₳',
	TDOGE: 'tÐ',
	TETH: 'tΞ',
	TLTC: 'tŁ',
	TXTZ: 'tꜩ',
	TUSDT: 't₮',
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
 * The function supports the following fiat currencies: EUR, GBP, USD, CAD and Gold and Silver
 * The function supports the following cryptocurrencies: BTC, SAT, ADA, ALGO, ARB, ATOM, AVAX, BNB, DOGE, DOT, ETH, FTM, LTC, MATIC, NEAR, OP, SOL, TRX, VET, XLM, XRP, XTZ, USDC, USDT
 * The function also supports testnet versions of TBTC, TSAT, TADA, TALGO, TARB, TATOM, TAVAX, TBNB, TDOGE, TDOT, TETH, TFTM, TLTC, TMATIC, TNEAR, TOP, TSOL, TTRX, TVET, TXLM, TXRP, TXTZ, TUSDC, TUSDT
 */
const getCurrencyFullName = (currency: Currency, lang: Locales = 'en', plural = false): string => {
	const UPPERCASE_CURRENCY = currency.toUpperCase().trim() as Currency;
	const LOWERCASE_LANG = lang.toLowerCase();

	const PLURAL_SUFFIX = plural ? 's' : '';

	// Add new currencies here
	switch (UPPERCASE_CURRENCY) {
		case 'BTC':
			return `Bitcoin${PLURAL_SUFFIX}`; // There is no second best, Buy bitcoin

		case 'SAT':
			return `Satoshi${PLURAL_SUFFIX}`;

		case 'EUR':
			return `Euro${PLURAL_SUFFIX}`;

		case 'GBP':
			return LOWERCASE_LANG === 'fr' ? `Livre${PLURAL_SUFFIX} sterling` : `British Pound${PLURAL_SUFFIX} Sterling`;

		case 'USD':
			return LOWERCASE_LANG === 'fr' ? `Dollar${PLURAL_SUFFIX} américain` : `US Dollar${PLURAL_SUFFIX}`;

		case 'CAD':
			return LOWERCASE_LANG === 'fr' ? `Dollar${PLURAL_SUFFIX} canadien` : `Canadian Dollar${PLURAL_SUFFIX}`;

		case 'XAU':
			return LOWERCASE_LANG === 'fr' ? `Once${PLURAL_SUFFIX} troy d'or` : `Gold Troy Ounce${PLURAL_SUFFIX}`;

		case 'XAG':
			return LOWERCASE_LANG === 'fr' ? `Once${PLURAL_SUFFIX} troy d'argent` : `Silver Troy Ounce${PLURAL_SUFFIX}`;

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
			return `Binance Coin${PLURAL_SUFFIX}`;

		case 'DOGE':
			return `Dogecoin${PLURAL_SUFFIX}`;

		case 'DOT':
			return 'Polkadot';

		case 'ETH':
			return 'Ethereum';

		case 'FTM':
			return 'Fantom';

		case 'LTC':
			return `Litecoin${PLURAL_SUFFIX}`;

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
			return `USD Coin${PLURAL_SUFFIX}`;

		case 'USDT':
			return `Tether${PLURAL_SUFFIX}`;

		case 'TBTC':
			return `Testnet Bitcoin${PLURAL_SUFFIX}`;

		case 'TSAT':
			return `Testnet Satoshi${PLURAL_SUFFIX}`;

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
			return `Testnet Binance Coin${PLURAL_SUFFIX}`;

		case 'TDOGE':
			return `Testnet Dogecoin${PLURAL_SUFFIX}`;

		case 'TDOT':
			return 'Testnet Polkadot';

		case 'TETH':
			return 'Testnet Ethereum';

		case 'TFTM':
			return 'Testnet Fantom';

		case 'TLTC':
			return `Testnet Litecoin${PLURAL_SUFFIX}`;

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
			return `Testnet USD Coin${PLURAL_SUFFIX}`;

		case 'TUSDT':
			return `Testnet Tether${PLURAL_SUFFIX}`;

		default:
			return UPPERCASE_CURRENCY;
	}
};

/*
 * Retrieves the symbol associated with a given currency code.
 * This function supports a variety of fiat and cryptocurrencies, and returns the corresponding symbol.
 * For unrecognized currencies, it returns the original currency code.
 *
 * @param currency - The currency code (e.g.: 'USD', 'EUR', 'BTC'). The function converts the code to uppercase so it's case-insensitive.
 * It's recommended to use uppercase currency codes for consistency.
 *
 * @returns The symbol of the currency if recognized, otherwise returns the original currency code.
 *
 * @remarks
 * The function supports the following fiat currencies: EUR, GBP, USD and CAD
 * The function supports the following cryptocurrencies: BTC, SAT, ADA, DOGE, ETH, LTC, XTZ, USDT
 * The function also supports testnet versions of TBTC, TSAT, TADA, TDOGE, TETH, TLTC, TXTZ, TUSDT
 */
const getCurrencySymbol = (currency: Currency): string => {
	const UPPERCASE_CURRENCY = currency.toUpperCase().trim() as Currency;

	return UPPERCASE_CURRENCY in CRYPTOCURRENCIES_SYMBOLS
		? // eslint-disable-next-line security/detect-object-injection
		CRYPTOCURRENCIES_SYMBOLS[UPPERCASE_CURRENCY]
		: UPPERCASE_CURRENCY;
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
 * @param haveShortSymbol - If true, uses short currency symbols (e.g.: '$'). If false, uses long symbols (e.g.: 'USD'). Defaults to true.
 * @param useIsoCurrencyCode - If true, uses ISO currency codes (e.g.: 'EUR') instead of symbols. Defaults to false.
 *
 * @returns The formatted amount with the currency symbol or ISO currency code.
 */
const formatAndAddCurrencySymbol = (
	amount: string | number | BigNumber | undefined,
	currency: Currency = 'EUR',
	isRounded = false,
	maximumDecimal = 2,
	minimumDecimal = 2,
	useIsoCurrencyCode = true,
	haveShortSymbol = false,
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

		if (formattedNumber.toFixed() === '-0') {
			formattedNumber = BigNumber(0);
		}

		// Normalize the currency to uppercase
		const UPPERCASE_CURRENCY = currency.toUpperCase().trim() as Currency;

		const CURRENT_CRYPTOCURRENCY_SYMBOL =
			haveShortSymbol && UPPERCASE_CURRENCY in CRYPTOCURRENCIES_SYMBOLS
				? // eslint-disable-next-line security/detect-object-injection
				CRYPTOCURRENCIES_SYMBOLS[UPPERCASE_CURRENCY]
				: '';

		// Ensure it's a maximum of 3 characters, to respect the ISO 4217 currency standard limit of 3 characters
		const SHORTED_CURRENCY = UPPERCASE_CURRENCY.substring(UPPERCASE_CURRENCY.length - 3) as Currency;

		// We replace the decimal comma by a dot, because it's scientifically superior ;)
		let formattedAmountString = new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: SHORTED_CURRENCY,
			minimumFractionDigits: minimumDecimal,
			maximumFractionDigits: maximumDecimal,
			currencyDisplay: useIsoCurrencyCode ? 'code' : haveShortSymbol ? 'narrowSymbol' : 'symbol',
		}).format(formattedNumber.toNumber());

		if (CURRENT_CRYPTOCURRENCY_SYMBOL !== '') {
			formattedAmountString = formattedAmountString.replace(SHORTED_CURRENCY, CURRENT_CRYPTOCURRENCY_SYMBOL);
		} else {
			// Replace the 3 character currency name by its full name
			formattedAmountString = formattedAmountString.replace(SHORTED_CURRENCY, UPPERCASE_CURRENCY);
		}

		return replaceLastCommaByDot(formattedAmountString);
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
 * @param shortLabel - Whether to use short labels (e.g.: 'M' for million, 'B' for billion, 'T' for trillion). Default is false.
 * @param haveCurrencyText - If true, adds the currency symbol or ISO currency code to the labeled amount. Defaults to true.
 * @param haveShortCurrencySymbol - If true, uses short currency symbols (e.g.: '$'). If false, uses long text (e.g.: 'Euro'). Need haveCurrencyText to be true to works. Defaults to true.
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
	shortLabel = false,
	haveCurrencyText = true,
	haveShortCurrencySymbol = true,
	isRounded = false,
	maximumDecimal = 2,
	minimumDecimal = 2,
): string => {
	try {
		if (amount == null || (typeof amount === 'string' && !amount.trim()) || BigNumber(amount).isNaN()) {
			console.error('labelCurrency: invalid amount or string representation of number');

			return `${String(amount)}`;
		}

		if (!Number.isInteger(maximumDecimal) || maximumDecimal < 0) {
			console.error(
				`labelCurrency: invalid maximumDecimal parameter ${maximumDecimal}. Must be a non-negative integer`,
			);

			return `${String(amount)}`;
		}

		if (!Number.isInteger(minimumDecimal) || minimumDecimal < 0) {
			console.error(
				`labelCurrency: invalid minimumDecimal parameter ${minimumDecimal}. Must be a non-negative integer`,
			);

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

		currency = currency.toUpperCase().trim() as Currency;

		const CURRENCY_TEXT = haveCurrencyText
			? haveShortCurrencySymbol
				? ` ${getCurrencySymbol(currency)}`
				: ` ${lang.toLowerCase() === 'fr' && currency === 'EUR' ? "d'" : lang.toLowerCase() === 'fr' && currency !== 'EUR' ? 'de ' : ''}${getCurrencyFullName(currency, lang, true)}`
			: '';

		// eslint-disable-next-line security/detect-object-injection
		const LANG_STRINGS = shortLabel ? SHORT_LABELS[lang] || SHORT_LABELS['en'] : LABELS[lang] || LABELS['en'];

		const ABSOLUTE_NUMBER = absoluteToBigNumber(amount);
		const NUMBER = BigNumber(amount);

		if (ABSOLUTE_NUMBER.isGreaterThanOrEqualTo(1e12)) {
			const VALUE = NUMBER.dividedBy(1e12);

			return `${formatNumber(VALUE, isRounded, maximumDecimal, minimumDecimal)} ${LANG_STRINGS.trillion}${!shortLabel && lang.toLowerCase() === 'fr' && VALUE.isGreaterThanOrEqualTo(2) ? 's' : ''}${CURRENCY_TEXT}`;
		} else if (ABSOLUTE_NUMBER.isGreaterThanOrEqualTo(1e9)) {
			const VALUE = NUMBER.dividedBy(1e9);

			return `${formatNumber(VALUE, isRounded, maximumDecimal, minimumDecimal)} ${LANG_STRINGS.billion}${!shortLabel && lang.toLowerCase() === 'fr' && VALUE.isGreaterThanOrEqualTo(2) ? 's' : ''}${CURRENCY_TEXT}`;
		} else if (ABSOLUTE_NUMBER.isGreaterThanOrEqualTo(1e6)) {
			const VALUE = NUMBER.dividedBy(1e6);

			return `${formatNumber(VALUE, isRounded, maximumDecimal, minimumDecimal)} ${LANG_STRINGS.million}${!shortLabel && lang.toLowerCase() === 'fr' && VALUE.isGreaterThanOrEqualTo(2) ? 's' : ''}${CURRENCY_TEXT}`;
		} else {
			return haveCurrencyText
				? formatAndAddCurrencySymbol(
					amount,
					currency,
					isRounded,
					maximumDecimal,
					minimumDecimal,
					haveShortCurrencySymbol,
				)
				: formatNumber(amount, isRounded, maximumDecimal, minimumDecimal);
		}
	} catch (error) {
		console.error('labelCurrency unsuccessful:', error);

		return `${String(amount)}`;
	}
};

export { getCurrencyFullName, getCurrencySymbol, formatAndAddCurrencySymbol, labelCurrency };
