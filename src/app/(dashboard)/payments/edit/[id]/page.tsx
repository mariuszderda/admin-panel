import { PaymentForm } from "@/components/forms/payment-form";
import { PageCard } from "@/components/page-card";
import { getDataById } from "@/lib/api-call";
import { getSession } from "@/lib/auth";

const EditPaymentPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const session = await getSession();
  const payment = await getDataById("payments", id);

  return (
    <PageCard title="Edit payment">
      <PaymentForm token={session.user.token} payment={payment} />
    </PageCard>
  );
};

export default EditPaymentPage;
