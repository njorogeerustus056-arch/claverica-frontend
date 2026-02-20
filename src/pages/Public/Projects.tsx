import { useState, useEffect, useRef, useMemo } from "react";
import {
  ArrowRight, Sparkles, TrendingUp, Users, Star, Zap, Shield, Globe,
  CreditCard, LineChart, Check, BarChart3, Wallet, MessageCircle,
  Search, X, Grid, List, SlidersHorizontal, ChevronRight, Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import { projects, type Project } from "@/data/projects";

/* ── Map project slugs to their image filenames ─────────────────────────── */
const projectImages: Record<string, string> = {
  "instant-global-payments": "/images/Project/instant-global-payments.jpg",
  "multi-currency": "/images/Project/multi-currency.jpg",
  "crypto-exchange-platform": "/images/Project/crypto-exchange-platform.jpg",
  "business-banking-suite": "/images/Project/business-banking-suite.jpg",
  "fraud-detection-ai": "/images/Project/fraud-detection-ai.jpg",
  "smart-investment-portfolio": "/images/Project/smart-investment-portfolio.jpg",
  "remittance-corridors": "/images/Project/remittance-corridors.jpg",
  "high-yield-savings-vaults": "/images/Project/high-yield-savings-vaults.jpg",
  "card-payments": "/images/Project/card-payments.jpg",
  "bnpl": "/images/Project/bnpl.jpg",
  "checkout-api": "/images/Project/checkout-api.jpg",
  "subscriptions": "/images/Project/subscriptions.jpg",
  "sme-loans": "/images/Project/sme-loans.jpg",
  "expense-tracking-plus": "/images/Project/expense-tracking-plus.jpg",
  "global-cards": "/images/Project/global-cards.jpg",
  "nft-vault": "/images/Project/nft-vault.jpg",
  "peer-to-peer-lending": "/images/Project/peer-to-peer-lending.jpg",
  "student-banking": "/images/Project/student-banking.jpg",
  "charity-remittance": "/images/Project/charity-remittance.jpg",
  "kyc": "/images/Project/kyc.jpg",
};

/* ── Stable deterministic stats — NO Math.random() on render ────────────── */
function getStableStats(id: string | number) {
  const s = String(id)
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return {
    users:  100_000 + ((s * 1_234_567) % 400_000),
    rating: (3.5   + ((s * 31) % 150) / 100).toFixed(1),
    growth: 50     + ((s * 97) % 150),
    views:  5_000  + ((s * 421) % 45_000),
  };
}

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

/* ── Skeleton card ───────────────────────────────────────────────────────── */
const Skeleton = () => (
  <div className="bg-[#F5F0E6] rounded-3xl overflow-hidden border border-[rgba(197,160,40,0.2)] animate-pulse">
    <div className="h-52 bg-gradient-to-br from-[#0A2540] to-[#8626E9] opacity-30" />
    <div className="p-5 space-y-3">
      <div className="flex gap-2"><div className="h-5 w-20 bg-[rgba(197,160,40,0.2)] rounded-full" /><div className="h-5 w-14 bg-[rgba(197,160,40,0.2)] rounded-full" /></div>
      <div className="h-5 w-3/4 bg-[rgba(197,160,40,0.2)] rounded" />
      <div className="h-4 w-full bg-[rgba(197,160,40,0.2)] rounded" />
      <div className="h-4 w-2/3 bg-[rgba(197,160,40,0.2)] rounded" />
      <div className="flex justify-between pt-1">
        <div className="h-4 w-24 bg-[rgba(197,160,40,0.2)] rounded" />
        <div className="h-4 w-20 bg-[rgba(197,160,40,0.2)] rounded" />
      </div>
    </div>
  </div>
);

/* ════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════════════════ */
export default function Projects() {
  const [activeFilter, setActiveFilter]   = useState("all");
  const [viewMode, setViewMode]           = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery]     = useState("");
  const [sortBy, setSortBy]               = useState("popular");
  const [showFilters, setShowFilters]     = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [isLoading, setIsLoading]         = useState(true);
  const [email, setEmail]                 = useState("");
  const [subscribed, setSubscribed]       = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Memoised stable stats — computed once */
  const stableStats = useMemo(() => {
    const m: Record<string, ReturnType<typeof getStableStats>> = {};
    projects.forEach(p => { m[String(p.id)] = getStableStats(p.id); });
    return m;
  }, []);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  /* ── Categories ── */
  const categories = [
    { id: "all",      label: "All Projects", icon: Globe },
    { id: "payments", label: "Payments",     icon: CreditCard },
    { id: "banking",  label: "Banking",      icon: Wallet },
    { id: "crypto",   label: "Crypto",       icon: LineChart },
    { id: "lending",  label: "Lending",      icon: TrendingUp },
    { id: "business", label: "Business",     icon: BarChart3 },
    { id: "security", label: "Security",     icon: Shield },
  ];

  /* ── Filtered + sorted ── */
  const filtered = useMemo(() => {
    let r = [...projects];
    if (activeFilter !== "all") r = r.filter(p => p.category === activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      r = r.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    const stat = (p: Project) => stableStats[String(p.id)];
    if (sortBy === "popular") r.sort((a, b) => (stat(b)?.users ?? 0) - (stat(a)?.users ?? 0));
    else if (sortBy === "rating") r.sort((a, b) => parseFloat(stat(b)?.rating ?? "0") - parseFloat(stat(a)?.rating ?? "0"));
    else r.sort((a, b) => a.title.localeCompare(b.title));
    return r;
  }, [activeFilter, searchQuery, sortBy, stableStats]);

  const trending = useMemo(() => {
    return [...projects]
      .sort((a, b) => (stableStats[String(b.id)]?.users ?? 0) - (stableStats[String(a.id)]?.users ?? 0))
      .slice(0, 3);
  }, [stableStats]);

  /* ── Newsletter ── */
  const handleSubscribe = () => {
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => { setEmail(""); setSubscribed(false); }, 3000);
  };

  /* ── Trending card with image ── */
  const TrendingCard = ({ project, rank }: { project: Project; rank: number }) => {
    const s = stableStats[String(project.id)];
    const imagePath = projectImages[project.slug] || "/images/Project/placeholder.jpg";
    
    return (
      <Link
        to={`/projects/${project.slug}`}
        className="group relative bg-[#F5F0E6] rounded-[28px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-[rgba(197,160,40,0.2)] hover:border-[#C5A028]"
      >
        {/* Rank badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#C5A028] to-[#8626E9] text-white text-xs font-bold rounded-full">
          <Zap className="w-3 h-3" />#{rank} Trending
        </div>

        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={imagePath} 
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/50 to-transparent" />
          
          {/* Quick stats overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-semibold">
              <Users className="w-3 h-3" />{fmt(s?.users ?? 0)}
            </div>
            <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-semibold">
              <Star className="w-3 h-3 fill-[#C5A028] text-[#C5A028]" />{s?.rating}
            </div>
            <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-semibold">
              <TrendingUp className="w-3 h-3" />+{s?.growth}%
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 bg-[#8626E9] text-white text-xs font-bold rounded-full capitalize">
              {project.category}
            </span>
            <span className="flex items-center gap-1 px-2.5 py-0.5 bg-[rgba(30,111,111,0.12)] text-[#1E6F6F] text-xs font-bold rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E6F6F] animate-pulse" />Live
            </span>
          </div>
          <h3 className="text-xl font-black text-[#0A2540] mb-2 group-hover:text-[#8626E9] transition-colors tracking-tight">
            {project.title}
          </h3>
          <p className="text-[#475569] text-sm leading-relaxed mb-5 line-clamp-2">{project.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94A3B8] font-medium">
              {fmt(s?.views ?? 0)} views
            </span>
            <span className="flex items-center gap-1 text-sm font-bold text-[#8626E9] group-hover:gap-2 transition-all">
              View Details<ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    );
  };

  /* ── Grid card with image ── */
  const GridCard = ({ project }: { project: Project }) => {
    const s = stableStats[String(project.id)];
    const imagePath = projectImages[project.slug] || "/images/Project/placeholder.jpg";
    
    return (
      <Link
        to={`/projects/${project.slug}`}
        className="group relative bg-[#F5F0E6] rounded-2xl overflow-hidden border border-[rgba(197,160,40,0.2)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_30px_-10px_rgba(10,37,64,0.2)] hover:border-[#C5A028]"
      >
        <div className="relative h-44 overflow-hidden">
          <img 
            src={imagePath} 
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-400"
          />
          <div className="absolute inset-0 bg-[#0A2540]/30 group-hover:bg-[#0A2540]/40 transition-colors" />
          
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full font-semibold">
              <Users className="w-2.5 h-2.5" />{fmt(s?.users ?? 0)}
            </div>
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full font-semibold">
              <Star className="w-2.5 h-2.5 fill-[#C5A028] text-[#C5A028]" />{s?.rating}
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex gap-1.5 mb-2">
            <span className="px-2 py-0.5 bg-[#8626E9] text-white text-xs font-bold rounded-full capitalize">{project.category}</span>
            <span className="flex items-center gap-1 px-2 py-0.5 bg-[rgba(30,111,111,0.12)] text-[#1E6F6F] text-xs font-bold rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E6F6F] animate-pulse" />Live
            </span>
          </div>
          <h3 className="text-base font-black text-[#0A2540] mb-1 group-hover:text-[#8626E9] transition-colors tracking-tight line-clamp-1">
            {project.title}
          </h3>
          <p className="text-[#475569] text-xs leading-relaxed mb-3 line-clamp-2">{project.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94A3B8]">{fmt(s?.views ?? 0)} views</span>
            <span className="flex items-center gap-0.5 text-xs font-bold text-[#8626E9] group-hover:gap-1 transition-all">
              Details<ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    );
  };

  /* ── List card with image ── */
  const ListCard = ({ project }: { project: Project }) => {
    const s = stableStats[String(project.id)];
    const imagePath = projectImages[project.slug] || "/images/Project/placeholder.jpg";
    
    return (
      <Link
        to={`/projects/${project.slug}`}
        className="group flex bg-[#F5F0E6] rounded-2xl border border-[rgba(197,160,40,0.2)] overflow-hidden transition-all hover:shadow-[0_20px_30px_-10px_rgba(10,37,64,0.2)] hover:border-[#C5A028] hover:-translate-y-0.5 mb-3"
      >
        <div className="w-28 md:w-40 flex-shrink-0 relative overflow-hidden">
          <img 
            src={imagePath} 
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-[#0A2540]/30" />
        </div>
        <div className="flex-1 p-4 md:p-5 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex gap-1.5">
              <span className="px-2 py-0.5 bg-[#8626E9] text-white text-xs font-bold rounded-full capitalize">{project.category}</span>
            </div>
          </div>
          <h3 className="text-base font-black text-[#0A2540] group-hover:text-[#8626E9] transition-colors tracking-tight truncate mb-1">
            {project.title}
          </h3>
          <p className="text-[#475569] text-xs leading-relaxed line-clamp-1 mb-3">{project.description}</p>
          <div className="flex items-center gap-4 text-xs text-[#475569]">
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{fmt(s?.users ?? 0)}</span>
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-[#C5A028] text-[#C5A028]" />{s?.rating}</span>
            <span className="flex items-center gap-1 text-[#1E6F6F] font-semibold"><TrendingUp className="w-3.5 h-3.5" />+{s?.growth}%</span>
            <span className="ml-auto flex items-center gap-1 font-bold text-[#8626E9] group-hover:gap-1.5 transition-all">
              View<ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    );
  };

  /* ════════════════════════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-white">

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[rgba(197,160,40,0.15)] via-[#0A2540] to-[#0A2540] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-white font-bold text-xl">ClaveRica</Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/projects" className="text-white hover:text-[#C5A028] transition-colors">Projects</Link>
              <Link to="/about" className="text-white hover:text-[#C5A028] transition-colors">About</Link>
              <Link to="/contact" className="text-white hover:text-[#C5A028] transition-colors">Contact</Link>
              <Link 
                to="/signup" 
                className="bg-[#8626E9] text-white px-6 py-2 rounded-full font-bold hover:bg-[#C5A028] hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A2540] border-t-2 border-[#C5A028] px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/projects" className="text-white hover:text-[#C5A028] transition-colors py-2">Projects</Link>
              <Link to="/about" className="text-white hover:text-[#C5A028] transition-colors py-2">About</Link>
              <Link to="/contact" className="text-white hover:text-[#C5A028] transition-colors py-2">Contact</Link>
              <Link 
                to="/signup" 
                className="bg-[#8626E9] text-white px-6 py-3 rounded-full font-bold hover:bg-[#C5A028] text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Video - Using Service1.mp4 */}
        <div className="absolute inset-0">
          <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted loop playsInline>
            <source src="/videos/Service1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A2540]" />
        </div>

        {/* Floating accent orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#8626E9]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#C5A028]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center py-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(197,160,40,0.15)] backdrop-blur-md border border-[#C5A028] rounded-full text-white text-sm font-bold mb-8 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#C5A028]" />
            {projects.length} Premium Fintech Solutions
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E6F6F] animate-pulse" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-black text-white leading-tight tracking-tight mb-6">
            Financial Tech
            <span className="block bg-gradient-to-r from-[#C5A028] to-[#8626E9] bg-clip-text text-transparent">
              Reimagined
            </span>
          </h1>

          {/* Category pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 ${
                    activeFilter === cat.id
                      ? "bg-[#C5A028] text-[#0A2540] shadow-xl scale-105"
                      : "bg-white/15 backdrop-blur-sm text-white border border-white/25 hover:bg-white/25"
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{cat.id === "all" ? "All" : cat.label.slice(0, 3)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Trending strip ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#F5F0E6] to-[#F5F0E6]/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-[#C5A028] to-[#8626E9] rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#0A2540] tracking-tight">Trending Now</h2>
                <p className="text-[#475569] text-sm">Most popular this month</p>
              </div>
            </div>
            <button
              onClick={() => setShowComparison(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[rgba(197,160,40,0.2)] rounded-xl font-bold text-sm text-[#475569] hover:border-[#C5A028] hover:text-[#8626E9] hover:shadow-md transition-all w-full sm:w-auto"
            >
              <BarChart3 className="w-4 h-4" />Compare
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0,1,2].map(i => <Skeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trending.map((p, i) => <TrendingCard key={p.id} project={p} rank={i + 1} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── All Projects ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-7">
            <h2 className="text-3xl font-black text-[#0A2540] tracking-tight mb-1">All Projects</h2>
            <p className="text-[#475569] text-sm">
              {isLoading ? "Loading…" : `${filtered.length} project${filtered.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search projects…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 bg-[#F5F0E6] border-2 border-transparent rounded-2xl text-sm font-medium placeholder-[#94A3B8] outline-none focus:border-[#C5A028] focus:bg-white focus:ring-4 focus:ring-[rgba(197,160,40,0.1)] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#D32F2F] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                  showFilters 
                    ? "bg-[#8626E9] text-white shadow-md" 
                    : "bg-[#F5F0E6] text-[#475569] hover:bg-[#E5D9CC]"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />Filters
              </button>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-2 bg-[#F5F0E6] border-0 rounded-xl font-bold text-sm text-[#475569] outline-none cursor-pointer hover:bg-[#E5D9CC] transition-colors"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name A–Z</option>
              </select>
              <div className="flex gap-0.5 bg-[#F5F0E6] rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid" 
                      ? "bg-white text-[#8626E9] shadow-sm" 
                      : "text-[#94A3B8]"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list" 
                      ? "bg-white text-[#8626E9] shadow-sm" 
                      : "text-[#94A3B8]"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="bg-[#F5F0E6] rounded-2xl p-5 border border-[rgba(197,160,40,0.2)] mb-6">
              <h4 className="text-sm font-black text-[#0A2540] uppercase tracking-wider mb-3">Filter by Category</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => { setActiveFilter(c.id); setShowFilters(false); }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                      activeFilter === c.id 
                        ? "bg-[#8626E9] text-white" 
                        : "bg-white border border-[rgba(197,160,40,0.2)] text-[#475569] hover:border-[#C5A028] hover:text-[#8626E9]"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {isLoading ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" : ""}>
              {[0,1,2,3,4,5].map(i => <Skeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-7xl mb-5">🔍</div>
              <h3 className="text-2xl font-black text-[#0A2540] mb-2 tracking-tight">Nothing found</h3>
              <p className="text-[#475569] mb-7 text-sm">Try a different search term or category</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}
                className="px-6 py-3 bg-[#8626E9] text-white rounded-xl font-bold text-sm hover:bg-[#C5A028] transition-colors w-full sm:w-auto"
              >
                Clear filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(p => <GridCard key={p.id} project={p} />)}
            </div>
          ) : (
            <div>{filtered.map(p => <ListCard key={p.id} project={p} />)}</div>
          )}
        </div>
      </section>

      {/* ── Comparison modal ───────────────────────────────────────────────── */}
      {showComparison && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-[rgba(197,160,40,0.2)] px-8 py-5 flex items-center justify-between rounded-t-3xl z-10">
              <h3 className="text-xl font-black text-[#0A2540] tracking-tight">Compare Projects</h3>
              <button
                onClick={() => setShowComparison(false)}
                className="w-9 h-9 flex items-center justify-center bg-[#F5F0E6] hover:bg-[#FEE2E2] hover:text-[#D32F2F] rounded-xl transition-all text-[#94A3B8] text-lg font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-8 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[rgba(197,160,40,0.2)]">
                    <th className="text-left pb-4 pr-4 text-sm font-black text-[#475569] uppercase tracking-wider w-36">Feature</th>
                    {filtered.slice(0, 3).map(p => (
                      <th key={p.id} className="text-center pb-4 px-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${p.color} rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-md`}>
                          <p.icon className="w-6 h-6 text-white" />
                        </div>
                        <Link to={`/projects/${p.slug}`} className="text-sm font-black text-[#0A2540] hover:text-[#8626E9] transition-colors block leading-tight">
                          {p.title}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(["Category","Users","Rating","Growth","API","Mobile"] as const).map(row => (
                    <tr key={row} className="border-b border-[rgba(197,160,40,0.1)] hover:bg-[rgba(197,160,40,0.05)] transition-colors">
                      <td className="py-4 pr-4 text-sm font-bold text-[#475569]">{row}</td>
                      {filtered.slice(0, 3).map(p => {
                        const s = stableStats[String(p.id)];
                        return (
                          <td key={p.id} className="py-4 px-4 text-center">
                            {row === "Category" && <span className="px-2.5 py-1 bg-[#8626E9] text-white text-xs font-bold rounded-full capitalize">{p.category}</span>}
                            {row === "Users"    && <span className="text-sm font-bold text-[#0A2540]">{fmt(s?.users ?? 0)}</span>}
                            {row === "Rating"   && <div className="flex items-center justify-center gap-1"><Star className="w-4 h-4 fill-[#C5A028] text-[#C5A028]" /><span className="text-sm font-bold">{s?.rating}</span></div>}
                            {row === "Growth"   && <span className="text-sm font-bold text-[#1E6F6F]">+{s?.growth}%</span>}
                            {(row === "API" || row === "Mobile") && <Check className="w-5 h-5 text-[#1E6F6F] mx-auto" />}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr>
                    <td className="py-4 text-sm font-bold text-[#475569]">Action</td>
                    {filtered.slice(0, 3).map(p => (
                      <td key={p.id} className="py-4 px-4 text-center">
                        <Link
                          to={`/projects/${p.slug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8626E9] text-white rounded-xl text-xs font-bold hover:bg-[#C5A028] transition-colors"
                          onClick={() => setShowComparison(false)}
                        >
                          View Project<ChevronRight className="w-3 h-3" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Big CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative py-28 px-4 sm:px-6 overflow-hidden bg-[#0A2540] text-center">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8626E9]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C5A028]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full text-white/80 text-xs font-bold mb-8 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A028]" />Start Today — It's Free
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tight mb-5">
            Build the Future of Finance
          </h2>
          <p className="text-base sm:text-lg text-white/60 mb-10 leading-relaxed">
            Join thousands of developers and businesses launching next-generation financial products.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="flex items-center justify-center gap-2.5 px-8 py-4 bg-[#8626E9] text-white rounded-2xl font-black text-base hover:bg-[#C5A028] hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-xl w-full sm:w-auto"
            >
              Get Started Free<ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2.5 px-8 py-4 bg-transparent border-2 border-white/25 text-white rounded-2xl font-bold text-base hover:bg-white/20 hover:border-white/50 transition-all w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* ── Newsletter ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white border-t border-[rgba(197,160,40,0.2)]">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-[#8626E9] to-[#C5A028] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-[rgba(134,38,233,0.2)]">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-black text-[#0A2540] tracking-tight mb-2">Stay ahead of fintech</h3>
          <p className="text-[#475569] text-sm mb-7 leading-relaxed">
            New projects, features, and insights delivered to your inbox. No spam ever.
          </p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-[#1E6F6F] font-bold text-base">
              <Check className="w-5 h-5" />You're subscribed! Talk soon.
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                className="flex-1 px-4 py-3 bg-[#F5F0E6] border-2 border-transparent rounded-xl text-sm font-medium placeholder-[#94A3B8] outline-none focus:border-[#C5A028] focus:bg-white focus:ring-4 focus:ring-[rgba(197,160,40,0.1)] transition-all"
              />
              <button
                onClick={handleSubscribe}
                className="px-5 py-3 bg-gradient-to-r from-[#8626E9] to-[#C5A028] text-white rounded-xl font-bold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}