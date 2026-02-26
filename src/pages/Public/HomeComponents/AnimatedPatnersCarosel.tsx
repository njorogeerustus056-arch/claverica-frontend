import React from 'react'

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    Shield, Star, ArrowRight, CreditCard, Wallet, Send,
    Receipt, Gift, PiggyBank, CheckCircle, TrendingUp,
    Users, Globe, Zap, Lock, Smartphone, Calculator,
    TrendingDown, DollarSign, Clock, RefreshCw, Sparkles,
    Building, Plane, Coffee, ShoppingBag, Car, Hotel,
    Heart, MessageCircle, Phone, Mail, ShieldCheck, Award,
    Eye, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon,
    ArrowUpRight, ArrowDownLeft, Circle,
    EyeIcon
} from "lucide-react";

// Import CSS module
import styles from '../Home.module.css';

{/* ANIMATED PARTNERS CAROUSEL - FIXED WITH LOCAL LOGOS */ }

const AnimatedPatnersCarosel = () => {
    // FIXED: Partner logos using local files with correct filenames
    const getPartnerLogo = (name: string) => {
        const logoMap: Record<string, string> = {
            "Coca-Cola": "/logos/partners/cocacola.png",     // Fixed: removed hyphen to match filename
            "Wall Street": "/logos/partners/wallstreet.png",
            "Alibaba": "/logos/partners/alibaba.png",
            "MTN": "/logos/partners/mtn.png",
            "Emirates": "/logos/partners/emirates.png",
            "Vodafone": "/logos/partners/vodafone.png",
            "Samsung": "/logos/partners/samsung.png",
            "Mastercard": "/logos/partners/mastercard.png",
            "Visa": "/logos/partners/visa.png",
            "PayPal": "/logos/partners/paypal.png",
            "Safaricom": "/logos/partners/safaricom.png",
            "Standard Bank": "/logos/partners/standardbank.png"
        };
        return logoMap[name] || "";
    };

    const partners = [
        { name: "Coca-Cola", region: "Global" },
        { name: "Wall Street", region: "Americas" },
        { name: "Alibaba", region: "Asia" },
        { name: "MTN", region: "Africa" },
        { name: "Emirates", region: "Middle East" },
        { name: "Vodafone", region: "Europe" },
        { name: "Samsung", region: "Asia" },
        { name: "Mastercard", region: "Global" },
        { name: "Visa", region: "Global" },
        { name: "PayPal", region: "Global" },
        { name: "Safaricom", region: "Africa" },
        { name: "Standard Bank", region: "Africa" }
    ];

    return (
        <section className={styles.partnersCarouselSection}>
            <div className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        Trusted by Industry Leaders
                    </h2>
                    <p className={styles.sectionDescription}>
                        Partnering with global brands across 6 continents
                    </p>
                </div>

                {/* Animated Carousel Container */}
                <div className={styles.carouselContainer}>
                    <div className={styles.carouselTrack}>
                        {/* First set of partners */}
                        <div className={styles.carouselSlide}>
                            {partners.map((partner, idx) => (
                                <div key={`first-${idx}`} className={styles.partnerLogoCircle}>
                                    <img
                                        src={getPartnerLogo(partner.name)}
                                        alt={partner.name}
                                        className={styles.partnerLogoImage}
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement!.innerHTML =
                                                `<div class="${styles.fallbackLogoCircle}">${partner.name.charAt(0)}</div>`;
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Duplicate for seamless loop */}
                        <div className={styles.carouselSlide}>
                            {partners.map((partner, idx) => (
                                <div key={`second-${idx}`} className={styles.partnerLogoCircle}>
                                    <img
                                        src={getPartnerLogo(partner.name)}
                                        alt={partner.name}
                                        className={styles.partnerLogoImage}
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement!.innerHTML =
                                                `<div class="${styles.fallbackLogoCircle}">${partner.name.charAt(0)}</div>`;
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <p className={styles.partnershipNote}>
                    <CheckCircle className={styles.checkIcon} />
                    Partnership opportunities available for businesses
                </p>
            </div>
        </section>
    )
}

export default AnimatedPatnersCarosel
