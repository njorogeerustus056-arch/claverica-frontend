
// src/data/globalBanks.ts

export const globalBanks = void 0;
export const globalBanks = [
    // ============================================
    // AFRICA
    // ============================================
    // Kenya
    {
        id: 'ke-kcb',
        name: 'Kenya Commercial Bank',
        shortName: 'KCB Bank',
        country: 'Kenya',
        countryCode: 'KE',
        region: 'Africa',
        logo: '🇰🇪',
        type: 'bank',
        swiftCode: 'KCBLKENX',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'ke-equity',
        name: 'Equity Bank Kenya',
        shortName: 'Equity Bank',
        country: 'Kenya',
        countryCode: 'KE',
        region: 'Africa',
        logo: '🇰🇪',
        type: 'bank',
        swiftCode: 'EQBLKENA',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'ke-barclays',
        name: 'Absa Bank Kenya (formerly Barclays)',
        shortName: 'Absa Bank Kenya',
        country: 'Kenya',
        countryCode: 'KE',
        region: 'Africa',
        logo: '🇰🇪',
        type: 'bank',
        swiftCode: 'BARCKENX',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'ke-standard-chartered',
        name: 'Standard Chartered Bank Kenya',
        shortName: 'Standard Chartered KE',
        country: 'Kenya',
        countryCode: 'KE',
        region: 'Africa',
        logo: '🇰🇪',
        type: 'bank',
        swiftCode: 'SCBLKENX',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'ke-coop',
        name: 'Co-operative Bank of Kenya',
        shortName: 'Co-op Bank Kenya',
        country: 'Kenya',
        countryCode: 'KE',
        region: 'Africa',
        logo: '🇰🇪',
        type: 'bank',
        swiftCode: 'KCOOKENA',
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'ke-mpesa',
        name: 'M-Pesa (Safaricom)',
        shortName: 'M-Pesa',
        country: 'Kenya',
        countryCode: 'KE',
        region: 'Africa',
        logo: '📱',
        type: 'fintech',
        popular: true,
        supports: { swift: false, sepa: false, local: true, instant: true }
    },
    // Nigeria
    {
        id: 'ng-gtbank',
        name: 'Guaranty Trust Bank Nigeria',
        shortName: 'GTBank',
        country: 'Nigeria',
        countryCode: 'NG',
        region: 'Africa',
        logo: '🇳🇬',
        type: 'bank',
        swiftCode: 'GTBINGLA',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'ng-access',
        name: 'Access Bank Nigeria',
        shortName: 'Access Bank',
        country: 'Nigeria',
        countryCode: 'NG',
        region: 'Africa',
        logo: '🇳🇬',
        type: 'bank',
        swiftCode: 'ABNGNGLA',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'ng-zenith',
        name: 'Zenith Bank Nigeria',
        shortName: 'Zenith Bank',
        country: 'Nigeria',
        countryCode: 'NG',
        region: 'Africa',
        logo: '🇳🇬',
        type: 'bank',
        swiftCode: 'ZEIBNGLA',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'ng-first',
        name: 'First Bank of Nigeria',
        shortName: 'First Bank',
        country: 'Nigeria',
        countryCode: 'NG',
        region: 'Africa',
        logo: '🇳🇬',
        type: 'bank',
        swiftCode: 'FBNINGLA',
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    // South Africa
    {
        id: 'za-standard',
        name: 'Standard Bank South Africa',
        shortName: 'Standard Bank SA',
        country: 'South Africa',
        countryCode: 'ZA',
        region: 'Africa',
        logo: '🇿🇦',
        type: 'bank',
        swiftCode: 'SBZAZAJJ',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'za-fnb',
        name: 'First National Bank South Africa',
        shortName: 'FNB',
        country: 'South Africa',
        countryCode: 'ZA',
        region: 'Africa',
        logo: '🇿🇦',
        type: 'bank',
        swiftCode: 'FIRNZAJJ',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'za-absa',
        name: 'Absa Bank South Africa',
        shortName: 'Absa SA',
        country: 'South Africa',
        countryCode: 'ZA',
        region: 'Africa',
        logo: '🇿🇦',
        type: 'bank',
        swiftCode: 'ABSAZAJJ',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'za-capitec',
        name: 'Capitec Bank',
        shortName: 'Capitec',
        country: 'South Africa',
        countryCode: 'ZA',
        region: 'Africa',
        logo: '🇿🇦',
        type: 'bank',
        swiftCode: 'CABLZAJJ',
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    // Egypt
    {
        id: 'eg-nbe',
        name: 'National Bank of Egypt',
        shortName: 'NBE',
        country: 'Egypt',
        countryCode: 'EG',
        region: 'Africa',
        logo: '🇪🇬',
        type: 'bank',
        swiftCode: 'NBEGEGCX',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: false }
    },
    {
        id: 'eg-cib',
        name: 'Commercial International Bank Egypt',
        shortName: 'CIB Egypt',
        country: 'Egypt',
        countryCode: 'EG',
        region: 'Africa',
        logo: '🇪🇬',
        type: 'bank',
        swiftCode: 'CIBEEGCX',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: false }
    },
    // ============================================
    // EUROPE
    // ============================================
    // United Kingdom
    {
        id: 'gb-barclays',
        name: 'Barclays Bank UK',
        shortName: 'Barclays',
        country: 'United Kingdom',
        countryCode: 'GB',
        region: 'Europe',
        logo: '🇬🇧',
        type: 'bank',
        swiftCode: 'BARCGB22',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'gb-hsbc',
        name: 'HSBC UK Bank',
        shortName: 'HSBC UK',
        country: 'United Kingdom',
        countryCode: 'GB',
        region: 'Europe',
        logo: '🇬🇧',
        type: 'bank',
        swiftCode: 'HBUKGB4B',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'gb-lloyds',
        name: 'Lloyds Bank',
        shortName: 'Lloyds',
        country: 'United Kingdom',
        countryCode: 'GB',
        region: 'Europe',
        logo: '🇬🇧',
        type: 'bank',
        swiftCode: 'LOYDGB2L',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'gb-natwest',
        name: 'NatWest Bank',
        shortName: 'NatWest',
        country: 'United Kingdom',
        countryCode: 'GB',
        region: 'Europe',
        logo: '🇬🇧',
        type: 'bank',
        swiftCode: 'NWBKGB2L',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'gb-santander',
        name: 'Santander UK',
        shortName: 'Santander UK',
        country: 'United Kingdom',
        countryCode: 'GB',
        region: 'Europe',
        logo: '🇬🇧',
        type: 'bank',
        swiftCode: 'ABBYGB2L',
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'gb-halifax',
        name: 'Halifax Bank',
        shortName: 'Halifax',
        country: 'United Kingdom',
        countryCode: 'GB',
        region: 'Europe',
        logo: '🇬🇧',
        type: 'bank',
        swiftCode: 'HLFXGB21',
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'gb-nationwide',
        name: 'Nationwide Building Society',
        shortName: 'Nationwide',
        country: 'United Kingdom',
        countryCode: 'GB',
        region: 'Europe',
        logo: '🇬🇧',
        type: 'bank',
        swiftCode: 'NAIAGB21',
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'gb-revolut',
        name: 'Revolut',
        shortName: 'Revolut',
        country: 'United Kingdom',
        countryCode: 'GB',
        region: 'Europe',
        logo: '💳',
        type: 'fintech',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'gb-monzo',
        name: 'Monzo Bank',
        shortName: 'Monzo',
        country: 'United Kingdom',
        countryCode: 'GB',
        region: 'Europe',
        logo: '💳',
        type: 'fintech',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'gb-starling',
        name: 'Starling Bank',
        shortName: 'Starling',
        country: 'United Kingdom',
        countryCode: 'GB',
        region: 'Europe',
        logo: '💳',
        type: 'fintech',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    // Germany
    {
        id: 'de-deutsche',
        name: 'Deutsche Bank',
        shortName: 'Deutsche Bank',
        country: 'Germany',
        countryCode: 'DE',
        region: 'Europe',
        logo: '🇩🇪',
        type: 'bank',
        swiftCode: 'DEUTDEFF',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'de-commerzbank',
        name: 'Commerzbank',
        shortName: 'Commerzbank',
        country: 'Germany',
        countryCode: 'DE',
        region: 'Europe',
        logo: '🇩🇪',
        type: 'bank',
        swiftCode: 'COBADEFF',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'de-dkb',
        name: 'DKB Bank',
        shortName: 'DKB',
        country: 'Germany',
        countryCode: 'DE',
        region: 'Europe',
        logo: '🇩🇪',
        type: 'bank',
        swiftCode: 'BYLADEM1001',
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'de-n26',
        name: 'N26 Bank',
        shortName: 'N26',
        country: 'Germany',
        countryCode: 'DE',
        region: 'Europe',
        logo: '💳',
        type: 'fintech',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    // France
    {
        id: 'fr-bnp',
        name: 'BNP Paribas',
        shortName: 'BNP Paribas',
        country: 'France',
        countryCode: 'FR',
        region: 'Europe',
        logo: '🇫🇷',
        type: 'bank',
        swiftCode: 'BNPAFRPP',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'fr-societe',
        name: 'Société Générale',
        shortName: 'Société Générale',
        country: 'France',
        countryCode: 'FR',
        region: 'Europe',
        logo: '🇫🇷',
        type: 'bank',
        swiftCode: 'SOGEFRPP',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'fr-credit-agricole',
        name: 'Crédit Agricole',
        shortName: 'Crédit Agricole',
        country: 'France',
        countryCode: 'FR',
        region: 'Europe',
        logo: '🇫🇷',
        type: 'bank',
        swiftCode: 'AGRIFRPP',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    // Switzerland
    {
        id: 'ch-ubs',
        name: 'UBS Switzerland',
        shortName: 'UBS',
        country: 'Switzerland',
        countryCode: 'CH',
        region: 'Europe',
        logo: '🇨🇭',
        type: 'bank',
        swiftCode: 'UBSWCHZH',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'ch-credit-suisse',
        name: 'Credit Suisse',
        shortName: 'Credit Suisse',
        country: 'Switzerland',
        countryCode: 'CH',
        region: 'Europe',
        logo: '🇨🇭',
        type: 'bank',
        swiftCode: 'CRESCHZZ',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    // Spain
    {
        id: 'es-santander',
        name: 'Banco Santander Spain',
        shortName: 'Santander ES',
        country: 'Spain',
        countryCode: 'ES',
        region: 'Europe',
        logo: '🇪🇸',
        type: 'bank',
        swiftCode: 'BSCHESMM',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'es-bbva',
        name: 'BBVA Spain',
        shortName: 'BBVA',
        country: 'Spain',
        countryCode: 'ES',
        region: 'Europe',
        logo: '🇪🇸',
        type: 'bank',
        swiftCode: 'BBVAESMM',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    // Netherlands
    {
        id: 'nl-ing',
        name: 'ING Bank Netherlands',
        shortName: 'ING',
        country: 'Netherlands',
        countryCode: 'NL',
        region: 'Europe',
        logo: '🇳🇱',
        type: 'bank',
        swiftCode: 'INGBNL2A',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'nl-rabobank',
        name: 'Rabobank',
        shortName: 'Rabobank',
        country: 'Netherlands',
        countryCode: 'NL',
        region: 'Europe',
        logo: '🇳🇱',
        type: 'bank',
        swiftCode: 'RABONL2U',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    // Italy
    {
        id: 'it-intesa',
        name: 'Intesa Sanpaolo',
        shortName: 'Intesa Sanpaolo',
        country: 'Italy',
        countryCode: 'IT',
        region: 'Europe',
        logo: '🇮🇹',
        type: 'bank',
        swiftCode: 'BCITITMM',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'it-unicredit',
        name: 'UniCredit Bank',
        shortName: 'UniCredit',
        country: 'Italy',
        countryCode: 'IT',
        region: 'Europe',
        logo: '🇮🇹',
        type: 'bank',
        swiftCode: 'UNCRITMM',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    // ============================================
    // NORTH AMERICA
    // ============================================
    // United States
    {
        id: 'us-jpmorgan',
        name: 'JPMorgan Chase Bank',
        shortName: 'Chase',
        country: 'United States',
        countryCode: 'US',
        region: 'North America',
        logo: '🇺🇸',
        type: 'bank',
        swiftCode: 'CHASUS33',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'us-bofa',
        name: 'Bank of America',
        shortName: 'Bank of America',
        country: 'United States',
        countryCode: 'US',
        region: 'North America',
        logo: '🇺🇸',
        type: 'bank',
        swiftCode: 'BOFAUS3N',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'us-wells',
        name: 'Wells Fargo Bank',
        shortName: 'Wells Fargo',
        country: 'United States',
        countryCode: 'US',
        region: 'North America',
        logo: '🇺🇸',
        type: 'bank',
        swiftCode: 'WFBIUS6S',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'us-citi',
        name: 'Citibank',
        shortName: 'Citibank',
        country: 'United States',
        countryCode: 'US',
        region: 'North America',
        logo: '🇺🇸',
        type: 'bank',
        swiftCode: 'CITIUS33',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'us-capitalone',
        name: 'Capital One',
        shortName: 'Capital One',
        country: 'United States',
        countryCode: 'US',
        region: 'North America',
        logo: '🇺🇸',
        type: 'bank',
        swiftCode: 'NFBKUS33',
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'us-usbank',
        name: 'U.S. Bank',
        shortName: 'U.S. Bank',
        country: 'United States',
        countryCode: 'US',
        region: 'North America',
        logo: '🇺🇸',
        type: 'bank',
        swiftCode: 'USBKUS44',
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    // Canada
    {
        id: 'ca-rbc',
        name: 'Royal Bank of Canada',
        shortName: 'RBC',
        country: 'Canada',
        countryCode: 'CA',
        region: 'North America',
        logo: '🇨🇦',
        type: 'bank',
        swiftCode: 'ROYCCAT2',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'ca-td',
        name: 'TD Canada Trust',
        shortName: 'TD Bank',
        country: 'Canada',
        countryCode: 'CA',
        region: 'North America',
        logo: '🇨🇦',
        type: 'bank',
        swiftCode: 'TDOMCATTTOR',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'ca-scotiabank',
        name: 'Scotiabank',
        shortName: 'Scotiabank',
        country: 'Canada',
        countryCode: 'CA',
        region: 'North America',
        logo: '🇨🇦',
        type: 'bank',
        swiftCode: 'NOSCCATT',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'ca-bmo',
        name: 'Bank of Montreal',
        shortName: 'BMO',
        country: 'Canada',
        countryCode: 'CA',
        region: 'North America',
        logo: '🇨🇦',
        type: 'bank',
        swiftCode: 'BOFMCAM2',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    // ============================================
    // ASIA
    // ============================================
    // China
    {
        id: 'cn-icbc',
        name: 'Industrial and Commercial Bank of China',
        shortName: 'ICBC',
        country: 'China',
        countryCode: 'CN',
        region: 'Asia',
        logo: '🇨🇳',
        type: 'bank',
        swiftCode: 'ICBKCNBJ',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: false }
    },
    {
        id: 'cn-boc',
        name: 'Bank of China',
        shortName: 'Bank of China',
        country: 'China',
        countryCode: 'CN',
        region: 'Asia',
        logo: '🇨🇳',
        type: 'bank',
        swiftCode: 'BKCHCNBJ',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: false }
    },
    {
        id: 'cn-ccb',
        name: 'China Construction Bank',
        shortName: 'CCB',
        country: 'China',
        countryCode: 'CN',
        region: 'Asia',
        logo: '🇨🇳',
        type: 'bank',
        swiftCode: 'PCBCCNBJ',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: false }
    },
    // Japan
    {
        id: 'jp-mitsubishi',
        name: 'MUFG Bank (Mitsubishi UFJ)',
        shortName: 'MUFG',
        country: 'Japan',
        countryCode: 'JP',
        region: 'Asia',
        logo: '🇯🇵',
        type: 'bank',
        swiftCode: 'BOTKJPJT',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: false }
    },
    {
        id: 'jp-mizuho',
        name: 'Mizuho Bank',
        shortName: 'Mizuho',
        country: 'Japan',
        countryCode: 'JP',
        region: 'Asia',
        logo: '🇯🇵',
        type: 'bank',
        swiftCode: 'MHCBJPJT',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: false }
    },
    {
        id: 'jp-sumitomo',
        name: 'Sumitomo Mitsui Banking Corporation',
        shortName: 'SMBC',
        country: 'Japan',
        countryCode: 'JP',
        region: 'Asia',
        logo: '🇯🇵',
        type: 'bank',
        swiftCode: 'SMBCJPJT',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: false }
    },
    // India
    {
        id: 'in-sbi',
        name: 'State Bank of India',
        shortName: 'SBI',
        country: 'India',
        countryCode: 'IN',
        region: 'Asia',
        logo: '🇮🇳',
        type: 'bank',
        swiftCode: 'SBININBB',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'in-hdfc',
        name: 'HDFC Bank',
        shortName: 'HDFC',
        country: 'India',
        countryCode: 'IN',
        region: 'Asia',
        logo: '🇮🇳',
        type: 'bank',
        swiftCode: 'HDFCINBB',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'in-icici',
        name: 'ICICI Bank',
        shortName: 'ICICI',
        country: 'India',
        countryCode: 'IN',
        region: 'Asia',
        logo: '🇮🇳',
        type: 'bank',
        swiftCode: 'ICICINBB',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'in-axis',
        name: 'Axis Bank',
        shortName: 'Axis Bank',
        country: 'India',
        countryCode: 'IN',
        region: 'Asia',
        logo: '🇮🇳',
        type: 'bank',
        swiftCode: 'AXISINBB',
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    // Singapore (continued)
    {
        id: 'sg-ocbc',
        name: 'OCBC Bank',
        shortName: 'OCBC',
        country: 'Singapore',
        countryCode: 'SG',
        region: 'Asia',
        logo: '🇸🇬',
        type: 'bank',
        swiftCode: 'OCBCSGSG',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'sg-uob',
        name: 'United Overseas Bank',
        shortName: 'UOB',
        country: 'Singapore',
        countryCode: 'SG',
        region: 'Asia',
        logo: '🇸🇬',
        type: 'bank',
        swiftCode: 'UOVBSGSG',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    // ============================================
    // OCEANIA
    // ============================================
    // Australia
    {
        id: 'au-cba',
        name: 'Commonwealth Bank of Australia',
        shortName: 'CBA',
        country: 'Australia',
        countryCode: 'AU',
        region: 'Oceania',
        logo: '🇦🇺',
        type: 'bank',
        swiftCode: 'CTBAAU2S',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'au-nab',
        name: 'National Australia Bank',
        shortName: 'NAB',
        country: 'Australia',
        countryCode: 'AU',
        region: 'Oceania',
        logo: '🇦🇺',
        type: 'bank',
        swiftCode: 'NABAAU2S',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'au-wbc',
        name: 'Westpac Bank',
        shortName: 'Westpac',
        country: 'Australia',
        countryCode: 'AU',
        region: 'Oceania',
        logo: '🇦🇺',
        type: 'bank',
        swiftCode: 'WPACAU2S',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    // New Zealand
    {
        id: 'nz-anz',
        name: 'ANZ Bank New Zealand',
        shortName: 'ANZ NZ',
        country: 'New Zealand',
        countryCode: 'NZ',
        region: 'Oceania',
        logo: '🇳🇿',
        type: 'bank',
        swiftCode: 'ANZBNZ22',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'nz-bnz',
        name: 'Bank of New Zealand',
        shortName: 'BNZ',
        country: 'New Zealand',
        countryCode: 'NZ',
        region: 'Oceania',
        logo: '🇳🇿',
        type: 'bank',
        swiftCode: 'BKNZNZ22',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    // ============================================
    // SOUTH AMERICA
    // ============================================
    // Brazil
    {
        id: 'br-itau',
        name: 'Itaú Unibanco',
        shortName: 'Itaú',
        country: 'Brazil',
        countryCode: 'BR',
        region: 'South America',
        logo: '🇧🇷',
        type: 'bank',
        swiftCode: 'ITAUBRSP',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'br-bradesco',
        name: 'Bradesco Bank',
        shortName: 'Bradesco',
        country: 'Brazil',
        countryCode: 'BR',
        region: 'South America',
        logo: '🇧🇷',
        type: 'bank',
        swiftCode: 'BBDEBRSP',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    // Argentina
    {
        id: 'ar-bbva',
        name: 'BBVA Argentina',
        shortName: 'BBVA',
        country: 'Argentina',
        countryCode: 'AR',
        region: 'South America',
        logo: '🇦🇷',
        type: 'bank',
        swiftCode: 'BBVAARBA',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    // ============================================
    // MIDDLE EAST
    // ============================================
    // UAE
    {
        id: 'ae-fgb',
        name: 'First Abu Dhabi Bank',
        shortName: 'FAB',
        country: 'UAE',
        countryCode: 'AE',
        region: 'Middle East',
        logo: '🇦🇪',
        type: 'bank',
        swiftCode: 'FABAAEAD',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    {
        id: 'ae-emirates-nbd',
        name: 'Emirates NBD',
        shortName: 'Emirates NBD',
        country: 'UAE',
        countryCode: 'AE',
        region: 'Middle East',
        logo: '🇦🇪',
        type: 'bank',
        swiftCode: 'EBILAEAD',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    // Saudi Arabia
    {
        id: 'sa-rajhi',
        name: 'Al Rajhi Bank',
        shortName: 'Al Rajhi',
        country: 'Saudi Arabia',
        countryCode: 'SA',
        region: 'Middle East',
        logo: '🇸🇦',
        type: 'bank',
        swiftCode: 'RJHISARI',
        popular: true,
        supports: { swift: true, sepa: false, local: true, instant: true }
    },
    // ============================================
    // GLOBAL FINTECHS / CRYPTO
    // ============================================
    {
        id: 'global-revolut',
        name: 'Revolut',
        shortName: 'Revolut',
        country: 'UK',
        countryCode: 'GB',
        region: 'Global',
        logo: '💳',
        type: 'fintech',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'global-n26',
        name: 'N26 Bank',
        shortName: 'N26',
        country: 'Germany',
        countryCode: 'DE',
        region: 'Global',
        logo: '💳',
        type: 'fintech',
        popular: true,
        supports: { swift: true, sepa: true, local: true, instant: true }
    },
    {
        id: 'global-paypal',
        name: 'PayPal',
        shortName: 'PayPal',
        country: 'USA',
        countryCode: 'US',
        region: 'Global',
        logo: '💻',
        type: 'fintech',
        popular: true,
        supports: { swift: false, sepa: false, local: true, instant: true }
    },
    {
        id: 'global-binance',
        name: 'Binance',
        shortName: 'Binance',
        country: 'Global',
        countryCode: 'GL',
        region: 'Global',
        logo: '🪙',
        type: 'crypto',
        popular: true,
        supports: { swift: false, sepa: false, local: false, instant: true }
    },
    {
        id: 'global-coinbase',
        name: 'Coinbase',
        shortName: 'Coinbase',
        country: 'USA',
        countryCode: 'US',
        region: 'Global',
        logo: '🪙',
        type: 'crypto',
        popular: true,
        supports: { swift: false, sepa: false, local: false, instant: true }
    }
];



