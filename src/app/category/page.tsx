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
import { CategoryType, ProductType } from "@/types";
import { priceWithSeparator } from "@/utils/priceWithSeparator";
import Link from "next/link";
import { getEnabledCategories } from "node:trace_events";

const CategoryPage = async () => {
  const categories = await fetch(`${process.env.API_HOST}/category`).then(
    (res) => res.json()
  );

  if (!categories || categories.length === 0)
    throw new Error("No deliveries found.");

  return (
    <PageCard title="Category" subtitle="Create and edit category">
      <Table>
        <TableCaption>A list of all categories</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category: CategoryType, index: number) => (
            <Link
              legacyBehavior
              href={{
                pathname: `/product/${category._id}`,
              }}
              key={category._id}
            >
              <TableRow className="cursor-pointer">
                <TableCell className="font-medium">
                  {category._id.slice(-6)}
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </PageCard>
  );
};

export default CategoryPage;
