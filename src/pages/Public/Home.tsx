import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Zap, DollarSign, Bitcoin, Globe, Star, ArrowRight, CreditCard, Wallet, Send, Receipt, Gift, PiggyBank } from "lucide-react";

export default function Landing() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    { name: "Carlos M.", country: "Mexico", flagSrc: "/flags/mx.png", text: "ClaveRica saved me thousands sending money home every month. Instant transfers and zero hidden fees!" },
    { name: "Aisha Al-Sayed", country: "United Arab Emirates", flagSrc: "/flags/ae.png", text: "Finally a banking app that actually works in Dubai. I hold USD, AED and Bitcoin — all in one place." },
    { name: "Liam Chen", country: "Singapore", flagSrc: "/flags/sg.png", text: "12% savings interest + instant crypto trading? No other app even comes close." },
    { name: "Sofia Rodriguez", country: "Spain", flagSrc: "/flags/es.png", text: "I run my freelance business from Spain and get paid instantly from US/EU clients. The loans saved me during slow months." },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: <CreditCard className="w-16 h-16" />, title: "Instant Payments", desc: "Send and receive money worldwide in seconds — zero fees on most transfers.", color: "from-purple-500 to-pink-500" },
    { icon: <Send className="w-16 h-16" />, title: "Global Transfers", desc: "Send money to any bank account or ClaveRica user instantly, anywhere in the world.", color: "from-blue-500 to-cyan-500" },
    { icon: <Wallet className="w-16 h-16" />, title: "Crypto Wallet", desc: "Buy, sell, and hold Bitcoin, Ethereum, USDT and 50+ cryptocurrencies securely.", color: "from-emerald-500 to-teal-500" },
    { icon: <PiggyBank className="w-16 h-16" />, title: "High-Yield Savings", desc: "Earn up to 12% annual interest on your savings — compounded daily.", color: "from-amber-500 to-orange-500" },
    { icon: <Receipt className="w-16 h-16" />, title: "Bills & Services", desc: "Pay utilities, mobile top-ups, subscriptions, and more with just a few taps.", color: "from-rose-500 to-pink-500" },
    { icon: <Gift className="w-16 h-16" />, title: "Rewards & Cashback", desc: "Earn points on every transaction and unlock VIP perks as you spend.", color: "from-violet-500 to-purple-500" },
  ];

  return (
    <div className="min-h-screen text-white">

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src="/images/home/homepage001.jpg" alt="ClaveRica" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-20 text-center px-6 max-w-7xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: -60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}
            className="text-7xl md:text-9xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 tracking-tight drop-shadow-2xl">
            ClaveRica
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }} className="text-xl md:text-3xl text-gray-100 mb-12 font-light">
            Instant Payments • Loans • Crypto • High-Yield Savings • Cards • Bill Payments
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.9 }} className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register" className="px-12 py-6 bg-blue-600 rounded-xl font-bold text-2xl hover:bg-blue-500 transition shadow-2xl hover:scale-105">
              Open Free Account
            </Link>
            <Link to="/about" className="px-12 py-6 border-2 border-white/60 rounded-xl font-bold text-2xl hover:bg-white/10 backdrop-blur-sm transition">
              Explore Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PREMIUM FLOATING CARD SECTION */}
      <section className="py-24 px-6 bg-gray-50 text-gray-900">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src="/images/home/homepage001.jpg" alt="ClaveRica" className="w-full h-[600px] object-cover" />
            </div>
            <motion.div initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} viewport={{ once: true }}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-80 lg:w-96">
              <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 text-white p-8 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-md">
                <div className="flex justify-between items-start mb-6">
                  <h1 className="text-3xl font-black">ClaveRica</h1>
                  <div className="text-5xl font-light">••</div>
                </div>
                <div className="text-4xl font-bold tracking-wider">$81,314.00</div>
                <div className="mt-4 text-lg opacity-90">•••• •••• •••• 4829</div>
                <div className="mt-3 text-xl font-semibold">PREMIUM USER</div>
              </div>
            </motion.div>
          </div>
          <div className="space-y-12 order-1 lg:order-2">
            <div>
              <h2 className="text-5xl md:text-7xl font-black leading-tight">
                One Platform.<br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Total Financial Freedom.
                </span>
              </h2>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                Bank, pay, borrow, save, and trade crypto — all in one beautiful, secure app designed for the future.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <Link to="/register" className="px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xl font-bold rounded-full hover:shadow-2xl hover:scale-105 transition">
                Open Free Account
              </Link>
              <Link to="/features" className="px-12 py-5 border-2 border-blue-600 text-blue-600 text-xl font-bold rounded-full hover:bg-blue-600 hover:text-white transition">
                View All Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6 GORGEOUS CARDS */}
      <section className="py-32 px-6 bg-[#0a0f1f]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Your Complete Financial Solution
          </motion.h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-16">
            Everything you need to manage, move, and grow your money — all in one place.
          </p>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/5 backdrop-blur-xl border border-gray-800 rounded-3xl p-10 hover:border-cyan-500/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between min-h-[440px]"
              >
                <div>
                  <div className={`w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br ${feature.color} p-5 text-white shadow-xl group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{feature.desc}</p>
                </div>
                <div className="mt-10">
                  <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition flex items-center justify-center gap-2 group">
                    Learn more <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FUTURE OF FINANCE – 4 ICONS */}
      <section className="py-24 px-6 bg-[#0a0f1f]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
            The Future of Finance, Simplified
          </motion.h1>
          <div className="grid md:grid-cols-4 gap-8 mt-16">
            {[{ Icon: Shield, title: "Ironclad Security" }, { Icon: Zap, title: "Lightning Fast" }, { Icon: DollarSign, title: "Flexible Loans" }, { Icon: Bitcoin, title: "Crypto Wallet" }]
              .map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="bg-white/5 backdrop-blur-lg border border-gray-800 rounded-3xl p-8 hover:border-blue-500/50 transition-all hover:scale-105">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <item.Icon className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400">Bank-grade protection, instant transfers, fair loans, full crypto support.</p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* PROFESSIONAL "FOR PEOPLE GOING PLACES" – COMPACT & FINTECH-THEMED */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#0a0f1f] to-black">
        <div className="max-w-7xl mx-auto text-center">

          {/* Professional Rating Badges */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="flex flex-wrap justify-center gap-6 items-center">
              {/* Trustpilot Badge */}
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur rounded-full px-6 py-3">
                <div className="w-8 h-8 flex items-center justify-center text-sm font-bold text-white bg-green-600 rounded">T</div>
                <div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />))}
                  </div>
                  <p className="text-xs text-gray-400">Trustpilot</p>
                </div>
              </div>

              {/* App Store Badge */}
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur rounded-full px-6 py-3">
                <div className="w-8 h-8 flex items-center justify-center text-sm font-bold text-white bg-black rounded">A</div>
                <div>
                  <p className="font-bold text-sm">4.9</p>
                  <p className="text-xs text-gray-400">App Store</p>
                </div>
              </div>

              {/* Google Play Badge */}
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur rounded-full px-6 py-3">
                <div className="w-8 h-8 flex items-center justify-center text-sm font-bold text-white bg-gradient-to-tr from-blue-500 via-green-500 to-yellow-500 rounded">G</div>
                <div>
                  <p className="font-bold text-sm">4.8</p>
                  <p className="text-xs text-gray-400">Google Play</p>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-400 mt-4">Based on 127,483 verified reviews</p>
          </motion.div>

          {/* Headline */}
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black mb-12 leading-tight">
            FOR PEOPLE<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              GOING PLACES
            </span>
          </motion.h2>

          {/* Compact Carousel */}
          <div className="max-w-4xl mx-auto relative">
            <div className="overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <motion.div className="flex" animate={{ x: `${-currentSlide * 100}%` }} transition={{ duration: 0.7, ease: "easeInOut" }}>
                {testimonials.map((t, i) => (
                  <div key={i} className="w-full flex-shrink-0 p-8">
                    <div className="text-center">
                      <p className="text-xl md:text-2xl leading-relaxed text-gray-100 italic mb-6">
                        "{t.text}"
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-300 border-4 border-white shadow-lg overflow-hidden">
                          <img src={t.flagSrc} alt={t.country} className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex'; }} />
                          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white hidden">
                            {t.country.split(" ").map(w => w[0]).join("")}
                          </div>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-cyan-400">{t.name}</p>
                          <p className="text-gray-400">{t.country}</p>
                          <div className="flex gap-1 justify-center mt-2">
                            {[...Array(5)].map((_, s) => (<Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 inline-block bg-black/40 backdrop-blur px-5 py-2 rounded-full text-xs font-medium">
                        Verified on Trustpilot
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)}
                  className={`transition-all duration-300 ${i === currentSlide ? "bg-cyan-400 w-12 h-3 rounded-full" : "bg-gray-600 w-3 h-3 rounded-full hover:bg-gray-400"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 text-center bg-black">
        <h2 className="text-5xl md:text-7xl font-black mb-6">Join the Future of Money</h2>
        <p className="text-2xl text-gray-300 mb-10">Free forever • Instant • Zero Hidden Fees</p>
        <Link to="/register" className="inline-block px-16 py-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-3xl font-bold rounded-full hover:shadow-2xl hover:scale-110 transition">
          Create Free Account
        </Link>
      </section>
    </div>
  );
}