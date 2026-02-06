"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Buttons;
var ComponentCard_1 = require("../../components/common/ComponentCard");
var PageBreadCrumb_1 = require("../../components/common/PageBreadCrumb");
var PageMeta_1 = require("../../components/common/PageMeta");
var Button_1 = require("../../components/ui/button/Button");
var icons_1 = require("../../icons");
function Buttons() {
    return (<div>
      <PageMeta_1.default title="React.js Buttons Dashboard | TailAdmin - React.js Admin Dashboard Template" description="This is React.js Buttons Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"/>
      <PageBreadCrumb_1.default pageTitle="Buttons"/>
      <div className="space-y-5 sm:space-y-6">
        {/* Primary Button */}
        <ComponentCard_1.default title="Primary Button">
          <div className="flex items-center gap-5">
            <Button_1.default size="sm" variant="primary">
              Button Text
            </Button_1.default>
            <Button_1.default size="md" variant="primary">
              Button Text
            </Button_1.default>
          </div>
        </ComponentCard_1.default>
        {/* Primary Button with Start Icon */}
        <ComponentCard_1.default title="Primary Button with Left Icon">
          <div className="flex items-center gap-5">
            <Button_1.default size="sm" variant="primary" startIcon={<icons_1.BoxIcon className="size-5"/>}>
              Button Text
            </Button_1.default>
            <Button_1.default size="md" variant="primary" startIcon={<icons_1.BoxIcon className="size-5"/>}>
              Button Text
            </Button_1.default>
          </div>
        </ComponentCard_1.default>
        {/* Primary Button with Start Icon */}
        <ComponentCard_1.default title="Primary Button with Right Icon">
          <div className="flex items-center gap-5">
            <Button_1.default size="sm" variant="primary" endIcon={<icons_1.BoxIcon className="size-5"/>}>
              Button Text
            </Button_1.default>
            <Button_1.default size="md" variant="primary" endIcon={<icons_1.BoxIcon className="size-5"/>}>
              Button Text
            </Button_1.default>
          </div>
        </ComponentCard_1.default>
        {/* Outline Button */}
        <ComponentCard_1.default title="Secondary Button">
          <div className="flex items-center gap-5">
            {/* Outline Button */}
            <Button_1.default size="sm" variant="outline">
              Button Text
            </Button_1.default>
            <Button_1.default size="md" variant="outline">
              Button Text
            </Button_1.default>
          </div>
        </ComponentCard_1.default>
        {/* Outline Button with Start Icon */}
        <ComponentCard_1.default title="Outline Button with Left Icon">
          <div className="flex items-center gap-5">
            <Button_1.default size="sm" variant="outline" startIcon={<icons_1.BoxIcon className="size-5"/>}>
              Button Text
            </Button_1.default>
            <Button_1.default size="md" variant="outline" startIcon={<icons_1.BoxIcon className="size-5"/>}>
              Button Text
            </Button_1.default>
          </div>
        </ComponentCard_1.default>{" "}
        {/* Outline Button with Start Icon */}
        <ComponentCard_1.default title="Outline Button with Right Icon">
          <div className="flex items-center gap-5">
            <Button_1.default size="sm" variant="outline" endIcon={<icons_1.BoxIcon className="size-5"/>}>
              Button Text
            </Button_1.default>
            <Button_1.default size="md" variant="outline" endIcon={<icons_1.BoxIcon className="size-5"/>}>
              Button Text
            </Button_1.default>
          </div>
        </ComponentCard_1.default>
      </div>
    </div>);
}
