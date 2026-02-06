"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DefaultInputs;
var react_1 = require("react");
var ComponentCard_1 = require("../../common/ComponentCard");
var Label_1 = require("../Label");
var InputField_1 = require("../input/InputField");
var Select_1 = require("../Select");
var icons_1 = require("../../../icons");
var date_picker_tsx_1 = require("../date-picker.tsx");
function DefaultInputs() {
    var _a = (0, react_1.useState)(false), showPassword = _a[0], setShowPassword = _a[1];
    var options = [
        { value: "marketing", label: "Marketing" },
        { value: "template", label: "Template" },
        { value: "development", label: "Development" },
    ];
    var handleSelectChange = function (value) {
        console.log("Selected value:", value);
    };
    return (<ComponentCard_1.default title="Default Inputs">
      <div className="space-y-6">
        <div>
          <Label_1.default htmlFor="input">Input</Label_1.default>
          <InputField_1.default type="text" id="input"/>
        </div>
        <div>
          <Label_1.default htmlFor="inputTwo">Input with Placeholder</Label_1.default>
          <InputField_1.default type="text" id="inputTwo" placeholder="info@gmail.com"/>
        </div>
        <div>
          <Label_1.default>Select Input</Label_1.default>
          <Select_1.default options={options} placeholder="Select an option" onChange={handleSelectChange} className="dark:bg-dark-900"/>
        </div>
        <div>
          <Label_1.default>Password Input</Label_1.default>
          <div className="relative">
            <InputField_1.default type={showPassword ? "text" : "password"} placeholder="Enter your password"/>
            <button onClick={function () { return setShowPassword(!showPassword); }} className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
              {showPassword ? (<icons_1.EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5"/>) : (<icons_1.EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5"/>)}
            </button>
          </div>
        </div>

        <div>
          <date_picker_tsx_1.default id="date-picker" label="Date Picker Input" placeholder="Select a date" onChange={function (dates, currentDateString) {
            // Handle your logic
            console.log({ dates: dates, currentDateString: currentDateString });
        }}/>
        </div>

        <div>
          <Label_1.default htmlFor="tm">Time Picker Input</Label_1.default>
          <div className="relative">
            <InputField_1.default type="time" id="tm" name="tm" onChange={function (e) { return console.log(e.target.value); }}/>
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <icons_1.TimeIcon className="size-6"/>
            </span>
          </div>
        </div>
        <div>
          <Label_1.default htmlFor="tm">Input with Payment</Label_1.default>
          <div className="relative">
            <InputField_1.default type="text" placeholder="Card number" className="pl-[62px]"/>
            <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6.25" cy="10" r="5.625" fill="#E80B26"/>
                <circle cx="13.75" cy="10" r="5.625" fill="#F59D31"/>
                <path d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z" fill="#FC6020"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </ComponentCard_1.default>);
}
