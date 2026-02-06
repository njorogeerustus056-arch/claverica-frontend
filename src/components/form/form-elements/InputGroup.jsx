"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InputGroup;
var ComponentCard_1 = require("../../common/ComponentCard");
var Label_1 = require("../Label");
var InputField_1 = require("../input/InputField");
var icons_1 = require("../../../icons");
var PhoneInput_1 = require("../group-input/PhoneInput");
function InputGroup() {
    var countries = [
        { code: "US", label: "+1" },
        { code: "GB", label: "+44" },
        { code: "CA", label: "+1" },
        { code: "AU", label: "+61" },
    ];
    var handlePhoneNumberChange = function (phoneNumber) {
        console.log("Updated phone number:", phoneNumber);
    };
    return (<ComponentCard_1.default title="Input Group">
      <div className="space-y-6">
        <div>
          <Label_1.default>Email</Label_1.default>
          <div className="relative">
            <InputField_1.default placeholder="info@gmail.com" type="text" className="pl-[62px]"/>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <icons_1.EnvelopeIcon className="size-6"/>
            </span>
          </div>
        </div>
        <div>
          <Label_1.default>Phone</Label_1.default>
          <PhoneInput_1.default selectPosition="start" countries={countries} placeholder="+1 (555) 000-0000" onChange={handlePhoneNumberChange}/>
        </div>{" "}
        <div>
          <Label_1.default>Phone</Label_1.default>
          <PhoneInput_1.default selectPosition="end" countries={countries} placeholder="+1 (555) 000-0000" onChange={handlePhoneNumberChange}/>
        </div>
      </div>
    </ComponentCard_1.default>);
}
