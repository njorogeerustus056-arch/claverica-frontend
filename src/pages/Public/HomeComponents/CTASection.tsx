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

const CTASection = () => {
    return (
        <section className={styles.supportBar}>
            <div className={styles.supportContainer}>
                <div className={styles.supportContent}>
                    <p className={styles.supportText}>
                        Questions? We're here to help 24/7
                    </p>
                    <div className={styles.supportLinks}>
                        <button className={styles.supportLink}>
                            <MessageCircle className={styles.supportIcon} />
                            Live Chat
                        </button>
                        <button className={styles.supportLink}>
                            <Phone className={styles.supportIcon} />
                            +1 (888) 123-4567
                        </button>
                        <button className={styles.supportLink}>
                            <Mail className={styles.supportIcon} />
                            support@claverica.com
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTASection
