import { ActionButtons } from "@/components/action-buttons";
import { PageCard } from "@/components/page-card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSession } from "@/lib/auth";
import { priceWithSeparator } from "@/utils/priceWithSeparator";
import Link from "next/link";
import { ProductType } from "@/types";

export const revalidate = 0;
export const dynamic = "force-dynamic";
const ProductPage = async () => {
  const session = await getSession();
  const products = await fetch(`${process.env.API_HOST}/products`, {
    cache: "reload",
  }).then((res) => res.json());

  if (!products || products.length === 0)
    throw new Error("List of product not found");

  return (
    <PageCard
      title="Products"
      subtitle="All products in your store"
      createHref="/products/create"
    >
      <Table>
        <TableCaption>A list of all products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Lp.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Stock</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: ProductType, index: number) => (
            <Link
              legacyBehavior
              href={{
                pathname: `/products/${product._id}`,
              }}
              key={product.reference}
            >
              <TableRow className="cursor-pointer">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.reference}</TableCell>
                <TableCell className="text-right">
                  {priceWithSeparator(product.price)}
                </TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell className="text-right flex justify-end items-center w-auto">
                  <ActionButtons
                    productId={product._id}
                    token={session?.user?.token}
                    categoryName="products"
                  />
                </TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </PageCard>
  );
};

export default ProductPage;
