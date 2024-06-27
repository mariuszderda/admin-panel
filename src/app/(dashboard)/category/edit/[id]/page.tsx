import { CategoryForm } from "@/components/forms/category-form";
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
  const category = await getDataById("categories", id);

  if (!category || category._id === undefined)
    return (
      <PageCard title="Category detail">
        <h3>We can&apos;t load category detail.</h3>
      </PageCard>
    );

  return (
    <PageCard title="Edit category">
      <CategoryForm token={session.user.token} category={category} />
    </PageCard>
  );
};

export default EditPaymentPage;
