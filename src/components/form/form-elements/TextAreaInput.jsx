"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TextAreaInput;
var react_1 = require("react");
var ComponentCard_1 = require("../../common/ComponentCard");
var TextArea_1 = require("../input/TextArea");
var Label_1 = require("../Label");
function TextAreaInput() {
    var _a = (0, react_1.useState)(""), message = _a[0], setMessage = _a[1];
    var _b = (0, react_1.useState)(""), messageTwo = _b[0], setMessageTwo = _b[1];
    return (<ComponentCard_1.default title="Textarea input field">
      <div className="space-y-6">
        {/* Default TextArea */}
        <div>
          <Label_1.default>Description</Label_1.default>
          <TextArea_1.default value={message} onChange={function (value) { return setMessage(value); }} rows={6}/>
        </div>

        {/* Disabled TextArea */}
        <div>
          <Label_1.default>Description</Label_1.default>
          <TextArea_1.default rows={6} disabled/>
        </div>

        {/* Error TextArea */}
        <div>
          <Label_1.default>Description</Label_1.default>
          <TextArea_1.default rows={6} value={messageTwo} error onChange={function (value) { return setMessageTwo(value); }} hint="Please enter a valid message."/>
        </div>
      </div>
    </ComponentCard_1.default>);
}
