import { useState, useEffect, useRef, useMemo } from "react";
import {
  ArrowRight, Sparkles, TrendingUp, Users, Star, Zap, Shield, Globe,
  CreditCard, LineChart, Check, BarChart3, Wallet, MessageCircle,
  Search, X, Grid, List, SlidersHorizontal, ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { projects, type Project } from "@/data/projects";

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
  <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 animate-pulse">
    <div className="h-52 bg-gradient-to-br from-gray-200 to-gray-300" />
    <div className="p-5 space-y-3">
      <div className="flex gap-2"><div className="h-5 w-20 bg-gray-200 rounded-full" /><div className="h-5 w-14 bg-gray-200 rounded-full" /></div>
      <div className="h-5 w-3/4 bg-gray-200 rounded" />
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-2/3 bg-gray-200 rounded" />
      <div className="flex justify-between pt-1">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-20 bg-gray-200 rounded" />
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

  /* ── Trending card ── */
  const TrendingCard = ({ project, rank }: { project: Project; rank: number }) => {
    const s = stableStats[String(project.id)];
    return (
      <Link
        to={`/projects/${project.slug}`}
        className="group relative bg-white rounded-[28px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-gray-100"
      >
        {/* Rank badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full">
          <Zap className="w-3 h-3" />#{rank} Trending
        </div>

        {/* Image */}
        <div className={`relative h-64 bg-gradient-to-br ${project.color} overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <project.icon className="w-24 h-24 text-white/90 drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500" />
          </div>
          {/* Quick stats overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-semibold">
              <Users className="w-3 h-3" />{fmt(s?.users ?? 0)}
            </div>
            <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-semibold">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{s?.rating}
            </div>
            <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-semibold">
              <TrendingUp className="w-3 h-3" />+{s?.growth}%
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full capitalize">
              {project.category}
            </span>
            <span className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Live
            </span>
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors tracking-tight">
            {project.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">{project.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">
              {fmt(s?.views ?? 0)} views
            </span>
            <span className="flex items-center gap-1 text-sm font-bold text-blue-600 group-hover:gap-2 transition-all">
              View Details<ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    );
  };

  /* ── Grid card ── */
  const GridCard = ({ project }: { project: Project }) => {
    const s = stableStats[String(project.id)];
    return (
      <Link
        to={`/projects/${project.slug}`}
        className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-400 hover:-translate-y-2 hover:shadow-xl hover:border-blue-100"
      >
        <div className={`relative h-44 bg-gradient-to-br ${project.color} overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <project.icon className="w-16 h-16 text-white drop-shadow-xl transform group-hover:scale-110 transition-transform duration-400" />
          </div>
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            <div className="flex items-center gap-1 bg-black/25 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full font-semibold">
              <Users className="w-2.5 h-2.5" />{fmt(s?.users ?? 0)}
            </div>
            <div className="flex items-center gap-1 bg-black/25 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full font-semibold">
              <Star className="w-2.5 h-2.5 fill-yellow-300 text-yellow-300" />{s?.rating}
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex gap-1.5 mb-2">
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full capitalize">{project.category}</span>
            <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Live
            </span>
          </div>
          <h3 className="text-base font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors tracking-tight line-clamp-1">
            {project.title}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">{project.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{fmt(s?.views ?? 0)} views</span>
            <span className="flex items-center gap-0.5 text-xs font-bold text-blue-600 group-hover:gap-1 transition-all">
              Details<ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    );
  };

  /* ── List card ── */
  const ListCard = ({ project }: { project: Project }) => {
    const s = stableStats[String(project.id)];
    return (
      <Link
        to={`/projects/${project.slug}`}
        className="group flex bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all hover:shadow-xl hover:border-blue-100 hover:-translate-y-0.5 mb-3"
      >
        <div className={`w-28 md:w-40 flex-shrink-0 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
          <project.icon className="w-10 h-10 md:w-14 md:h-14 text-white drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="flex-1 p-4 md:p-5 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex gap-1.5">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full capitalize">{project.category}</span>
            </div>
          </div>
          <h3 className="text-base font-black text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight truncate mb-1">
            {project.title}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-1 mb-3">{project.description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{fmt(s?.users ?? 0)}</span>
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />{s?.rating}</span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold"><TrendingUp className="w-3.5 h-3.5" />+{s?.growth}%</span>
            <span className="ml-auto flex items-center gap-1 font-bold text-blue-600 group-hover:gap-1.5 transition-all">
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

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Video */}
        <div className="absolute inset-0">
          <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted loop playsInline>
            <source src="/videos/Service1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
        </div>

        {/* Floating accent orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center py-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-bold mb-8 shadow-lg">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            {projects.length} Premium Fintech Solutions
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-tight tracking-tight mb-6">
            Financial Tech
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
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
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                    activeFilter === cat.id
                      ? "bg-white text-gray-900 shadow-xl scale-105"
                      : "bg-white/15 backdrop-blur-sm text-white border border-white/25 hover:bg-white/25"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Trending strip ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Trending Now</h2>
                <p className="text-gray-500 text-sm">Most popular this month</p>
              </div>
            </div>
            <button
              onClick={() => setShowComparison(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-sm text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:shadow-md transition-all"
            >
              <BarChart3 className="w-4 h-4" />Compare
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0,1,2].map(i => <Skeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trending.map((p, i) => <TrendingCard key={p.id} project={p} rank={i + 1} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── All Projects ───────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-7">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-1">All Projects</h2>
            <p className="text-gray-400 text-sm">
              {isLoading ? "Loading…" : `${filtered.length} project${filtered.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search projects…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-sm font-medium placeholder-gray-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
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
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${showFilters ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                <SlidersHorizontal className="w-4 h-4" />Filters
              </button>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-100 border-0 rounded-xl font-bold text-sm text-gray-700 outline-none cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name A–Z</option>
              </select>
              <div className="flex gap-0.5 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-gray-400"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-gray-400"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 mb-6">
              <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-3">Filter by Category</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => { setActiveFilter(c.id); setShowFilters(false); }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${activeFilter === c.id ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"}`}
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
              <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Nothing found</h3>
              <p className="text-gray-400 mb-7 text-sm">Try a different search term or category</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
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
            <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between rounded-t-3xl z-10">
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Compare Projects</h3>
              <button
                onClick={() => setShowComparison(false)}
                className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-red-100 hover:text-red-500 rounded-xl transition-all text-gray-400 text-lg font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-8 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="text-left pb-4 pr-4 text-sm font-black text-gray-500 uppercase tracking-wider w-36">Feature</th>
                    {filtered.slice(0, 3).map(p => (
                      <th key={p.id} className="text-center pb-4 px-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${p.color} rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-md`}>
                          <p.icon className="w-6 h-6 text-white" />
                        </div>
                        <Link to={`/projects/${p.slug}`} className="text-sm font-black text-gray-900 hover:text-blue-600 transition-colors block leading-tight">
                          {p.title}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(["Category","Users","Rating","Growth","API","Mobile"] as const).map(row => (
                    <tr key={row} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 pr-4 text-sm font-bold text-gray-500">{row}</td>
                      {filtered.slice(0, 3).map(p => {
                        const s = stableStats[String(p.id)];
                        return (
                          <td key={p.id} className="py-4 px-4 text-center">
                            {row === "Category" && <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full capitalize">{p.category}</span>}
                            {row === "Users"    && <span className="text-sm font-bold text-gray-900">{fmt(s?.users ?? 0)}</span>}
                            {row === "Rating"   && <div className="flex items-center justify-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span className="text-sm font-bold">{s?.rating}</span></div>}
                            {row === "Growth"   && <span className="text-sm font-bold text-emerald-600">+{s?.growth}%</span>}
                            {(row === "API" || row === "Mobile") && <Check className="w-5 h-5 text-emerald-500 mx-auto" />}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr>
                    <td className="py-4 text-sm font-bold text-gray-500">Action</td>
                    {filtered.slice(0, 3).map(p => (
                      <td key={p.id} className="py-4 px-4 text-center">
                        <Link
                          to={`/projects/${p.slug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
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
      <section className="relative py-28 px-6 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-center">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full text-white/80 text-xs font-bold mb-8 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />Start Today — It's Free
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tight mb-5">
            Build the Future of Finance
          </h2>
          <p className="text-lg text-white/60 mb-10 leading-relaxed">
            Join thousands of developers and businesses launching next-generation financial products.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="flex items-center gap-2.5 px-8 py-4 bg-white text-blue-700 rounded-2xl font-black text-base hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-xl"
            >
              Get Started Free<ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2.5 px-8 py-4 bg-white/10 border-2 border-white/25 text-white rounded-2xl font-bold text-base hover:bg-white/20 hover:border-white/50 transition-all"
            >
              <MessageCircle className="w-5 h-5" />Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* ── Newsletter ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-blue-200">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Stay ahead of fintech</h3>
          <p className="text-gray-400 text-sm mb-7 leading-relaxed">
            New projects, features, and insights delivered to your inbox. No spam ever.
          </p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-base">
              <Check className="w-5 h-5" />You're subscribed! Talk soon.
            </div>
          ) : (
            <div className="flex gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-medium placeholder-gray-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all min-w-0"
              />
              <button
                onClick={handleSubscribe}
                className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap"
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