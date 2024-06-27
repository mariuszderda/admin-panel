import { DeliveryForm } from "@/components/forms/delivery-form";
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
  const delivery = await getDataById("delivery", id);

  if (!delivery || delivery._id === undefined)
    return (
      <PageCard title="Delivery detail">
        <h3>We can&apos;t load delivery detail.</h3>
      </PageCard>
    );

  return (
    <PageCard title="Edit payment">
      <DeliveryForm token={session.user.token} delivery={delivery} />
    </PageCard>
  );
};

export default EditPaymentPage;
