"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Badges;
var PageBreadCrumb_1 = require("../../components/common/PageBreadCrumb");
var Badge_1 = require("../../components/ui/badge/Badge");
var icons_1 = require("../../icons");
var PageMeta_1 = require("../../components/common/PageMeta");
var ComponentCard_1 = require("../../components/common/ComponentCard");
function Badges() {
    return (<div>
      <PageMeta_1.default title="React.js Badges Dashboard | TailAdmin - React.js Admin Dashboard Template" description="This is React.js Badges Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"/>
      <PageBreadCrumb_1.default pageTitle="Badges"/>
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard_1.default title="With Light Background">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            {/* Light Variant */}
            <Badge_1.default variant="light" color="primary">
              Primary
            </Badge_1.default>
            <Badge_1.default variant="light" color="success">
              Success
            </Badge_1.default>{" "}
            <Badge_1.default variant="light" color="error">
              Error
            </Badge_1.default>{" "}
            <Badge_1.default variant="light" color="warning">
              Warning
            </Badge_1.default>{" "}
            <Badge_1.default variant="light" color="info">
              Info
            </Badge_1.default>
            <Badge_1.default variant="light" color="light">
              Light
            </Badge_1.default>
            <Badge_1.default variant="light" color="dark">
              Dark
            </Badge_1.default>
          </div>
        </ComponentCard_1.default>
        <ComponentCard_1.default title="With Solid Background">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            {/* Light Variant */}
            <Badge_1.default variant="solid" color="primary">
              Primary
            </Badge_1.default>
            <Badge_1.default variant="solid" color="success">
              Success
            </Badge_1.default>{" "}
            <Badge_1.default variant="solid" color="error">
              Error
            </Badge_1.default>{" "}
            <Badge_1.default variant="solid" color="warning">
              Warning
            </Badge_1.default>{" "}
            <Badge_1.default variant="solid" color="info">
              Info
            </Badge_1.default>
            <Badge_1.default variant="solid" color="light">
              Light
            </Badge_1.default>
            <Badge_1.default variant="solid" color="dark">
              Dark
            </Badge_1.default>
          </div>
        </ComponentCard_1.default>
        <ComponentCard_1.default title="Light Background with Left Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            <Badge_1.default variant="light" color="primary" startIcon={<icons_1.PlusIcon />}>
              Primary
            </Badge_1.default>
            <Badge_1.default variant="light" color="success" startIcon={<icons_1.PlusIcon />}>
              Success
            </Badge_1.default>{" "}
            <Badge_1.default variant="light" color="error" startIcon={<icons_1.PlusIcon />}>
              Error
            </Badge_1.default>{" "}
            <Badge_1.default variant="light" color="warning" startIcon={<icons_1.PlusIcon />}>
              Warning
            </Badge_1.default>{" "}
            <Badge_1.default variant="light" color="info" startIcon={<icons_1.PlusIcon />}>
              Info
            </Badge_1.default>
            <Badge_1.default variant="light" color="light" startIcon={<icons_1.PlusIcon />}>
              Light
            </Badge_1.default>
            <Badge_1.default variant="light" color="dark" startIcon={<icons_1.PlusIcon />}>
              Dark
            </Badge_1.default>
          </div>
        </ComponentCard_1.default>
        <ComponentCard_1.default title="Solid Background with Left Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            <Badge_1.default variant="solid" color="primary" startIcon={<icons_1.PlusIcon />}>
              Primary
            </Badge_1.default>
            <Badge_1.default variant="solid" color="success" startIcon={<icons_1.PlusIcon />}>
              Success
            </Badge_1.default>{" "}
            <Badge_1.default variant="solid" color="error" startIcon={<icons_1.PlusIcon />}>
              Error
            </Badge_1.default>{" "}
            <Badge_1.default variant="solid" color="warning" startIcon={<icons_1.PlusIcon />}>
              Warning
            </Badge_1.default>{" "}
            <Badge_1.default variant="solid" color="info" startIcon={<icons_1.PlusIcon />}>
              Info
            </Badge_1.default>
            <Badge_1.default variant="solid" color="light" startIcon={<icons_1.PlusIcon />}>
              Light
            </Badge_1.default>
            <Badge_1.default variant="solid" color="dark" startIcon={<icons_1.PlusIcon />}>
              Dark
            </Badge_1.default>
          </div>
        </ComponentCard_1.default>
        <ComponentCard_1.default title="Light Background with Right Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            <Badge_1.default variant="light" color="primary" endIcon={<icons_1.PlusIcon />}>
              Primary
            </Badge_1.default>
            <Badge_1.default variant="light" color="success" endIcon={<icons_1.PlusIcon />}>
              Success
            </Badge_1.default>{" "}
            <Badge_1.default variant="light" color="error" endIcon={<icons_1.PlusIcon />}>
              Error
            </Badge_1.default>{" "}
            <Badge_1.default variant="light" color="warning" endIcon={<icons_1.PlusIcon />}>
              Warning
            </Badge_1.default>{" "}
            <Badge_1.default variant="light" color="info" endIcon={<icons_1.PlusIcon />}>
              Info
            </Badge_1.default>
            <Badge_1.default variant="light" color="light" endIcon={<icons_1.PlusIcon />}>
              Light
            </Badge_1.default>
            <Badge_1.default variant="light" color="dark" endIcon={<icons_1.PlusIcon />}>
              Dark
            </Badge_1.default>
          </div>
        </ComponentCard_1.default>
        <ComponentCard_1.default title="Solid Background with Right Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            <Badge_1.default variant="solid" color="primary" endIcon={<icons_1.PlusIcon />}>
              Primary
            </Badge_1.default>
            <Badge_1.default variant="solid" color="success" endIcon={<icons_1.PlusIcon />}>
              Success
            </Badge_1.default>{" "}
            <Badge_1.default variant="solid" color="error" endIcon={<icons_1.PlusIcon />}>
              Error
            </Badge_1.default>{" "}
            <Badge_1.default variant="solid" color="warning" endIcon={<icons_1.PlusIcon />}>
              Warning
            </Badge_1.default>{" "}
            <Badge_1.default variant="solid" color="info" endIcon={<icons_1.PlusIcon />}>
              Info
            </Badge_1.default>
            <Badge_1.default variant="solid" color="light" endIcon={<icons_1.PlusIcon />}>
              Light
            </Badge_1.default>
            <Badge_1.default variant="solid" color="dark" endIcon={<icons_1.PlusIcon />}>
              Dark
            </Badge_1.default>
          </div>
        </ComponentCard_1.default>
      </div>
    </div>);
}
