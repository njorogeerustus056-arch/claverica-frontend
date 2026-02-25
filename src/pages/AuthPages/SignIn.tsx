import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Secure Sign In | ClaveRica"
        description="Access your institutional digital treasury with Goldman Sachs-grade security. Multi-signature authentication for crypto vaults and enterprise accounts."
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
