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
interface LinkProps {
    to: string;
    children: React.ReactNode;
    className?: string;
}

const Link = ({ to, children, className }: LinkProps) => (
    <a href={to} className={className}>{children}</a>
);
const InteractWithAppPreview = () => {
    return (
        <section className={styles.appPreviewSection}>
            <div className={styles.sectionContainer}>
                <div className={styles.appPreviewGrid}>
                    <div className={styles.appMockupContainer}>
                        <div className={styles.appMockupWrapper}>
                            {/* Mock App Interface */}
                            <div className={styles.appMockup}>
                                {/* App Header */}
                                <div className={styles.appHeader}>
                                    <div>
                                        <p className={styles.appHeaderLabel}>Total Balance</p>
                                        <div className={styles.balanceContainer}>
                                            <p className={styles.balanceAmount}>$81,314.00</p>
                                            <button aria-label='eye' className={styles.eyeButton}>
                                                <EyeIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.appIcon}>
                                        💎
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className={styles.quickActionsGrid}>
                                    {[
                                        { icon: "💸", label: "Send" },
                                        { icon: "📥", label: "Request" },
                                        { icon: "🔄", label: "Convert" },
                                        { icon: "📊", label: "Invest" }
                                    ].map((action, idx) => (
                                        <div key={idx} className={styles.quickActionItem}>
                                            <div className={styles.actionIconContainer}>
                                                {action.icon}
                                            </div>
                                            <span className={styles.actionLabel}>{action.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Recent Activity */}
                                <div className={styles.recentActivity}>
                                    <div className={styles.activityItem}>
                                        <div className={styles.activityContent}>
                                            <div className={styles.activityIcon}>
                                                📈
                                            </div>
                                            <div>
                                                <div className={styles.activityTitle}>Interest Earned</div>
                                                <div className={styles.activityTime}>Daily compounding</div>
                                            </div>
                                        </div>
                                        <div className={styles.activityAmountPositive}>+$45.20</div>
                                    </div>
                                    <div className={styles.activityItem}>
                                        <div className={styles.activityContent}>
                                            <div className={styles.activityIcon}>
                                                💰
                                            </div>
                                            <div>
                                                <div className={styles.activityTitle}>Salary Deposit</div>
                                                <div className={styles.activityTime}>Today, 9:00 AM</div>
                                            </div>
                                        </div>
                                        <div className={styles.activityAmountPositive}>+$3,450.00</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Notification */}
                            <div className={styles.floatingNotification}>
                                <div className={styles.notificationContent}>
                                    <div className={styles.notificationIcon}>
                                        <TrendingUp className={styles.notificationTrendIcon} />
                                    </div>
                                    <div>
                                        <p className={styles.notificationLabel}>This Month</p>
                                        <p className={styles.notificationValue}>+24.5%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.appInfo}>
                        <div className={styles.appInfoContent}>
                            <h2 className={styles.appInfoTitle}>
                                One Platform.
                                <span className={styles.appInfoTitleGradient}>
                                    Total Financial Freedom.
                                </span>
                            </h2>
                            <p className={styles.appInfoDescription}>
                                Bank, pay, borrow, save, and trade crypto — all in one beautiful, secure app designed for the future.
                            </p>
                        </div>

                        <div className={styles.benefitsList}>
                            {[
                                "No monthly fees or hidden charges",
                                "Instant global transfers in 150+ currencies",
                                "Trade 50+ cryptocurrencies 24/7",
                                "Earn up to 12% APY on savings",
                                "Premium metal cards with lounge access",
                                "AI-powered financial insights"
                            ].map((benefit, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={styles.benefitItem}
                                >
                                    <div className={styles.benefitIcon}>
                                        <CheckCircle className={styles.benefitCheckIcon} />
                                    </div>
                                    <span className={styles.benefitText}>{benefit}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className={styles.appCta}>
                            <Link
                                to="/signup"
                                className={styles.btnSecondary}
                            >
                                Get Started
                                <ArrowRight className={styles.ctaArrow} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InteractWithAppPreview

// Helper component for eye icon
const EyeIcon_ = () => (
    <svg className={styles.eyeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);