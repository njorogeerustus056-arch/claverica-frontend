"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadCard = void 0;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var FileUploadCard = function (_a) {
    var title = _a.title, description = _a.description, _b = _a.required, required = _b === void 0 ? false : _b, _c = _a.accept, accept = _c === void 0 ? 'image/*' : _c, file = _a.file, onFileSelect = _a.onFileSelect, onPreview = _a.onPreview, onRemove = _a.onRemove, onRetake = _a.onRetake, _d = _a.className, className = _d === void 0 ? '' : _d;
    var fileInputRef = (0, react_1.useRef)(null);
    var handleFileChange = function (e) {
        var _a;
        var selectedFile = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (selectedFile) {
            onFileSelect(selectedFile);
        }
    };
    var handleRemove = function () {
        onFileSelect(null);
        onRemove === null || onRemove === void 0 ? void 0 : onRemove();
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    return (<div className={"bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 ".concat(className)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title} {required && <span className="text-red-500">*</span>}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </p>
        </div>
        
        <div className="flex gap-2">
          {file && onPreview && (<button onClick={onPreview} className="p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors" aria-label="Preview image">
              <lucide_react_1.Eye className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
            </button>)}
          
          {file && onRetake && (<button onClick={onRetake} className="p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors" aria-label="Retake photo">
              <lucide_react_1.RotateCw className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
            </button>)}
        </div>
      </div>

      {file ? (<div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
              <lucide_react_1.Upload className="w-6 h-6 text-primary-600 dark:text-primary-400"/>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button onClick={handleRemove} className="p-2 text-gray-500 hover:text-red-500 transition-colors" aria-label="Remove file">
            <lucide_react_1.X className="w-5 h-5"/>
          </button>
        </div>) : (<button onClick={function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }} className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 hover:border-primary-400 dark:hover:border-primary-500 transition-colors flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <lucide_react_1.Upload className="w-8 h-8 text-gray-400 dark:text-gray-500"/>
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Click to upload
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              or drag and drop
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        </button>)}

      <input ref={fileInputRef} type="file" accept={accept} onChange={handleFileChange} className="hidden" aria-label={"Upload ".concat(title.toLowerCase())}/>
    </div>);
};
exports.FileUploadCard = FileUploadCard;
