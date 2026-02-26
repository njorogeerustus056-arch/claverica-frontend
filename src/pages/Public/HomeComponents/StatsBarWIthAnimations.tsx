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

{/* STATS BAR WITH ANIMATIONS */ } 
const StatsBarWIthAnimations = () => {
    return (
        <section className={styles.statsSection}>
            <div className={styles.statsContainer}>
                <div className={styles.statsGrid}>
                    {[
                        { value: "5M+", label: "Active Users", icon: <Users className={styles.statIconLarge} />, color: styles.statColor1 },
                        { value: "180+", label: "Countries", icon: <Globe className={styles.statIconLarge} />, color: styles.statColor2 },
                        { value: "$2.8B+", label: "Transferred", icon: <TrendingUp className={styles.statIconLarge} />, color: styles.statColor3 },
                        { value: "4.9★", label: "Rating", icon: <Star className={styles.statIconLarge} />, color: styles.statColor4 }
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={styles.statItemLarge}
                        >
                            <div className={styles.statIconWrapper}>
                                <div className={`${styles.statIconGradient} ${stat.color}`}>
                                    {stat.icon}
                                </div>
                                <p className={`${styles.statValueLarge} ${stat.color}`}>
                                    {stat.value}
                                </p>
                            </div>
                            <p className={styles.statLabelLarge}>{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StatsBarWIthAnimations
