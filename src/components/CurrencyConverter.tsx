import { useState, useEffect } from 'react';
import { RefreshCw, ChevronDown } from 'lucide-react';

interface CurrencyConverterProps {
  baseAmount: number;
  baseCurrency: string;
}

const COMMON_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
];

export default function CurrencyConverter({ baseAmount, baseCurrency }: CurrencyConverterProps) {
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchExchangeRate = async () => {
    setLoading(true);
    try {
      // Using free API (you can replace with your own)
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      const data = await res.json();
      setExchangeRate(data.rates[targetCurrency]);
      setConvertedAmount(baseAmount * data.rates[targetCurrency]);
    } catch (error) {
      console.error('Failed to fetch rates:', error);
      // Fallback rates
      const fallbackRates = {
        USD: { EUR: 0.85, GBP: 0.73, NGN: 460, KES: 120, GHS: 12.5, ZAR: 18.5, INR: 83 },
        EUR: { USD: 1.18, GBP: 0.86, NGN: 540, KES: 140, GHS: 14.7, ZAR: 21.7, INR: 97 },
      };
      const rate = fallbackRates[baseCurrency]?.[targetCurrency] || 1;
      setExchangeRate(rate);
      setConvertedAmount(baseAmount * rate);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [baseCurrency, targetCurrency, baseAmount]);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Currency Converter</h3>
        <button
          onClick={fetchExchangeRate}
          disabled={loading}
          className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
          title="Refresh rates"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Original Amount */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Your Balance</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(baseAmount, baseCurrency)}
          </p>
        </div>

        {/* Conversion */}
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Converted to</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? 'Loading...' : formatCurrency(convertedAmount, targetCurrency)}
              </p>
            </div>
            
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold">{targetCurrency}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border z-10 max-h-60 overflow-y-auto">
                  {COMMON_CURRENCIES
                    .filter(c => c.code !== baseCurrency)
                    .map(currency => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setTargetCurrency(currency.code);
                          setIsOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center justify-between"
                      >
                        <span>{currency.code} - {currency.name}</span>
                        <span className="text-gray-500">{currency.symbol}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="text-center text-sm text-gray-600">
          1 {baseCurrency} = {exchangeRate.toFixed(4)} {targetCurrency}
        </div>
      </div>
    </div>
  );
}