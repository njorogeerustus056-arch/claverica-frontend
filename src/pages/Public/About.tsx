import { useState, useEffect, useMemo, useCallback } from "react";
import { 
  Shield, Users, Globe, TrendingUp, Heart, Zap, 
  CheckCircle, Award, Target, Sparkles, ArrowRight,
  Lock, Building2, Headphones, Activity, Star,
  ChevronLeft, ChevronRight, PlayCircle, BookOpen,
  ShieldCheck, Globe2, CreditCard, Smartphone
} from "lucide-react";

// Types for better maintainability
interface Testimonial {
  id: string;
  name: string;
  role: string;
  photo: string;
  text: string;
  stars: number;
  country: string;
}

interface Stat {
  id: string;
  value: string;
  label: string;
  icon: JSX.Element;
  trend?: string;
}

interface Value {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
  gradient: string;
}

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  desc: string;
  milestone: string;
}

interface ProtectionFeature {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  stat: string;
}

// Constants outside component to prevent recreation on every render
const ALL_TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "John Carter",
    role: "CEO, Tech Innovators Inc.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    text: "ClaveRica has revolutionized how we handle international payments. The platform is intuitive, secure, and has significantly reduced our transaction costs.",
    stars: 5,
    country: "USA"
  },
  {
    id: "testimonial-2",
    name: "Sophia Chen",
    role: "Freelance Designer",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    text: "As a freelancer, getting paid on time from clients worldwide used to be a headache. ClaveRica's payment system is fast, reliable, and their low fees mean I keep more of what I earn.",
    stars: 5,
    country: "Singapore"
  },
  {
    id: "testimonial-3",
    name: "David Lee",
    role: "Startup Founder",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    text: "The loan options provided by ClaveRica gave our startup the capital it needed to scale. The application process was straightforward and flexible.",
    stars: 4,
    country: "UK"
  },
  {
    id: "testimonial-4",
    name: "Emily White",
    role: "Marketing Director",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    text: "Managing campaign budgets across multiple currencies is finally simple. The virtual cards are a game-changer for our team.",
    stars: 5,
    country: "Canada"
  },
  {
    id: "testimonial-5",
    name: "Michael Rodriguez",
    role: "E-commerce Specialist",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    text: "Integrating ClaveRica's crypto payment gateway was seamless. We've seen a significant increase in sales from crypto users.",
    stars: 4,
    country: "Spain"
  },
  {
    id: "testimonial-6",
    name: "Daniel Kim",
    role: "IT Consultant",
    photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=400&h=400&fit=crop&crop=face",
    text: "Security is my top priority, and ClaveRica's platform is rock-solid. Advanced encryption and MFA give me complete peace of mind.",
    stars: 5,
    country: "South Korea"
  },
];

const STATS: Stat[] = [
  { 
    id: "stat-1", 
    value: "5M+", 
    label: "Happy Customers",
    icon: <Users className="w-8 h-8" />,
    trend: "↑ 40% this year"
  },
  { 
    id: "stat-2", 
    value: "$2.8B+", 
    label: "Processed in 2024",
    icon: <TrendingUp className="w-8 h-8" />,
    trend: "↑ $800M from 2023"
  },
  { 
    id: "stat-3", 
    value: "180+", 
    label: "Countries Served",
    icon: <Globe className="w-8 h-8" />,
    trend: "20+ added in 2024"
  },
  { 
    id: "stat-4", 
    value: "4.9★", 
    label: "User Rating",
    icon: <Star className="w-8 h-8" />,
    trend: "Based on 250K+ reviews"
  }
];

const VALUES: Value[] = [
  {
    id: "value-1",
    icon: <Heart className="w-10 h-10" aria-hidden="true" />,
    title: "Customer First",
    description: "Every decision we make puts our customers at the heart of what we do.",
    color: "from-red-500 to-pink-500",
    gradient: "bg-gradient-to-br from-red-500 via-pink-500 to-rose-500"
  },
  {
    id: "value-2",
    icon: <Shield className="w-10 h-10" aria-hidden="true" />,
    title: "Security & Trust",
    description: "Bank-level security and transparency in everything we do.",
    color: "from-blue-500 to-cyan-500",
    gradient: "bg-gradient-to-br from-blue-500 via-cyan-500 to-sky-500"
  },
  {
    id: "value-3",
    icon: <Zap className="w-10 h-10" aria-hidden="true" />,
    title: "Innovation",
    description: "Continuously improving and building the future of finance.",
    color: "from-yellow-500 to-orange-500",
    gradient: "bg-gradient-to-br from-yellow-500 via-orange-500 to-amber-500"
  },
  {
    id: "value-4",
    icon: <Globe className="w-10 h-10" aria-hidden="true" />,
    title: "Global Reach",
    description: "Making money work for everyone, everywhere in the world.",
    color: "from-green-500 to-emerald-500",
    gradient: "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500"
  }
];

const TIMELINE: TimelineItem[] = [
  { 
    id: "timeline-1", 
    year: "2020", 
    title: "Founded", 
    desc: "ClaveRica was born with a mission to democratize finance",
    milestone: "🏁 Journey Begins"
  },
  { 
    id: "timeline-2", 
    year: "2021", 
    title: "1M Users", 
    desc: "Reached our first million users milestone",
    milestone: "🚀 Rapid Growth"
  },
  { 
    id: "timeline-3", 
    year: "2022", 
    title: "Global Expansion", 
    desc: "Launched in 100+ countries worldwide",
    milestone: "🌍 Going Global"
  },
  { 
    id: "timeline-4", 
    year: "2023", 
    title: "Crypto Integration", 
    desc: "Added cryptocurrency trading and wallets",
    milestone: "💰 Crypto Era"
  },
  { 
    id: "timeline-5", 
    year: "2024", 
    title: "$2.8B Processed", 
    desc: "Processed over $2.8 billion in transactions",
    milestone: "📈 Major Milestone"
  },
  { 
    id: "timeline-6", 
    year: "2025", 
    title: "5M+ Users", 
    desc: "Growing community of 5 million+ users",
    milestone: "🌟 Community Love"
  }
];

const PROTECTION_FEATURES: ProtectionFeature[] = [
  {
    id: "protection-1",
    icon: <Lock className="w-10 h-10" aria-hidden="true" />,
    title: "256-bit Encryption",
    description: "Military-grade encryption protects all your data and transactions",
    stat: "100% secure"
  },
  {
    id: "protection-2",
    icon: <Activity className="w-10 h-10" aria-hidden="true" />,
    title: "24/7 Monitoring",
    description: "Real-time fraud detection running 140 checks per second",
    stat: "140+ checks/sec"
  },
  {
    id: "protection-3",
    icon: <Building2 className="w-10 h-10" aria-hidden="true" />,
    title: "Segregated Accounts",
    description: "Your funds are held separately in tier-1 financial institutions",
    stat: "100% insured"
  },
  {
    id: "protection-4",
    icon: <Headphones className="w-10 h-10" aria-hidden="true" />,
    title: "Always Available",
    description: "Round-the-clock customer support whenever you need us",
    stat: "<2 min response"
  }
];

// Interactive features
const INTERACTIVE_FEATURES = [
  {
    id: "feature-1",
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile App",
    description: "Bank on the go with our 5-star rated app",
    action: "Learn More"
  },
  {
    id: "feature-2",
    icon: <CreditCard className="w-8 h-8" />,
    title: "Virtual Cards",
    description: "Create disposable cards for online safety",
    action: "Learn More"
  },
  {
    id: "feature-3",
    icon: <Globe2 className="w-8 h-8" />,
    title: "Global Transfers",
    description: "Send money worldwide with zero hidden fees",
    action: "Learn More"
  },
  {
    id: "feature-4",
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Family Accounts",
    description: "Manage finances together securely",
    action: "Learn More"
  }
];

// Fallback image URL
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center";

export default function AboutUs() {
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  const [isTestimonialAutoPlaying, setIsTestimonialAutoPlaying] = useState<boolean>(true);
  const [activeFeature, setActiveFeature] = useState<string>("feature-1");
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);

  // Memoized computations
  const stats = useMemo(() => STATS, []);
  const values = useMemo(() => VALUES, []);
  const timeline = useMemo(() => TIMELINE, []);
  const protectionFeatures = useMemo(() => PROTECTION_FEATURES, []);
  const interactiveFeatures = useMemo(() => INTERACTIVE_FEATURES, []);

  // Handle testimonial navigation with debouncing
  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % ALL_TESTIMONIALS.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + ALL_TESTIMONIALS.length) % ALL_TESTIMONIALS.length);
  }, []);

  const goToTestimonial = useCallback((index: number) => {
    setCurrentTestimonial(index);
    setIsTestimonialAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsTestimonialAutoPlaying(true), 10000);
  }, []);

  // Auto-rotation effect with visibility awareness
  useEffect(() => {
    if (!isTestimonialAutoPlaying) return;

    const timer = setInterval(() => {
      // Check if tab is visible to avoid unnecessary updates
      if (!document.hidden) {
        nextTestimonial();
      }
    }, 6000); // 6 seconds

    return () => clearInterval(timer);
  }, [isTestimonialAutoPlaying, nextTestimonial]);

  // Handle image errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = FALLBACK_IMAGE;
    target.onerror = null; // Prevent infinite loop
  };

  // Generate star ratings
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={`star-${i}`}
        className={`w-6 h-6 ${i < count ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
        aria-hidden="true"
      />
    ));
  };

  // Interactive feature click handler
  const handleFeatureClick = useCallback((featureId: string) => {
    setActiveFeature(featureId);
    // Simulate action - in real app would navigate or show modal
    console.log(`Feature clicked: ${featureId}`);
  }, []);

  // Video play handler
  const handleVideoPlay = useCallback(() => {
    setVideoPlaying(true);
    // In real app, would play actual video
    console.log("Playing company video");
  }, []);

  // Interactive CTA actions
  const handleCTAClick = useCallback((action: string) => {
    switch(action) {
      case "readBlog":
        window.open("/blog", "_blank");
        break;
      case "comparePlans":
        window.location.href = "#pricing";
        break;
      default:
        console.log(`Action: ${action}`);
    }
  }, []);

  // Don't render if no testimonials
  if (ALL_TESTIMONIALS.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Content coming soon</h1>
          <p className="mt-2 text-gray-600">Our testimonials are being updated.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Enhanced with video option */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" aria-hidden="true" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6 animate-pulse">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                Building the future of finance
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
                Money for
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-300%">
                  Humans
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                We're building a global financial platform that helps you take control of your money—wherever you are in the world.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.location.href = "/signup"}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Create a ClaveRica account"
                >
                  <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
                
                <button 
                  onClick={() => handleCTAClick("readBlog")}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-purple-400 hover:text-purple-700 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  aria-label="Read our latest financial insights"
                >
                  <BookOpen className="w-5 h-5" aria-hidden="true" />
                  Read Insights
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer" onClick={handleVideoPlay}>
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&crop=center"
                  alt="ClaveRica team collaborating in a modern office environment"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  width={800}
                  height={600}
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
                
                {!videoPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-10 h-10 text-blue-600" aria-hidden="true" />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Floating interactive stat card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl border border-gray-200 hover:shadow-3xl transition-all hover:-translate-y-1 cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">5M+</p>
                    <p className="text-sm text-gray-600">Trusted Users</p>
                    <p className="text-xs text-emerald-500 font-semibold mt-1">↑ 40% this year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div 
                key={stat.id} 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all hover:scale-105 cursor-pointer group"
                onClick={() => console.log(`Clicked stat: ${stat.label}`)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-400/20 group-hover:from-cyan-400/30 group-hover:to-blue-400/30">
                    {stat.icon}
                  </div>
                  {stat.trend && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
                      {stat.trend}
                    </span>
                  )}
                </div>
                <p className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features Grid */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Experience ClaveRica
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {interactiveFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => handleFeatureClick(feature.id)}
                className={`bg-white rounded-xl p-6 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeFeature === feature.id 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                aria-label={`Learn about ${feature.title}`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  activeFeature === feature.id 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2 text-left">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm text-left mb-4">
                  {feature.description}
                </p>
                <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                  activeFeature === feature.id 
                    ? 'text-blue-600' 
                    : 'text-gray-500 hover:text-blue-600'
                }`}>
                  {feature.action}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section - Enhanced with interactive chart */}
      <section id="mission" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To build a fair, transparent financial platform that works for everyone—not just the wealthy few.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Democratize Finance</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We believe everyone deserves access to great financial services, regardless of where they live or how much money they have.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Build for People</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Every feature we build is designed with our customers in mind—simple, transparent, and helpful.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Drive Innovation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We're constantly pushing boundaries and finding new ways to make money work better for you.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-shadow">
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Activity className="w-8 h-8" />
                  Live Metrics
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/20 pb-4 hover:border-white/40 transition-colors">
                    <span className="text-lg">Transactions per second</span>
                    <span className="text-3xl font-bold animate-pulse">140+</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/20 pb-4 hover:border-white/40 transition-colors">
                    <span className="text-lg">Active Countries</span>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">180+</span>
                      <Globe className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/20 pb-4 hover:border-white/40 transition-colors">
                    <span className="text-lg">Customer Satisfaction</span>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">98%</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg">Support Response</span>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">&lt;2min</span>
                      <Headphones className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleCTAClick("comparePlans")}
                  className="mt-8 w-full py-3 bg-white/20 backdrop-blur-sm rounded-xl text-center hover:bg-white/30 transition-colors font-semibold"
                >
                  Compare Plans →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Animated */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div 
                key={value.id} 
                className="group bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-200 hover:border-transparent cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
              >
                <div className={`w-20 h-20 rounded-2xl ${value.gradient} flex items-center justify-center text-white mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section - Interactive */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              From startup to global fintech leader
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 hidden md:block" aria-hidden="true" />

            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <div key={item.id} className={`flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <button 
                      className="inline-block bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all hover:scale-105 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-left w-full group"
                      onClick={() => console.log(`Clicked milestone: ${item.year} - ${item.title}`)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {item.year}
                        </div>
                        <span className="text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">
                          {item.milestone}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </button>
                  </div>

                  <div className="hidden md:block w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-white shadow-lg relative z-10 hover:scale-125 transition-transform cursor-pointer" 
                       aria-hidden="true"
                       onClick={() => console.log(`Timeline point: ${item.year}`)} />

                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Section - Interactive */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              Your Money is Safe
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We process over $2.8 billion annually with bank-level security protecting every transaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {protectionFeatures.map((feature) => (
              <button
                key={feature.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-cyan-500 transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 group"
                onClick={() => console.log(`Security feature: ${feature.title}`)}
                aria-label={`Learn about ${feature.title}`}
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-4">{feature.description}</p>
                <div className="text-lg font-bold text-cyan-300">{feature.stat}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
              Loved by Millions
            </h2>
            <p className="text-xl text-gray-600">
              Join 5M+ users who trust ClaveRica
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 hover:shadow-3xl transition-shadow">
              <div className="flex items-center gap-1 mb-6" aria-label={`Rating: ${ALL_TESTIMONIALS[currentTestimonial].stars} out of 5 stars`}>
                {renderStars(ALL_TESTIMONIALS[currentTestimonial].stars)}
                <span className="ml-2 text-sm font-semibold text-gray-600">
                  {ALL_TESTIMONIALS[currentTestimonial].stars}.0/5.0
                </span>
              </div>
              
              <blockquote className="text-2xl md:text-3xl text-gray-900 font-medium mb-8 leading-relaxed italic">
                "{ALL_TESTIMONIALS[currentTestimonial].text}"
              </blockquote>
              
              <div className="flex items-center justify-between">
                <button 
                  className="flex items-center gap-4 group"
                  onClick={() => console.log(`View ${ALL_TESTIMONIALS[currentTestimonial].name}'s story`)}
                >
                  <img 
                    src={ALL_TESTIMONIALS[currentTestimonial].photo}
                    alt={`Portrait of ${ALL_TESTIMONIALS[currentTestimonial].name}`}
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 group-hover:border-blue-300 transition-colors"
                    width={64}
                    height={64}
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="text-left">
                    <p className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {ALL_TESTIMONIALS[currentTestimonial].name}
                    </p>
                    <p className="text-gray-600">
                      {ALL_TESTIMONIALS[currentTestimonial].role} • {ALL_TESTIMONIALS[currentTestimonial].country}
                    </p>
                  </div>
                </button>
                
                <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
                  {ALL_TESTIMONIALS.map((_, idx) => (
                    <button
                      key={`indicator-${idx}`}
                      onClick={() => goToTestimonial(idx)}
                      className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        idx === currentTestimonial 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 w-8' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      role="tab"
                      aria-selected={idx === currentTestimonial}
                      aria-label={`View testimonial ${idx + 1} of ${ALL_TESTIMONIALS.length}`}
                      tabIndex={0}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:translate-x-0 md:-translate-x-12 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" aria-hidden="true" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:translate-x-0 md:translate-x-12 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-900" aria-hidden="true" />
            </button>
          </div>

          {/* Customer stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm">
              <div className="text-2xl font-bold text-blue-600">96%</div>
              <div className="text-sm text-gray-600">Recommend Us</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm">
              <div className="text-2xl font-bold text-purple-600">4.9</div>
              <div className="text-sm text-gray-600">App Store Rating</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm">
              <div className="text-2xl font-bold text-pink-600">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm">
              <div className="text-2xl font-bold text-emerald-600">2min</div>
              <div className="text-sm text-gray-600">Avg. Support Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Simplified */}
      <section id="join" className="py-32 px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">No commitment • Cancel anytime</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Ready to Start?
          </h2>
          <p className="text-xl md:text-2xl opacity-90 mb-12">
            Join millions who trust ClaveRica with their finances.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => window.location.href = "/signup"}
              className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-2xl hover:shadow-3xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Create a free ClaveRica account"
            >
              <CheckCircle className="w-6 h-6" aria-hidden="true" />
              Create Free Account
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
            </button>
            
            <button 
              onClick={() => handleCTAClick("comparePlans")}
              className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition border-2 border-white/20 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Compare our plans"
            >
              Compare Plans
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold">✓</div>
              <div className="text-xs opacity-70">No Fees</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">✓</div>
              <div className="text-xs opacity-70">Instant Setup</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">✓</div>
              <div className="text-xs opacity-70">24/7 Support</div>
            </div>
          </div>

          <p className="text-sm opacity-70 mt-8">
            No credit card required • Free forever • Set up in 2 minutes
          </p>
        </div>
      </section>
    </div>
  );
}

// Add CSS for gradient animation
const styles = `
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .animate-gradient {
    background-size: 300% 300%;
    animation: gradient 3s ease infinite;
  }
  .bg-300% {
    background-size: 300% 100%;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
