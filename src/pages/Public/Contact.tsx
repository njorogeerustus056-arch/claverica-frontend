import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, Phone, MessageSquare, Clock, Send, CheckCircle2, 
  ArrowRight, Shield, Lock, Users, Zap, ChevronDown,
  Copy, Globe2, Smartphone, CreditCard, HelpCircle, AlertTriangle,
  Volume2, Star, Clock4, Calendar, Eye,
  Wallet, Bitcoin, PiggyBank, Handshake,
  Building2, TrendingUp, Scale, Award,
  ChevronRight, Sparkles, Lightbulb, Search
} from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    urgency: 'normal',
    category: 'general',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [typingQuery, setTypingQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeTab, setActiveTab] = useState('contact');
  const [copied, setCopied] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Mock support availability
  const [supportStatus, setSupportStatus] = useState({
    chat: { available: true, waitTime: '2 min' },
    phone: { available: true, waitTime: '5 min' },
    email: { available: true, responseTime: '2-4 hours' }
  });

  // FAQ Data - Creative and helpful
  const faqItems = [
    {
      id: 1,
      question: "🪪 How do I verify my identity?",
      answer: "Upload your government ID and a selfie in the app. Takes 2 minutes. Most verifications are approved within the hour.",
      category: "account",
      helpful: "92% found this helpful"
    },
    {
      id: 2,
      question: "💸 Where's my international transfer?",
      answer: "International transfers typically arrive in 1-2 business days. You can track it live in the app under 'Transactions'.",
      category: "payments",
      helpful: "88% found this helpful"
    },
    {
      id: 3,
      question: "🔒 Lost my card - what now?",
      answer: "Freeze it instantly in the app, then request a replacement. Emergency cash can be picked up at any partner bank.",
      category: "security",
      helpful: "96% found this helpful",
      urgent: true
    },
    {
      id: 4,
      question: "📱 Apple Pay not working?",
      answer: "Remove the card from Wallet, restart your phone, and add it again. Make sure iOS is updated to the latest version.",
      category: "technical",
      helpful: "84% found this helpful"
    },
    {
      id: 5,
      question: "💰 How do I increase my transfer limit?",
      answer: "Complete your profile, verify your identity, and maintain a good transaction history. Limits increase automatically over time.",
      category: "account",
      helpful: "91% found this helpful"
    },
    {
      id: 6,
      question: "🌍 Which currencies do you support?",
      answer: "40+ currencies including USD, EUR, GBP, JPY, AUD, CAD. We add new currencies monthly based on user requests.",
      category: "general",
      helpful: "87% found this helpful"
    }
  ];

  // Category icons mapping
  const categoryIcons = {
    account: <Shield className={styles.faqCategoryIcon} />,
    payments: <Globe2 className={styles.faqCategoryIcon} />,
    security: <Lock className={styles.faqCategoryIcon} />,
    technical: <Smartphone className={styles.faqCategoryIcon} />,
    general: <HelpCircle className={styles.faqCategoryIcon} />
  };

  // Simulate live status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSupportStatus(prev => ({
        ...prev,
        chat: { ...prev.chat, waitTime: `${Math.floor(Math.random() * 5) + 1} min` }
      }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Search suggestions
  useEffect(() => {
    if (typingQuery.length > 2) {
      const mockSuggestions = [
        'How to verify my account?',
        'International transfer fees',
        'Lost card reporting',
        'Two-factor authentication setup',
        'Transaction dispute process',
        'Exchange rate calculator'
      ].filter(item => 
        item.toLowerCase().includes(typingQuery.toLowerCase())
      );
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [typingQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', urgency: 'normal', category: 'general', message: '' });
    }, 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const contactMethods = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Fastest way to get help',
      contact: `Wait time: ${supportStatus.chat.waitTime}`,
      action: '#',
      gradient: 'gradientPurple',
      status: supportStatus.chat.available ? '🟢 Live now' : '🔴 Offline',
      bestFor: ['Quick questions', 'Account issues', 'Technical help']
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our specialists',
      contact: '+1 (332) 334-3426',
      action: 'tel:+13323343426',
      gradient: 'gradientGold',
      status: supportStatus.phone.available ? '🟢 Available' : '🔴 Closed',
      bestFor: ['Urgent matters', 'Fraud reports', 'Complex issues']
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Detailed written assistance',
      contact: 'support@claverica.com',
      action: 'mailto:support@claverica.com',
      gradient: 'gradientNavy',
      status: `⏱️ ${supportStatus.email.responseTime}`,
      bestFor: ['Documentation', 'Formal requests', 'Non-urgent queries']
    }
  ];

  const serviceCategories = [
    { 
      id: 'payments',
      icon: Globe2,
      label: 'Payments & Transfers', 
      color: 'purple',
      count: 5,
      description: 'Instant global transfers and payments',
      services: ['International transfers', 'Local payments', 'Bulk payments']
    },
    { 
      id: 'accounts',
      icon: Wallet,
      label: 'Multi-Currency Accounts', 
      color: 'navy',
      count: 3,
      description: 'Hold and manage 40+ currencies',
      services: ['USD accounts', 'EUR accounts', 'GBP accounts']
    },
    { 
      id: 'cards',
      icon: CreditCard,
      label: 'Cards & Digital Wallets', 
      color: 'gold',
      count: 4,
      description: 'Virtual and physical payment cards',
      services: ['Virtual cards', 'Metal cards', 'Apple/Google Pay']
    },
    { 
      id: 'crypto',
      icon: Bitcoin,
      label: 'Crypto Trading', 
      color: 'purple',
      count: 7,
      description: 'Trade 50+ cryptocurrencies',
      services: ['BTC/ETH trading', 'P2P trading', 'Crypto wallets']
    },
    { 
      id: 'savings',
      icon: PiggyBank,
      label: 'Savings & Investments', 
      color: 'teal',
      count: 6,
      description: 'High-yield savings and investments',
      services: ['12% APY savings', 'Daily compounding', 'Auto-invest']
    },
    { 
      id: 'business',
      icon: Building2,
      label: 'Business Solutions', 
      color: 'navy',
      count: 9,
      description: 'Complete business banking suite',
      services: ['Payroll processing', 'Merchant services', 'API integration']
    }
  ];

  const trendingIssues = [
    { title: 'Verify your identity', views: '1.2k', solved: true },
    { title: 'International transfer failed', views: '892', solved: true },
    { title: 'Update card PIN', views: '756', solved: false },
    { title: 'Enable biometric login', views: '654', solved: true }
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* Simple Header - No Hero */}
      <div className={styles.simpleHeader}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.pageTitle}>Contact Support</h1>
              <p className={styles.pageSubtitle}>We're here 24/7 to help with anything you need</p>
            </div>
            <div className={styles.headerStatus}>
              <div className={styles.headerStatusItem}>
                <div className={styles.statusDotGreen}></div>
                <span>Live chat online</span>
              </div>
              <div className={styles.headerStatusItem}>
                <Clock4 className={styles.headerStatusIcon} />
                <span>Phone: {supportStatus.phone.waitTime} wait</span>
              </div>
              <div className={styles.headerStatusItem}>
                <Mail className={styles.headerStatusIcon} />
                <span>Email: {supportStatus.email.responseTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={styles.container}>
        <div className={styles.tabNav}>
          <button
            onClick={() => setActiveTab('contact')}
            className={`${styles.tabButton} ${activeTab === 'contact' ? styles.tabActive : ''}`}
          >
            Contact Support
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`${styles.tabButton} ${activeTab === 'services' ? styles.tabActive : ''}`}
          >
            Browse Services
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.container}>
        {activeTab === 'contact' ? (
          <div className={styles.contactGrid}>
            {/* Left Column: Contact Methods and Form */}
            <div className={styles.contactMain}>
              {/* Contact Methods Cards */}
              <div className={styles.contactMethodsGrid}>
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div key={index} className={`${styles.contactCard} ${styles[method.gradient]}`}>
                      <div className={styles.contactCardHeader}>
                        <div className={styles.contactIconWrapper}>
                          <Icon className={styles.contactIcon} />
                        </div>
                        <span className={styles.contactStatus}>{method.status}</span>
                      </div>
                      
                      <h3 className={styles.contactTitle}>{method.title}</h3>
                      <p className={styles.contactDescription}>{method.description}</p>
                      
                      <div className={styles.contactDetails}>
                        <p className={styles.contactInfo}>
                          {method.contact}
                          {method.title === 'Email Support' && (
                            <button
                              onClick={() => copyToClipboard(method.contact)}
                              className={styles.copyButton}
                            >
                              <Copy className={styles.copyIcon} />
                              {copied && <span className={styles.copyTooltip}>Copied!</span>}
                            </button>
                          )}
                        </p>
                        
                        <div className={styles.bestForContainer}>
                          <Zap className={styles.bestForIcon} />
                          <span>Best for:</span>
                        </div>
                        
                        <div className={styles.bestForTags}>
                          {method.bestFor.map((item, idx) => (
                            <span key={idx} className={styles.bestForTag}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <a href={method.action} className={styles.contactLink}>
                        Contact now
                        <ArrowRight className={styles.linkIcon} />
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* ✨ CREATIVE FAQ SECTION - NO BUTTONS, JUST DESIGN ✨ */}
              <div className={styles.faqSection}>
                <div className={styles.faqHeader}>
                  <div className={styles.faqTitleWrapper}>
                    <Sparkles className={styles.faqSparkleIcon} />
                    <h2 className={styles.faqTitle}>Quick answers, no waiting</h2>
                  </div>
                  <p className={styles.faqSubtitle}>Most questions answered in under a minute</p>
                </div>

                <div className={styles.faqGrid}>
                  {faqItems.map((faq) => (
                    <div 
                      key={faq.id} 
                      className={`${styles.faqItem} ${expandedFaq === faq.id ? styles.faqItemExpanded : ''} ${faq.urgent ? styles.faqUrgent : ''}`}
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <div className={styles.faqQuestion}>
                        <div className={styles.faqQuestionLeft}>
                          <span className={styles.faqQuestionText}>{faq.question}</span>
                          {faq.urgent && (
                            <span className={styles.faqUrgentBadge}>urgent</span>
                          )}
                        </div>
                        <div className={styles.faqChevron}>
                          <ChevronRight className={`${styles.faqChevronIcon} ${expandedFaq === faq.id ? styles.faqChevronRotated : ''}`} />
                        </div>
                      </div>
                      
                      <div className={`${styles.faqAnswer} ${expandedFaq === faq.id ? styles.faqAnswerExpanded : ''}`}>
                        <div className={styles.faqAnswerContent}>
                          <p className={styles.faqAnswerText}>{faq.answer}</p>
                          <div className={styles.faqAnswerMeta}>
                            <div className={styles.faqCategory}>
                              {categoryIcons[faq.category]}
                              <span className={styles.faqCategoryText}>{faq.category}</span>
                            </div>
                            <div className={styles.faqHelpful}>
                              <Lightbulb className={styles.faqHelpfulIcon} />
                              <span className={styles.faqHelpfulText}>{faq.helpful}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.faqFooter}>
                  <div className={styles.faqSearchPrompt}>
                    <Search className={styles.faqSearchIcon} />
                    <span>Type above to search specific topics</span>
                  </div>
                  <div className={styles.faqStats}>
                    <div className={styles.faqStat}>
                      <CheckCircle2 className={styles.faqStatIcon} />
                      <span>92% satisfaction</span>
                    </div>
                    <div className={styles.faqStat}>
                      <Clock className={styles.faqStatIcon} />
                      <span>Updated daily</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className={styles.formCard}>
                <h2 className={styles.formTitle}>Send a detailed message</h2>
                <p className={styles.formSubtitle}>We'll get back to you within the promised timeframe</p>

                {submitted ? (
                  <div className={styles.successState}>
                    <div className={styles.successAnimation}>
                      <div className={styles.successIconWrapper}>
                        <CheckCircle2 className={styles.successIcon} />
                      </div>
                      <div className={styles.successBadge}>
                        <Clock className={styles.successBadgeIcon} />
                      </div>
                    </div>
                    <h3 className={styles.successTitle}>Message Received!</h3>
                    <p className={styles.successMessage}>
                      We'll respond {formData.urgency === 'urgent' ? 'within 1 hour' : 
                      formData.urgency === 'high' ? 'within 4 hours' : 'within 24 hours'}
                    </p>
                    <div className={styles.caseId}>
                      <Calendar className={styles.caseIdIcon} />
                      <span>Case ID: #{(Math.random() * 1000000).toFixed(0)}</span>
                    </div>
                  </div>
                ) : (
                  <form className={styles.form}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className={styles.formInput}
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Urgency Level</label>
                        <select
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleChange}
                          className={styles.formSelect}
                        >
                          <option value="normal">Normal (24h response)</option>
                          <option value="high">High (4h response)</option>
                          <option value="urgent">Urgent (1h response)</option>
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Category</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className={styles.formSelect}
                        >
                          <option value="general">General Inquiry</option>
                          <option value="account">Account Issue</option>
                          <option value="security">Security Concern</option>
                          <option value="payment">Payment Problem</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Brief description of your issue"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <div className={styles.textareaHeader}>
                        <label className={styles.formLabel}>Message *</label>
                        <span className={styles.charCount}>Max 2000 characters</span>
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        maxLength={2000}
                        placeholder="Please provide as much detail as possible..."
                        className={styles.formTextarea}
                      ></textarea>
                    </div>

                    <div className={styles.securityNote}>
                      <Lock className={styles.securityIcon} />
                      <span>Your data is encrypted and secure</span>
                    </div>

                    <button onClick={handleSubmit} className={styles.submitButton}>
                      <Send className={styles.submitIcon} />
                      <span>Send Secure Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Help Resources */}
            <div className={styles.helpSidebar}>
              {/* Emergency Card */}
              <div className={styles.emergencyCard}>
                <div className={styles.emergencyHeader}>
                  <AlertTriangle className={styles.emergencyIcon} />
                  <div>
                    <h4 className={styles.emergencyTitle}>Emergency Support</h4>
                    <p className={styles.emergencyDescription}>
                      Lost card? Suspect fraud? Contact immediately.
                    </p>
                  </div>
                </div>
                <div className={styles.emergencyActions}>
                  <a href="tel:+13323343426" className={styles.emergencyCall}>
                    <Phone className={styles.emergencyCallIcon} />
                    Call Emergency Line
                  </a>
                  <button className={styles.emergencyFreeze}>
                    Freeze My Card
                  </button>
                </div>
              </div>

              {/* Trending Issues */}
              <div className={styles.trendingCard}>
                <h3 className={styles.trendingTitle}>🔥 Trending This Week</h3>
                <div className={styles.trendingList}>
                  {trendingIssues.map((issue, idx) => (
                    <div key={idx} className={styles.trendingItem}>
                      <div className={styles.trendingItemLeft}>
                        <div className={`${styles.trendingDot} ${issue.solved ? styles.trendingDotSolved : styles.trendingDotUnsolved}`}></div>
                        <span className={styles.trendingIssueTitle}>{issue.title}</span>
                      </div>
                      <div className={styles.trendingViews}>
                        <Eye className={styles.trendingViewsIcon} />
                        <span>{issue.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className={styles.quickActionsCard}>
                <h3 className={styles.quickActionsTitle}>
                  <Zap className={styles.quickActionsIcon} />
                  Quick Actions
                </h3>
                <div className={styles.quickActionsList}>
                  <button onClick={() => navigate('/signup')} className={styles.quickActionButton}>
                    <div className={`${styles.quickActionIcon} ${styles.quickActionIconBlue}`}>
                      <CreditCard className={styles.quickActionIconSvg} />
                    </div>
                    <span>Open New Account</span>
                  </button>
                  <button onClick={() => navigate('/services')} className={styles.quickActionButton}>
                    <div className={`${styles.quickActionIcon} ${styles.quickActionIconPurple}`}>
                      <TrendingUp className={styles.quickActionIconSvg} />
                    </div>
                    <span>View All Services</span>
                  </button>
                  <button onClick={() => navigate('/security')} className={styles.quickActionButton}>
                    <div className={`${styles.quickActionIcon} ${styles.quickActionIconTeal}`}>
                      <Shield className={styles.quickActionIconSvg} />
                    </div>
                    <span>Security Center</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Services Tab Content */
          <div className={styles.servicesSection}>
            <div className={styles.servicesHeader}>
              <h2 className={styles.servicesTitle}>Explore Our Services</h2>
              <p className={styles.servicesSubtitle}>
                Discover our comprehensive range of financial services designed for individuals and businesses
              </p>
            </div>

            <div className={styles.servicesGrid}>
              {serviceCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    onClick={() => navigate('/services')}
                    className={`${styles.serviceCard} ${styles[`serviceCard${category.color.charAt(0).toUpperCase() + category.color.slice(1)}`]}`}
                  >
                    <div className={styles.serviceCardHeader}>
                      <div className={`${styles.serviceIconWrapper} ${styles[`serviceIcon${category.color.charAt(0).toUpperCase() + category.color.slice(1)}`]}`}>
                        <Icon className={styles.serviceIcon} />
                      </div>
                      <span className={styles.serviceCount}>{category.count} services</span>
                    </div>
                    
                    <h3 className={styles.serviceTitle}>{category.label}</h3>
                    <p className={styles.serviceDescription}>{category.description}</p>
                    
                    <div className={styles.serviceFeatures}>
                      {category.services.map((service, idx) => (
                        <div key={idx} className={styles.serviceFeature}>
                          <div className={styles.serviceFeatureDot}></div>
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={styles.serviceLink}>
                      <span>Explore Services</span>
                      <ArrowRight className={styles.serviceLinkIcon} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Comparison Section */}
            <div className={styles.comparisonSection}>
              <h3 className={styles.comparisonTitle}>Perfect for Everyone</h3>
              <div className={styles.comparisonGrid}>
                <div className={styles.comparisonCard}>
                  <h4 className={styles.comparisonCardTitle}>
                    <Users className={styles.comparisonCardIcon} />
                    Personal Banking
                  </h4>
                  <ul className={styles.comparisonList}>
                    <li className={styles.comparisonListItem}>
                      <CheckCircle2 className={styles.comparisonCheck} />
                      <span>Multi-currency accounts</span>
                    </li>
                    <li className={styles.comparisonListItem}>
                      <CheckCircle2 className={styles.comparisonCheck} />
                      <span>Instant global transfers</span>
                    </li>
                    <li className={styles.comparisonListItem}>
                      <CheckCircle2 className={styles.comparisonCheck} />
                      <span>Crypto trading & wallet</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.comparisonCard}>
                  <h4 className={styles.comparisonCardTitle}>
                    <Building2 className={styles.comparisonCardIcon} />
                    Business Solutions
                  </h4>
                  <ul className={styles.comparisonList}>
                    <li className={styles.comparisonListItem}>
                      <CheckCircle2 className={styles.comparisonCheck} />
                      <span>Global payroll processing</span>
                    </li>
                    <li className={styles.comparisonListItem}>
                      <CheckCircle2 className={styles.comparisonCheck} />
                      <span>Merchant payment gateway</span>
                    </li>
                    <li className={styles.comparisonListItem}>
                      <CheckCircle2 className={styles.comparisonCheck} />
                      <span>Corporate expense management</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.comparisonCta}>
                <button onClick={() => navigate('/services')} className={styles.viewAllButton}>
                  View All Services
                  <ArrowRight className={styles.viewAllIcon} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trust Indicators */}
      <div className={styles.container}>
        <div className={styles.trustBar}>
          <div className={styles.trustItem}>
            <Shield className={styles.trustIcon} />
            <div>
              <span className={styles.trustLabel}>256-bit Encryption</span>
              <span className={styles.trustValue}>Bank-grade security</span>
            </div>
          </div>
          <div className={styles.trustItem}>
            <Clock className={styles.trustIcon} />
            <div>
              <span className={styles.trustLabel}>Average response</span>
              <span className={styles.trustValue}>Under 15 minutes</span>
            </div>
          </div>
          <div className={styles.trustItem}>
            <Users className={styles.trustIcon} />
            <div>
              <span className={styles.trustLabel}>Happy customers</span>
              <span className={styles.trustValue}>2M+ worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}