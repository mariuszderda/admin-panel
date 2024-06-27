import { ProductForm } from "@/components/forms/product-form";
import { PageCard } from "@/components/page-card";
import { getData, getDataById } from "@/lib/api-call";
import { getSession } from "@/lib/auth";
import { CategoryType, ProductType } from "@/types";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getSession();
  const product: ProductType = await getDataById("products", id);
  const categories: CategoryType[] = await getData("category");

  if (!product || product._id === undefined)
    return (
      <PageCard title="Product detail">
        <h3>We can&apos;t load product detail.</h3>
      </PageCard>
    );
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
