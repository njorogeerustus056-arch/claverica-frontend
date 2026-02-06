"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ToggleSwitch;
var ComponentCard_1 = require("../../common/ComponentCard");
var Switch_1 = require("../switch/Switch");
function ToggleSwitch() {
    var handleSwitchChange = function (checked) {
        console.log("Switch is now:", checked ? "ON" : "OFF");
    };
    return (<ComponentCard_1.default title="Toggle switch input">
      <div className="flex gap-4">
        <Switch_1.default label="Default" defaultChecked={true} onChange={handleSwitchChange}/>
        <Switch_1.default label="Checked" defaultChecked={true} onChange={handleSwitchChange}/>
        <Switch_1.default label="Disabled" disabled={true}/>
      </div>{" "}
      <div className="flex gap-4">
        <Switch_1.default label="Default" defaultChecked={true} onChange={handleSwitchChange} color="gray"/>
        <Switch_1.default label="Checked" defaultChecked={true} onChange={handleSwitchChange} color="gray"/>
        <Switch_1.default label="Disabled" disabled={true} color="gray"/>
      </div>
    </ComponentCard_1.default>);
}
