"use client";


exports.useTheme = exports.ThemeProvider = void 0;
import react_1 from "react";
var ThemeContext = react_1.createContext(undefined);
var ThemeProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState("light"), theme = _b[0], setTheme = _b[1];
    var _c = react_1.useState(false), isReady = _c[0], setIsReady = _c[1];
    // Read theme from localStorage BEFORE UI loads
    react_1.useEffect(function () {
        var savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        setIsReady(true);
    }, []);
    // Apply the theme to <html class="dark"> + save to localStorage
    react_1.useEffect(function () {
        if (!isReady)
            return;
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme, isReady]);
    var toggleTheme = function () {
        setTheme(function (prev) { return (prev === "light" ? "dark" : "light"); });
    };
    var darkMode = theme === "dark";
    if (!isReady) {
        // Prevent flashing white/black when loading
        return (<div className="w-full h-screen bg-white dark:bg-[#0B0E14] transition-none"/>);
    }
    return (<ThemeContext.Provider value={{ theme: theme, darkMode: darkMode, toggleTheme: toggleTheme }}>
      {children}
    </ThemeContext.Provider>);
};
export { ThemeProvider };
var useTheme = function () {
    var ctx = react_1.useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }
    return ctx;
};
export { useTheme };
