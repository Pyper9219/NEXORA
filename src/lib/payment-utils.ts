// Payment Method Constants and Utilities for Nexora
// Supports 30+ local and international payment methods

export type PaymentMethodCategory = 'local' | 'international';
export type PaymentMethodType = 'mobile_money' | 'card' | 'bank_transfer' | 'wallet' | 'crypto' | 'bnpl' | 'ussd';

export interface PaymentMethod {
  id: string;
  name: string;
  category: PaymentMethodCategory;
  type: PaymentMethodType;
  icon: string; // Lucide icon name or custom SVG
  badge?: string; // e.g., "Popular", "New"
  countries: string[]; // ISO country codes
  currencies: string[]; // ISO currency codes
  envVar: string; // Environment variable for API credentials
  enabled: boolean;
  description?: string;
}

// Local payment methods (Africa-focused)
export const LOCAL_PAYMENT_METHODS: PaymentMethod[] = [
  // Kenya
  {
    id: 'mpesa',
    name: 'M-PESA',
    category: 'local',
    type: 'mobile_money',
    icon: 'smartphone',
    badge: 'Popular',
    countries: ['KE'],
    currencies: ['KES'],
    envVar: 'MPESA_CONSUMER_KEY',
    enabled: true,
    description: 'Kenya\'s leading mobile money service by Safaricom',
  },
  {
    id: 'airtel_money_ke',
    name: 'Airtel Money',
    category: 'local',
    type: 'mobile_money',
    icon: 'smartphone',
    countries: ['KE'],
    currencies: ['KES'],
    envVar: 'AIRTEL_MONEY_API_KEY',
    enabled: true,
    description: 'Airtel Kenya mobile money service',
  },
  {
    id: 'pesalink',
    name: 'PesaLink',
    category: 'local',
    type: 'bank_transfer',
    icon: 'building',
    countries: ['KE'],
    currencies: ['KES'],
    envVar: 'PESALINK_API_KEY',
    enabled: true,
    description: 'Inter-bank transfer service in Kenya',
  },
  {
    id: 'pesapal',
    name: 'Pesapal',
    category: 'local',
    type: 'wallet',
    icon: 'credit-card',
    badge: 'Popular',
    countries: ['KE', 'UG', 'TZ', 'RW', 'ZM', 'MW'],
    currencies: ['KES', 'UGX', 'TZS', 'RWF', 'ZMW', 'MWK'],
    envVar: 'PESAPAL_CONSUMER_KEY',
    enabled: true,
    description: 'Payment gateway for East Africa',
  },
  {
    id: 'dpo_pay',
    name: 'DPO Pay',
    category: 'local',
    type: 'wallet',
    icon: 'credit-card',
    countries: ['KE', 'UG', 'TZ', 'RW', 'ZA', 'NG', 'GH'],
    currencies: ['KES', 'UGX', 'TZS', 'RWF', 'ZAR', 'NGN', 'GHS'],
    envVar: 'DPO_API_KEY',
    enabled: true,
    description: 'Payment service provider across Africa',
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    category: 'local',
    type: 'wallet',
    icon: 'credit-card',
    badge: 'Popular',
    countries: ['NG', 'KE', 'UG', 'GH', 'ZA', 'TZ', 'RW', 'CM', 'CI', 'SN', 'BF', 'ML'],
    currencies: ['NGN', 'KES', 'UGX', 'GHS', 'ZAR', 'TZS', 'RWF', 'XAF', 'XOF'],
    envVar: 'FLUTTERWAVE_SECRET_KEY',
    enabled: true,
    description: 'Payment infrastructure for Africa and global',
  },
  {
    id: 'paystack',
    name: 'Paystack',
    category: 'local',
    type: 'wallet',
    icon: 'credit-card',
    badge: 'Popular',
    countries: ['NG', 'GH', 'ZA', 'KE'],
    currencies: ['NGN', 'GHS', 'ZAR', 'KES'],
    envVar: 'PAYSTACK_SECRET_KEY',
    enabled: true,
    description: 'Modern payment gateway for Africa',
  },
  {
    id: 'intasend',
    name: 'IntaSend',
    category: 'local',
    type: 'wallet',
    icon: 'credit-card',
    countries: ['KE', 'NG', 'GH', 'UG', 'TZ'],
    currencies: ['KES', 'NGN', 'GHS', 'UGX', 'TZS'],
    envVar: 'INTASEND_API_KEY',
    enabled: true,
    description: 'Payment platform for African businesses',
  },
  {
    id: 'kora',
    name: 'Kora',
    category: 'local',
    type: 'wallet',
    icon: 'credit-card',
    countries: ['NG', 'KE', 'GH', 'ZA', 'UG'],
    currencies: ['NGN', 'KES', 'GHS', 'ZAR', 'UGX'],
    envVar: 'KORA_API_KEY',
    enabled: true,
    description: 'Pan-African payment infrastructure',
  },
  {
    id: 'ussd',
    name: 'USSD Payments',
    category: 'local',
    type: 'ussd',
    icon: 'phone',
    countries: ['KE', 'NG', 'GH', 'ZA', 'UG', 'TZ'],
    currencies: ['KES', 'NGN', 'GHS', 'ZAR', 'UGX', 'TZS'],
    envVar: 'USSD_API_KEY',
    enabled: true,
    description: 'Offline payment via USSD codes',
  },
  // Nigeria specific
  {
    id: 'opay',
    name: 'OPay',
    category: 'local',
    type: 'mobile_money',
    icon: 'smartphone',
    countries: ['NG'],
    currencies: ['NGN'],
    envVar: 'OPAY_API_KEY',
    enabled: true,
    description: 'Nigeria\'s leading mobile money and fintech platform',
  },
  {
    id: 'palmpay',
    name: 'PalmPay',
    category: 'local',
    type: 'mobile_money',
    icon: 'smartphone',
    countries: ['NG', 'GH'],
    currencies: ['NGN', 'GHS'],
    envVar: 'PALMPAY_API_KEY',
    enabled: true,
    description: 'Mobile money and digital payments in Nigeria and Ghana',
  },
  {
    id: 'monnify',
    name: 'Monnify',
    category: 'local',
    type: 'wallet',
    icon: 'credit-card',
    countries: ['NG'],
    currencies: ['NGN'],
    envVar: 'MONNIFY_API_KEY',
    enabled: true,
    description: 'Payment gateway for Nigerian businesses',
  },
  // Ghana specific
  {
    id: 'mtn_momo',
    name: 'MTN MoMo',
    category: 'local',
    type: 'mobile_money',
    icon: 'smartphone',
    countries: ['GH', 'UG', 'RW', 'ZM', 'CM', 'CI'],
    currencies: ['GHS', 'UGX', 'RWF', 'ZMW', 'XAF', 'XOF'],
    envVar: 'MTN_MOMO_API_KEY',
    enabled: true,
    description: 'MTN Mobile Money across Africa',
  },
  {
    id: 'vodafone_cash',
    name: 'Vodafone Cash',
    category: 'local',
    type: 'mobile_money',
    icon: 'smartphone',
    countries: ['GH'],
    currencies: ['GHS'],
    envVar: 'VODAFONE_CASH_API_KEY',
    enabled: true,
    description: 'Vodafone Ghana mobile money service',
  },
  // South Africa specific
  {
    id: 'ozow',
    name: 'Ozow',
    category: 'local',
    type: 'bank_transfer',
    icon: 'building',
    countries: ['ZA'],
    currencies: ['ZAR'],
    envVar: 'OZOW_API_KEY',
    enabled: true,
    description: 'Instant EFT payments in South Africa',
  },
  {
    id: 'payfast',
    name: 'PayFast',
    category: 'local',
    type: 'wallet',
    icon: 'credit-card',
    countries: ['ZA'],
    currencies: ['ZAR'],
    envVar: 'PAYFAST_API_KEY',
    enabled: true,
    description: 'Payment gateway for South Africa',
  },
  // Egypt specific
  {
    id: 'fawry',
    name: 'Fawry',
    category: 'local',
    type: 'wallet',
    icon: 'credit-card',
    countries: ['EG'],
    currencies: ['EGP'],
    envVar: 'FAWRY_API_KEY',
    enabled: true,
    description: 'Egypt\'s leading digital payments platform',
  },
  {
    id: 'paymob',
    name: 'Paymob',
    category: 'local',
    type: 'wallet',
    icon: 'credit-card',
    countries: ['EG', 'KE', 'NG', 'PK'],
    currencies: ['EGP', 'KES', 'NGN', 'PKR'],
    envVar: 'PAYMOB_API_KEY',
    enabled: true,
    description: 'Payment infrastructure for emerging markets',
  },
];

// International payment methods
export const INTERNATIONAL_PAYMENT_METHODS: PaymentMethod[] = [
  // Cards
  {
    id: 'visa',
    name: 'Visa',
    category: 'international',
    type: 'card',
    icon: 'credit-card',
    badge: 'Popular',
    countries: ['*'],
    currencies: ['USD', 'EUR', 'GBP', 'KES', 'NGN', 'ZAR', 'GHS', 'UGX', 'TZS', 'RWF', 'ETB', 'XOF', 'XAF'],
    envVar: 'STRIPE_SECRET_KEY',
    enabled: true,
    description: 'Global credit and debit card network',
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    category: 'international',
    type: 'card',
    icon: 'credit-card',
    badge: 'Popular',
    countries: ['*'],
    currencies: ['USD', 'EUR', 'GBP', 'KES', 'NGN', 'ZAR', 'GHS', 'UGX', 'TZS', 'RWF', 'ETB', 'XOF', 'XAF'],
    envVar: 'STRIPE_SECRET_KEY',
    enabled: true,
    description: 'Global credit and debit card network',
  },
  {
    id: 'amex',
    name: 'American Express',
    category: 'international',
    type: 'card',
    icon: 'credit-card',
    countries: ['*'],
    currencies: ['USD', 'EUR', 'GBP', 'KES', 'NGN', 'ZAR', 'GHS'],
    envVar: 'STRIPE_SECRET_KEY',
    enabled: true,
    description: 'American Express credit cards',
  },
  {
    id: 'discover',
    name: 'Discover',
    category: 'international',
    type: 'card',
    icon: 'credit-card',
    countries: ['US'],
    currencies: ['USD'],
    envVar: 'STRIPE_SECRET_KEY',
    enabled: true,
    description: 'Discover credit cards (US-focused)',
  },
  {
    id: 'diners_club',
    name: 'Diners Club',
    category: 'international',
    type: 'card',
    icon: 'credit-card',
    countries: ['*'],
    currencies: ['USD', 'EUR', 'GBP'],
    envVar: 'STRIPE_SECRET_KEY',
    enabled: true,
    description: 'Diners Club International cards',
  },
  // Digital Wallets
  {
    id: 'apple_pay',
    name: 'Apple Pay',
    category: 'international',
    type: 'wallet',
    icon: 'apple',
    badge: 'Popular',
    countries: ['*'],
    currencies: ['USD', 'EUR', 'GBP', 'KES', 'NGN', 'ZAR', 'GHS'],
    envVar: 'STRIPE_SECRET_KEY',
    enabled: true,
    description: 'Apple\'s mobile payment and digital wallet',
  },
  {
    id: 'google_pay',
    name: 'Google Pay',
    category: 'international',
    type: 'wallet',
    icon: 'android',
    badge: 'Popular',
    countries: ['*'],
    currencies: ['USD', 'EUR', 'GBP', 'KES', 'NGN', 'ZAR', 'GHS'],
    envVar: 'STRIPE_SECRET_KEY',
    enabled: true,
    description: 'Google\'s digital wallet platform',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'international',
    type: 'wallet',
    icon: 'paypal',
    badge: 'Popular',
    countries: ['*'],
    currencies: ['USD', 'EUR', 'GBP', 'KES', 'NGN', 'ZAR', 'GHS', 'UGX', 'TZS'],
    envVar: 'PAYPAL_CLIENT_ID',
    enabled: true,
    description: 'Global online payment system',
  },
  // Bank Transfers
  {
    id: 'stripe',
    name: 'Stripe (Direct)',
    category: 'international',
    type: 'bank_transfer',
    icon: 'credit-card',
    badge: 'Popular',
    countries: ['*'],
    currencies: ['USD', 'EUR', 'GBP', 'KES', 'NGN', 'ZAR', 'GHS', 'UGX', 'TZS'],
    envVar: 'STRIPE_SECRET_KEY',
    enabled: true,
    description: 'Full Stripe integration for cards, wallets, and bank transfers',
  },
  {
    id: 'wise',
    name: 'Wise (TransferWise)',
    category: 'international',
    type: 'bank_transfer',
    icon: 'send',
    countries: ['*'],
    currencies: ['USD', 'EUR', 'GBP', 'KES', 'NGN', 'ZAR', 'GHS', 'UGX', 'TZS', 'RWF', 'ETB'],
    envVar: 'WISE_API_KEY',
    enabled: true,
    description: 'Low-cost international bank transfers',
  },
  {
    id: 'sepa',
    name: 'SEPA Direct Debit',
    category: 'international',
    type: 'bank_transfer',
    icon: 'building',
    countries: ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'],
    currencies: ['EUR'],
    envVar: 'STRIPE_SECRET_KEY',
    enabled: true,
    description: 'Euro bank transfers within SEPA zone',
  },
  // Crypto
  {
    id: 'bitcoin',
    name: 'Bitcoin (BTC)',
    category: 'international',
    type: 'crypto',
    icon: 'bitcoin',
    countries: ['*'],
    currencies: ['BTC'],
    envVar: 'COINBASE_COMMERCE_API_KEY',
    enabled: true,
    description: 'Bitcoin cryptocurrency payments',
  },
  {
    id: 'ethereum',
    name: 'Ethereum (ETH)',
    category: 'international',
    type: 'crypto',
    icon: 'ethereum',
    countries: ['*'],
    currencies: ['ETH'],
    envVar: 'COINBASE_COMMERCE_API_KEY',
    enabled: true,
    description: 'Ethereum cryptocurrency payments',
  },
  {
    id: 'usdt',
    name: 'USDT (Tether)',
    category: 'international',
    type: 'crypto',
    icon: 'dollar-sign',
    countries: ['*'],
    currencies: ['USDT'],
    envVar: 'COINBASE_COMMERCE_API_KEY',
    enabled: true,
    description: 'Tether stablecoin payments (ERC-20, TRC-20)',
  },
  {
    id: 'usdc',
    name: 'USDC',
    category: 'international',
    type: 'crypto',
    icon: 'dollar-sign',
    countries: ['*'],
    currencies: ['USDC'],
    envVar: 'COINBASE_COMMERCE_API_KEY',
    enabled: true,
    description: 'USD Coin stablecoin payments',
  },
  // BNPL
  {
    id: 'klarna',
    name: 'Klarna',
    category: 'international',
    type: 'bnpl',
    icon: 'credit-card',
    countries: ['AT', 'BE', 'DE', 'DK', 'ES', 'FI', 'FR', 'IE', 'IT', 'NL', 'NO', 'PL', 'PT', 'SE', 'GB', 'US', 'AU', 'NZ'],
    currencies: ['EUR', 'GBP', 'USD', 'SEK', 'NOK', 'DKK', 'PLN', 'AUD', 'NZD'],
    envVar: 'KLARNA_API_KEY',
    enabled: true,
    description: 'Buy now, pay later service',
  },
  {
    id: 'afterpay',
    name: 'Afterpay / Clearpay',
    category: 'international',
    type: 'bnpl',
    icon: 'credit-card',
    countries: ['AU', 'NZ', 'US', 'GB', 'CA'],
    currencies: ['AUD', 'NZD', 'USD', 'GBP', 'CAD'],
    envVar: 'AFTERPAY_API_KEY',
    enabled: true,
    description: 'Buy now, pay later (Clearpay in UK/EU)',
  },
  {
    id: 'affirm',
    name: 'Affirm',
    category: 'international',
    type: 'bnpl',
    icon: 'credit-card',
    countries: ['US', 'CA'],
    currencies: ['USD', 'CAD'],
    envVar: 'AFFIRM_API_KEY',
    enabled: true,
    description: 'Buy now, pay later for US and Canada',
  },
];

// Combined all methods
export const ALL_PAYMENT_METHODS: PaymentMethod[] = [
  ...LOCAL_PAYMENT_METHODS,
  ...INTERNATIONAL_PAYMENT_METHODS,
];

// Environment variables required for payment integrations
export const PAYMENT_ENV_VARS = {
  // Stripe (covers cards, Apple Pay, Google Pay, SEPA, etc.)
  STRIPE_SECRET_KEY: {
    required: true,
    description: 'Stripe secret key for card payments, wallets, and bank transfers',
    methods: ['visa', 'mastercard', 'amex', 'discover', 'diners_club', 'apple_pay', 'google_pay', 'stripe', 'sepa'],
  },
  // Paystack
  PAYSTACK_SECRET_KEY: {
    required: true,
    description: 'Paystack secret key for African card and wallet payments',
    methods: ['paystack'],
  },
  // Flutterwave
  FLUTTERWAVE_SECRET_KEY: {
    required: true,
    description: 'Flutterwave secret key for pan-African payments',
    methods: ['flutterwave'],
  },
  // DPO Pay
  DPO_API_KEY: {
    required: false,
    description: 'DPO Pay API key for multi-country African payments',
    methods: ['dpo_pay'],
  },
  // IntaSend
  INTASEND_API_KEY: {
    required: false,
    description: 'IntaSend API key for East/West African payments',
    methods: ['intasend'],
  },
  // M-PESA
  MPESA_CONSUMER_KEY: {
    required: true,
    description: 'M-PESA Daraja API consumer key',
    methods: ['mpesa'],
  },
  MPESA_CONSUMER_SECRET: {
    required: true,
    description: 'M-PESA Daraja API consumer secret',
    methods: ['mpesa'],
  },
  MPESA_SHORTCODE: {
    required: true,
    description: 'M-PESA paybill/till number',
    methods: ['mpesa'],
  },
  MPESA_PASSKEY: {
    required: true,
    description: 'M-PESA Lipa Na M-PESA passkey',
    methods: ['mpesa'],
  },
  // Pesapal
  PESAPAL_CONSUMER_KEY: {
    required: false,
    description: 'Pesapal consumer key',
    methods: ['pesapal'],
  },
  PESAPAL_CONSUMER_SECRET: {
    required: false,
    description: 'Pesapal consumer secret',
    methods: ['pesapal'],
  },
  // PayPal
  PAYPAL_CLIENT_ID: {
    required: false,
    description: 'PayPal client ID for international payments',
    methods: ['paypal'],
  },
  PAYPAL_CLIENT_SECRET: {
    required: false,
    description: 'PayPal client secret',
    methods: ['paypal'],
  },
  // Wise
  WISE_API_KEY: {
    required: false,
    description: 'Wise API key for international transfers',
    methods: ['wise'],
  },
  // Crypto
  COINBASE_COMMERCE_API_KEY: {
    required: false,
    description: 'Coinbase Commerce API key for crypto payments',
    methods: ['bitcoin', 'ethereum', 'usdt', 'usdc'],
  },
  // BNPL
  KLARNA_API_KEY: {
    required: false,
    description: 'Klarna API key for BNPL',
    methods: ['klarna'],
  },
  AFTERPAY_API_KEY: {
    required: false,
    description: 'Afterpay/Clearpay API key',
    methods: ['afterpay'],
  },
  AFFIRM_API_KEY: {
    required: false,
    description: 'Affirm API key',
    methods: ['affirm'],
  },
  // Others
  AIRTEL_MONEY_API_KEY: { required: false, description: 'Airtel Money API key', methods: ['airtel_money_ke'] },
  PESALINK_API_KEY: { required: false, description: 'PesaLink API key', methods: ['pesalink'] },
  KORA_API_KEY: { required: false, description: 'Kora API key', methods: ['kora'] },
  USSD_API_KEY: { required: false, description: 'USSD gateway API key', methods: ['ussd'] },
  OPAY_API_KEY: { required: false, description: 'OPay API key', methods: ['opay'] },
  PALMPAY_API_KEY: { required: false, description: 'PalmPay API key', methods: ['palmpay'] },
  MONNIFY_API_KEY: { required: false, description: 'Monnify API key', methods: ['monnify'] },
  MTN_MOMO_API_KEY: { required: false, description: 'MTN MoMo API key', methods: ['mtn_momo'] },
  VODAFONE_CASH_API_KEY: { required: false, description: 'Vodafone Cash API key', methods: ['vodafone_cash'] },
  OZOW_API_KEY: { required: false, description: 'Ozow API key', methods: ['ozow'] },
  PAYFAST_API_KEY: { required: false, description: 'PayFast API key', methods: ['payfast'] },
  FAWRY_API_KEY: { required: false, description: 'Fawry API key', methods: ['fawry'] },
  PAYMOB_API_KEY: { required: false, description: 'Paymob API key', methods: ['paymob'] },
} as const;

// Utility functions
export function getPaymentMethodById(id: string): PaymentMethod | undefined {
  return ALL_PAYMENT_METHODS.find(m => m.id === id);
}

export function getPaymentMethodsByCountry(countryCode: string): PaymentMethod[] {
  return ALL_PAYMENT_METHODS.filter(m => 
    m.enabled && (m.countries.includes('*') || m.countries.includes(countryCode.toUpperCase()))
  );
}

export function getPaymentMethodsByCurrency(currencyCode: string): PaymentMethod[] {
  return ALL_PAYMENT_METHODS.filter(m => 
    m.enabled && m.currencies.includes(currencyCode.toUpperCase())
  );
}

export function getPaymentMethodsByCategory(category: PaymentMethodCategory): PaymentMethod[] {
  return ALL_PAYMENT_METHODS.filter(m => m.enabled && m.category === category);
}

export function getEnabledPaymentMethods(): PaymentMethod[] {
  return ALL_PAYMENT_METHODS.filter(m => m.enabled);
}

export function getRequiredEnvVars(): string[] {
  return Object.entries(PAYMENT_ENV_VARS)
    .filter(([, config]) => config.required)
    .map(([key]) => key);
}

export function getMissingEnvVars(): string[] {
  const required = getRequiredEnvVars();
  return required.filter(key => !process.env[key]);
}

export function isPaymentMethodConfigured(methodId: string): boolean {
  const method = getPaymentMethodById(methodId);
  if (!method) return false;
  
  const envConfig = PAYMENT_ENV_VARS[method.envVar as keyof typeof PAYMENT_ENV_VARS];
  if (!envConfig) return false;
  
  if (envConfig.required) {
    return !!process.env[method.envVar];
  }
  
  return true; // Optional methods are considered "configured" if enabled
}

export function getConfiguredPaymentMethods(): PaymentMethod[] {
  return getEnabledPaymentMethods().filter(m => isPaymentMethodConfigured(m.id));
}

// Country code to name mapping for UI
export const COUNTRY_NAMES: Record<string, string> = {
  KE: 'Kenya',
  NG: 'Nigeria',
  GH: 'Ghana',
  ZA: 'South Africa',
  UG: 'Uganda',
  TZ: 'Tanzania',
  RW: 'Rwanda',
  ZM: 'Zambia',
  MW: 'Malawi',
  CM: 'Cameroon',
  CI: 'Ivory Coast',
  SN: 'Senegal',
  BF: 'Burkina Faso',
  ML: 'Mali',
  EG: 'Egypt',
  PK: 'Pakistan',
  ET: 'Ethiopia',
  US: 'United States',
  GB: 'United Kingdom',
  AU: 'Australia',
  NZ: 'New Zealand',
  CA: 'Canada',
  DE: 'Germany',
  FR: 'France',
  IT: 'Italy',
  ES: 'Spain',
  NL: 'Netherlands',
  BE: 'Belgium',
  AT: 'Austria',
  SE: 'Sweden',
  NO: 'Norway',
  DK: 'Denmark',
  FI: 'Finland',
  PL: 'Poland',
  PT: 'Portugal',
  IE: 'Ireland',
  CZ: 'Czech Republic',
  HU: 'Hungary',
  RO: 'Romania',
  SK: 'Slovakia',
  SI: 'Slovenia',
  HR: 'Croatia',
  BG: 'Bulgaria',
  EE: 'Estonia',
  LV: 'Latvia',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MT: 'Malta',
  CY: 'Cyprus',
  GR: 'Greece',
};

// Currency formatting
export function formatCurrencyForDisplay(amount: number, currency: string): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: currency === 'JPY' || currency === 'KES' || currency === 'NGN' ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
}