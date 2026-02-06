import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Clock, 
  Shield, 
  Lock, 
  Building, 
  Globe, 
  CheckCircle2, 
  AlertCircle,
  Send,
  ExternalLink,
  Users,
  Award,
  CreditCard,
  Headphones
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContactSupport() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    priority: 'normal',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', category: 'general', priority: 'normal', message: '' });
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactChannels = [
    {
      icon: MessageSquare,
      title: 'In-App Chat',
      description: 'Instant help within the app',
      responseTime: '2-5 minutes',
      availability: '24/7',
      color: 'from-blue-600 to-cyan-500',
      action: () => window.open('#chat', '_self'),
      recommended: true
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with a specialist',
      responseTime: 'Immediate',
      availability: 'Mon-Fri, 9AM-8PM EST',
      color: 'from-green-600 to-emerald-500',
      contact: '+1 (855) 525-8373',
      action: 'tel:+18555258373'
    },
    {
      icon: Mail,
      title: 'Secure Email',
      description: 'For detailed inquiries',
      responseTime: '4-6 hours',
      availability: '24/7',
      color: 'from-purple-600 to-pink-500',
      contact: 'support@claverafinance.com',
      action: 'mailto:support@claverafinance.com'
    },
    {
      icon: Headphones,
      title: 'Emergency Line',
      description: 'Lost card or fraud alert',
      responseTime: 'Immediate',
      availability: '24/7',
      color: 'from-red-600 to-orange-500',
      contact: '+1 (888) 525-8374',
      action: 'tel:+18885258374',
      urgent: true
    }
  ];

  const faqs = [
    {
      question: 'How secure is my money with Clavera?',
      answer: 'Funds are held in pooled accounts at Goldman Sachs, protected by FDIC insurance up to $250,000 per depositor.'
    },
    {
      question: 'Are there fees for contacting support?',
      answer: 'No, all support channels are completely free. We believe in transparent banking with no hidden fees.'
    },
    {
      question: 'Can I get support in languages other than English?',
      answer: 'Yes! We offer support in Spanish, French, Mandarin, and Arabic during business hours.'
    },
    {
      question: 'What information should I have ready when contacting support?',
      answer: 'Have your account number, recent transaction details, and government-issued ID ready for faster verification.'
    }
  ];

  const securityFeatures = [
    { icon: Shield, text: 'Bank-level 256-bit encryption' },
    { icon: Lock, text: 'SOC 2 Type II certified' },
    { icon: Users, text: 'Dedicated fraud prevention team' },
    { icon: Award, text: 'FDIC insured through partner banks' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header - Matches Dashboard Style */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-4"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-3xl font-bold">Support Center</h1>
              <p className="text-blue-100 mt-2">Get help with your Clavera account</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">Trusted by 500,000+ users</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Trust Badge */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Your security is our priority</h3>
                <p className="text-gray-600 text-sm">Bank-grade protection for all communications</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {securityFeatures.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {contactChannels.map((channel, idx) => {
            const Icon = channel.icon;
            return (
              <div 
                key={idx}
                className={`relative rounded-2xl p-6 transition-all duration-300 hover:shadow-xl border ${
                  channel.recommended 
                    ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-white' 
                    : channel.urgent
                    ? 'border-red-200 bg-gradient-to-br from-red-50 to-white'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {channel.recommended && (
                  <div className="absolute -top-2 left-6 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Recommended
                  </div>
                )}
                {channel.urgent && (
                  <div className="absolute -top-2 left-6 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Urgent Only
                  </div>
                )}
                
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${channel.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{channel.title}</h3>
                <p className="text-gray-600 mb-4">{channel.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">Response: <strong>{channel.responseTime}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-700">Available: {channel.availability}</span>
                  </div>
                </div>
                
                {channel.contact ? (
                  <a
                    href={channel.action}
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-3 rounded-xl font-medium transition-all hover:scale-[1.02]"
                  >
                    {channel.contact}
                  </a>
                ) : (
                  <button
                    onClick={channel.action}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-medium transition-all hover:scale-[1.02]"
                  >
                    Start Chat
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Send Secure Message</h2>
                <p className="text-gray-600">Encrypted and monitored by our security team</p>
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Securely</h3>
                <p className="text-gray-600 mb-6">
                  Your encrypted message has been received. A specialist will respond within 4-6 hours.
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>Message ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issue Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="transaction">Transaction Issue</option>
                      <option value="card">Card Support</option>
                      <option value="security">Security Concern</option>
                      <option value="account">Account Management</option>
                      <option value="business">Business Account</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority Level
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High (Urgent)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Please describe your issue in detail..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-2">
                    All messages are encrypted end-to-end. Never share your password or PIN.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  Send Secure Message
                </button>
              </form>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Corporate Address */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Building className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold">Corporate Headquarters</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">The Goldman Sachs Tower</p>
                    <p className="text-gray-300">200 West Street</p>
                    <p className="text-gray-300">New York, New York 10282</p>
                    <p className="text-gray-300">United States</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400 mb-3">Major Banking Partners</p>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <span className="font-medium">Goldman Sachs</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <span className="font-medium">J.P. Morgan</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <span className="font-medium">Citibank</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Common Questions</h3>
                  <p className="text-gray-600 text-sm">Quick answers for frequent issues</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-4 last:border-0">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-500" />
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 text-sm pl-6">{faq.answer}</p>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => navigate('/help')}
                className="w-full mt-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                View All FAQ Articles
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Compliance Badge */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Regulatory Compliance</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Clavera is a registered financial institution operating under the supervision of banking authorities in all jurisdictions we serve.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">FINRA Member</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">FDIC Insured</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">PCI DSS Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Support */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Global Support Network</h3>
              <p className="text-blue-100 mb-6">
                With offices in 12 countries and support in 8 languages, we're here for you wherever you are.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">London • Singapore • Dubai</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">500+ Support Agents</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <div>
                  <div className="text-4xl font-bold">98%</div>
                  <div className="text-sm text-blue-200">Customer Satisfaction</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">&lt;2h</div>
                  <div className="text-sm text-blue-200">Avg Response Time</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">24/7</div>
                  <div className="text-sm text-blue-200">Emergency Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}