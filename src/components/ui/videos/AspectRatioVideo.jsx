"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AspectRatioVideo = function (_a) {
    var videoUrl = _a.videoUrl, _b = _a.aspectRatio, aspectRatio = _b === void 0 ? "video" : _b, // Default aspect ratio
    _c = _a.title, // Default aspect ratio
    title = _c === void 0 ? "Embedded Video" : _c;
    return (<div className={"aspect-".concat(aspectRatio, " overflow-hidden rounded-lg")}>
      <iframe src={videoUrl} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
    </div>);
};
exports.default = AspectRatioVideo;
