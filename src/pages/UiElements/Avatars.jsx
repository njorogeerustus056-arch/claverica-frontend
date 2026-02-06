"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Avatars;
var PageBreadCrumb_1 = require("../../components/common/PageBreadCrumb");
var ComponentCard_1 = require("../../components/common/ComponentCard");
var Avatar_1 = require("../../components/ui/avatar/Avatar");
var PageMeta_1 = require("../../components/common/PageMeta");
function Avatars() {
    return (<>
      <PageMeta_1.default title="React.js Avatars Dashboard | TailAdmin - React.js Admin Dashboard Template" description="This is React.js Avatars Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"/>
      <PageBreadCrumb_1.default pageTitle="Avatars"/>
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard_1.default title="Default Avatar">
          {/* Default Avatar (No Status) */}
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Avatar_1.default src="/images/user/user-01.jpg" size="xsmall"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="small"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="medium"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="large"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="xlarge"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="xxlarge"/>
          </div>
        </ComponentCard_1.default>
        <ComponentCard_1.default title="Avatar with online indicator">
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Avatar_1.default src="/images/user/user-01.jpg" size="xsmall" status="online"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="small" status="online"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="medium" status="online"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="large" status="online"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="xlarge" status="online"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="xxlarge" status="online"/>
          </div>
        </ComponentCard_1.default>
        <ComponentCard_1.default title="Avatar with Offline indicator">
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Avatar_1.default src="/images/user/user-01.jpg" size="xsmall" status="offline"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="small" status="offline"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="medium" status="offline"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="large" status="offline"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="xlarge" status="offline"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="xxlarge" status="offline"/>
          </div>
        </ComponentCard_1.default>{" "}
        <ComponentCard_1.default title="Avatar with busy indicator">
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Avatar_1.default src="/images/user/user-01.jpg" size="xsmall" status="busy"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="small" status="busy"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="medium" status="busy"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="large" status="busy"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="xlarge" status="busy"/>
            <Avatar_1.default src="/images/user/user-01.jpg" size="xxlarge" status="busy"/>
          </div>
        </ComponentCard_1.default>
      </div>
    </>);
}
