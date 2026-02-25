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
import React from 'react'

//     {/* HERO SECTION WITH VIDEO BACKGROUND */ }
//   {/* <section className={styles.heroSection}> */ }
const HeroSection = () => {

    const [userCount, setUserCount] = useState(0);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);



    // Simple video initialization
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleCanPlay = () => {
            console.log('Video ready, attempting to play');
            setVideoLoaded(true);

            setTimeout(() => {
                video.play()
                    .then(() => {
                        console.log('Video playing successfully');
                        setVideoError(false);
                    })
                    .catch((err) => {
                        console.log('Autoplay prevented:', err);
                        setVideoError(false);
                    });
            }, 100);
        };

        const handleError = (e: Event) => {
            console.error('Video error:', e);
            setVideoError(true);
            setVideoLoaded(false);
        };

        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('error', handleError);

        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;
        video.loop = true;

        video.load();

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('error', handleError);
        };
    }, []);

    // Live user counter animation
    useEffect(() => {
        const timer = setTimeout(() => {
            if (userCount < 5000000) {
                setUserCount(prev => Math.min(prev + 25000, 5000000));
            }
        }, 30);
        return () => clearTimeout(timer);
    }, [userCount]);

    return (
        // <section  >
        <section className={styles.heroSection}>
            {/* VIDEO BACKGROUND */}
            <div className={styles.videoContainer}>
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className={styles.videoBackground}
                >
                    <source src="/videos/Home1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Simple fallback if video fails */}
                {videoError && !videoLoaded && (
                    <div className={styles.videoFallback} />
                )}
            </div>

            {/* Hero Content */}
            <div className={styles.heroContent}>
                {/* Trust Badge with Live Counter */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={styles.trustBadge}
                >
                    <Star className={styles.starIcon} fill="currentColor" />
                    <span>Trusted by </span>
                    <span className={styles.userCount}>
                        {userCount.toLocaleString()}+ users worldwide
                    </span>
                </motion.div>

                {/* Main Headline - FIXED: Removed gradient class to make text white */}
                <motion.h1
                    initial={{ opacity: 0, y: -60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className={styles.heroTitle}
                >
                    <span className={styles.heroTitleLine1}>Banking for the</span>
                    <span>Digital Age</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 1 }}
                    className={styles.heroSubtitle}
                >
                    Send money globally • Trade crypto • Earn 12% on savings • Get instant loans
                </motion.p>

                {/* Interactive CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.9 }}
                    className={styles.ctaButtons}
                >
                    <Link
                        to="/signup"
                        className={styles.btnPrimary}
                    >
                        Open Free Account
                        <ArrowRight className={styles.arrowIcon} />
                    </Link>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                    className={styles.trustIndicators}
                >
                    <div className={styles.trustItem}>
                        <ShieldCheck className={styles.trustIcon} />
                        <span>Bank-level security</span>
                    </div>
                    <div className={styles.trustItem}>
                        <Building className={styles.trustIcon} />
                        <span>FDIC Insured</span>
                    </div>
                    <div className={styles.trustItem}>
                        <Award className={styles.trustIcon} />
                        <span>PCI DSS compliant</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection
