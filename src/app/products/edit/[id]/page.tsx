import { ProductForm } from "@/components/forms/product-form";
import { PageCard } from "@/components/page-card";
import { getSession } from "@/lib/auth";

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  const res = await fetch(`http://localhost:3000/products/${params.id}`);
  const product = await res.json();
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

  if (product.error) throw new Error("Product not found");
  return (
    <PageCard title="Edit">
      <ProductForm
        categories={categories}
        token={session?.user?.token}
        product={product}
      />
    </PageCard>
  );
};

export default Page;
