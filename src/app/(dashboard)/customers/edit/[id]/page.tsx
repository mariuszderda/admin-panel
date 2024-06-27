import { CustomerForm } from "@/components/forms/customer-form";
import { DeliveryForm } from "@/components/forms/delivery-form";
import { PaymentForm } from "@/components/forms/payment-form";
import { PageCard } from "@/components/page-card";
import { getDataById, getDataByIdWithToken } from "@/lib/api-call";
import { getSession } from "@/lib/auth";

const EditPaymentPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const session = await getSession();
  const token = session.user?.token;
  const customer = await getDataByIdWithToken("customers", id, token);

  return (
    <PageCard title="Edit payment">
      <CustomerForm token={session.user.token} customer={customer} />
    </PageCard>
  );
};

export default EditPaymentPage;
