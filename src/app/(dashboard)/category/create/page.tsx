import { CategoryForm } from "@/components/forms/category-form";
import { PaymentForm } from "@/components/forms/payment-form";
import { PageCard } from "@/components/page-card";
import { getSession } from "@/lib/auth";
import { Suspense } from "react";

const CategoryCreatePage = async () => {
  const session = await getSession();
  return (
    <PageCard title="Create a category">
      <Suspense fallback={null}>
        <CategoryForm token={session?.user.token} />
      </Suspense>
    </PageCard>
  );
};

export default CategoryCreatePage;
