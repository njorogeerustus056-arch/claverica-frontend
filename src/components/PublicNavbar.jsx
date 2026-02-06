"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PublicNavbar;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./public-navbar-styles.css");
function PublicNavbar() {
    var _a = (0, react_1.useState)(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = (0, react_1.useState)(false), scrolled = _b[0], setScrolled = _b[1];
    (0, react_1.useEffect)(function () {
        var handleScroll = function () {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return function () { return window.removeEventListener("scroll", handleScroll); };
    }, []);
    var navLinks = [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: "Services", path: "/services" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];
    return (<nav className={"fintech-navbar ".concat(scrolled ? "scrolled" : "")}>
      <div className="navbar-container">
        {/* ClaveRica Brand */}
        <react_router_dom_1.Link to="/" className="brand-wrapper">
          <span className="brand-name">ClaveRica</span>
        </react_router_dom_1.Link>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <div className="nav-links">
            {navLinks.map(function (link) { return (<react_router_dom_1.NavLink key={link.name} to={link.path} className={function (_a) {
                var isActive = _a.isActive;
                return isActive ? "nav-link active" : "nav-link";
            }}>
                {link.name}
              </react_router_dom_1.NavLink>); })}
          </div>

          {/* Auth Buttons */}
          <div className="auth-section">
            <react_router_dom_1.Link to="/signin" className="auth-btn signin">
              Sign In
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/signup" className="auth-btn primary">
              Get Started
            </react_router_dom_1.Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-toggle" onClick={function () { return setIsOpen(!isOpen); }} aria-label={isOpen ? "Close menu" : "Open menu"}>
          <span className={"bar bar-1 ".concat(isOpen ? "open" : "")}></span>
          <span className={"bar bar-2 ".concat(isOpen ? "open" : "")}></span>
          <span className={"bar bar-3 ".concat(isOpen ? "open" : "")}></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (<>
          <div className="mobile-backdrop" onClick={function () { return setIsOpen(false); }}></div>
          
          <div className="mobile-menu">
            <div className="mobile-content">
              {/* Mobile Navigation Links */}
              <div className="mobile-nav-links">
                {navLinks.map(function (link) { return (<react_router_dom_1.NavLink key={link.name} to={link.path} onClick={function () { return setIsOpen(false); }} className={function (_a) {
                    var isActive = _a.isActive;
                    return isActive ? "mobile-nav-link active" : "mobile-nav-link";
                }}>
                    {link.name}
                  </react_router_dom_1.NavLink>); })}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="mobile-auth">
                <react_router_dom_1.Link to="/signin" className="mobile-auth-btn signin" onClick={function () { return setIsOpen(false); }}>
                  Sign In
                </react_router_dom_1.Link>
                <react_router_dom_1.Link to="/signup" className="mobile-auth-btn primary" onClick={function () { return setIsOpen(false); }}>
                  Get Started
                </react_router_dom_1.Link>
              </div>
            </div>
          </div>
        </>)}
    </nav>);
}
