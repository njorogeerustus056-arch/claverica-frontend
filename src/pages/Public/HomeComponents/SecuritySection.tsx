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

const SecuritySection = () => {
    return (
        <section className={styles.securitySection}>
            <div className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        Your Security is Our Priority
                    </h2>
                    <p className={styles.securityDescription}>
                        Bank-level security, regulatory compliance, and 24/7 protection
                    </p>
                </div>

                <div className={styles.securityGrid}>
                    {[
                        {
                            icon: <Shield className={styles.securityIconSize} />,
                            title: "256-bit Encryption",
                            description: "Military-grade encryption for all data"
                        },
                        {
                            icon: <Lock className={styles.securityIconSize} />,
                            title: "FDIC Insured",
                            description: "$250,000 protection per account"
                        },
                        {
                            icon: <Zap className={styles.securityIconSize} />,
                            title: "Real-time Monitoring",
                            description: "AI-powered fraud detection"
                        },
                        {
                            icon: <Smartphone className={styles.securityIconSize} />,
                            title: "Biometric Auth",
                            description: "Face ID & fingerprint login"
                        }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={styles.securityCard}
                        >
                            <div className={styles.securityIconContainer}>
                                {feature.icon}
                            </div>
                            <h3 className={styles.securityCardTitle}>{feature.title}</h3>
                            <p className={styles.securityCardDescription}>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Compliance Badges */}
                <div className={styles.complianceBadges}>
                    {['FDIC', 'PCI DSS', 'SOC 2', 'ISO 27001', 'GDPR'].map((badge, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className={styles.complianceBadge}
                        >
                            {badge} Compliant
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SecuritySection
