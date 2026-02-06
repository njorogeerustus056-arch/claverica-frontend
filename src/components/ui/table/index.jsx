"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableCell = exports.TableRow = exports.TableBody = exports.TableHeader = exports.Table = void 0;
// Table Component
var Table = function (_a) {
    var children = _a.children, className = _a.className;
    return <table className={"min-w-full  ".concat(className)}>{children}</table>;
};
exports.Table = Table;
// TableHeader Component
var TableHeader = function (_a) {
    var children = _a.children, className = _a.className;
    return <thead className={className}>{children}</thead>;
};
exports.TableHeader = TableHeader;
// TableBody Component
var TableBody = function (_a) {
    var children = _a.children, className = _a.className;
    return <tbody className={className}>{children}</tbody>;
};
exports.TableBody = TableBody;
// TableRow Component
var TableRow = function (_a) {
    var children = _a.children, className = _a.className;
    return <tr className={className}>{children}</tr>;
};
exports.TableRow = TableRow;
// TableCell Component
var TableCell = function (_a) {
    var children = _a.children, _b = _a.isHeader, isHeader = _b === void 0 ? false : _b, className = _a.className;
    var CellTag = isHeader ? "th" : "td";
    return <CellTag className={" ".concat(className)}>{children}</CellTag>;
};
exports.TableCell = TableCell;
