"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LineChart;
var PageBreadCrumb_1 = require("../../components/common/PageBreadCrumb");
var ComponentCard_1 = require("../../components/common/ComponentCard");
var LineChartOne_1 = require("../../components/charts/line/LineChartOne");
var PageMeta_1 = require("../../components/common/PageMeta");
function LineChart() {
    return (<>
      <PageMeta_1.default title="React.js Chart Dashboard | TailAdmin - React.js Admin Dashboard Template" description="This is React.js Chart Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"/>
      <PageBreadCrumb_1.default pageTitle="Line Chart"/>
      <div className="space-y-6">
        <ComponentCard_1.default title="Line Chart 1">
          <LineChartOne_1.default />
        </ComponentCard_1.default>
      </div>
    </>);
}
