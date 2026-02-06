"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserProfiles;
var PageBreadCrumb_1 = require("../components/common/PageBreadCrumb");
var UserMetaCard_1 = require("../components/UserProfile/UserMetaCard");
var UserInfoCard_1 = require("../components/UserProfile/UserInfoCard");
var UserAddressCard_1 = require("../components/UserProfile/UserAddressCard");
var PageMeta_1 = require("../components/common/PageMeta");
function UserProfiles() {
    return (<>
      <PageMeta_1.default title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template" description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"/>
      <PageBreadCrumb_1.default pageTitle="Profile"/>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard_1.default />
          <UserInfoCard_1.default />
          <UserAddressCard_1.default />
        </div>
      </div>
    </>);
}
