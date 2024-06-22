import { PaymentForm } from "@/components/forms/payment-form";
import { PageCard } from "@/components/page-card";
import { getSession } from "@/lib/auth";
import { Suspense } from "react";

const PaymentCreatePage = async () => {
  const session = await getSession();
  return (
    <PageCard title="Create a payment method">
      <Suspense fallback={null}>
        <PaymentForm token={session?.user.token} />
      </Suspense>
    </PageCard>
  );
};

export default PaymentCreatePage;
