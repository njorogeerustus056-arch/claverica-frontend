import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, } from "lucide-react";

import styles from '../Home.module.css';

{/* MODERN LIVE ACTIVITY FEED - UPDATED WITH POSITIVE TRANSACTIONS */ }
const LiveActivitiesSection = () => {
    const [activeLiveFeed, setActiveLiveFeed] = useState(0);

    const [feedVisible, setFeedVisible] = useState(true);
    const [liveFeedType, setLiveFeedType] = useState("all");



    // Live feed updates
    useEffect(() => {
        const feedTimer = setInterval(() => {
            setActiveLiveFeed((prev) => (prev + 1) % liveFeedEvents.length);
        }, 5000);
        return () => clearInterval(feedTimer);
    }, []);

    // UPDATED: Live feed events with POSITIVE transactions (increasing, not decreasing)
    const liveFeedEvents = [
        {
            icon: "💰",
            text: "Maria earned $45.20 in interest",
            time: "Just now",
            type: "interest",
            amount: 45.20,
            currency: "USD",
            user: "Maria S.",
            status: "completed"
        },
        {
            icon: "📈",
            text: "John's investment grew by $127",
            time: "2 min ago",
            type: "investment",
            amount: 127,
            currency: "USD",
            account: "Growth Portfolio",
            status: "credited"
        },
        {
            icon: "₿",
            text: "Sarah's Bitcoin gained $230",
            time: "5 min ago",
            type: "crypto",
            amount: 230,
            currency: "BTC",
            asset: "Bitcoin",
            status: "executed"
        },
        {
            icon: "🏦",
            text: "Alex received $2,450 salary",
            time: "10 min ago",
            type: "deposit",
            amount: 2450,
            currency: "USD",
            merchant: "Employer Direct",
            status: "completed"
        },
        {
            icon: "🎁",
            text: "Emma got $50 cashback reward",
            time: "15 min ago",
            type: "reward",
            amount: 50,
            currency: "USD",
            biller: "Premium Rewards",
            status: "credited"
        },
        {
            icon: "💎",
            text: "Michael earned 500 bonus points",
            time: "18 min ago",
            type: "reward",
            amount: 500,
            currency: "points",
            status: "completed"
        },
    ];

    return (
        <section className={styles.liveFeedSection}>
        {/* // <section  > */}
            <div className={styles.liveFeedContainer}>
                <div className={styles.feedHeader}>
                    {/* Feed Header */}
                    <div className={styles.feedHeaderLeft}>
                        <div className={styles.liveIndicator}>
                            <div className={styles.livePing} />
                            <div className={styles.liveDot} />
                        </div>
                        <div className={styles.feedTitle}>
                            <div className={styles.feedIcon}>
                                <svg className={styles.zapIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <p className={styles.feedTitleText}>Live Activity</p>
                                <p className={styles.feedSubtitle}>Real-time updates from ClaveRica users</p>
                            </div>
                        </div>

                        {/* Activity Stats */}
                        <div className={styles.activityStats}>
                            <div className={styles.statItem}>
                                <div className={styles.statDot} />
                                <span className={styles.statText}>24k active now</span>
                            </div>
                            <div className={styles.statItem}>
                                <TrendingUpIcon className={styles.statIcon} />
                                <span className={styles.statText}>+12% today</span>
                            </div>
                        </div>
                    </div>

                    {/* Feed Controls */}
                    <div className={styles.feedControls}>
                        <div className={styles.filterButtons}>
                            {["all", "transactions", "investments", "rewards"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setLiveFeedType(type)}
                                    className={`${styles.filterButton} ${liveFeedType === type ? styles.filterButtonActive : ''
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setFeedVisible(!feedVisible)}
                            className={styles.toggleButton}
                        >
                            {feedVisible ? (
                                <svg className={styles.toggleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className={styles.toggleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Animated Feed Items */}
                {feedVisible && (
                    <div className={styles.feedContent}>
                        {/* Progress Bar */}
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} />
                        </div>

                        <div className={styles.feedItems}>
                            <motion.div
                                key={activeLiveFeed}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className={styles.transactionCard}
                            >
                                <div className={styles.transactionContent}>
                                    {/* Transaction Icon with Status */}
                                    <div className={styles.transactionIconContainer}>
                                        <div className={`${styles.transactionIcon} ${liveFeedEvents[activeLiveFeed].type === "interest" ? styles.interestIcon :
                                            liveFeedEvents[activeLiveFeed].type === "investment" ? styles.investmentIcon :
                                                liveFeedEvents[activeLiveFeed].type === "crypto" ? styles.cryptoIcon :
                                                    liveFeedEvents[activeLiveFeed].type === "deposit" ? styles.depositIcon :
                                                        styles.rewardIcon
                                            }`}>
                                            {liveFeedEvents[activeLiveFeed].icon}
                                        </div>

                                        {/* Status Indicator */}
                                        <div className={`${styles.statusIndicator} ${liveFeedEvents[activeLiveFeed].status === "completed" ? styles.statusCompleted :
                                            styles.statusDefault
                                            }`} />
                                    </div>

                                    {/* Transaction Details */}
                                    <div className={styles.transactionDetails}>
                                        <div className={styles.transactionHeader}>
                                            <p className={styles.transactionText}>
                                                {liveFeedEvents[activeLiveFeed].text}
                                            </p>
                                            <span className={`${styles.typeBadge} ${liveFeedEvents[activeLiveFeed].type === "interest" ? styles.interestBadge :
                                                liveFeedEvents[activeLiveFeed].type === "investment" ? styles.investmentBadge :
                                                    liveFeedEvents[activeLiveFeed].type === "crypto" ? styles.cryptoBadge :
                                                        liveFeedEvents[activeLiveFeed].type === "deposit" ? styles.depositBadge :
                                                            styles.rewardBadge
                                                }`}>
                                                {liveFeedEvents[activeLiveFeed].type}
                                            </span>
                                        </div>

                                        {/* Additional Info */}
                                        <div className={styles.transactionMeta}>
                                            <div className={styles.timeInfo}>
                                                <svg className={styles.timeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {liveFeedEvents[activeLiveFeed].time}
                                            </div>

                                            {"amount" in liveFeedEvents[activeLiveFeed] && (
                                                <div className={styles.amountInfo}>
                                                    <span className={`${styles.amount} ${styles.amountPositive}`}>
                                                        +{liveFeedEvents[activeLiveFeed].currency === "points" ? "" : "$"}
                                                        {liveFeedEvents[activeLiveFeed].amount?.toLocaleString()}
                                                        {liveFeedEvents[activeLiveFeed].currency === "points" ? " pts" : ""}
                                                    </span>
                                                    {liveFeedEvents[activeLiveFeed].currency !== "points" && (
                                                        <span className={styles.currency}>
                                                            {liveFeedEvents[activeLiveFeed].currency}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button aria-label="brn" className={styles.actionButton}>
                                    <ArrowRight className={styles.actionIcon} />
                                </button>
                            </motion.div>

                            {/* Live Feed Dots */}
                            <div className={styles.feedDots}>
                                {liveFeedEvents.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveLiveFeed(idx)}
                                        className={`${styles.feedDot} ${idx === activeLiveFeed ? styles.feedDotActive : ''
                                            }`}
                                        aria-label={`View transaction ${idx + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Quick Stats */}
                            <div className={styles.quickStats}>
                                <div className={styles.statCard}>
                                    <div className={styles.statHeader}>
                                        <span className={styles.statLabel}>Transactions/sec</span>
                                        <div className={styles.pulseDot} />
                                    </div>
                                    <p className={styles.statValue}>42</p>
                                </div>

                                <div className={styles.statCard}>
                                    <div className={styles.statHeader}>
                                        <span className={styles.statLabel}>Total Today</span>
                                        <TrendingUpIcon className={styles.trendUpIcon} />
                                    </div>
                                    <p className={styles.statValue}>$2.8M</p>
                                </div>

                                <div className={styles.statCard}>
                                    <div className={styles.statHeader}>
                                        <span className={styles.statLabel}>Avg. Return</span>
                                        <TrendingUpIcon className={styles.trendUpIcon} />
                                    </div>
                                    <p className={styles.statValue}>+12.4%</p>
                                </div>

                                <div className={styles.statCard}>
                                    <div className={styles.statHeader}>
                                        <span className={styles.statLabel}>Success Rate</span>
                                        <div className={styles.successDot} />
                                    </div>
                                    <p className={styles.statValue}>99.8%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>

    )
}

export default LiveActivitiesSection
