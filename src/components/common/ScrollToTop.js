

export const ScrollToTop = ScrollToTop;
var react_1 = require("react");
var react_router_1 = require("react-router");
function ScrollToTop() {
    var pathname = (0, react_router_1.useLocation)().pathname;
    (0, react_1.useEffect)(function () {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [pathname]);
    return null;
}


