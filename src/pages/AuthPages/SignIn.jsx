"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignIn;
var PageMeta_1 = require("../../components/common/PageMeta");
var AuthPageLayout_1 = require("./AuthPageLayout");
var SignInForm_1 = require("../../components/auth/SignInForm");
function SignIn() {
    return (<>
      <PageMeta_1.default title="Secure Sign In | ClaveRica" description="Access your institutional digital treasury with Goldman Sachs-grade security. Multi-signature authentication for crypto vaults and enterprise accounts."/>
      <AuthPageLayout_1.default>
        <SignInForm_1.default />
      </AuthPageLayout_1.default>
    </>);
}
