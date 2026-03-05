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

  // Footer links - Only Platform and Company remain
  const footerLinks = {
    "Platform": [
      { name: "Services", path: "/services" },
      { name: "Projects", path: "/projects" },
      { name: "Features", path: "/features" }
    ],
    "Company": [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" }
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
            </div>

            {/* Footer Links Columns - Only Platform and Company remain */}
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
                © {currentYear} ClaveRica. All rights reserved.
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