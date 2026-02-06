"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BasicTables;
var PageBreadCrumb_1 = require("../../components/common/PageBreadCrumb");
var ComponentCard_1 = require("../../components/common/ComponentCard");
var PageMeta_1 = require("../../components/common/PageMeta");
var BasicTableOne_1 = require("../../components/tables/BasicTables/BasicTableOne");
function BasicTables() {
    return (<>
      <PageMeta_1.default title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template" description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"/>
      <PageBreadCrumb_1.default pageTitle="Basic Tables"/>
      <div className="space-y-6">
        <ComponentCard_1.default title="Basic Table 1">
          <BasicTableOne_1.default />
        </ComponentCard_1.default>
      </div>
    </>);
}
