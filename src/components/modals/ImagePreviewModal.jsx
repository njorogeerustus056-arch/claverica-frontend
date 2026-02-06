"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagePreviewModal = void 0;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
var ImagePreviewModal = function (_a) {
    var imageUrl = _a.imageUrl, title = _a.title, isOpen = _a.isOpen, onClose = _a.onClose;
    var _b = react_1.default.useState(1), scale = _b[0], setScale = _b[1];
    var _c = react_1.default.useState(0), rotation = _c[0], setRotation = _c[1];
    var handleZoomIn = function () { return setScale(function (s) { return Math.min(s + 0.25, 3); }); };
    var handleZoomOut = function () { return setScale(function (s) { return Math.max(s - 0.25, 0.5); }); };
    var handleRotate = function () { return setRotation(function (r) { return (r + 90) % 360; }); };
    react_1.default.useEffect(function () {
        var handleEscape = function (e) {
            if (e.key === 'Escape')
                onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return function () {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);
    return (<framer_motion_1.AnimatePresence>
      {isOpen && (<framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75" onClick={onClose}>
          <framer_motion_1.motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-4xl max-h-[90vh] w-full overflow-hidden" onClick={function (e) { return e.stopPropagation(); }}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" aria-label="Close preview">
                <lucide_react_1.X className="w-5 h-5"/>
              </button>
            </div>

            {/* Image */}
            <div className="flex items-center justify-center p-8 overflow-auto">
              <framer_motion_1.motion.img src={imageUrl} alt={title} style={{
                transform: "scale(".concat(scale, ") rotate(").concat(rotation, "deg)"),
                transformOrigin: 'center',
            }} className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg" draggable={false}/>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 p-4 border-t border-gray-200 dark:border-gray-700">
              <button onClick={handleZoomOut} className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors" aria-label="Zoom out">
                <lucide_react_1.ZoomOut className="w-5 h-5"/>
              </button>
              
              <button onClick={function () { return setScale(1); }} className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                Reset Zoom
              </button>
              
              <button onClick={handleZoomIn} className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors" aria-label="Zoom in">
                <lucide_react_1.ZoomIn className="w-5 h-5"/>
              </button>
              
              <button onClick={handleRotate} className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors" aria-label="Rotate image">
                <lucide_react_1.RotateCw className="w-5 h-5"/>
              </button>
            </div>
          </framer_motion_1.motion.div>
        </framer_motion_1.motion.div>)}
    </framer_motion_1.AnimatePresence>);
};
exports.ImagePreviewModal = ImagePreviewModal;
