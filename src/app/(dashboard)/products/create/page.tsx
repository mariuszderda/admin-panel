import { ProductForm } from "@/components/forms/product-form";
import { PageCard } from "@/components/page-card";
import { getData } from "@/lib/api-call";
import { getSession } from "@/lib/auth";
import { Suspense } from "react";

const CreateProductPage = async () => {
  const session = await getSession();
  const categories = await getData("categories");

  return (
    <PageCard title="Create product">
      <Suspense fallback={null}>
        <ProductForm
          categories={categories}
          data-superjson
          token={session?.user?.token}
        />
      </Suspense>
    </PageCard>
  );
};

export default CreateProductPage;
