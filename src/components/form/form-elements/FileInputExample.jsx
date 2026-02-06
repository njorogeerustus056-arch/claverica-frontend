"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileInputExample;
var ComponentCard_1 = require("../../common/ComponentCard");
var FileInput_1 = require("../input/FileInput");
var Label_1 = require("../Label");
function FileInputExample() {
    var handleFileChange = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            console.log("Selected file:", file.name);
        }
    };
    return (<ComponentCard_1.default title="File Input">
      <div>
        <Label_1.default>Upload file</Label_1.default>
        <FileInput_1.default onChange={handleFileChange} className="custom-class"/>
      </div>
    </ComponentCard_1.default>);
}
