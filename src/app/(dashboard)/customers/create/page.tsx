import { CustomerForm } from "@/components/forms/customer-form";
import { DeliveryForm } from "@/components/forms/delivery-form";
import { PaymentForm } from "@/components/forms/payment-form";
import { PageCard } from "@/components/page-card";
import { getSession } from "@/lib/auth";
import { Suspense } from "react";

const PaymentCreatePage = async () => {
  const session = await getSession();
  return (
    <PageCard title="Create a new customer">
      <Suspense fallback={null}>
        <CustomerForm token={session?.user.token} />
      </Suspense>
    </PageCard>
  );
};

export default PaymentCreatePage;
