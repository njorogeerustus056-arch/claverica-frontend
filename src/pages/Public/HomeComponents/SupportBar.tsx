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

// Mock Link component with proper typing
interface LinkProps {
    to: string;
    children: React.ReactNode;
    className?: string;
} 

const Link = ({ to, children, className }: LinkProps) => (
    <a href={to} className={className}>{children}</a>
); 
const SupportBar = () => {
    return (
        <section className={styles.ctaSection}>
            <div className={styles.ctaBackground}>
                <div className={styles.ctaPulse1} />
                <div className={styles.ctaPulse2} />
            </div>

            <div className={styles.ctaContent}>
                <h2 className={styles.ctaTitle}>
                    Ready to Transform Your Finances?
                </h2>
                <p className={styles.ctaDescription}>
                    Join millions who've already made the switch to smarter banking
                </p>

                <div className={styles.ctaButtons}>
                    <Link
                        to="/signup"
                        className={styles.ctaButtonPrimary}
                    >
                        <span className={styles.ctaButtonContent}>
                            Open Free Account
                            <ArrowRight className={styles.ctaButtonArrow} />
                        </span>
                    </Link>
                    <Link
                        to="/contact"
                        className={styles.ctaButtonSecondary}
                    >
                        <span className={styles.ctaButtonContent}>
                            <MessageCircle className={styles.ctaButtonIcon} />
                            Talk to Sales
                        </span>
                    </Link>
                </div>

                <div className={styles.ctaFeatures}>
                    <div className={styles.ctaFeature}>
                        <CheckCircle className={styles.ctaFeatureIcon} />
                        <p className={styles.ctaFeatureText}>No credit card required</p>
                    </div>
                    <div className={styles.ctaFeature}>
                        <Clock className={styles.ctaFeatureIcon} />
                        <p className={styles.ctaFeatureText}>Set up in 2 minutes</p>
                    </div>
                    <div className={styles.ctaFeature}>
                        <Shield className={styles.ctaFeatureIcon} />
                        <p className={styles.ctaFeatureText}>FDIC insured</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SupportBar
