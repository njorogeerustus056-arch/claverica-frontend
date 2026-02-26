
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

import React from 'react'
import styles from '../Home.module.css';

{/* TESTIMONIALS SECTION */ }
const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);


    // Testimonial slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);
    
    const testimonials = [
        {
            name: "Carlos M.",
            country: "Mexico",
            role: "Business Owner",
            text: "ClaveRica saved me thousands sending money home every month. Instant transfers and zero hidden fees!",
            rating: 5,
            image: "/images/testimonials/john.jpg"
        },
        {
            name: "Aisha Al-Sayed",
            country: "UAE",
            role: "Entrepreneur",
            text: "Finally a banking app that actually works in Dubai. I hold USD, AED and Bitcoin — all in one place.",
            rating: 5,
            image: "/images/testimonials/sophia.jpg"
        },
        {
            name: "Liam Chen",
            country: "Singapore",
            role: "Tech Founder",
            text: "12% savings interest + instant crypto trading? No other app even comes close.",
            rating: 5,
            image: "/images/testimonials/david.jpg"
        },
        {
            name: "Sofia Rodriguez",
            country: "Spain",
            role: "Freelancer",
            text: "I run my freelance business from Spain and get paid instantly from US/EU clients. The loans saved me during slow months.",
            rating: 5,
            image: "/images/testimonials/jessica.jpg"
        },
        {
            name: "David Kim",
            country: "South Korea",
            role: "Investor",
            text: "The crypto trading platform is seamless. I've diversified my portfolio with ease.",
            rating: 5,
            image: "/images/testimonials/davidkim.jpg"
        },
        {
            name: "Emily Wilson",
            country: "USA",
            role: "Digital Nomad",
            text: "Traveling across 12 countries with ClaveRica has been effortless. No foreign transaction fees!",
            rating: 5,
            image: "/images/testimonials/emily.jpg"
        },
        {
            name: "Michael Brown",
            country: "UK",
            role: "Startup Founder",
            text: "Managing international payments for my remote team has never been easier.",
            rating: 5,
            image: "/images/testimonials/michael.jpg"
        },
        {
            name: "Daniel Smith",
            country: "Canada",
            role: "Freelancer",
            text: "Getting paid by international clients used to be a headache. ClaveRica solved it all.",
            rating: 5,
            image: "/images/testimonials/daniel.jpg"
        },
    ];
    return (

        <section className={styles.testimonialsSection}>
            <div className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        Loved by Millions
                    </h2>
                    <p className={styles.sectionDescription}>
                        Join 5M+ users who trust ClaveRica
                    </p>
                </div>

                <div className={styles.testimonialContainer}>
                    <div className={styles.testimonialCard}>
                        <div className={styles.testimonialStars}>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={styles.star} fill="currentColor" />
                            ))}
                        </div>

                        <p className={styles.testimonialText}>
                            "{testimonials[currentSlide].text}"
                        </p>

                        <div className={styles.testimonialAuthor}>
                            <div className={styles.authorInfo}>
                                <div className={styles.authorImageContainer}>
                                    <img
                                        src={testimonials[currentSlide].image}
                                        alt={testimonials[currentSlide].name}
                                        className={styles.authorImage}
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement!.innerHTML = `
                          <div class="${styles.authorFallback}">
                            ${testimonials[currentSlide].name.substring(0, 2)}
                          </div>
                        `;
                                        }}
                                    />
                                </div>
                                <div className={styles.authorDetails}>
                                    <p className={styles.authorName}>
                                        {testimonials[currentSlide].name}
                                    </p>
                                    <p className={styles.authorInfoText}>
                                        {testimonials[currentSlide].role} • {testimonials[currentSlide].country}
                                    </p>
                                </div>
                            </div>

                            <div className={styles.testimonialDots}>
                                {testimonials.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentSlide(idx)}
                                        className={`${styles.testimonialDot} ${idx === currentSlide ? styles.testimonialDotActive : ''
                                            }`}
                                        aria-label={`View testimonial ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Testimonials
