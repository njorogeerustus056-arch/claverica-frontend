"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormElements;
var PageBreadCrumb_1 = require("../../components/common/PageBreadCrumb");
var DefaultInputs_1 = require("../../components/form/form-elements/DefaultInputs");
var InputGroup_1 = require("../../components/form/form-elements/InputGroup");
var DropZone_1 = require("../../components/form/form-elements/DropZone");
var CheckboxComponents_1 = require("../../components/form/form-elements/CheckboxComponents");
var RadioButtons_1 = require("../../components/form/form-elements/RadioButtons");
var ToggleSwitch_1 = require("../../components/form/form-elements/ToggleSwitch");
var FileInputExample_1 = require("../../components/form/form-elements/FileInputExample");
var SelectInputs_1 = require("../../components/form/form-elements/SelectInputs");
var TextAreaInput_1 = require("../../components/form/form-elements/TextAreaInput");
var InputStates_1 = require("../../components/form/form-elements/InputStates");
var PageMeta_1 = require("../../components/common/PageMeta");
function FormElements() {
    return (<div>
      <PageMeta_1.default title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template" description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"/>
      <PageBreadCrumb_1.default pageTitle="Form Elements"/>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs_1.default />
          <SelectInputs_1.default />
          <TextAreaInput_1.default />
          <InputStates_1.default />
        </div>
        <div className="space-y-6">
          <InputGroup_1.default />
          <FileInputExample_1.default />
          <CheckboxComponents_1.default />
          <RadioButtons_1.default />
          <ToggleSwitch_1.default />
          <DropZone_1.default />
        </div>
      </div>
    </div>);
}
