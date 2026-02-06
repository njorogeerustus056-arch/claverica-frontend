"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InputStates;
var react_1 = require("react");
var ComponentCard_1 = require("../../common/ComponentCard");
var InputField_1 = require("../input/InputField");
var Label_1 = require("../Label");
function InputStates() {
    var _a = (0, react_1.useState)(""), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(""), emailTwo = _b[0], setEmailTwo = _b[1];
    var _c = (0, react_1.useState)(false), error = _c[0], setError = _c[1];
    // Simulate a validation check
    var validateEmail = function (value) {
        var isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        setError(!isValidEmail);
        return isValidEmail;
    };
    var handleEmailChange = function (e) {
        var value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };
    var handleEmailTwoChange = function (e) {
        var value = e.target.value;
        setEmailTwo(value);
        validateEmail(value);
    };
    return (<ComponentCard_1.default title="Input States" desc="Validation styles for error, success and disabled states on form controls.">
      <div className="space-y-5 sm:space-y-6">
        {/* Error Input */}
        <div>
          <Label_1.default>Email</Label_1.default>
          <InputField_1.default type="email" value={email} error={error} onChange={handleEmailChange} placeholder="Enter your email" hint={error ? "This is an invalid email address." : ""}/>
        </div>

        {/* Success Input */}
        <div>
          <Label_1.default>Email</Label_1.default>
          <InputField_1.default type="email" value={emailTwo} success={!error} onChange={handleEmailTwoChange} placeholder="Enter your email" hint={!error ? "This is an success message." : ""}/>
        </div>

        {/* Disabled Input */}
        <div>
          <Label_1.default>Email</Label_1.default>
          <InputField_1.default type="text" value="disabled@example.com" disabled={true} placeholder="Disabled email"/>
        </div>
      </div>
    </ComponentCard_1.default>);
}
