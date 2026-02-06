"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdvancedContact;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
function AdvancedContact() {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)({
        name: '',
        email: '',
        subject: '',
        urgency: 'normal',
        category: 'general',
        message: ''
    }), formData = _a[0], setFormData = _a[1];
    var _b = (0, react_1.useState)(false), submitted = _b[0], setSubmitted = _b[1];
    var _c = (0, react_1.useState)(''), typingQuery = _c[0], setTypingQuery = _c[1];
    var _d = (0, react_1.useState)([]), suggestions = _d[0], setSuggestions = _d[1];
    var _e = (0, react_1.useState)('contact'), activeTab = _e[0], setActiveTab = _e[1];
    var _f = (0, react_1.useState)(false), copied = _f[0], setCopied = _f[1];
    var _g = (0, react_1.useState)('English'), selectedLanguage = _g[0], setSelectedLanguage = _g[1];
    // Mock support availability
    var _h = (0, react_1.useState)({
        chat: { available: true, waitTime: '2 min' },
        phone: { available: true, waitTime: '5 min' },
        email: { available: true, responseTime: '2-4 hours' }
    }), supportStatus = _h[0], setSupportStatus = _h[1];
    // Simulate live status updates
    (0, react_1.useEffect)(function () {
        var interval = setInterval(function () {
            setSupportStatus(function (prev) { return (__assign(__assign({}, prev), { chat: __assign(__assign({}, prev.chat), { waitTime: "".concat(Math.floor(Math.random() * 5) + 1, " min") }) })); });
        }, 30000);
        return function () { return clearInterval(interval); };
    }, []);
    // Search suggestions
    (0, react_1.useEffect)(function () {
        if (typingQuery.length > 2) {
            var mockSuggestions = [
                'How to verify my account?',
                'International transfer fees',
                'Lost card reporting',
                'Two-factor authentication setup',
                'Transaction dispute process',
                'Exchange rate calculator'
            ].filter(function (item) {
                return item.toLowerCase().includes(typingQuery.toLowerCase());
            });
            setSuggestions(mockSuggestions);
        }
        else {
            setSuggestions([]);
        }
    }, [typingQuery]);
    var handleSubmit = function (e) {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(function () {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', urgency: 'normal', category: 'general', message: '' });
        }, 5000);
    };
    var handleChange = function (e) {
        var _a;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    var contactMethods = [
        {
            icon: lucide_react_1.MessageSquare,
            title: 'Live Chat',
            description: 'Fastest way to get help',
            contact: "Wait time: ".concat(supportStatus.chat.waitTime),
            action: '#',
            color: 'from-green-500 to-emerald-500',
            status: supportStatus.chat.available ? '🟢 Live now' : '🔴 Offline',
            bestFor: ['Quick questions', 'Account issues', 'Technical help']
        },
        {
            icon: lucide_react_1.Phone,
            title: 'Phone Support',
            description: 'Speak with our specialists',
            contact: '+1 (332) 334-3426',
            action: 'tel:+13323343426',
            color: 'from-purple-500 to-pink-500',
            status: supportStatus.phone.available ? '🟢 Available' : '🔴 Closed',
            bestFor: ['Urgent matters', 'Fraud reports', 'Complex issues']
        },
        {
            icon: lucide_react_1.Mail,
            title: 'Email Support',
            description: 'Detailed written assistance',
            contact: 'support@claverica.com',
            action: 'mailto:clavericaforgnxchange.info@gmail.com',
            color: 'from-blue-500 to-cyan-500',
            status: "\u23F1\uFE0F ".concat(supportStatus.email.responseTime),
            bestFor: ['Documentation', 'Formal requests', 'Non-urgent queries']
        }
    ];
    // Service categories that will navigate to Services page
    var serviceCategories = [
        {
            id: 'payments',
            icon: lucide_react_1.Send,
            label: 'Payments & Transfers',
            color: 'blue',
            count: 5,
            description: 'Instant global transfers and payments',
            services: ['International transfers', 'Local payments', 'Bulk payments', 'Payment gateway']
        },
        {
            id: 'accounts',
            icon: lucide_react_1.Wallet,
            label: 'Multi-Currency Accounts',
            color: 'purple',
            count: 3,
            description: 'Hold and manage 40+ currencies',
            services: ['USD accounts', 'EUR accounts', 'GBP accounts', 'Crypto wallets']
        },
        {
            id: 'cards',
            icon: lucide_react_1.CreditCard,
            label: 'Cards & Digital Wallets',
            color: 'pink',
            count: 4,
            description: 'Virtual and physical payment cards',
            services: ['Virtual cards', 'Metal cards', 'Apple/Google Pay', 'Card controls']
        },
        {
            id: 'crypto',
            icon: lucide_react_1.Bitcoin,
            label: 'Crypto Trading',
            color: 'orange',
            count: 7,
            description: 'Trade 50+ cryptocurrencies',
            services: ['BTC/ETH trading', 'P2P trading', 'Crypto wallets', 'Staking']
        },
        {
            id: 'savings',
            icon: lucide_react_1.PiggyBank,
            label: 'Savings & Investments',
            color: 'emerald',
            count: 6,
            description: 'High-yield savings and investments',
            services: ['12% APY savings', 'Daily compounding', 'Auto-invest', 'Portfolio tracking']
        },
        {
            id: 'loans',
            icon: lucide_react_1.DollarSign,
            label: 'Loans & Financing',
            color: 'green',
            count: 8,
            description: 'Personal and business loans',
            services: ['Personal loans', 'Business loans', 'Fast approval', 'Flexible terms']
        },
        {
            id: 'escrow',
            icon: lucide_react_1.Handshake,
            label: 'Escrow Services',
            color: 'indigo',
            count: 4,
            description: 'Secure transaction protection',
            services: ['P2P escrow', 'Business escrow', 'Crypto escrow', 'Dispute resolution']
        },
        {
            id: 'business',
            icon: lucide_react_1.Building2,
            label: 'Business Solutions',
            color: 'cyan',
            count: 9,
            description: 'Complete business banking suite',
            services: ['Payroll processing', 'Merchant services', 'API integration', 'Multi-user access']
        }
    ];
    var trendingIssues = [
        { title: 'Verify your identity', views: '1.2k', solved: true },
        { title: 'International transfer failed', views: '892', solved: true },
        { title: 'Update card PIN', views: '756', solved: false },
        { title: 'Enable biometric login', views: '654', solved: true },
        { title: 'Transaction dispute guide', views: '543', solved: false }
    ];
    var languages = [
        { code: 'EN', name: 'English', flag: '🇺🇸' },
        { code: 'ES', name: 'Español', flag: '🇪🇸' },
        { code: 'FR', name: 'Français', flag: '🇫🇷' },
        { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'AR', name: 'العربية', flag: '🇸🇦' }
    ];
    var copyToClipboard = function (text) {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(function () { return setCopied(false); }, 2000);
    };
    var handleServiceClick = function (categoryId) {
        // Navigate to services page
        navigate('/services');
        // You could also pass state to scroll to specific section
        // navigate('/services', { state: { scrollTo: categoryId } });
    };
    return (<div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      
      {/* Animated Header */}
      <div className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Language Selector */}
          <div className="flex justify-end mb-6">
            <div className="relative inline-block">
              <select value={selectedLanguage} onChange={function (e) { return setSelectedLanguage(e.target.value); }} className="bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-2 text-sm appearance-none pr-10">
                {languages.map(function (lang) { return (<option key={lang.code} value={lang.name}>
                    {lang.flag} {lang.name}
                  </option>); })}
              </select>
              <lucide_react_1.ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"/>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-blue-400 text-sm font-medium">Support Online Now</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            How can we help you today?
          </h1>
          
          {/* Smart Search */}
          <div className="max-w-2xl mx-auto mb-8 relative">
            <div className="relative">
              <input type="text" value={typingQuery} onChange={function (e) { return setTypingQuery(e.target.value); }} placeholder="Ask a question or describe your issue..." className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"/>
              <lucide_react_1.HelpCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
            </div>
            
            {suggestions.length > 0 && (<div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl z-50">
                {suggestions.map(function (suggestion, idx) { return (<div key={idx} className="px-4 py-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-0 flex items-center gap-3" onClick={function () {
                    setTypingQuery(suggestion);
                    setSuggestions([]);
                }}>
                    <lucide_react_1.HelpCircle className="w-4 h-4 text-blue-400"/>
                    <span>{suggestion}</span>
                  </div>); })}
              </div>)}
          </div>

          {/* Status Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-gray-800/30 px-4 py-2 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Live chat: {supportStatus.chat.waitTime} wait</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/30 px-4 py-2 rounded-xl">
              <lucide_react_1.Clock4 className="w-4 h-4 text-blue-400"/>
              <span className="text-gray-300">Phone: {supportStatus.phone.waitTime} wait</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/30 px-4 py-2 rounded-xl">
              <lucide_react_1.Star className="w-4 h-4 text-yellow-400"/>
              <span className="text-gray-300">4.8/5 satisfaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex border-b border-gray-800">
          <button onClick={function () { return setActiveTab('contact'); }} className={"px-6 py-3 font-medium ".concat(activeTab === 'contact' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400')}>
            Contact Support
          </button>
          <button onClick={function () { return setActiveTab('services'); }} className={"px-6 py-3 font-medium ".concat(activeTab === 'services' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400')}>
            Browse Services
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {activeTab === 'contact' ? (<div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Contact Methods */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {contactMethods.map(function (method, index) {
                var Icon = method.icon;
                return (<div key={index} className="group relative bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-start justify-between mb-4">
                        <div className={"inline-flex p-3 rounded-xl bg-gradient-to-br ".concat(method.color)}>
                          <Icon className="w-6 h-6 text-white"/>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 bg-gray-700/50 rounded-full">
                          {method.status}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{method.description}</p>
                      
                      <div className="space-y-3 mb-4">
                        <p className="text-white font-medium flex items-center gap-2">
                          {method.contact}
                          {method.title === 'Email Support' && (<button onClick={function () { return copyToClipboard(method.contact); }} className="text-gray-400 hover:text-white">
                              <lucide_react_1.Copy className="w-4 h-4"/>
                            </button>)}
                        </p>
                        <div className="flex items-center gap-2">
                          <lucide_react_1.Zap className="w-4 h-4 text-yellow-400"/>
                          <span className="text-xs text-gray-400">Best for:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {method.bestFor.map(function (item, idx) { return (<span key={idx} className="text-xs px-2 py-1 bg-gray-700/30 rounded-full">
                              {item}
                            </span>); })}
                        </div>
                      </div>
                      
                      <a href={method.action} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm">
                        Contact now
                        <lucide_react_1.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                      </a>
                    </div>);
            })}
              </div>

              {/* Interactive Form */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-2">Send a detailed message</h2>
                <p className="text-gray-300 mb-6">We'll get back to you within the promised timeframe</p>

                {submitted ? (<div className="flex flex-col items-center justify-center py-12">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center">
                        <lucide_react_1.CheckCircle2 className="w-12 h-12 text-green-400"/>
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <lucide_react_1.Clock className="w-5 h-5 text-blue-400"/>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">Message Received!</h3>
                    <p className="text-gray-300 text-center mb-4">
                      We'll respond {formData.urgency === 'urgent' ? 'within 1 hour' :
                    formData.urgency === 'high' ? 'within 4 hours' : 'within 24 hours'}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <lucide_react_1.Calendar className="w-4 h-4"/>
                      <span>Case ID: #{(Math.random() * 1000000).toFixed(0)}</span>
                    </div>
                  </div>) : (<form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Urgency Level</label>
                        <select name="urgency" value={formData.urgency} onChange={handleChange} className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="normal">Normal (24h response)</option>
                          <option value="high">High (4h response)</option>
                          <option value="urgent">Urgent (1h response)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="general">General Inquiry</option>
                          <option value="account">Account Issue</option>
                          <option value="security">Security Concern</option>
                          <option value="payment">Payment Problem</option>
                          <option value="technical">Technical Issue</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Brief description of your issue" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-300">Message *</label>
                        <span className="text-xs text-gray-400">Max 2000 characters</span>
                      </div>
                      <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} maxLength={2000} placeholder="Please provide as much detail as possible..." className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"></textarea>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <lucide_react_1.Lock className="w-4 h-4"/>
                      <span>Your data is encrypted and secure</span>
                    </div>

                    <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] group">
                      <lucide_react_1.Send className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                      <span>Send Secure Message</span>
                    </button>
                  </form>)}
              </div>
            </div>

            {/* Right Column: Help Resources */}
            <div className="space-y-6">
              {/* Emergency Card */}
              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <lucide_react_1.AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0"/>
                  <div>
                    <h4 className="font-bold text-white mb-1">Emergency Support</h4>
                    <p className="text-gray-300 text-sm">
                      Lost card? Suspect fraud? Contact immediately.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <a href="tel:+13323343426" className="block w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl text-center transition-colors flex items-center justify-center gap-2">
                    <lucide_react_1.Phone className="w-4 h-4"/>
                    Call Emergency Line
                  </a>
                  <button className="w-full border border-red-500/30 text-red-400 hover:bg-red-500/10 font-medium py-3 px-4 rounded-xl text-center transition-colors">
                    Freeze My Card
                  </button>
                </div>
              </div>

              {/* Trending Issues */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">🔥 Trending This Week</h3>
                <div className="space-y-4">
                  {trendingIssues.map(function (issue, idx) { return (<div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={"w-2 h-2 rounded-full ".concat(issue.solved ? 'bg-green-400' : 'bg-yellow-400')}></div>
                        <span className="text-sm text-white">{issue.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <lucide_react_1.Eye className="w-3 h-3"/>
                        <span>{issue.views}</span>
                      </div>
                    </div>); })}
                </div>
              </div>

              {/* Quick Service Links */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <lucide_react_1.Zap className="w-5 h-5 text-yellow-400"/>
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button onClick={function () { return navigate('/signup'); }} className="w-full text-left p-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl transition-colors flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <lucide_react_1.CreditCard className="w-4 h-4 text-blue-400"/>
                    </div>
                    <span className="text-white">Open New Account</span>
                  </button>
                  <button onClick={function () { return navigate('/services'); }} className="w-full text-left p-3 bg-purple-500/10 hover:bg-purple-500/20 rounded-xl transition-colors flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <lucide_react_1.TrendingUp className="w-4 h-4 text-purple-400"/>
                    </div>
                    <span className="text-white">View All Services</span>
                  </button>
                  <button onClick={function () { return navigate('/security'); }} className="w-full text-left p-3 bg-green-500/10 hover:bg-green-500/20 rounded-xl transition-colors flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <lucide_react_1.Shield className="w-4 h-4 text-green-400"/>
                    </div>
                    <span className="text-white">Security Center</span>
                  </button>
                </div>
              </div>
            </div>
          </div>) : (
        /* Services Tab Content */
        <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Explore Our Services</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Discover our comprehensive range of financial services designed for individuals and businesses
              </p>
            </div>

            {/* Service Categories Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceCategories.map(function (category, index) {
                var Icon = category.icon;
                var colorClasses = {
                    blue: 'from-blue-500 to-cyan-500',
                    purple: 'from-purple-500 to-pink-500',
                    pink: 'from-pink-500 to-rose-500',
                    orange: 'from-orange-500 to-amber-500',
                    emerald: 'from-emerald-500 to-teal-500',
                    green: 'from-green-500 to-emerald-500',
                    indigo: 'from-indigo-500 to-purple-500',
                    cyan: 'from-cyan-500 to-blue-500'
                };
                return (<div key={category.id} onClick={function () { return handleServiceClick(category.id); }} className="group relative bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className={"inline-flex p-3 rounded-xl bg-gradient-to-br ".concat(colorClasses[category.color])}>
                        <Icon className="w-6 h-6 text-white"/>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 bg-gray-700/50 rounded-full">
                        {category.count} services
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2">{category.label}</h3>
                    <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {category.services.slice(0, 3).map(function (service, idx) { return (<div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></div>
                          <span className="text-xs text-gray-300">{service}</span>
                        </div>); })}
                      {category.services.length > 3 && (<div className="text-xs text-gray-500">
                          +{category.services.length - 3} more
                        </div>)}
                    </div>
                    
                    <div className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm">
                      <span>Explore Services</span>
                      <lucide_react_1.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                    </div>
                  </div>);
            })}
            </div>

            {/* Service Comparison */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 mt-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Perfect for Everyone</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                    <lucide_react_1.Users className="w-5 h-5 text-blue-400"/>
                    Personal Banking
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-gray-300">
                      <lucide_react_1.CheckCircle2 className="w-5 h-5 text-green-400"/>
                      <span>Multi-currency accounts</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <lucide_react_1.CheckCircle2 className="w-5 h-5 text-green-400"/>
                      <span>Instant global transfers</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <lucide_react_1.CheckCircle2 className="w-5 h-5 text-green-400"/>
                      <span>Crypto trading & wallet</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <lucide_react_1.CheckCircle2 className="w-5 h-5 text-green-400"/>
                      <span>High-yield savings vaults</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                    <lucide_react_1.Building2 className="w-5 h-5 text-purple-400"/>
                    Business Solutions
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-gray-300">
                      <lucide_react_1.CheckCircle2 className="w-5 h-5 text-green-400"/>
                      <span>Global payroll processing</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <lucide_react_1.CheckCircle2 className="w-5 h-5 text-green-400"/>
                      <span>Merchant payment gateway</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <lucide_react_1.CheckCircle2 className="w-5 h-5 text-green-400"/>
                      <span>Corporate expense management</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-300">
                      <lucide_react_1.CheckCircle2 className="w-5 h-5 text-green-400"/>
                      <span>Business escrow services</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-center mt-8">
                <button onClick={function () { return navigate('/services'); }} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-xl transition-all hover:scale-105">
                  View All Services
                  <lucide_react_1.ArrowRight className="w-5 h-5"/>
                </button>
              </div>
            </div>
          </div>)}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <lucide_react_1.Shield className="w-5 h-5"/>
              <span className="text-sm">Trusted by 2M+ customers globally</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join millions who trust ClaveRica for their financial needs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={function () { return navigate('/signup'); }} className="inline-flex items-center gap-3 bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl transition-all hover:scale-105">
                <lucide_react_1.CreditCard className="w-5 h-5"/>
                Open Free Account
              </button>
              <button onClick={function () { return navigate('/services'); }} className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/20 text-white hover:bg-white/30 font-semibold py-3 px-8 rounded-xl transition-all">
                <lucide_react_1.TrendingUp className="w-5 h-5"/>
                Explore Services
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Footer */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <lucide_react_1.Shield className="w-4 h-4"/>
            <span>256-bit Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <lucide_react_1.Lock className="w-4 h-4"/>
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <lucide_react_1.CheckCircle2 className="w-4 h-4"/>
            <span>ISO 27001 Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <lucide_react_1.Volume2 className="w-4 h-4"/>
            <span>No Cold Calls Guarantee</span>
          </div>
        </div>
      </div>
    </div>);
}
