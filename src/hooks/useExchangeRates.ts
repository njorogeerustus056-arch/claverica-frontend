import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth'; // Adjust path as needed

export function useExchangeRates(baseCurrency: string = 'USD') {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { tokens } = useAuthStore();

  const fetchRates = async () => {
    setLoading(true);
    try {
      // OPTION 1: If you created the currency endpoint in Django
      // const res = await fetch(`/api/transactions/currency/rates/?base=${baseCurrency}`, {
      //   headers: {
      //     'Authorization': `Bearer ${tokens?.access}`,
      //     'Content-Type': 'application/json'
      //   }
      // });

      // OPTION 2: Use external API as fallback (current implementation)
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      
      const data = await res.json();
      
      // Handle both response formats
      if (data.rates) {
        setRates(data.rates);
      } else if (data.conversion_rates) {
        // Some APIs use different key names
        setRates(data.conversion_rates);
      } else if (data.data) {
        // Your custom backend format
        setRates(data.data.rates || data.data);
      }
      
      setLastUpdated(new Date());
      
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      
      // Fallback rates in case API fails
      const fallbackRates: Record<string, number> = {
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        NGN: 460,
        KES: 120,
        GHS: 12.5,
        ZAR: 18.5,
        INR: 83,
        JPY: 110,
        CAD: 1.25,
        AUD: 1.35,
        CHF: 0.88,
        CNY: 6.45
      };
      
      // Convert fallback rates if base is not USD
      if (baseCurrency !== 'USD' && fallbackRates[baseCurrency]) {
        const baseRate = fallbackRates[baseCurrency];
        const convertedRates: Record<string, number> = {};
        Object.keys(fallbackRates).forEach(currency => {
          convertedRates[currency] = fallbackRates[currency] / baseRate;
        });
        setRates(convertedRates);
      } else {
        setRates(fallbackRates);
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert between currencies
  const convert = (amount: number, from: string, to: string): number => {
    if (!rates[from] || !rates[to]) return amount;
    
    // Convert to USD first if using external API
    if (baseCurrency === 'USD') {
      const amountInUSD = amount / rates[from];
      return amountInUSD * rates[to];
    }
    
    // Direct conversion if rates are based on same base
    return amount * (rates[to] / rates[from]);
  };

  // Get specific rate
  const getRate = (targetCurrency: string): number => {
    return rates[targetCurrency] || 1;
  };

  // Get list of available currencies
  const getAvailableCurrencies = (): string[] => {
    return Object.keys(rates).sort();
  };

  useEffect(() => {
    fetchRates();
    
    // Refresh every 5 minutes (or adjust as needed)
    const interval = setInterval(fetchRates, 300000);
    return () => clearInterval(interval);
  }, [baseCurrency, tokens?.access]); // Re-fetch if base currency or token changes

  return { 
    rates, 
    loading, 
    lastUpdated, 
    refetch: fetchRates,
    convert,
    getRate,
    getAvailableCurrencies
  };
}

// Optional: Create a simpler hook for dashboard use
export function useDashboardExchangeRates() {
  const { rates, loading } = useExchangeRates('USD');
  
  const quickConvert = (amount: number, toCurrency: string): number => {
    if (!rates[toCurrency]) return amount;
    return amount * rates[toCurrency];
  };

  return {
    rates,
    loading,
    quickConvert
  };
}
