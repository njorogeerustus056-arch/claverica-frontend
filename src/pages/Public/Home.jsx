"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Landing;
// src/pages/Home.tsx
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
// Import CSS module
var Home_module_css_1 = require("./Home.module.css");
var Link = function (_a) {
    var to = _a.to, children = _a.children, className = _a.className;
    return (<a href={to} className={className}>{children}</a>);
};
function Landing() {
    var _a, _b, _c;
    var _d = (0, react_1.useState)(0), currentSlide = _d[0], setCurrentSlide = _d[1];
    var _e = (0, react_1.useState)(1000), transferAmount = _e[0], setTransferAmount = _e[1];
    var _f = (0, react_1.useState)("USD"), fromCurrency = _f[0], setFromCurrency = _f[1];
    var _g = (0, react_1.useState)("GBP"), toCurrency = _g[0], setToCurrency = _g[1];
    var _h = (0, react_1.useState)(0), userCount = _h[0], setUserCount = _h[1];
    var _j = (0, react_1.useState)(false), videoLoaded = _j[0], setVideoLoaded = _j[1];
    var _k = (0, react_1.useState)(false), videoError = _k[0], setVideoError = _k[1];
    var _l = (0, react_1.useState)(0), activeLiveFeed = _l[0], setActiveLiveFeed = _l[1];
    var _m = (0, react_1.useState)(5000), savingsAmount = _m[0], setSavingsAmount = _m[1];
    var _o = (0, react_1.useState)("freelancer"), selectedUseCase = _o[0], setSelectedUseCase = _o[1];
    var _p = (0, react_1.useState)("all"), liveFeedType = _p[0], setLiveFeedType = _p[1];
    var _q = (0, react_1.useState)(true), feedVisible = _q[0], setFeedVisible = _q[1];
    var _r = (0, react_1.useState)('initializing'), videoState = _r[0], setVideoState = _r[1];
    var videoRef = (0, react_1.useRef)(null);
    var testimonials = [
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
    // Video debugging and event handling
    (0, react_1.useEffect)(function () {
        var video = videoRef.current;
        if (!video)
            return;
        console.log('=== VIDEO DEBUG START ===');
        var handleLoadStart = function () {
            console.log('✓ loadstart');
            setVideoState('loading');
        };
        var handleLoadedMetadata = function () {
            console.log('✓ loadedmetadata - Dimensions:', video.videoWidth, 'x', video.videoHeight);
            setVideoState('metadata-loaded');
        };
        var handleLoadedData = function () {
            console.log('✓ loadeddata - First frame loaded');
            setVideoLoaded(true);
            setVideoState('data-loaded');
        };
        var handleCanPlay = function () {
            console.log('✓ canplay - Ready to play');
            setVideoState('can-play');
            var playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(function () {
                    console.log('✓ Playing successfully');
                    setVideoState('playing');
                })
                    .catch(function (err) {
                    console.warn('⚠ Autoplay prevented:', err);
                    setVideoState('play-failed');
                });
            }
        };
        var handlePlaying = function () {
            console.log('✓ playing');
            setVideoState('playing');
        };
        var handleStalled = function () {
            console.warn('⚠ stalled');
            setVideoState('stalled');
        };
        var handleError = function (e) {
            console.error('❌ VIDEO ERROR');
            var target = e.target;
            if (target.error) {
                var errors = {
                    1: 'MEDIA_ERR_ABORTED',
                    2: 'MEDIA_ERR_NETWORK',
                    3: 'MEDIA_ERR_DECODE',
                    4: 'MEDIA_ERR_SRC_NOT_SUPPORTED'
                };
                console.error('Error:', errors[target.error.code] || 'Unknown');
            }
            setVideoError(true);
            setVideoState('error');
        };
        video.addEventListener('loadstart', handleLoadStart);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('playing', handlePlaying);
        video.addEventListener('stalled', handleStalled);
        video.addEventListener('error', handleError);
        video.load();
        console.log('Video load() called');
        console.log('=== VIDEO DEBUG END ===');
        return function () {
            video.removeEventListener('loadstart', handleLoadStart);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('playing', handlePlaying);
            video.removeEventListener('stalled', handleStalled);
            video.removeEventListener('error', handleError);
        };
    }, []);
    // Live user counter animation
    (0, react_1.useEffect)(function () {
        var timer = setTimeout(function () {
            if (userCount < 5000000) {
                setUserCount(function (prev) { return Math.min(prev + 25000, 5000000); });
            }
        }, 30);
        return function () { return clearTimeout(timer); };
    }, [userCount]);
    // Testimonial slider
    (0, react_1.useEffect)(function () {
        var timer = setInterval(function () {
            setCurrentSlide(function (prev) { return (prev + 1) % testimonials.length; });
        }, 6000);
        return function () { return clearInterval(timer); };
    }, []);
    // Live feed updates
    (0, react_1.useEffect)(function () {
        var feedTimer = setInterval(function () {
            setActiveLiveFeed(function (prev) { return (prev + 1) % liveFeedEvents.length; });
        }, 5000);
        return function () { return clearInterval(feedTimer); };
    }, []);
    var features = [
        {
            icon: <lucide_react_1.Send className={Home_module_css_1.default.featureIconSize}/>,
            title: "Global Transfers",
            desc: "Send money to 180+ countries instantly with zero hidden fees.",
            color: Home_module_css_1.default.featureColor1,
            link: "/features?section=transfers",
            stats: "Save 85% vs banks"
        },
        {
            icon: <lucide_react_1.Wallet className={Home_module_css_1.default.featureIconSize}/>,
            title: "Crypto Trading",
            desc: "Buy, sell, and hold 50+ cryptocurrencies with bank-level security.",
            color: Home_module_css_1.default.featureColor2,
            link: "/features?section=crypto",
            stats: "24/7 trading"
        },
        {
            icon: <lucide_react_1.PiggyBank className={Home_module_css_1.default.featureIconSize}/>,
            title: "High-Yield Savings",
            desc: "Earn up to 12% APY on your savings, compounded daily.",
            color: Home_module_css_1.default.featureColor3,
            link: "/features?section=savings",
            stats: "40x bank rates"
        },
        {
            icon: <lucide_react_1.CreditCard className={Home_module_css_1.default.featureIconSize}/>,
            title: "Premium Cards",
            desc: "Metal cards with cashback, lounge access, and global acceptance.",
            color: Home_module_css_1.default.featureColor4,
            link: "/features?section=cards",
            stats: "3% cashback"
        },
        {
            icon: <lucide_react_1.Receipt className={Home_module_css_1.default.featureIconSize}/>,
            title: "Bill Payments",
            desc: "Pay utilities, subscriptions, and mobile top-ups instantly.",
            color: Home_module_css_1.default.featureColor5,
            link: "/features?section=bills",
            stats: "0.5% cashback"
        },
        {
            icon: <lucide_react_1.Gift className={Home_module_css_1.default.featureIconSize}/>,
            title: "Rewards Program",
            desc: "Earn points on every transaction and unlock exclusive perks.",
            color: Home_module_css_1.default.featureColor6,
            link: "/features?section=rewards",
            stats: "3x points"
        },
    ];
    // Enhanced Live feed events
    var liveFeedEvents = [
        {
            icon: "💸",
            text: "Maria sent $500 to Brazil",
            time: "Just now",
            type: "send",
            amount: 500,
            currency: "USD",
            country: "Brazil",
            user: "Maria S.",
            status: "completed"
        },
        {
            icon: "📈",
            text: "John earned $45 in interest",
            time: "2 min ago",
            type: "interest",
            amount: 45,
            currency: "USD",
            account: "Savings Plus",
            status: "credited"
        },
        {
            icon: "₿",
            text: "Sarah bought 0.1 Bitcoin",
            time: "5 min ago",
            type: "crypto",
            amount: 0.1,
            currency: "BTC",
            asset: "Bitcoin",
            status: "executed"
        },
        {
            icon: "✈️",
            text: "Alex used card in Tokyo",
            time: "10 min ago",
            type: "card",
            amount: 284.50,
            currency: "JPY",
            merchant: "Tokyo Metro",
            location: "Tokyo, Japan",
            status: "approved"
        },
        {
            icon: "🏠",
            text: "Emma paid rent via ClaveRica",
            time: "15 min ago",
            type: "bill",
            amount: 1200,
            currency: "USD",
            biller: "Premium Apartments",
            status: "processed"
        },
    ];
    // Use case savings calculations
    var useCaseSavings = {
        freelancer: { monthly: 1200, description: "Get paid instantly from international clients" },
        student: { monthly: 300, description: "Save on tuition and living expenses abroad" },
        family: { monthly: 450, description: "Send money home with minimal fees" },
        business: { monthly: 2500, description: "Pay international suppliers efficiently" },
        traveler: { monthly: 200, description: "No foreign transaction fees worldwide" }
    };
    // Partner logos mapping
    var getPartnerLogo = function (name) {
        var logoMap = {
            "Coca-Cola": "/logos/partners/cocacola.png",
            "Wall Street": "/logos/partners/wallstreet.png",
            "Alibaba": "/logos/partners/alibaba.png",
            "MTN": "/logos/partners/mtn.png",
            "Emirates": "/logos/partners/emirates.png",
            "Vodafone": "/logos/partners/vodafone.png",
            "Samsung": "/logos/partners/samsung.png",
            "Mastercard": "/logos/partners/mastercard.png",
            "Visa": "/logos/partners/visa.png",
            "PayPal": "/logos/partners/paypal.png",
            "Safaricom": "/logos/partners/safaricom.png",
            "Standard Bank": "/logos/partners/standardbank.png"
        };
        return logoMap[name] || "🏢";
    };
    var partners = [
        { name: "Coca-Cola", region: "Global" },
        { name: "Wall Street", region: "Americas" },
        { name: "Alibaba", region: "Asia" },
        { name: "MTN", region: "Africa" },
        { name: "Emirates", region: "Middle East" },
        { name: "Vodafone", region: "Europe" },
        { name: "Samsung", region: "Asia" },
        { name: "Mastercard", region: "Global" },
        { name: "Visa", region: "Global" },
        { name: "PayPal", region: "Global" },
        { name: "Safaricom", region: "Africa" },
        { name: "Standard Bank", region: "Africa" }
    ];
    // Savings calculation
    var yearlySavings = ((_a = useCaseSavings[selectedUseCase]) === null || _a === void 0 ? void 0 : _a.monthly) * 12 || 0;
    return (<div className={Home_module_css_1.default.container}>

      {/* HERO SECTION WITH VIDEO BACKGROUND - FIXED */}
      <section className={Home_module_css_1.default.heroSection}>
        {/* VIDEO BACKGROUND ONLY - NO OVERLAY */}
        <div className={Home_module_css_1.default.videoContainer} style={{ backgroundColor: 'red' }}>
          <video ref={videoRef} autoPlay loop muted playsInline preload="auto" crossOrigin="anonymous" controls className={Home_module_css_1.default.videoBackground} onLoadedData={function () {
            console.log('Video loaded successfully');
            setVideoLoaded(true);
        }} onError={function (e) {
            console.error('Video failed to load:', e);
            setVideoError(true);
        }}>
            <source src="/videos/Home1.mp4" type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
          
          {/* Fallback gradient if video fails */}
          {!videoLoaded && (<div className={Home_module_css_1.default.videoFallback}/>)}
          
          {videoError && (<>
              <div className={Home_module_css_1.default.videoFallback}>
                <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textAlign: 'center'
            }}>
                  Video failed to load. Check console for errors.
                </div>
              </div>
            
              {/* Debug overlay */}
              <div className={Home_module_css_1.default.debugOverlay}>
                <p><strong>State:</strong> {videoState}</p>
                <p><strong>Loaded:</strong> {videoLoaded ? 'Yes' : 'No'}</p>
                <p><strong>Error:</strong> {videoError ? 'Yes' : 'No'}</p>
              </div>
            </>)}
        </div>
        
        {/* NO OVERLAY DIV - REMOVED */}
        
        <div className={Home_module_css_1.default.heroContent}>
          {/* Trust Badge with Live Counter */}
          <framer_motion_1.motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className={Home_module_css_1.default.trustBadge}>
            <lucide_react_1.Star className={Home_module_css_1.default.starIcon} fill="currentColor"/>
            <span>Trusted by </span>
            <span className={Home_module_css_1.default.userCount}>
              {userCount.toLocaleString()}+ users worldwide
            </span>
          </framer_motion_1.motion.div>

          {/* Main Headline */}
          <framer_motion_1.motion.h1 initial={{ opacity: 0, y: -60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className={Home_module_css_1.default.heroTitle}>
            <span className={Home_module_css_1.default.heroTitleLine1}>Banking for the</span>
            <span className={Home_module_css_1.default.titleGradient}>
              Digital Age
            </span>
          </framer_motion_1.motion.h1>
          
          {/* Subtitle */}
          <framer_motion_1.motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }} className={Home_module_css_1.default.heroSubtitle}>
            Send money globally • Trade crypto • Earn 12% on savings • Get instant loans
          </framer_motion_1.motion.p>
          
          {/* Interactive CTA Section */}
          <framer_motion_1.motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.9 }} className={Home_module_css_1.default.ctaButtons}>
            <Link to="/signup" className={Home_module_css_1.default.btnPrimary}>
              Open Free Account
              <lucide_react_1.ArrowRight className={Home_module_css_1.default.arrowIcon}/>
            </Link>
          </framer_motion_1.motion.div>

          {/* Trust Indicators */}
          <framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }} className={Home_module_css_1.default.trustIndicators}>
            <div className={Home_module_css_1.default.trustItem}>
              <lucide_react_1.ShieldCheck className={Home_module_css_1.default.trustIcon}/>
              <span>Bank-level security</span>
            </div>
            <div className={Home_module_css_1.default.trustItem}>
              <lucide_react_1.Building className={Home_module_css_1.default.trustIcon}/>
              <span>FDIC Insured</span>
            </div>
            <div className={Home_module_css_1.default.trustItem}>
              <lucide_react_1.Award className={Home_module_css_1.default.trustIcon}/>
              <span>PCI DSS compliant</span>
            </div>
          </framer_motion_1.motion.div>
        </div>
      </section>

      {/* MODERN LIVE ACTIVITY FEED */}
      <section className={Home_module_css_1.default.liveFeedSection}>
        <div className={Home_module_css_1.default.liveFeedContainer}>
          <div className={Home_module_css_1.default.feedHeader}>
            {/* Feed Header */}
            <div className={Home_module_css_1.default.feedHeaderLeft}>
              <div className={Home_module_css_1.default.liveIndicator}>
                <div className={Home_module_css_1.default.livePing}/>
                <div className={Home_module_css_1.default.liveDot}/>
              </div>
              <div className={Home_module_css_1.default.feedTitle}>
                <div className={Home_module_css_1.default.feedIcon}>
                  <svg className={Home_module_css_1.default.zapIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <p className={Home_module_css_1.default.feedTitleText}>Live Activity</p>
                  <p className={Home_module_css_1.default.feedSubtitle}>Real-time updates from ClaveRica users</p>
                </div>
              </div>
              
              {/* Activity Stats */}
              <div className={Home_module_css_1.default.activityStats}>
                <div className={Home_module_css_1.default.statItem}>
                  <div className={Home_module_css_1.default.statDot}/>
                  <span className={Home_module_css_1.default.statText}>24k active now</span>
                </div>
                <div className={Home_module_css_1.default.statItem}>
                  <lucide_react_1.TrendingUp className={Home_module_css_1.default.statIcon}/>
                  <span className={Home_module_css_1.default.statText}>+12% today</span>
                </div>
              </div>
            </div>

            {/* Feed Controls */}
            <div className={Home_module_css_1.default.feedControls}>
              <div className={Home_module_css_1.default.filterButtons}>
                {["all", "transactions", "investments", "cards"].map(function (type) { return (<button key={type} onClick={function () { return setLiveFeedType(type); }} className={"".concat(Home_module_css_1.default.filterButton, " ").concat(liveFeedType === type ? Home_module_css_1.default.filterButtonActive : '')}>
                    {type}
                  </button>); })}
              </div>
              
              <button onClick={function () { return setFeedVisible(!feedVisible); }} className={Home_module_css_1.default.toggleButton}>
                {feedVisible ? (<svg className={Home_module_css_1.default.toggleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>) : (<svg className={Home_module_css_1.default.toggleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>)}
              </button>
            </div>
          </div>

          {/* Animated Feed Items */}
          {feedVisible && (<div className={Home_module_css_1.default.feedContent}>
              {/* Progress Bar */}
              <div className={Home_module_css_1.default.progressBar}>
                <div className={Home_module_css_1.default.progressFill}/>
              </div>

              <div className={Home_module_css_1.default.feedItems}>
                <framer_motion_1.motion.div key={activeLiveFeed} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className={Home_module_css_1.default.transactionCard}>
                  <div className={Home_module_css_1.default.transactionContent}>
                    {/* Transaction Icon with Status */}
                    <div className={Home_module_css_1.default.transactionIconContainer}>
                      <div className={"".concat(Home_module_css_1.default.transactionIcon, " ").concat(liveFeedEvents[activeLiveFeed].type === "send" ? Home_module_css_1.default.sendIcon :
                liveFeedEvents[activeLiveFeed].type === "interest" ? Home_module_css_1.default.interestIcon :
                    liveFeedEvents[activeLiveFeed].type === "crypto" ? Home_module_css_1.default.cryptoIcon :
                        liveFeedEvents[activeLiveFeed].type === "card" ? Home_module_css_1.default.cardIcon :
                            Home_module_css_1.default.defaultIcon)}>
                        {liveFeedEvents[activeLiveFeed].icon}
                      </div>
                      
                      {/* Status Indicator */}
                      <div className={"".concat(Home_module_css_1.default.statusIndicator, " ").concat(liveFeedEvents[activeLiveFeed].status === "completed" ? Home_module_css_1.default.statusCompleted :
                liveFeedEvents[activeLiveFeed].status === "pending" ? Home_module_css_1.default.statusPending :
                    Home_module_css_1.default.statusDefault)}/>
                    </div>

                    {/* Transaction Details */}
                    <div className={Home_module_css_1.default.transactionDetails}>
                      <div className={Home_module_css_1.default.transactionHeader}>
                        <p className={Home_module_css_1.default.transactionText}>
                          {liveFeedEvents[activeLiveFeed].text}
                        </p>
                        <span className={"".concat(Home_module_css_1.default.typeBadge, " ").concat(liveFeedEvents[activeLiveFeed].type === "send" ? Home_module_css_1.default.sendBadge :
                liveFeedEvents[activeLiveFeed].type === "interest" ? Home_module_css_1.default.interestBadge :
                    liveFeedEvents[activeLiveFeed].type === "crypto" ? Home_module_css_1.default.cryptoBadge :
                        Home_module_css_1.default.defaultBadge)}>
                          {liveFeedEvents[activeLiveFeed].type}
                        </span>
                      </div>
                      
                      {/* Additional Info */}
                      <div className={Home_module_css_1.default.transactionMeta}>
                        <div className={Home_module_css_1.default.timeInfo}>
                          <svg className={Home_module_css_1.default.timeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          {liveFeedEvents[activeLiveFeed].time}
                        </div>
                        
                        {"amount" in liveFeedEvents[activeLiveFeed] && (<div className={Home_module_css_1.default.amountInfo}>
                            <span className={"".concat(Home_module_css_1.default.amount, " ").concat(["send", "bill"].includes(liveFeedEvents[activeLiveFeed].type)
                    ? Home_module_css_1.default.amountNegative
                    : Home_module_css_1.default.amountPositive)}>
                              {["send", "bill"].includes(liveFeedEvents[activeLiveFeed].type) ? "-" : "+"}
                              ${(_b = liveFeedEvents[activeLiveFeed].amount) === null || _b === void 0 ? void 0 : _b.toLocaleString()}
                            </span>
                            <span className={Home_module_css_1.default.currency}>
                              {liveFeedEvents[activeLiveFeed].currency}
                            </span>
                          </div>)}
                        
                        {"country" in liveFeedEvents[activeLiveFeed] && (<div className={Home_module_css_1.default.locationInfo}>
                            <lucide_react_1.Globe className={Home_module_css_1.default.locationIcon}/>
                            {liveFeedEvents[activeLiveFeed].country}
                          </div>)}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className={Home_module_css_1.default.actionButton}>
                    <lucide_react_1.ArrowRight className={Home_module_css_1.default.actionIcon}/>
                  </button>
                </framer_motion_1.motion.div>

                {/* Live Feed Dots */}
                <div className={Home_module_css_1.default.feedDots}>
                  {liveFeedEvents.map(function (_, idx) { return (<button key={idx} onClick={function () { return setActiveLiveFeed(idx); }} className={"".concat(Home_module_css_1.default.feedDot, " ").concat(idx === activeLiveFeed ? Home_module_css_1.default.feedDotActive : '')} aria-label={"View transaction ".concat(idx + 1)}/>); })}
                </div>

                {/* Quick Stats */}
                <div className={Home_module_css_1.default.quickStats}>
                  <div className={Home_module_css_1.default.statCard}>
                    <div className={Home_module_css_1.default.statHeader}>
                      <span className={Home_module_css_1.default.statLabel}>Transactions/sec</span>
                      <div className={Home_module_css_1.default.pulseDot}/>
                    </div>
                    <p className={Home_module_css_1.default.statValue}>42</p>
                  </div>
                  
                  <div className={Home_module_css_1.default.statCard}>
                    <div className={Home_module_css_1.default.statHeader}>
                      <span className={Home_module_css_1.default.statLabel}>Total Today</span>
                      <lucide_react_1.TrendingUp className={Home_module_css_1.default.trendUpIcon}/>
                    </div>
                    <p className={Home_module_css_1.default.statValue}>$2.8M</p>
                  </div>
                  
                  <div className={Home_module_css_1.default.statCard}>
                    <div className={Home_module_css_1.default.statHeader}>
                      <span className={Home_module_css_1.default.statLabel}>Avg. Fee</span>
                      <lucide_react_1.TrendingDown className={Home_module_css_1.default.trendDownIcon}/>
                    </div>
                    <p className={Home_module_css_1.default.statValue}>$1.49</p>
                  </div>
                  
                  <div className={Home_module_css_1.default.statCard}>
                    <div className={Home_module_css_1.default.statHeader}>
                      <span className={Home_module_css_1.default.statLabel}>Success Rate</span>
                      <div className={Home_module_css_1.default.successDot}/>
                    </div>
                    <p className={Home_module_css_1.default.statValue}>99.8%</p>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </section>

      {/* STATS BAR WITH ANIMATIONS */}
      <section className={Home_module_css_1.default.statsSection}>
        <div className={Home_module_css_1.default.statsContainer}>
          <div className={Home_module_css_1.default.statsGrid}>
            {[
            { value: "5M+", label: "Active Users", icon: <lucide_react_1.Users className={Home_module_css_1.default.statIconLarge}/>, color: Home_module_css_1.default.statColor1 },
            { value: "180+", label: "Countries", icon: <lucide_react_1.Globe className={Home_module_css_1.default.statIconLarge}/>, color: Home_module_css_1.default.statColor2 },
            { value: "$2.8B+", label: "Transferred", icon: <lucide_react_1.TrendingUp className={Home_module_css_1.default.statIconLarge}/>, color: Home_module_css_1.default.statColor3 },
            { value: "4.9★", label: "Rating", icon: <lucide_react_1.Star className={Home_module_css_1.default.statIconLarge}/>, color: Home_module_css_1.default.statColor4 }
        ].map(function (stat, idx) { return (<framer_motion_1.motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className={Home_module_css_1.default.statItemLarge}>
                <div className={Home_module_css_1.default.statIconWrapper}>
                  <div className={"".concat(Home_module_css_1.default.statIconGradient, " ").concat(stat.color)}>
                    {stat.icon}
                  </div>
                  <p className={"".concat(Home_module_css_1.default.statValueLarge, " ").concat(stat.color)}>
                    {stat.value}
                  </p>
                </div>
                <p className={Home_module_css_1.default.statLabelLarge}>{stat.label}</p>
              </framer_motion_1.motion.div>); })}
          </div>
        </div>
      </section>

      {/* PERSONALIZED SAVINGS CALCULATOR */}
      <section className={Home_module_css_1.default.savingsSection}>
        <div className={Home_module_css_1.default.sectionContainer}>
          <div className={Home_module_css_1.default.sectionHeader}>
            <h2 className={Home_module_css_1.default.sectionTitle}>
              See Your Potential Savings
            </h2>
            <p className={Home_module_css_1.default.sectionDescription}>
              Calculate how much you could save based on your needs
            </p>
          </div>

          <div className={Home_module_css_1.default.calculatorGrid}>
            <div className={Home_module_css_1.default.calculatorInput}>
              <h3 className={Home_module_css_1.default.calculatorTitle}>What describes you best?</h3>
              
              <div className={Home_module_css_1.default.useCaseGrid}>
                {Object.entries(useCaseSavings).map(function (_a) {
            var key = _a[0], data = _a[1];
            return (<button key={key} onClick={function () { return setSelectedUseCase(key); }} className={"".concat(Home_module_css_1.default.useCaseButton, " ").concat(selectedUseCase === key ? Home_module_css_1.default.useCaseButtonActive : '')}>
                    <div className={Home_module_css_1.default.useCaseEmoji}>
                      {key === 'freelancer' && '💼'}
                      {key === 'student' && '🎓'}
                      {key === 'family' && '👨‍👩‍👧‍👦'}
                      {key === 'business' && '🏢'}
                      {key === 'traveler' && '✈️'}
                    </div>
                    <div className={Home_module_css_1.default.useCaseLabel}>{key}</div>
                  </button>);
        })}
              </div>

              <div className={Home_module_css_1.default.rangeContainer}>
                <label className={Home_module_css_1.default.rangeLabel}>
                  Monthly international transfers
                </label>
                <input type="range" min="0" max="10000" step="500" value={savingsAmount} onChange={function (e) { return setSavingsAmount(parseInt(e.target.value)); }} className={Home_module_css_1.default.rangeSlider}/>
                <div className={Home_module_css_1.default.rangeValues}>
                  <span>$0</span>
                  <span className={Home_module_css_1.default.rangeValue}>${savingsAmount}</span>
                  <span>$10,000</span>
                </div>
              </div>
            </div>

            <div className={Home_module_css_1.default.calculatorResult}>
              <div className={Home_module_css_1.default.resultHeader}>
                <h3 className={Home_module_css_1.default.resultTitle}>Your Annual Savings</h3>
                <p className={Home_module_css_1.default.resultDescription}>{(_c = useCaseSavings[selectedUseCase]) === null || _c === void 0 ? void 0 : _c.description}</p>
              </div>

              <div className={Home_module_css_1.default.resultAmount}>
                <div className={Home_module_css_1.default.resultValue}>
                  ${yearlySavings.toLocaleString()}
                </div>
                <p className={Home_module_css_1.default.resultSubtitle}>Per year with ClaveRica</p>
              </div>

              <div className={Home_module_css_1.default.savingsBreakdown}>
                <div className={Home_module_css_1.default.savingsRow}>
                  <span>Traditional bank fees</span>
                  <span className={Home_module_css_1.default.feeAmount}>${(savingsAmount * 0.03 * 12 + 300).toLocaleString()}</span>
                </div>
                <div className={Home_module_css_1.default.savingsRow}>
                  <span>ClaveRica fees</span>
                  <span className={Home_module_css_1.default.feeAmountSavings}>${(savingsAmount * 0.005 * 12).toLocaleString()}</span>
                </div>
                <div className={"".concat(Home_module_css_1.default.savingsRow, " ").concat(Home_module_css_1.default.savingsHighlight)}>
                  <span className={Home_module_css_1.default.savingsLabel}>Total savings</span>
                  <span className={Home_module_css_1.default.savingsTotal}>${yearlySavings.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION WITH HOVER EFFECTS */}
      <section className={Home_module_css_1.default.featuresSection}>
        <div className={Home_module_css_1.default.sectionContainer}>
          <div className={Home_module_css_1.default.sectionHeader}>
            <h2 className={"".concat(Home_module_css_1.default.sectionTitle, " ").concat(Home_module_css_1.default.featuresTitle)}>
              Everything You Need
              <span className={Home_module_css_1.default.titleGradientBlue}>
                In One Platform
              </span>
            </h2>
            <p className={Home_module_css_1.default.sectionDescription}>
              From instant payments to crypto trading, we've built the most comprehensive financial platform
            </p>
          </div>

          <div className={Home_module_css_1.default.featuresGrid}>
            {features.map(function (feature, idx) { return (<framer_motion_1.motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className={Home_module_css_1.default.featureCardWrapper}>
                <div className={Home_module_css_1.default.featureCardHover}/>
                <div className={Home_module_css_1.default.featureCard}>
                  <div className={"".concat(Home_module_css_1.default.featureIconContainer, " ").concat(feature.color)}>
                    {feature.icon}
                  </div>
                  <h3 className={Home_module_css_1.default.featureTitle}>{feature.title}</h3>
                  <p className={Home_module_css_1.default.featureDescription}>{feature.desc}</p>
                  <div className={Home_module_css_1.default.featureFooter}>
                    <Link to={feature.link} className={Home_module_css_1.default.featureLink}>
                      Learn more <lucide_react_1.ArrowRight className={Home_module_css_1.default.linkArrow}/>
                    </Link>
                    <span className={Home_module_css_1.default.featureStats}>
                      {feature.stats}
                    </span>
                  </div>
                </div>
              </framer_motion_1.motion.div>); })}
          </div>
        </div>
      </section>

      {/* INTERACTIVE APP PREVIEW */}
      <section className={Home_module_css_1.default.appPreviewSection}>
        <div className={Home_module_css_1.default.sectionContainer}>
          <div className={Home_module_css_1.default.appPreviewGrid}>
            <div className={Home_module_css_1.default.appMockupContainer}>
              <div className={Home_module_css_1.default.appMockupWrapper}>
                {/* Mock App Interface */}
                <div className={Home_module_css_1.default.appMockup}>
                  {/* App Header */}
                  <div className={Home_module_css_1.default.appHeader}>
                    <div>
                      <p className={Home_module_css_1.default.appHeaderLabel}>Total Balance</p>
                      <div className={Home_module_css_1.default.balanceContainer}>
                        <p className={Home_module_css_1.default.balanceAmount}>$81,314.00</p>
                        <button className={Home_module_css_1.default.eyeButton}>
                          <EyeIcon />
                        </button>
                      </div>
                    </div>
                    <div className={Home_module_css_1.default.appIcon}>
                      💎
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className={Home_module_css_1.default.quickActionsGrid}>
                    {[
            { icon: "💸", label: "Send" },
            { icon: "📥", label: "Request" },
            { icon: "🔄", label: "Convert" },
            { icon: "📊", label: "Invest" }
        ].map(function (action, idx) { return (<div key={idx} className={Home_module_css_1.default.quickActionItem}>
                        <div className={Home_module_css_1.default.actionIconContainer}>
                          {action.icon}
                        </div>
                        <span className={Home_module_css_1.default.actionLabel}>{action.label}</span>
                      </div>); })}
                  </div>

                  {/* Recent Activity */}
                  <div className={Home_module_css_1.default.recentActivity}>
                    <div className={Home_module_css_1.default.activityItem}>
                      <div className={Home_module_css_1.default.activityContent}>
                        <div className={Home_module_css_1.default.activityIcon}>
                          ✈️
                        </div>
                        <div>
                          <div className={Home_module_css_1.default.activityTitle}>Emirates Airlines</div>
                          <div className={Home_module_css_1.default.activityTime}>Today, 10:30 AM</div>
                        </div>
                      </div>
                      <div className={Home_module_css_1.default.activityAmountNegative}>-$845.00</div>
                    </div>
                    <div className={Home_module_css_1.default.activityItem}>
                      <div className={Home_module_css_1.default.activityContent}>
                        <div className={Home_module_css_1.default.activityIcon}>
                          📈
                        </div>
                        <div>
                          <div className={Home_module_css_1.default.activityTitle}>Interest Earned</div>
                          <div className={Home_module_css_1.default.activityTime}>Daily compounding</div>
                        </div>
                      </div>
                      <div className={Home_module_css_1.default.activityAmountPositive}>+$45.20</div>
                    </div>
                  </div>
                </div>

                {/* Floating Notification */}
                <div className={Home_module_css_1.default.floatingNotification}>
                  <div className={Home_module_css_1.default.notificationContent}>
                    <div className={Home_module_css_1.default.notificationIcon}>
                      <lucide_react_1.TrendingUp className={Home_module_css_1.default.notificationTrendIcon}/>
                    </div>
                    <div>
                      <p className={Home_module_css_1.default.notificationLabel}>This Month</p>
                      <p className={Home_module_css_1.default.notificationValue}>+24.5%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={Home_module_css_1.default.appInfo}>
              <div className={Home_module_css_1.default.appInfoContent}>
                <h2 className={Home_module_css_1.default.appInfoTitle}>
                  One Platform.
                  <span className={Home_module_css_1.default.appInfoTitleGradient}>
                    Total Financial Freedom.
                  </span>
                </h2>
                <p className={Home_module_css_1.default.appInfoDescription}>
                  Bank, pay, borrow, save, and trade crypto — all in one beautiful, secure app designed for the future.
                </p>
              </div>

              <div className={Home_module_css_1.default.benefitsList}>
                {[
            "No monthly fees or hidden charges",
            "Instant global transfers in 150+ currencies",
            "Trade 50+ cryptocurrencies 24/7",
            "Earn up to 12% APY on savings",
            "Premium metal cards with lounge access",
            "AI-powered financial insights"
        ].map(function (benefit, idx) { return (<framer_motion_1.motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className={Home_module_css_1.default.benefitItem}>
                    <div className={Home_module_css_1.default.benefitIcon}>
                      <lucide_react_1.CheckCircle className={Home_module_css_1.default.benefitCheckIcon}/>
                    </div>
                    <span className={Home_module_css_1.default.benefitText}>{benefit}</span>
                  </framer_motion_1.motion.div>); })}
              </div>

              <div className={Home_module_css_1.default.appCta}>
                <Link to="/signup" className={Home_module_css_1.default.btnSecondary}>
                  Get Started
                  <lucide_react_1.ArrowRight className={Home_module_css_1.default.ctaArrow}/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANIMATED PARTNERS CAROUSEL */}
      <section className={Home_module_css_1.default.partnersCarouselSection}>
        <div className={Home_module_css_1.default.sectionContainer}>
          <div className={Home_module_css_1.default.sectionHeader}>
            <h2 className={Home_module_css_1.default.sectionTitle}>
              Trusted by Industry Leaders
            </h2>
            <p className={Home_module_css_1.default.sectionDescription}>
              Partnering with global brands across 6 continents
            </p>
          </div>

          {/* Animated Carousel Container */}
          <div className={Home_module_css_1.default.carouselContainer}>
            <div className={Home_module_css_1.default.carouselTrack}>
              {/* First set of partners */}
              <div className={Home_module_css_1.default.carouselSlide}>
                {partners.map(function (partner, idx) { return (<div key={"first-".concat(idx)} className={Home_module_css_1.default.partnerLogoCircle}>
                    <img src={getPartnerLogo(partner.name)} alt={partner.name} className={Home_module_css_1.default.partnerLogoImage} onError={function (e) {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML =
                    "<div class=\"".concat(Home_module_css_1.default.fallbackLogoCircle, "\">\uD83C\uDFE2</div>");
            }}/>
                  </div>); })}
              </div>
              
              {/* Duplicate for seamless loop */}
              <div className={Home_module_css_1.default.carouselSlide}>
                {partners.map(function (partner, idx) { return (<div key={"second-".concat(idx)} className={Home_module_css_1.default.partnerLogoCircle}>
                    <img src={getPartnerLogo(partner.name)} alt={partner.name} className={Home_module_css_1.default.partnerLogoImage} onError={function (e) {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML =
                    "<div class=\"".concat(Home_module_css_1.default.fallbackLogoCircle, "\">\uD83C\uDFE2</div>");
            }}/>
                  </div>); })}
              </div>
            </div>
          </div>

          <p className={Home_module_css_1.default.partnershipNote}>
            <lucide_react_1.CheckCircle className={Home_module_css_1.default.checkIcon}/>
            Partnership opportunities available for businesses
          </p>
        </div>
      </section>

      {/* SECURITY SECTION */}
      <section className={Home_module_css_1.default.securitySection}>
        <div className={Home_module_css_1.default.sectionContainer}>
          <div className={Home_module_css_1.default.sectionHeader}>
            <h2 className={Home_module_css_1.default.sectionTitle}>
              Your Security is Our Priority
            </h2>
            <p className={Home_module_css_1.default.securityDescription}>
              Bank-level security, regulatory compliance, and 24/7 protection
            </p>
          </div>

          <div className={Home_module_css_1.default.securityGrid}>
            {[
            {
                icon: <lucide_react_1.Shield className={Home_module_css_1.default.securityIconSize}/>,
                title: "256-bit Encryption",
                description: "Military-grade encryption for all data"
            },
            {
                icon: <lucide_react_1.Lock className={Home_module_css_1.default.securityIconSize}/>,
                title: "FDIC Insured",
                description: "$250,000 protection per account"
            },
            {
                icon: <lucide_react_1.Zap className={Home_module_css_1.default.securityIconSize}/>,
                title: "Real-time Monitoring",
                description: "AI-powered fraud detection"
            },
            {
                icon: <lucide_react_1.Smartphone className={Home_module_css_1.default.securityIconSize}/>,
                title: "Biometric Auth",
                description: "Face ID & fingerprint login"
            }
        ].map(function (feature, idx) { return (<framer_motion_1.motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className={Home_module_css_1.default.securityCard}>
                <div className={Home_module_css_1.default.securityIconContainer}>
                  {feature.icon}
                </div>
                <h3 className={Home_module_css_1.default.securityCardTitle}>{feature.title}</h3>
                <p className={Home_module_css_1.default.securityCardDescription}>{feature.description}</p>
              </framer_motion_1.motion.div>); })}
          </div>

          {/* Compliance Badges */}
          <div className={Home_module_css_1.default.complianceBadges}>
            {['FDIC', 'PCI DSS', 'SOC 2', 'ISO 27001', 'GDPR'].map(function (badge, idx) { return (<framer_motion_1.motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} className={Home_module_css_1.default.complianceBadge}>
                {badge} Compliant
              </framer_motion_1.motion.div>); })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className={Home_module_css_1.default.testimonialsSection}>
        <div className={Home_module_css_1.default.sectionContainer}>
          <div className={Home_module_css_1.default.sectionHeader}>
            <h2 className={Home_module_css_1.default.sectionTitle}>
              Loved by Millions
            </h2>
            <p className={Home_module_css_1.default.sectionDescription}>
              Join 5M+ users who trust ClaveRica
            </p>
          </div>

          <div className={Home_module_css_1.default.testimonialContainer}>
            <div className={Home_module_css_1.default.testimonialCard}>
              <div className={Home_module_css_1.default.testimonialStars}>
                {__spreadArray([], Array(5), true).map(function (_, i) { return (<lucide_react_1.Star key={i} className={Home_module_css_1.default.star} fill="currentColor"/>); })}
              </div>
              
              <p className={Home_module_css_1.default.testimonialText}>
                "{testimonials[currentSlide].text}"
              </p>
              
              <div className={Home_module_css_1.default.testimonialAuthor}>
                <div className={Home_module_css_1.default.authorInfo}>
                  <div className={Home_module_css_1.default.authorImageContainer}>
                    <img src={testimonials[currentSlide].image} alt={testimonials[currentSlide].name} className={Home_module_css_1.default.authorImage} onError={function (e) {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.innerHTML = "\n                          <div class=\"".concat(Home_module_css_1.default.authorFallback, "\">\n                            ").concat(testimonials[currentSlide].name.substring(0, 2), "\n                          </div>\n                        ");
        }}/>
                  </div>
                  <div className={Home_module_css_1.default.authorDetails}>
                    <p className={Home_module_css_1.default.authorName}>
                      {testimonials[currentSlide].name}
                    </p>
                    <p className={Home_module_css_1.default.authorInfoText}>
                      {testimonials[currentSlide].role} • {testimonials[currentSlide].country}
                    </p>
                  </div>
                </div>
                
                <div className={Home_module_css_1.default.testimonialDots}>
                  {testimonials.map(function (_, idx) { return (<button key={idx} onClick={function () { return setCurrentSlide(idx); }} className={"".concat(Home_module_css_1.default.testimonialDot, " ").concat(idx === currentSlide ? Home_module_css_1.default.testimonialDotActive : '')} aria-label={"View testimonial ".concat(idx + 1)}/>); })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className={Home_module_css_1.default.ctaSection}>
        <div className={Home_module_css_1.default.ctaBackground}>
          <div className={Home_module_css_1.default.ctaPulse1}/>
          <div className={Home_module_css_1.default.ctaPulse2}/>
        </div>

        <div className={Home_module_css_1.default.ctaContent}>
          <h2 className={Home_module_css_1.default.ctaTitle}>
            Ready to Transform Your Finances?
          </h2>
          <p className={Home_module_css_1.default.ctaDescription}>
            Join millions who've already made the switch to smarter banking
          </p>

          <div className={Home_module_css_1.default.ctaButtons}>
            <Link to="/signup" className={Home_module_css_1.default.ctaButtonPrimary}>
              <span className={Home_module_css_1.default.ctaButtonContent}>
                Open Free Account
                <lucide_react_1.ArrowRight className={Home_module_css_1.default.ctaButtonArrow}/>
              </span>
            </Link>
            <Link to="/contact" className={Home_module_css_1.default.ctaButtonSecondary}>
              <span className={Home_module_css_1.default.ctaButtonContent}>
                <lucide_react_1.MessageCircle className={Home_module_css_1.default.ctaButtonIcon}/>
                Talk to Sales
              </span>
            </Link>
          </div>

          <div className={Home_module_css_1.default.ctaFeatures}>
            <div className={Home_module_css_1.default.ctaFeature}>
              <lucide_react_1.CheckCircle className={Home_module_css_1.default.ctaFeatureIcon}/>
              <p className={Home_module_css_1.default.ctaFeatureText}>No credit card required</p>
            </div>
            <div className={Home_module_css_1.default.ctaFeature}>
              <lucide_react_1.Clock className={Home_module_css_1.default.ctaFeatureIcon}/>
              <p className={Home_module_css_1.default.ctaFeatureText}>Set up in 2 minutes</p>
            </div>
            <div className={Home_module_css_1.default.ctaFeature}>
              <lucide_react_1.Shield className={Home_module_css_1.default.ctaFeatureIcon}/>
              <p className={Home_module_css_1.default.ctaFeatureText}>FDIC insured</p>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT BAR */}
      <section className={Home_module_css_1.default.supportBar}>
        <div className={Home_module_css_1.default.supportContainer}>
          <div className={Home_module_css_1.default.supportContent}>
            <p className={Home_module_css_1.default.supportText}>
              Questions? We're here to help 24/7
            </p>
            <div className={Home_module_css_1.default.supportLinks}>
              <button className={Home_module_css_1.default.supportLink}>
                <lucide_react_1.MessageCircle className={Home_module_css_1.default.supportIcon}/>
                Live Chat
              </button>
              <button className={Home_module_css_1.default.supportLink}>
                <lucide_react_1.Phone className={Home_module_css_1.default.supportIcon}/>
                +1 (888) 123-4567
              </button>
              <button className={Home_module_css_1.default.supportLink}>
                <lucide_react_1.Mail className={Home_module_css_1.default.supportIcon}/>
                support@claverica.com
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>);
}
// Helper component for eye icon
var EyeIcon = function () { return (<svg className={Home_module_css_1.default.eyeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
  </svg>); };
