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
    ArrowUpRight, ArrowDownLeft, Circle
} from "lucide-react";

// Import CSS module
import styles from '../Home.module.css';

{/* PERSONALIZED SAVINGS CALCULATOR */ } 
const PersonalisedSavingsCalculator = () => {
    const [savingsAmount, setSavingsAmount] = useState(5000);
    const [selectedUseCase, setSelectedUseCase] = useState("freelancer");

    // Use case savings calculations
    const useCaseSavings = {
        freelancer: { monthly: 1200, description: "Get paid instantly from international clients" },
        student: { monthly: 300, description: "Save on tuition and living expenses abroad" },
        family: { monthly: 450, description: "Send money home with minimal fees" },
        business: { monthly: 2500, description: "Pay international suppliers efficiently" },
        traveler: { monthly: 200, description: "No foreign transaction fees worldwide" }
    };


    // Savings calculation
    const yearlySavings = useCaseSavings[selectedUseCase as keyof typeof useCaseSavings]?.monthly * 12 || 0;

    return (
        <section className={styles.savingsSection}>
            <div className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        See Your Potential Savings
                    </h2>
                    <p className={styles.sectionDescription}>
                        Calculate how much you could save based on your needs
                    </p>
                </div>

                <div className={styles.calculatorGrid}>
                    <div className={styles.calculatorInput}>
                        <h3 className={styles.calculatorTitle}>What describes you best?</h3>

                        <div className={styles.useCaseGrid}>
                            {Object.entries(useCaseSavings).map(([key, data]) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedUseCase(key)}
                                    className={`${styles.useCaseButton} ${selectedUseCase === key ? styles.useCaseButtonActive : ''
                                        }`}
                                >
                                    <div className={styles.useCaseEmoji}>
                                        {key === 'freelancer' && '💼'}
                                        {key === 'student' && '🎓'}
                                        {key === 'family' && '👨‍👩‍👧‍👦'}
                                        {key === 'business' && '🏢'}
                                        {key === 'traveler' && '✈️'}
                                    </div>
                                    <div className={styles.useCaseLabel}>{key}</div>
                                </button>
                            ))}
                        </div>

                        <div className={styles.rangeContainer}>
                            <label className={styles.rangeLabel}>
                                Monthly international transfers
                            </label>
                            <input aria-label='range'
                                type="range"
                                min="0"
                                max="10000"
                                step="500"
                                value={savingsAmount}
                                onChange={(e) => setSavingsAmount(parseInt(e.target.value))}
                                className={styles.rangeSlider}
                            />
                            <div className={styles.rangeValues}>
                                <span>$0</span>
                                <span className={styles.rangeValue}>${savingsAmount}</span>
                                <span>$10,000</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.calculatorResult}>
                        <div className={styles.resultHeader}>
                            <h3 className={styles.resultTitle}>Your Annual Savings</h3>
                            <p className={styles.resultDescription}>{useCaseSavings[selectedUseCase as keyof typeof useCaseSavings]?.description}</p>
                        </div>

                        <div className={styles.resultAmount}>
                            <div className={styles.resultValue}>
                                ${yearlySavings.toLocaleString()}
                            </div>
                            <p className={styles.resultSubtitle}>Per year with ClaveRica</p>
                        </div>

                        <div className={styles.savingsBreakdown}>
                            <div className={styles.savingsRow}>
                                <span>Traditional bank fees</span>
                                <span className={styles.feeAmount}>${(savingsAmount * 0.03 * 12 + 300).toLocaleString()}</span>
                            </div>
                            <div className={styles.savingsRow}>
                                <span>ClaveRica fees</span>
                                <span className={styles.feeAmountSavings}>${(savingsAmount * 0.005 * 12).toLocaleString()}</span>
                            </div>
                            <div className={`${styles.savingsRow} ${styles.savingsHighlight}`}>
                                <span className={styles.savingsLabel}>Total savings</span>
                                <span className={styles.savingsTotal}>${yearlySavings.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PersonalisedSavingsCalculator
