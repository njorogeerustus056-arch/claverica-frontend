import { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Star, 
  Zap,
  Shield,
  Globe,
  CreditCard,
  LineChart,
  Lock,
  Smartphone,
  Check,
  ArrowUpRight,
  BarChart3,
  Wallet,
  Mail,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { projects, type Project } from "@/data/projects";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [email, setEmail] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video autoplay prevented:", err));
    }
  }, []);

  const categories = [
    { id: "all", name: "All Projects", icon: Globe },
    { id: "payments", name: "Payments", icon: CreditCard },
    { id: "banking", name: "Banking", icon: Wallet },
    { id: "crypto", name: "Crypto", icon: LineChart },
    { id: "lending", name: "Lending", icon: TrendingUp },
    { id: "business", name: "Business", icon: BarChart3 },
    { id: "security", name: "Security", icon: Shield },
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Simulated trending projects (first 3)
  const trendingProjects = projects.slice(0, 3);

  // Simulated stats for each project
  const projectStats = {
    users: Math.floor(Math.random() * 500000) + 100000,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    growth: Math.floor(Math.random() * 150) + 50,
  };

  const handleSubscribe = () => {
    if (email) {
      alert(`Thank you for subscribing! You'll receive updates at ${email}`);
      setEmail("");
    } else {
      alert("Please enter your email address");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">

      {/* Hero Section with Video Background */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/Service1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-md text-blue-600 rounded-full text-sm font-bold mb-8 shadow-lg animate-pulse">
            <Sparkles className="w-4 h-4" />
            {projects.length} Premium Fintech Solutions
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
            Innovative Financial
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-extrabold">
              Technology Projects
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto mb-14 font-medium drop-shadow-lg">
            Explore cutting-edge fintech solutions inspired by industry leaders like Wise, Monzo, Revolut, and CashApp
          </p>

          {/* Enhanced Filter Tabs with Icons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-6 py-3.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                    activeFilter === cat.id
                      ? "bg-white text-gray-900 shadow-xl scale-105"
                      : "bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border border-white/30"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Projects Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
                <p className="text-gray-600">Most popular fintech solutions this month</p>
              </div>
            </div>
            <button 
              onClick={() => setShowComparison(!showComparison)}
              className="px-6 py-3 bg-white rounded-xl font-semibold text-gray-700 hover:shadow-lg transition-all flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Compare Projects
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingProjects.map((project, index) => (
              <Link 
                key={project.id}
                to={`/projects/${project.slug}`}
                className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 block"
              >
                {/* Trending Badge */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  #{index + 1} Trending
                </div>

                {/* Project Image with Overlay */}
                <div className={`relative h-64 bg-gradient-to-br ${project.color} overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="relative z-10 h-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                    <project.icon className="w-20 h-20 text-white drop-shadow-2xl" />
                  </div>

                  {/* Quick Stats Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white text-sm">
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                      <Users className="w-3 h-3" />
                      <span className="font-semibold">{(projectStats.users / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{projectStats.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                      <TrendingUp className="w-3 h-3" />
                      <span className="font-semibold">+{projectStats.growth}%</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </span>
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Live
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Integration Badges */}
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">REST API</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">Webhooks</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">SDK</span>
                  </div>

                  <div className="inline-flex items-center gap-2 text-blue-600 font-semibold group">
                    <span>Try Demo</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Projects Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">All Solutions</h2>
            <p className="text-lg text-gray-600">Browse our complete collection of fintech products and services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const isHovered = hoveredProject === project.id;
              return (
                <div 
                  key={project.id} 
                  className="group"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                    <div className={`relative h-48 bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10" />
                      
                      {/* Animated Background Elements */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl transform translate-x-16 -translate-y-16" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl transform -translate-x-12 translate-y-12" />
                      </div>

                      <div className="relative z-10 text-white transform group-hover:scale-110 transition-transform duration-300">
                        <project.icon className="w-16 h-16" />
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </div>

                      {/* Quick Stats on Hover */}
                      {isHovered && (
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs animate-fade-in">
                          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-full">
                            <Users className="w-3 h-3" />
                            <span>{(Math.floor(Math.random() * 500) + 50)}K</span>
                          </div>
                          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-full">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{(Math.random() * 1.5 + 3.5).toFixed(1)}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      {/* Status Badges */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                          Live
                        </span>
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          Secure
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                        {project.description}
                      </p>

                      {/* Features Preview */}
                      <div className="mb-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Smartphone className="w-3 h-3 text-blue-500" />
                          <span>Mobile & Web App</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Lock className="w-3 h-3 text-blue-500" />
                          <span>Bank-level Security</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Globe className="w-3 h-3 text-blue-500" />
                          <span>Global Coverage</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/projects/${project.slug}`}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all group"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                          to={`/demo/${project.slug}`}
                          className="p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                          title="Try Demo"
                        >
                          <ArrowUpRight className="w-4 h-4 text-gray-600" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table Overlay */}
      {showComparison && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Compare Projects</h3>
                <button 
                  onClick={() => setShowComparison(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left p-4 font-bold text-gray-900">Feature</th>
                      {filteredProjects.slice(0, 3).map(project => (
                        <th key={project.id} className="text-center p-4 font-bold text-gray-900">
                          <Link to={`/projects/${project.slug}`} className="hover:text-blue-600 transition-colors">
                            {project.title}
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-gray-600">Category</td>
                      {filteredProjects.slice(0, 3).map(project => (
                        <td key={project.id} className="p-4 text-center">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                            {project.category}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-gray-600">API Access</td>
                      {filteredProjects.slice(0, 3).map(project => (
                        <td key={project.id} className="p-4 text-center">
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-gray-600">Mobile App</td>
                      {filteredProjects.slice(0, 3).map(project => (
                        <td key={project.id} className="p-4 text-center">
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-gray-600">Rating</td>
                      {filteredProjects.slice(0, 3).map(project => (
                        <td key={project.id} className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{(Math.random() * 1.5 + 3.5).toFixed(1)}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-gray-600">Actions</td>
                      {filteredProjects.slice(0, 3).map(project => (
                        <td key={project.id} className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link 
                              to={`/projects/${project.slug}`}
                              className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              View
                            </Link>
                            <Link 
                              to={`/demo/${project.slug}`}
                              className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                            >
                              Demo
                            </Link>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Ready to Build the Future?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of users experiencing the next generation of financial technology
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated on New Projects
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Get notified when we launch new features and fintech solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-2xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              onClick={handleSubscribe}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}