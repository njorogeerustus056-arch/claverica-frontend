import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Institutional Digital Account | ClaveRica"
        description="Multi-signature crypto custody & enterprise payroll with Goldman Sachs' security infrastructure. Built for family offices and Fortune 500 treasury teams."
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}