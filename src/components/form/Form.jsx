"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Form = function (_a) {
    var onSubmit = _a.onSubmit, children = _a.children, className = _a.className;
    return (<form onSubmit={function (event) {
            event.preventDefault(); // Prevent default form submission
            onSubmit(event);
        }} className={" ".concat(className)} // Default spacing between form fields
    >
      {children}
    </form>);
};
exports.default = Form;
