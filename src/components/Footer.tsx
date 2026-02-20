import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      if (email.includes("@") && email.includes(".")) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    }, 1500);
  };

  const socialLinks = [
    {
      name: "Twitter",
      url: "https://twitter.com/claverica",
      icon: (
        <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/claverica",
      icon: (
        <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/claverica",
      icon: (
        <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3.005.405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
    {
      name: "Discord",
      url: "https://discord.gg/claverica",
      icon: (
        <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3938-.3973-.8742-.6093-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0105c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3333-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3333-.946 2.4189-2.1568 2.4189z" />
        </svg>
      ),
    },
  ];

  // UPDATED: Only links that exist in your routes
  const footerLinks = {
    "Platform": [
      { name: "Services", path: "/services" },
      { name: "Projects", path: "/projects" },
      { name: "Features", path: "/features" }
    ],
    "Company": [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" }
    ],
    "Support": [
      { name: "Help Center", path: "/contact" },
      { name: "Live Chat", path: "/contact" },
      { name: "Emergency", path: "/contact" }
    ]
  };

  return (
    <footer className={styles.footer}>
      {/* Newsletter Section - Compact */}
      <div className={styles.newsletterSection}>
        <div className={styles.container}>
          <div className={styles.newsletterGrid}>
            <div className={styles.newsletterContent}>
              <h3 className={styles.newsletterTitle}>
                Stay Updated
              </h3>
              <p className={styles.newsletterText}>
                Get fintech insights and offers
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
              <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className={`${styles.newsletterInput} ${
                      status === "success" ? styles.inputSuccess : ""
                    } ${status === "error" ? styles.inputError : ""}`}
                    disabled={status === "loading"}
                    aria-label="Email for newsletter"
                  />
                  {status === "success" && (
                    <div className={styles.successIcon}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={styles.subscribeButton}
                >
                  {status === "loading" ? (
                    <span className={styles.loadingContent}>
                      <svg className={styles.spinner} viewBox="0 0 24 24">
                        <circle className={styles.spinnerTrack} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className={styles.spinnerFill} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>...</span>
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
              
              {status === "error" && (
                <p className={styles.errorMessage}>
                  Valid email required
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content - Compact */}
      <div className={styles.mainFooter}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Brand Column */}
            <div className={styles.brandColumn}>
              <div className={styles.logoWrapper}>
                <div className={styles.logo}>
                  <span>CR</span>
                </div>
                <span className={styles.brandName}>
                  Clave<span className={styles.brandAccent}>Rica</span>
                </span>
              </div>
              
              <p className={styles.brandDescription}>
                Modern banking for the digital age.
              </p>
              
              {/* Trust Badges - Compact */}
              <div className={styles.trustBadges}>
                <span className={styles.badge}>FDIC</span>
                <span className={styles.badge}>256-bit</span>
                <span className={styles.badge}>SOC2</span>
              </div>
              
              {/* Social Links */}
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links Columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className={styles.linkColumn}>
                <h3 className={styles.linkCategory}>{category}</h3>
                <ul className={styles.linkList}>
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className={styles.footerLink}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar - Updated with correct legal text */}
          <div className={styles.bottomBar}>
            <div className={styles.bottomBarContent}>
              <p className={styles.copyright}>
                © {currentYear} ClaveRica (The Goldman Sachs Group). All rights reserved.
              </p>
              
              <div className={styles.legalLinks}>
                <Link to="/privacy" className={styles.legalLink}>
                  Privacy
                </Link>
                <Link to="/terms" className={styles.legalLink}>
                  Terms
                </Link>
                <Link to="/cookies" className={styles.legalLink}>
                  Cookies
                </Link>
              </div>
            </div>
            
            {/* Trademark Info */}
            <div className={styles.trademarkInfo}>
              <p>ClaveRica is a registered trademark. ClaveRica Technologies Ltd is authorized and regulated by the Financial Conduct Authority.</p>
            </div>
            
            {/* Headquarters */}
            <div className={styles.headquarters}>
              <p>Headquarters: 200 West Street, New York, NY 10282</p>
            </div>
            
            {/* Registered Office */}
            <p className={styles.regulatoryText}>
              Registered in England and Wales No. 53893. Registered office: 25 Shoe Lane, London, EC4A 4AU
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}