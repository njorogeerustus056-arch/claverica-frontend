"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = KycDocumentUpload;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
function KycDocumentUpload(_a) {
    var documents = _a.documents, uploadedFiles = _a.uploadedFiles, onUpload = _a.onUpload, onRemove = _a.onRemove;
    var _b = (0, react_1.useState)(null), dragOver = _b[0], setDragOver = _b[1];
    var _c = (0, react_1.useState)(null), uploadingDoc = _c[0], setUploadingDoc = _c[1];
    var fileInputRefs = (0, react_1.useRef)({});
    var handleFileSelect = function (docId, event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            validateAndUpload(docId, file);
        }
    };
    var handleDragOver = function (e, docId) {
        e.preventDefault();
        setDragOver(docId);
    };
    var handleDragLeave = function () {
        setDragOver(null);
    };
    var handleDrop = function (e, docId) {
        var _a;
        e.preventDefault();
        setDragOver(null);
        var file = (_a = e.dataTransfer.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            validateAndUpload(docId, file);
        }
    };
    var validateAndUpload = function (docId, file) {
        var _a;
        var doc = documents.find(function (d) { return d.id === docId; });
        if (!doc)
            return;
        // Check file type
        var fileExtension = '.' + ((_a = file.name.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase());
        var isValidType = doc.acceptedFormats.some(function (format) {
            return file.type.includes(format.replace('.', '')) || fileExtension === format;
        });
        if (!isValidType) {
            alert("Invalid file type. Accepted formats: ".concat(doc.acceptedFormats.join(', ')));
            return;
        }
        // Check file size
        var maxSizeBytes = doc.maxSizeMB * 1024 * 1024;
        if (file.size > maxSizeBytes) {
            alert("File too large. Maximum size: ".concat(doc.maxSizeMB, "MB"));
            return;
        }
        // Simulate upload process
        setUploadingDoc(docId);
        setTimeout(function () {
            onUpload(docId, file);
            setUploadingDoc(null);
        }, 1000);
    };
    var handleBrowseClick = function (docId) {
        var _a;
        (_a = fileInputRefs.current[docId]) === null || _a === void 0 ? void 0 : _a.click();
    };
    var handleViewPreview = function (docId) {
        var doc = documents.find(function (d) { return d.id === docId; });
        if (doc === null || doc === void 0 ? void 0 : doc.previewUrl) {
            window.open(doc.previewUrl, '_blank');
        }
    };
    var getDocIcon = function (type) {
        switch (type) {
            case 'government_id':
                return <lucide_react_1.FileText className="w-5 h-5"/>;
            case 'selfie':
                return <lucide_react_1.Camera className="w-5 h-5"/>;
            case 'address':
                return <lucide_react_1.FileText className="w-5 h-5"/>;
            default:
                return <lucide_react_1.FileText className="w-5 h-5"/>;
        }
    };
    var getStatusColor = function (doc) {
        if (doc.uploaded)
            return "bg-green-500/20 text-green-300 border-green-500/30";
        if (doc.isRequired)
            return "bg-blue-500/20 text-blue-300 border-blue-500/30";
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    };
    return (<div className="space-y-6">
      {/* Instructions */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <lucide_react_1.Upload className="w-6 h-6 text-white"/>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Upload Your Documents</h3>
            <p className="text-gray-300">Follow these guidelines for faster verification</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <lucide_react_1.CheckCircle2 className="w-4 h-4 text-green-400"/>
              <span className="text-white font-medium">Clear Photos</span>
            </div>
            <p className="text-gray-400 text-sm">Ensure all text is readable</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <lucide_react_1.CheckCircle2 className="w-4 h-4 text-green-400"/>
              <span className="text-white font-medium">Valid Formats</span>
            </div>
            <p className="text-gray-400 text-sm">JPG, PNG, or PDF files</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <lucide_react_1.CheckCircle2 className="w-4 h-4 text-green-400"/>
              <span className="text-white font-medium">Size Limit</span>
            </div>
            <p className="text-gray-400 text-sm">Max 10MB per file</p>
          </div>
        </div>
      </div>

      {/* Document Upload Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map(function (doc) {
            var _a, _b;
            return (<div key={doc.id} className={"bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border transition-all ".concat(dragOver === doc.id
                    ? 'border-blue-500/50 bg-blue-500/10'
                    : doc.uploaded
                        ? 'border-green-500/30'
                        : 'border-white/10 hover:border-white/20')} onDragOver={function (e) { return handleDragOver(e, doc.id); }} onDragLeave={handleDragLeave} onDrop={function (e) { return handleDrop(e, doc.id); }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={"w-10 h-10 rounded-xl flex items-center justify-center ".concat(doc.uploaded ? 'bg-green-500/20' : 'bg-blue-500/20')}>
                  {getDocIcon(doc.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-white">{doc.name}</h4>
                    {doc.isRequired && (<span className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded">
                        Required
                      </span>)}
                  </div>
                  <p className="text-gray-400 text-sm">{doc.description}</p>
                </div>
              </div>
              
              {doc.uploaded && (<span className="flex items-center gap-1 text-green-400 text-sm">
                  <lucide_react_1.CheckCircle2 className="w-4 h-4"/>
                  Uploaded
                </span>)}
            </div>

            {/* Upload Status */}
            {uploadingDoc === doc.id ? (<div className="flex items-center justify-center gap-3 py-8">
                <lucide_react_1.Loader2 className="w-6 h-6 text-blue-400 animate-spin"/>
                <span className="text-white">Uploading...</span>
              </div>) : doc.uploaded ? (<div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <lucide_react_1.FileText className="w-5 h-5 text-gray-400"/>
                      <div>
                        <p className="text-white text-sm font-medium">
                          {(_a = uploadedFiles[doc.id]) === null || _a === void 0 ? void 0 : _a.name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {(((_b = uploadedFiles[doc.id]) === null || _b === void 0 ? void 0 : _b.size) || 0) / 1024 / 1024} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={function () { return handleViewPreview(doc.id); }} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 hover:border-white/20 transition-colors" title="Preview">
                        <lucide_react_1.Eye className="w-4 h-4 text-gray-400"/>
                      </button>
                      <button onClick={function () { return onRemove(doc.id); }} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg border border-red-500/20 hover:border-red-500/30 transition-colors" title="Remove">
                        <lucide_react_1.X className="w-4 h-4 text-red-400"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>) : (<div className="space-y-4">
                {/* Upload Area */}
                <div className={"border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ".concat(dragOver === doc.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-white/20 hover:border-blue-500 hover:bg-blue-500/5')} onClick={function () { return handleBrowseClick(doc.id); }}>
                  <div className="flex flex-col items-center justify-center gap-3">
                    <lucide_react_1.Upload className="w-10 h-10 text-gray-400"/>
                    <div>
                      <p className="text-white font-medium">Drop file here or click to browse</p>
                      <p className="text-gray-400 text-sm mt-1">
                        {doc.acceptedFormats.join(', ')} • Max {doc.maxSizeMB}MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <lucide_react_1.AlertCircle className="w-4 h-4 text-amber-400"/>
                    <span className="text-white text-sm font-medium">Requirements:</span>
                  </div>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Clear, well-lit image</li>
                    <li>• All corners visible</li>
                    <li>• No glare or reflections</li>
                    {doc.type === 'selfie' && (<li>• Face clearly visible with ID</li>)}
                  </ul>
                </div>
              </div>)}

            {/* Hidden file input */}
            <input type="file" ref={function (el) { return fileInputRefs.current[doc.id] = el; }} onChange={function (e) { return handleFileSelect(doc.id, e); }} accept={doc.acceptedFormats.join(',')} className="hidden"/>
          </div>);
        })}
      </div>

      {/* Progress Summary */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-white">Upload Progress</h4>
            <p className="text-gray-300">
              {documents.filter(function (d) { return d.uploaded; }).length} of {documents.filter(function (d) { return d.isRequired; }).length} required documents uploaded
            </p>
          </div>
          <div className="w-24 h-24 relative">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="10"/>
              <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" strokeWidth="10" strokeLinecap="round" strokeDasharray={"".concat((documents.filter(function (d) { return d.uploaded; }).length / documents.filter(function (d) { return d.isRequired; }).length) * 283, " 283")} transform="rotate(-90 50 50)"/>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6"/>
                  <stop offset="100%" stopColor="#06b6d4"/>
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {Math.round((documents.filter(function (d) { return d.uploaded; }).length / documents.filter(function (d) { return d.isRequired; }).length) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
