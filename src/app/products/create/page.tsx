import { CreateProduct } from "@/components/forms/create-product";
import { PageCard } from "@/components/page-card";
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

  return (
    <PageCard title="Create product">
      <Suspense fallback={null}>
        <CreateProduct categories={categories} data-superjson />
      </Suspense>
    </PageCard>
  );
};

export default CreateProductPage;
