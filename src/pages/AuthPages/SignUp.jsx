"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignUp;
var PageMeta_1 = require("../../components/common/PageMeta");
var AuthPageLayout_1 = require("./AuthPageLayout");
var SignUpForm_1 = require("../../components/auth/SignUpForm");
function SignUp() {
    return (<>
      <PageMeta_1.default title="Institutional Digital Account | ClaveRica" description="Multi-signature crypto custody & enterprise payroll with Goldman Sachs' security infrastructure. Built for family offices and Fortune 500 treasury teams."/>
      <AuthPageLayout_1.default>
        <SignUpForm_1.default />
      </AuthPageLayout_1.default>
    </>);
}
