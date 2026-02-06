"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Images;
var PageBreadCrumb_1 = require("../../components/common/PageBreadCrumb");
var ResponsiveImage_1 = require("../../components/ui/images/ResponsiveImage");
var TwoColumnImageGrid_1 = require("../../components/ui/images/TwoColumnImageGrid");
var ThreeColumnImageGrid_1 = require("../../components/ui/images/ThreeColumnImageGrid");
var ComponentCard_1 = require("../../components/common/ComponentCard");
var PageMeta_1 = require("../../components/common/PageMeta");
function Images() {
    return (<>
      <PageMeta_1.default title="React.js Images Dashboard | TailAdmin - React.js Admin Dashboard Template" description="This is React.js Images page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"/>
      <PageBreadCrumb_1.default pageTitle="Images"/>
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard_1.default title="Responsive image">
          <ResponsiveImage_1.default />
        </ComponentCard_1.default>
        <ComponentCard_1.default title="Image in 2 Grid">
          <TwoColumnImageGrid_1.default />
        </ComponentCard_1.default>
        <ComponentCard_1.default title="Image in 3 Grid">
          <ThreeColumnImageGrid_1.default />
        </ComponentCard_1.default>
      </div>
    </>);
}
