import React, { useState, useEffect, useRef } from "react";
import { Lock, Shield, Building2, HeadphonesIcon, Activity, CheckCircle } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  All testimonials                                                   */
/* ------------------------------------------------------------------ */
const allTestimonials = [
  {
    name: "John Carter",
    role: "CEO, Tech Innovators Inc.",
    photo: "/images/testimonials/john.jpg",
    text: "ClaveRica has revolutionized how we handle international payments. The platform is intuitive, secure, and has significantly reduced our transaction costs.",
    stars: 5,
  },
  {
    name: "Sophia Chen",
    role: "Freelance Designer",
    photo: "/images/testimonials/sophia.jpg",
    text: "As a freelancer, getting paid on time from clients worldwide used to be a headache. ClaveRica's payment system is fast, reliable, and their low fees mean I keep more of what I earn.",
    stars: 5,
  },
  {
    name: "David Lee",
    role: "Startup Founder",
    photo: "/images/testimonials/david.jpg",
    text: "The loan options provided by ClaveRica gave our startup the capital it needed to scale. The application process was straightforward and flexible.",
    stars: 5,
  },
  {
    name: "Emily White",
    role: "Marketing Director",
    photo: "/images/testimonials/emily.jpg",
    text: "Managing campaign budgets across multiple currencies is finally simple. The virtual cards are a game-changer for our team.",
    stars: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "E-commerce Specialist",
    photo: "/images/testimonials/michael.jpg",
    text: "Integrating ClaveRica's crypto payment gateway was seamless. We've seen a significant increase in sales from crypto users.",
    stars: 5,
  },
  {
    name: "Daniel Kim",
    role: "IT Consultant",
    photo: "/images/testimonials/daniel.jpg",
    text: "Security is my top priority, and ClaveRica's platform is rock-solid. Advanced encryption and MFA give me complete peace of mind.",
    stars: 5,
  },
];

export default function AboutUs() {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalTestimonials = allTestimonials.length;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % totalTestimonials);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const goPrev = () => setIndex((i) => (i - 1 + totalTestimonials) % totalTestimonials);
  const goNext = () => setIndex((i) => (i + 1) % totalTestimonials);

  return (
    <div className="bg-gray-950 text-white min-h-screen">

      {/* ====================== PAGE TITLE ====================== */}
      <section className="relative py-24 flex flex-col md:flex-row items-center justify-between bg-gradient-to-b from-gray-950 to-gray-900 px-6 gap-12">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent mb-6">
            Building the Future of Digital Finance
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            ClaveRica is a secure, intelligent digital finance platform built to help employees and businesses control how they manage, withdraw, and grow their funds.
          </p>
          <a href="#join" className="inline-block px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold rounded-lg transition shadow-lg">
            Join Us Today
          </a>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="/images/about/About1.jpg" alt="About ClaveRica" className="w-full max-w-md md:max-w-lg h-auto rounded-2xl shadow-2xl object-cover" />
        </div>
      </section>

      {/* ====================== ASSURED FINANCIAL PROTECTION ====================== */}
      <section className="py-24 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6">
            Assured Financial<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Protection</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-16">
            In 2024, ClaveRica users moved over $2.8 billion securely around the world.<br />
            Our security systems are built to keep your funds safe and available at all times.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 hover:border-cyan-500/50 transition-all hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-6 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <HeadphonesIcon className="w-9 h-9 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">24/7 Customer Support</h3>
              <p className="text-gray-400">
                Our dedicated support teams are available by chat, email, or phone — anytime, anywhere in the world.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 hover:border-cyan-500/50 transition-all hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-6 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <Activity className="w-9 h-9 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Anti-Fraud Detection</h3>
              <p className="text-gray-400">
                We run over 12 million daily checks to spot and prevent fraud. That’s over 140 checks per second on every transaction.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 hover:border-cyan-500/50 transition-all hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-6 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <Building2 className="w-9 h-9 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Safeguarded Funds</h3>
              <p className="text-gray-400">
                Your money is held separately in top-tier licensed financial institutions — never used for lending or investment.
              </p>
            </div>
          </div>

          <a
            href="#security"
            className="mt-16 inline-block px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition"
          >
            How We Protect Your Money
          </a>
        </div>
      </section>

      {/* ====================== TESTIMONIALS ====================== */}
      <section className="py-20 bg-gray-950 relative">
        <div className="container mx-auto px-6 text-center max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Trusted by Innovators Worldwide
          </h2>
          <p className="mt-3 text-gray-400 text-lg">
            Hear what our clients have to say about their experience with the ClaveRica platform.
          </p>

          <div className="mt-12 relative overflow-hidden">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {allTestimonials.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-800 rounded-3xl p-8 max-w-md mx-auto shadow-2xl hover:shadow-cyan-500/50 transition-transform transform hover:-translate-y-2">
                    <img src={t.photo} alt={t.name} className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-cyan-500" />
                    <h3 className="mt-4 text-xl md:text-2xl font-semibold">{t.name}</h3>
                    <p className="text-sm md:text-base text-gray-400">{t.role}</p>
                    <div className="flex justify-center mt-2 text-yellow-400 text-2xl">
                      {Array.from({ length: t.stars }, (_, s) => (
                        <span key={s}>★</span>
                      ))}
                    </div>
                    <p className="mt-4 text-gray-300 text-base md:text-lg leading-relaxed">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={goPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-cyan-600 rounded-full flex items-center justify-center transition backdrop-blur">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={goNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-cyan-600 rounded-full flex items-center justify-center transition backdrop-blur">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ====================== JOIN THE FINANCIAL REVOLUTION ====================== */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 md:flex md:items-center md:justify-between gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join the Financial Revolution
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Become part of a growing community that is redefining the future of finance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#signup" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold rounded-lg transition text-lg">
                Create Your Account
              </a>
              <a href="#partner" className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition text-lg">
                Partner With Us
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
            <img src="/images/about/About2.jpg" alt="Join Financial Revolution" className="w-full max-w-md md:max-w-lg h-auto rounded-2xl shadow-2xl object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}