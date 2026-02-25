import { useState, useEffect, useRef, useMemo } from "react";
import {
  ArrowRight, Sparkles, TrendingUp, Users, Star, Zap, Shield, Globe,
  CreditCard, LineChart, Check, BarChart3, Wallet, MessageCircle,
  Search, X, Grid, List, SlidersHorizontal, ChevronRight, Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import { projects, type Project } from "@/data/projects";
import styles from "./Projects.module.css";

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

/* ── Stable deterministic — NO Math.random() on render ───────────────────── */
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
  <div className={styles.skeleton}>
    <div className={styles.skeletonImage} />
    <div className={styles.skeletonContent}>
      <div className={styles.skeletonTags}>
        <div className={styles.skeletonTag} />
        <div className={styles.skeletonTag} />
      </div>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonLine} />
      <div className={styles.skeletonLine} />
      <div className={styles.skeletonFooter}>
        <div className={styles.skeletonViews} />
        <div className={styles.skeletonLink} />
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
        className={styles.trendingCard}
      >
        {/* Rank badge */}
        <div className={styles.trendingBadge}>
          <Zap className={styles.trendingBadgeIcon} />#{rank} Trending
        </div>

        {/* Image */}
        <div className={styles.trendingImageContainer}>
          <img 
            src={imagePath} 
            alt={project.title}
            className={styles.trendingImage}
          />
          <div className={styles.trendingOverlay} />
          
          {/* Quick stats overlay */}
          <div className={styles.trendingStats}>
            <div className={styles.trendingStat}>
              <Users className={styles.trendingStatIcon} />{fmt(s?.users ?? 0)}
            </div>
            <div className={styles.trendingStat}>
              <Star className={styles.trendingStatStar} />{s?.rating}
            </div>
            <div className={styles.trendingStat}>
              <TrendingUp className={styles.trendingStatIcon} />+{s?.growth}%
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.trendingContent}>
          <div className={styles.trendingTags}>
            <span className={styles.categoryTag}>{project.category}</span>
            <span className={styles.liveTag}>
              <span className={styles.liveDot} />Live
            </span>
          </div>
          <h3 className={styles.trendingTitle}>{project.title}</h3>
          <p className={styles.trendingDescription}>{project.description}</p>
          <div className={styles.trendingFooter}>
            <span className={styles.trendingViews}>{fmt(s?.views ?? 0)} views</span>
            <span className={styles.trendingLink}>
              View Details<ArrowRight className={styles.trendingLinkIcon} />
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
        className={styles.gridCard}
      >
        <div className={styles.gridImageContainer}>
          <img 
            src={imagePath} 
            alt={project.title}
            className={styles.gridImage}
          />
          <div className={styles.gridOverlay} />
          
          <div className={styles.gridStats}>
            <div className={styles.gridStat}>
              <Users className={styles.gridStatIcon} />{fmt(s?.users ?? 0)}
            </div>
            <div className={styles.gridStat}>
              <Star className={styles.gridStatStar} />{s?.rating}
            </div>
          </div>
        </div>
        <div className={styles.gridContent}>
          <div className={styles.gridTags}>
            <span className={styles.categoryTagSmall}>{project.category}</span>
            <span className={styles.liveTagSmall}>
              <span className={styles.liveDotSmall} />Live
            </span>
          </div>
          <h3 className={styles.gridTitle}>{project.title}</h3>
          <p className={styles.gridDescription}>{project.description}</p>
          <div className={styles.gridFooter}>
            <span className={styles.gridViews}>{fmt(s?.views ?? 0)} views</span>
            <span className={styles.gridLink}>
              Details<ArrowRight className={styles.gridLinkIcon} />
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
        className={styles.listCard}
      >
        <div className={styles.listImageContainer}>
          <img 
            src={imagePath} 
            alt={project.title}
            className={styles.listImage}
          />
          <div className={styles.listOverlay} />
        </div>
        <div className={styles.listContent}>
          <div className={styles.listHeader}>
            <span className={styles.categoryTagSmall}>{project.category}</span>
          </div>
          <h3 className={styles.listTitle}>{project.title}</h3>
          <p className={styles.listDescription}>{project.description}</p>
          <div className={styles.listMeta}>
            <span className={styles.listMetaItem}><Users className={styles.listMetaIcon} />{fmt(s?.users ?? 0)}</span>
            <span className={styles.listMetaItem}><Star className={styles.listMetaStar} />{s?.rating}</span>
            <span className={styles.listMetaGrowth}><TrendingUp className={styles.listMetaIcon} />+{s?.growth}%</span>
            <span className={styles.listLink}>
              View<ArrowRight className={styles.listLinkIcon} />
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
    <div className={styles.pageContainer}>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link to="/" className={styles.logo}>ClaveRica</Link>
          
          {/* Desktop Navigation */}
          <div className={styles.navLinks}>
            <Link to="/projects" className={styles.navLink}>Projects</Link>
            <Link to="/about" className={styles.navLink}>About</Link>
            <Link to="/contact" className={styles.navLink}>Contact</Link>
            <Link to="/signup" className={styles.navCta}>
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.mobileMenuBtn}
          >
            <Menu className={styles.menuIcon} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <Link to="/projects" className={styles.mobileLink}>Projects</Link>
            <Link to="/about" className={styles.mobileLink}>About</Link>
            <Link to="/contact" className={styles.mobileLink}>Contact</Link>
            <Link to="/signup" className={styles.mobileCta}>
              Get Started
            </Link>
          </div>
        )}
      </nav>

      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section className={styles.heroSection}>
        {/* Video */}
        <div className={styles.videoContainer}>
          <video ref={videoRef} className={styles.video} autoPlay muted loop playsInline>
            <source src="/videos/Service1.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoOverlay} />
        </div>

        {/* Floating orbs */}
        <div className={styles.orb1} />
        <div className={styles.orb2} />

        <div className={styles.heroContent}>
          {/* Badge */}
          <div className={styles.heroBadge}>
            <Sparkles className={styles.badgeIcon} />
            {projects.length} Premium Fintech Solutions
            <span className={styles.badgePulse} />
          </div>

          {/* MASSIVE TITLE */}
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine1}>Financial Tech</span>
            <span className={styles.titleLine2}>Reimagined</span>
          </h1>

          {/* Category pills */}
          <div className={styles.categoryPills}>
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`${styles.categoryPill} ${activeFilter === cat.id ? styles.categoryPillActive : ''}`}
                >
                  <Icon className={styles.pillIcon} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Trending strip ─────────────────────────────────────────────────── */}
      <section className={styles.trendingSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.trendingHeader}>
            <div className={styles.trendingTitleWrapper}>
              <div className={styles.trendingIconWrapper}>
                <TrendingUp className={styles.trendingIcon} />
              </div>
              <div>
                <h2 className={styles.sectionTitle}>Trending Now</h2>
                <p className={styles.sectionSubtitle}>Most popular this month</p>
              </div>
            </div>
            <button
              onClick={() => setShowComparison(true)}
              className={styles.compareBtn}
            >
              <BarChart3 className={styles.compareIcon} />Compare
            </button>
          </div>

          {isLoading ? (
            <div className={styles.trendingGrid}>
              {[0,1,2].map(i => <Skeleton key={i} />)}
            </div>
          ) : (
            <div className={styles.trendingGrid}>
              {trending.map((p, i) => <TrendingCard key={p.id} project={p} rank={i + 1} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── All Projects ───────────────────────────────────────────────────── */}
      <section className={styles.projectsSection}>
        <div className={styles.sectionContainer}>
          {/* Header */}
          <div className={styles.projectsHeader}>
            <h2 className={styles.projectsTitle}>All Projects</h2>
            <p className={styles.projectsCount}>
              {isLoading ? "Loading…" : `${filtered.length} project${filtered.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          {/* Search */}
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search projects…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={styles.clearBtn}
              >
                <X className={styles.clearIcon} />
              </button>
            )}
          </div>

          {/* Controls */}
          <div className={styles.controlsWrapper}>
            <div className={styles.controlsLeft}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`${styles.filterBtn} ${showFilters ? styles.filterBtnActive : ''}`}
              >
                <SlidersHorizontal className={styles.filterIcon} />Filters
              </button>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name A–Z</option>
              </select>
              <div className={styles.viewToggle}>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`${styles.viewBtn} ${viewMode === "grid" ? styles.viewBtnActive : ''}`}
                >
                  <Grid className={styles.viewIcon} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`${styles.viewBtn} ${viewMode === "list" ? styles.viewBtnActive : ''}`}
                >
                  <List className={styles.viewIcon} />
                </button>
              </div>
            </div>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className={styles.filterPanel}>
              <h4 className={styles.filterTitle}>Filter by Category</h4>
              <div className={styles.filterOptions}>
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => { setActiveFilter(c.id); setShowFilters(false); }}
                    className={`${styles.filterOption} ${activeFilter === c.id ? styles.filterOptionActive : ''}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {isLoading ? (
            <div className={viewMode === "grid" ? styles.gridLayout : ""}>
              {[0,1,2,3,4,5].map(i => <Skeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyEmoji}>🔍</div>
              <h3 className={styles.emptyTitle}>Nothing found</h3>
              <p className={styles.emptyText}>Try a different search term or category</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}
                className={styles.emptyBtn}
              >
                Clear filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className={styles.gridLayout}>
              {filtered.map(p => <GridCard key={p.id} project={p} />)}
            </div>
          ) : (
            <div className={styles.listLayout}>
              {filtered.map(p => <ListCard key={p.id} project={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── Comparison modal ───────────────────────────────────────────────── */}
      {showComparison && (
        <div className={styles.modalOverlay} onClick={e => { if (e.target === e.currentTarget) setShowComparison(false); }}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Compare Projects</h3>
              <button
                onClick={() => setShowComparison(false)}
                className={styles.modalClose}
              >
                ×
              </button>
            </div>
            <div className={styles.modalContent}>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>Feature</th>
                    {filtered.slice(0, 3).map(p => (
                      <th key={p.id} className={styles.tableHeader}>
                        <div className={styles.tableHeaderIcon}>
                          <p.icon className={styles.tableIcon} />
                        </div>
                        <Link to={`/projects/${p.slug}`} className={styles.tableHeaderLink}>
                          {p.title}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(["Category","Users","Rating","Growth","API","Mobile"] as const).map(row => (
                    <tr key={row} className={styles.tableRow}>
                      <td className={styles.tableCell}>{row}</td>
                      {filtered.slice(0, 3).map(p => {
                        const s = stableStats[String(p.id)];
                        return (
                          <td key={p.id} className={styles.tableCell}>
                            {row === "Category" && <span className={styles.categoryBadge}>{p.category}</span>}
                            {row === "Users"    && <span>{fmt(s?.users ?? 0)}</span>}
                            {row === "Rating"   && <div className={styles.ratingCell}><Star className={styles.ratingStar} />{s?.rating}</div>}
                            {row === "Growth"   && <span className={styles.growthCell}>+{s?.growth}%</span>}
                            {(row === "API" || row === "Mobile") && <Check className={styles.checkIcon} />}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr>
                    <td className={styles.tableCell}>Action</td>
                    {filtered.slice(0, 3).map(p => (
                      <td key={p.id} className={styles.tableCell}>
                        <Link
                          to={`/projects/${p.slug}`}
                          className={styles.viewProjectBtn}
                          onClick={() => setShowComparison(false)}
                        >
                          View Project<ChevronRight className={styles.viewProjectIcon} />
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
      <section className={styles.ctaSection}>
        <div className={styles.ctaOrb1} />
        <div className={styles.ctaOrb2} />
        <div className={styles.ctaContent}>
          <div className={styles.ctaBadge}>
            <Sparkles className={styles.ctaBadgeIcon} />Start Today — It's Free
          </div>
          <h2 className={styles.ctaTitle}>Build the Future of Finance</h2>
          <p className={styles.ctaDescription}>
            Join thousands of developers and businesses launching next-generation financial products.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/signup" className={styles.ctaPrimary}>
              Get Started Free<ArrowRight className={styles.ctaArrow} />
            </Link>
            <Link to="/contact" className={styles.ctaSecondary}>
              <MessageCircle className={styles.ctaIcon} />Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* ── Newsletter ──────────────────────────────────────────────────────── */}
      <section className={styles.newsletterSection}>
        <div className={styles.newsletterContainer}>
          <div className={styles.newsletterIconWrapper}>
            <MessageCircle className={styles.newsletterIcon} />
          </div>
          <h3 className={styles.newsletterTitle}>Stay ahead of fintech</h3>
          <p className={styles.newsletterText}>
            New projects, features, and insights delivered to your inbox. No spam ever.
          </p>
          {subscribed ? (
            <div className={styles.subscribedMessage}>
              <Check className={styles.checkIcon} />You're subscribed! Talk soon.
            </div>
          ) : (
            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                className={styles.newsletterInput}
              />
              <button onClick={handleSubscribe} className={styles.newsletterBtn}>
                Subscribe
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}