import { ProductForm } from "@/components/forms/product-form";
import { PageCard } from "@/components/page-card";
import { getSession } from "@/lib/auth";
import { Suspense } from "react";

const CreateProductPage = async () => {
  const categories = await fetch(`http://localhost:3000/category`, {
    mode: "no-cors",
  })
    .then((response) => {
      if (!response.ok) throw response;

      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error("Failed to get a category list. Please try again later");
    });
  const session = await getSession();

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
