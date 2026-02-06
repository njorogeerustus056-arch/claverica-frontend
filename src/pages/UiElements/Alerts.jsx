"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Alerts;
var PageBreadCrumb_1 = require("../../components/common/PageBreadCrumb");
var ComponentCard_1 = require("../../components/common/ComponentCard");
var Alert_1 = require("../../components/ui/alert/Alert");
var PageMeta_1 = require("../../components/common/PageMeta");
function Alerts() {
    return (<>
      <PageMeta_1.default title="React.js Alerts Dashboard | TailAdmin - React.js Admin Dashboard Template" description="This is React.js Alerts Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"/>
      <PageBreadCrumb_1.default pageTitle="Alerts"/>
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard_1.default title="Success Alert">
          <Alert_1.default variant="success" title="Success Message" message="Be cautious when performing this action." showLink={true} linkHref="/" linkText="Learn more"/>
          <Alert_1.default variant="success" title="Success Message" message="Be cautious when performing this action." showLink={false}/>
        </ComponentCard_1.default>
        <ComponentCard_1.default title="Warning Alert">
          <Alert_1.default variant="warning" title="Warning Message" message="Be cautious when performing this action." showLink={true} linkHref="/" linkText="Learn more"/>
          <Alert_1.default variant="warning" title="Warning Message" message="Be cautious when performing this action." showLink={false}/>
        </ComponentCard_1.default>{" "}
        <ComponentCard_1.default title="Error Alert">
          <Alert_1.default variant="error" title="Error Message" message="Be cautious when performing this action." showLink={true} linkHref="/" linkText="Learn more"/>
          <Alert_1.default variant="error" title="Error Message" message="Be cautious when performing this action." showLink={false}/>
        </ComponentCard_1.default>{" "}
        <ComponentCard_1.default title="Info Alert">
          <Alert_1.default variant="info" title="Info Message" message="Be cautious when performing this action." showLink={true} linkHref="/" linkText="Learn more"/>
          <Alert_1.default variant="info" title="Info Message" message="Be cautious when performing this action." showLink={false}/>
        </ComponentCard_1.default>
      </div>
    </>);
}
