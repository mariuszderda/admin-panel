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
import { CategoryType } from "@/types";
import Link from "next/link";

const CategoryPage = async () => {
  const session = await getSession();
  const categories = await fetch(`${process.env.API_HOST}/categories`).then(
    (res) => res.json()
  );

  if (!categories || categories.length === 0)
    throw new Error("No deliveries found.");

  return (
    <PageCard
      title="Category"
      subtitle="Create and edit category"
      createHref="/category/create"
    >
      <Table>
        <TableCaption>A list of all categories</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category: CategoryType, index: number) => (
            <Link
              legacyBehavior
              href={{
                pathname: `/category/${category._id}`,
              }}
              key={category._id}
            >
              <TableRow className="cursor-pointer">
                <TableCell className="font-medium">
                  {category._id.slice(-6)}
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell className="text-right flex justify-end items-center w-auto">
                  <ActionButtons
                    elementId={category._id}
                    categoryName="category"
                    token={session.user.token}
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

export default CategoryPage;
