"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Videos;
var ComponentCard_1 = require("../../components/common/ComponentCard");
var PageBreadCrumb_1 = require("../../components/common/PageBreadCrumb");
var PageMeta_1 = require("../../components/common/PageMeta");
var FourIsToThree_1 = require("../../components/ui/videos/FourIsToThree");
var OneIsToOne_1 = require("../../components/ui/videos/OneIsToOne");
var SixteenIsToNine_1 = require("../../components/ui/videos/SixteenIsToNine");
var TwentyOneIsToNine_1 = require("../../components/ui/videos/TwentyOneIsToNine");
function Videos() {
    return (<>
      <PageMeta_1.default title="React.js Videos Tabs | TailAdmin - React.js Admin Dashboard Template" description="This is React.js Videos page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"/>
      <PageBreadCrumb_1.default pageTitle="Videos"/>
      <div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-2">
        <div className="space-y-5 sm:space-y-6">
          <ComponentCard_1.default title="Video Ratio 16:9">
            <SixteenIsToNine_1.default />
          </ComponentCard_1.default>
          <ComponentCard_1.default title="Video Ratio 4:3">
            <FourIsToThree_1.default />
          </ComponentCard_1.default>
        </div>
        <div className="space-y-5 sm:space-y-6">
          <ComponentCard_1.default title="Video Ratio 21:9">
            <TwentyOneIsToNine_1.default />
          </ComponentCard_1.default>
          <ComponentCard_1.default title="Video Ratio 1:1">
            <OneIsToOne_1.default />
          </ComponentCard_1.default>
        </div>
      </div>
    </>);
}
