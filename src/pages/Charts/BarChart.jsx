"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BarChart;
var PageBreadCrumb_1 = require("../../components/common/PageBreadCrumb");
var ComponentCard_1 = require("../../components/common/ComponentCard");
var BarChartOne_1 = require("../../components/charts/bar/BarChartOne");
var PageMeta_1 = require("../../components/common/PageMeta");
function BarChart() {
    return (<div>
      <PageMeta_1.default title="React.js Chart Dashboard | TailAdmin - React.js Admin Dashboard Template" description="This is React.js Chart Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"/>
      <PageBreadCrumb_1.default pageTitle="Bar Chart"/>
      <div className="space-y-6">
        <ComponentCard_1.default title="Bar Chart 1">
          <BarChartOne_1.default />
        </ComponentCard_1.default>
      </div>
    </div>);
}
