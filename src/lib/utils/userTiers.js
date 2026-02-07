// User tier system for progressive KYC advancement
// Inspired by Monzo, Revolut, Wise, and Skrill tier structures

// Tier Definitions
export const TIERS = {
    Basic: {
        tier: 'Basic',
        level: 1,
        color: 'text-gray-400',
        gradient: 'from-gray-500 to-gray-600',
        icon: '??',
        benefits: [
            'Basic escrow services',
            'Standard processing times',
            'Email support',
            'Basic analytics'
        ],
        limits: {
            singleEscrow: 1500,
            monthlyVolume: 10000,
            activeEscrows: 3
        },
        features: [
            'Create escrows',
            'Basic templates (3)',
            'Transaction history',
            'Standard security'
        ]
    },
    Verified: {
        tier: 'Verified',
        level: 2,
        color: 'text-green-400',
        gradient: 'from-green-500 to-emerald-600',
        icon: '?',
        benefits: [
            'KYC verified status',
            'Higher transaction limits',
            'Premium templates',
            'Priority support',
            'Advanced analytics'
        ],
        limits: {
            singleEscrow: 50000,
            monthlyVolume: 200000,
            activeEscrows: 10
        },
        features: [
            'All Basic features',
            'Premium templates (6)',
            'Advanced analytics',
            'Risk assessment',
            'Custom reporting',
            'Priority processing'
        ]
    },
    Pro: {
        tier: 'Pro',
        level: 3,
        color: 'text-blue-400',
        gradient: 'from-blue-500 to-cyan-600',
        icon: '?',
        benefits: [
            'Pro trader status',
            'Maximum limits',
            'Predictive insights',
            'Dedicated account manager',
            'API access',
            '24/7 priority support'
        ],
        limits: {
            singleEscrow: 250000,
            monthlyVolume: 1000000,
            activeEscrows: 25
        },
        features: [
            'All Verified features',
            'Unlimited templates',
            'Predictive analytics',
            'Custom workflows',
            'API integration',
            'Bulk operations',
            'White-label options'
        ]
    },
    Elite: {
        tier: 'Elite',
        level: 4,
        color: 'text-purple-400',
        gradient: 'from-purple-500 to-pink-600',
        icon: '??',
        benefits: [
            'Elite status',
            'Unlimited transactions',
            'VIP support',
            'Custom solutions',
            'Revenue sharing',
            'Exclusive events'
        ],
        limits: {
            singleEscrow: 1000000,
            monthlyVolume: 5000000,
            activeEscrows: 100
        },
        features: [
            'All Pro features',
            'Unlimited everything',
            'Custom development',
            'Dedicated infrastructure',
            'Personal relationship manager',
            'Strategic consulting',
            'Partnership opportunities'
        ]
    }
};

// Achievement Definitions
export const ACHIEVEMENTS = [
    {
        id: 'first_escrow',
        title: 'First Steps',
        description: 'Created your first escrow',
        badge: '??',
        unlocked: false,
        category: 'count'
    },
    {
        id: 'escrow_5',
        title: 'Getting Started',
        description: 'Completed 5 escrows',
        badge: '??',
        unlocked: false,
        category: 'count'
    },
    {
        id: 'escrow_25',
        title: 'Experienced Trader',
        description: 'Completed 25 escrows',
        badge: '??',
        unlocked: false,
        category: 'count'
    },
    {
        id: 'escrow_100',
        title: 'Escrow Master',
        description: 'Completed 100 escrows',
        badge: '??',
        unlocked: false,
        category: 'count'
    },
    {
        id: 'volume_10k',
        title: 'Volume Starter',
        description: 'Processed $10,000 in escrows',
        badge: '??',
        unlocked: false,
        category: 'volume'
    },
    {
        id: 'volume_100k',
        title: 'High Volume',
        description: 'Processed $100,000 in escrows',
        badge: '??',
        unlocked: false,
        category: 'volume'
    },
    {
        id: 'volume_1m',
        title: 'Million Dollar Club',
        description: 'Processed $1,000,000 in escrows',
        badge: '??',
        unlocked: false,
        category: 'volume'
    },
    {
        id: 'speed_demon',
        title: 'Speed Demon',
        description: 'Average release time under 7 days',
        badge: '?',
        unlocked: false,
        category: 'speed'
    },
    {
        id: 'lightning_fast',
        title: 'Lightning Fast',
        description: 'Average release time under 3 days',
        badge: '??',
        unlocked: false,
        category: 'speed'
    },
    {
        id: 'dispute_free',
        title: 'Dispute Free',
        description: 'Zero disputes in 20+ transactions',
        badge: '???',
        unlocked: false,
        category: 'quality'
    },
    {
        id: 'perfect_record',
        title: 'Perfect Record',
        description: '100% success rate with 50+ escrows',
        badge: '?',
        unlocked: false,
        category: 'quality'
    },
    {
        id: 'template_explorer',
        title: 'Template Explorer',
        description: 'Used 3 different templates',
        badge: '??',
        unlocked: false,
        category: 'engagement'
    },
    {
        id: 'template_master',
        title: 'Template Master',
        description: 'Used all premium templates',
        badge: '??',
        unlocked: false,
        category: 'engagement'
    },
    {
        id: 'kyc_verified',
        title: 'Verified Member',
        description: 'Completed KYC verification',
        badge: '?',
        unlocked: false,
        category: 'engagement'
    },
    {
        id: 'early_adopter',
        title: 'Early Adopter',
        description: 'Joined in the first month',
        badge: '??',
        unlocked: false,
        category: 'engagement'
    }
];

/**
 * Calculate user's current tier based on metrics
 */
export function calculateUserTier(isVerified, metrics) {
    // Basic tier - unverified users
    if (!isVerified) {
        return 'Basic';
    }
    
    // Elite tier - exceptional users
    if (metrics.totalVolume >= 500000 &&
        metrics.completedEscrows >= 50 &&
        metrics.disputeRate === 0 &&
        metrics.avgReleaseTime <= 5) {
        return 'Elite';
    }
    
    // Pro tier - active verified users with good history
    if (metrics.totalVolume >= 50000 &&
        metrics.completedEscrows >= 10 &&
        metrics.disputeRate < 2) {
        return 'Pro';
    }
    
    // Verified tier - KYC completed but building history
    return 'Verified';
}

/**
 * Calculate achievements based on user metrics
 */
export function calculateAchievements(metrics, isVerified) {
    return ACHIEVEMENTS.map(function (achievement) {
        let unlocked = false;
        
        switch (achievement.id) {
            case 'first_escrow':
                unlocked = metrics.totalEscrows >= 1;
                break;
            case 'escrow_5':
                unlocked = metrics.completedEscrows >= 5;
                break;
            case 'escrow_25':
                unlocked = metrics.completedEscrows >= 25;
                break;
            case 'escrow_100':
                unlocked = metrics.completedEscrows >= 100;
                break;
            case 'volume_10k':
                unlocked = metrics.totalVolume >= 10000;
                break;
            case 'volume_100k':
                unlocked = metrics.totalVolume >= 100000;
                break;
            case 'volume_1m':
                unlocked = metrics.totalVolume >= 1000000;
                break;
            case 'speed_demon':
                unlocked = metrics.avgReleaseTime > 0 && metrics.avgReleaseTime <= 7;
                break;
            case 'lightning_fast':
                unlocked = metrics.avgReleaseTime > 0 && metrics.avgReleaseTime <= 3;
                break;
            case 'dispute_free':
                unlocked = metrics.completedEscrows >= 20 && metrics.disputeRate === 0;
                break;
            case 'perfect_record':
                unlocked = metrics.completedEscrows >= 50 && metrics.disputeRate === 0;
                break;
            case 'template_explorer':
                unlocked = metrics.templatesUsed >= 3;
                break;
            case 'template_master':
                unlocked = metrics.templatesUsed >= 6;
                break;
            case 'kyc_verified':
                unlocked = isVerified;
                break;
            case 'early_adopter':
                unlocked = metrics.lastActivityDays >= 30;
                break;
        }
        
        return {
            ...achievement,
            unlocked: unlocked,
            unlockedAt: unlocked ? new Date().toISOString() : undefined
        };
    });
}

/**
 * Calculate progress to next tier
 */
export function calculateTierProgress(currentTier, metrics, isVerified) {
    const current = TIERS[currentTier];
    const requirements = [];
    let progress = 0;
    let nextTier = null;
    
    if (currentTier === 'Basic') {
        nextTier = TIERS.Verified;
        requirements.push('Complete KYC verification');
        progress = isVerified ? 100 : 0;
    } else if (currentTier === 'Verified') {
        nextTier = TIERS.Pro;
        const volumeProgress = Math.min((metrics.totalVolume / 50000) * 100, 100);
        const escrowProgress = Math.min((metrics.completedEscrows / 10) * 100, 100);
        const qualityProgress = metrics.disputeRate < 2 ? 100 : 0;
        progress = Math.round((volumeProgress + escrowProgress + qualityProgress) / 3);
        
        if (metrics.totalVolume < 50000) {
            const remaining = 50000 - metrics.totalVolume;
            requirements.push(`Process $${remaining.toLocaleString()} more in escrow volume`);
        }
        if (metrics.completedEscrows < 10) {
            const remaining = 10 - metrics.completedEscrows;
            requirements.push(`Complete ${remaining} more escrow${remaining > 1 ? 's' : ''}`);
        }
        if (metrics.disputeRate >= 2) {
            requirements.push('Maintain dispute rate below 2%');
        }
    } else if (currentTier === 'Pro') {
        nextTier = TIERS.Elite;
        const volumeProgress = Math.min((metrics.totalVolume / 500000) * 100, 100);
        const escrowProgress = Math.min((metrics.completedEscrows / 50) * 100, 100);
        const qualityProgress = metrics.disputeRate === 0 ? 100 : 0;
        const speedProgress = metrics.avgReleaseTime <= 5 ? 100 : 0;
        progress = Math.round((volumeProgress + escrowProgress + qualityProgress + speedProgress) / 4);
        
        if (metrics.totalVolume < 500000) {
            const remaining = 500000 - metrics.totalVolume;
            requirements.push(`Process $${remaining.toLocaleString()} more in escrow volume`);
        }
        if (metrics.completedEscrows < 50) {
            const remaining = 50 - metrics.completedEscrows;
            requirements.push(`Complete ${remaining} more escrows`);
        }
        if (metrics.disputeRate > 0) {
            requirements.push('Achieve zero disputes');
        }
        if (metrics.avgReleaseTime > 5) {
            requirements.push('Reduce average release time to 5 days or less');
        }
    } else {
        // Elite tier - no next tier
        progress = 100;
        requirements.push('You\'ve reached the highest tier!');
    }
    
    const achievements = calculateAchievements(metrics, isVerified);
    
    return {
        currentTier: current,
        nextTier: nextTier,
        progress: progress,
        requirementsToNext: requirements,
        achievements: achievements
    };
}

/**
 * Get personalized KYC messaging based on user journey
 */
export function getKYCMessage(metrics, tier) {
    // First-time users
    if (metrics.totalEscrows === 0) {
        return {
            title: 'Get Started with Escrow',
            message: 'Start with basic escrows up to $1,500. Verify anytime to unlock higher limits.',
            urgency: 'low'
        };
    }
    
    // Users with some activity but not verified
    if (metrics.totalEscrows >= 2 && metrics.totalEscrows < 5 && tier === 'Basic') {
        return {
            title: 'You\'re Building Momentum!',
            message: `You've completed ${metrics.completedEscrows} escrows. Verify now to unlock 33x higher limits and premium features.`,
            urgency: 'medium'
        };
    }
    
    // Active users hitting limits
    if (metrics.totalVolume > 7500 && tier === 'Basic') {
        return {
            title: 'You\'re Close to Your Limit',
            message: `You've processed $${metrics.totalVolume.toLocaleString()} of your $10,000 monthly limit. Verify to increase to $200,000/month.`,
            urgency: 'high'
        };
    }
    
    // Users ready for premium features
    if (metrics.completedEscrows >= 5 && tier === 'Basic') {
        return {
            title: 'Ready for Premium?',
            message: 'With your transaction history, you qualify for advanced analytics, premium templates, and much higher limits.',
            urgency: 'high'
        };
    }
    
    // Default message
    return {
        title: 'Unlock Your Full Potential',
        message: 'Verify your identity to access premium features and higher transaction limits.',
        urgency: 'medium'
    };
}

/**
 * Calculate recommended next action for user
 */
export function getRecommendedAction(tier, metrics, isVerified) {
    if (!isVerified) {
        if (metrics.totalEscrows >= 3) {
            return {
                action: 'Complete KYC Verification',
                reason: 'You\'ve proven your commitment. Unlock 33x higher limits now.',
                icon: '??',
                priority: 'high'
            };
        }
        return {
            action: 'Create Your First Escrow',
            reason: 'Start building your transaction history',
            icon: '??',
            priority: 'medium'
        };
    }
    
    if (tier === 'Verified') {
        if (metrics.completedEscrows < 10) {
            return {
                action: 'Complete More Transactions',
                reason: `${10 - metrics.completedEscrows} more to reach Pro tier`,
                icon: '??',
                priority: 'medium'
            };
        }
        if (metrics.totalVolume < 50000) {
            return {
                action: 'Increase Transaction Volume',
                reason: '$50,000 total volume needed for Pro tier',
                icon: '??',
                priority: 'medium'
            };
        }
    }
    
    if (tier === 'Pro') {
        if (metrics.avgReleaseTime > 5) {
            return {
                action: 'Optimize Release Times',
                reason: 'Faster releases improve your Elite tier progress',
                icon: '?',
                priority: 'low'
            };
        }
    }
    
    return {
        action: 'Explore Premium Features',
        reason: 'Make the most of your tier benefits',
        icon: '?',
        priority: 'low'
    };
}
