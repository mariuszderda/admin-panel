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
import { priceWithSeparator } from "@/utils/priceWithSeparator";
import Link from "next/link";
import { ItemInCart } from "@/types";

const CartPage = async ({ params }: { params: { id: string } }) => {
  const { items, totalCost } = await fetch(
    `http://localhost:3000/cart/${params.id}`
  )
    .then((res) => res.json())
    .catch((err) => {
      throw new Error("Cant get cart");
    });
  return (
    <PageCard title={`ID: ${params.id}`} subtitle="Created at:">
      <Table>
        <TableCaption className="text-right">
          <p className="border-b-2 inline border-slate-800/25">
            Total: {priceWithSeparator(totalCost)}
          </p>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Lp.</TableHead>
            <TableHead>Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Sum</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item: ItemInCart, index: number) => (
            <Link
              legacyBehavior
              href={{
                pathname: `/product/${item._id}`,
              }}
              key={item.reference}
            >
              <TableRow className="cursor-pointer">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>Photo</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.reference}</TableCell>
                <TableCell className="text-right">
                  {priceWithSeparator(item.price)}
                </TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  {priceWithSeparator(item.price * item.quantity)}
                </TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </PageCard>
  );
};

export default CartPage;
