// Creative messaging for KYC redirection
export const KYC_CREATIVES = {
  getActionBenefits: (action: string, amount: number, asset?: string): string[] => {
    const allBenefits = {
      buy: [
        `Buy ${asset || 'crypto'} instantly at market price`,
        `Get ${amount >= 1000 ? 'priority' : 'standard'} execution`,
        `Lock-in rates for 60 seconds`,
        `No hidden fees or commissions`
      ],
      send: [
        `Send ${asset || 'funds'} to anyone worldwide`,
        `Delivery in minutes, not days`,
        `Track your transfer in real-time`,
        `Competitive exchange rates`
      ],
      withdraw: [
        `Withdraw directly to your bank account`,
        `No daily withdrawal limits`,
        `Funds arrive in 1-2 business days`,
        `Priority processing for verified users`
      ],
      trade: [
        `Access advanced trading tools`,
        `Real-time market data & charts`,
        `Lower trading fees (0.1% vs 0.25%)`,
        `Margin trading capabilities`
      ],
      deposit: [
        `Add funds instantly with multiple methods`,
        `Secure PCI-DSS compliant processing`,
        `No deposit fees for bank transfers`,
        `Higher deposit limits available`
      ],
      transfer: [
        `Transfer between your accounts instantly`,
        `Schedule recurring transfers`,
        `Set up beneficiary accounts`,
        `International transfer capabilities`
      ],
      create_wallet: [
        `Create unlimited cryptocurrency wallets`,
        `Multi-currency wallet support`,
        `Enhanced security with 2FA`,
        `Backup & recovery options`
      ],
      view_wallet: [
        `View complete transaction history`,
        `Export wallet data for taxes`,
        `Advanced analytics & insights`,
        `Multi-signature wallet support`
      ]
    };
    
    const specificBenefits = allBenefits[action as keyof typeof allBenefits] || [
      'Higher transaction limits',
      'Enhanced security features',
      'Priority customer support',
      'Access to premium features'
    ];
    
    // Always include these core benefits
    const coreBenefits = [
      'Unlimited daily transaction limits',
      'Enhanced account protection',
      'Dedicated support line'
    ];
    
    return [...specificBenefits.slice(0, 3), ...coreBenefits.slice(0, 1)];
  },

  getUnlockableFeature: (action: string): string => {
    const features = {
      buy: 'Instant Crypto Purchase',
      send: 'Global Money Transfer',
      withdraw: 'Direct Bank Withdrawal',
      trade: 'Advanced Trading Platform',
      deposit: 'Quick Funding Options',
      transfer: 'Instant Account Transfers',
      create_wallet: 'Multi-Currency Wallets',
      view_wallet: 'Wallet Analytics Suite'
    };
    return features[action as keyof typeof features] || 'Premium Feature';
  },

  getEstimatedReward: (amount: number, action: string): number => {
    const multipliers = {
      buy: 1.015, // 1.5% potential
      trade: 1.025, // 2.5% potential
      invest: 1.05, // 5% potential
      send: 1.01, // 1% fee savings
      withdraw: 1.02 // 2% fee savings
    };
    
    const multiplier = multipliers[action as keyof typeof multipliers] || 1.01;
    const potential = (amount * multiplier) - amount;
    
    // Return minimum $5 or calculated, max $1000 for display
    return Math.min(Math.max(potential, 5), 1000);
  },

  getProgressMessage: (currentAmount: number, threshold: number): string => {
    const difference = threshold - currentAmount;
    
    if (difference <= 0) {
      return '🎉 You qualify for full verification!';
    }
    
    if (difference <= 100) {
      return `Almost there! Just $${difference} more to unlock premium features`;
    }
    
    if (difference <= 500) {
      return `$${difference.toLocaleString()} away from higher limits`;
    }
    
    return `Build your portfolio to unlock premium features ($${difference.toLocaleString()} needed)`;
  },

  getTimeToVerify: (): string => {
    const hours = ['1-2 hours', '2-4 hours', '4-8 hours', 'Next business day'];
    return hours[Math.floor(Math.random() * hours.length)];
  },

  getVerificationTier: (amount: number): { name: string; color: string; benefits: string[] } => {
    if (amount >= 10000) {
      return {
        name: 'VIP',
        color: 'from-purple-600 to-pink-600',
        benefits: ['Unlimited everything', 'Personal account manager', 'Priority service']
      };
    } else if (amount >= 5000) {
      return {
        name: 'Premium',
        color: 'from-blue-600 to-cyan-600',
        benefits: ['$50,000 daily limit', 'Advanced features', 'Faster support']
      };
    } else if (amount >= 1500) {
      return {
        name: 'Verified',
        color: 'from-emerald-600 to-green-600',
        benefits: ['$10,000 daily limit', 'Full platform access', 'Standard support']
      };
    } else {
      return {
        name: 'Basic',
        color: 'from-slate-600 to-gray-600',
        benefits: ['$1,500 daily limit', 'Essential features', 'Community support']
      };
    }
  },

  getCreativeCTAText: (action: string, asset?: string): string => {
    const ctas = {
      buy: `Buy ${asset || 'Crypto'} Now`,
      send: `Send ${asset || 'Money'} Instantly`,
      withdraw: `Withdraw Funds`,
      trade: `Start Trading`,
      deposit: `Add Funds`,
      default: `Unlock Feature`
    };
    
    return ctas[action as keyof typeof ctas] || ctas.default;
  },

  getIconForAction: (action: string): string => {
    const icons = {
      buy: '💰',
      send: '🚀',
      withdraw: '🏧',
      trade: '📈',
      deposit: '💳',
      transfer: '🔄',
      default: '🔓'
    };
    
    return icons[action as keyof typeof icons] || icons.default;
  }
};
