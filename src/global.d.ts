// Language translation
type Locales = 'en' | 'fr';

type AtomicUnit = {
	value: string; // Number type in JavaScript have some limitations, so we use string representation of a number in the object AtomicUnit, but it's "technically" a number
	precision: number;
	isValid: boolean; // Confirm that the conversion to atomic unit was successful
	originalValue: string; // The original value before conversion
};

type LanguageNumberShortLabels = {
	million: string;
	billion: string;
	trillion: string;
};

type LanguageNumberLabels = {
	million: string;
	billion: string;
	trillion: string;
};

// NonEmptyString type
type NonEmptyString = string & { trim: never };

// Currency types
type Currency =
	// Fiats
	| 'AED' // United Arab Emirates Dirham
	| 'ARS' // Argentina Peso
	| 'AUD' // Australian Dollar
	| 'AWG' // Aruban Florin
	| 'BAM' // Bosnia-Herzegovina Convertible Mark
	| 'BDT' // Bangladeshi Taka
	| 'BGN' // Bulgarian Lev
	| 'BHD' // Bahraini Dinar
	| 'BRL' // Brazilian Real
	| 'CAD' // Canadian Dollar
	| 'CDF' // Congolese Franc
	| 'CHF' // Swiss Franc
	| 'CLP' // Chilean Peso
	| 'CNY' // Chinese Yuan
	| 'COP' // Colombian Peso
	| 'CRC' // Costa Rican Colón
	| 'CZK' // Czech Koruna
	| 'DKK' // Danish Krone
	| 'DOP' // Dominican Peso
	| 'DZD' // Algerian Dinar
	| 'EGP' // Egyptian Pound
	| 'EUR' // Euro
	| 'GBP' // British Pound
	| 'GEL' // Georgian Lari
	| 'GTQ' // Guatemalan Quetzal
	| 'HKD' // Hong Kong Dollar
	| 'HRK' // Croatian Kuna
	| 'HUF' // Hungarian Forint
	| 'IDR' // Indonesian Rupiah
	| 'ILS' // Israeli New Shekel
	| 'INR' // Indian Rupee
	| 'ISK' // Icelandic Króna
	| 'JMD' // Jamaican Dollar
	| 'JPY' // Japanese Yen
	| 'KES' // Kenyan Shilling
	| 'KRW' // South Korean Won
	| 'KWD' // Kuwaiti Dinar
	| 'KYD' // Cayman Islands Dollar
	| 'KZT' // Kazakhstani Tenge
	| 'LBP' // Lebanese Pound
	| 'LKR' // Sri Lankan Rupee
	| 'MAD' // Moroccan Dirham
	| 'MXN' // Mexican Peso
	| 'MYR' // Malaysian Ringgit
	| 'NGN' // Nigerian Naira
	| 'NIO' // Nicaraguan Córdoba
	| 'NOK' // Norwegian Krone
	| 'NPR' // Nepalese Rupee
	| 'NZD' // New Zealand Dollar
	| 'PAB' // Panamanian Balboa
	| 'PEN' // Peruvian Sol
	| 'PHP' // Philippine Peso
	| 'PKR' // Pakistani Rupee
	| 'PLN' // Polish Złoty
	| 'QAR' // Qatari Riyal
	| 'RON' // Romanian Leu
	| 'RSD' // Serbian Dinar
	| 'RUB' // Russian Ruble
	| 'SAR' // Saudi Riyal
	| 'SEK' // Swedish Krona
	| 'SGD' // Singapore Dollar
	| 'THB' // Thai Baht
	| 'TND' // Tunisian Dinar
	| 'TRY' // Turkish Lira
	| 'TWD' // New Taiwan Dollar
	| 'UAH' // Ukrainian Hryvnia
	| 'UGX' // Ugandan Shilling
	| 'USD' // United States Dollar
	| 'UYU' // Uruguayan Peso
	| 'VND' // Vietnamese Đồng
	| 'XAF' // Central African CFA Franc
	| 'ZAR' // South African Rand
	// Commodity
	| 'XAG' // Silver
	| 'XAU' // Gold
	// Cryptocurrencies
	| 'ADA' // Cardano
	| 'ALGO' // Algorand
	| 'ARB' // Arbitrum
	| 'ATOM' // Cosmos
	| 'AVAX' // Avalanche
	| 'BNB' // Binance Coin
	| 'BTC' // Bitcoin
	| 'DOGE' // Dogecoin
	| 'DOT' // Polkadot
	| 'ETH' // Ethereum
	| 'FTM' // Fantom
	| 'LTC' // Litecoin
	| 'MATIC' // Polygon
	| 'NEAR' // Near Protocol
	| 'OP' // Optimism Ethereum
	| 'SAT' // Satoshi (bitcoin)
	| 'SOL' // Solana
	| 'TRX' // Tron
	| 'USDC' // USD Coin
	| 'USDT' // Tether
	| 'VET' // Vechain
	| 'XLM' // Stellar
	| 'XRP' // Ripple (XRP)
	| 'XTZ' // Tezos
	// Testnet cryptocurrencies
	| 'TADA' // Testnet Cardano
	| 'TALGO' // Testnet Algorand
	| 'TARB' // Testnet Arbitrum
	| 'TATOM' // Testnet Cosmos
	| 'TAVAX' // Testnet Avalanche
	| 'TBNB' // Testnet Binance Coin
	| 'TBTC' // Testnet Bitcoin
	| 'TDOGE' // Testnet Dogecoin
	| 'TDOT' // Testnet Polkadot
	| 'TETH' // Testnet Ethereum
	| 'TFTM' // Testnet Fantom
	| 'TLTC' // Testnet Litecoin
	| 'TMATIC' // Testnet Polygon
	| 'TNEAR' // Testnet Near Protocol
	| 'TOP' // Testnet Optimism Ethereum
	| 'TSAT' // Testnet Satoshi (bitcoin)
	| 'TSOL' // Testnet Solana
	| 'TTRX' // Testnet Tron
	| 'TUSDC' // Testnet USD Coin
	| 'TUSDT' // Testnet Tether
	| 'TVET' // Testnet Vechain
	| 'TXLM' // Testnet Stellar
	| 'TXRP' // Testnet Ripple (XRP)
	| 'TXTZ' // Testnet Tezos
	| NonEmptyString;
