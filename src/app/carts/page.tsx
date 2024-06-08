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
import Link from "next/link";
import { CartType, ProductType } from "../../../types";

const CartPage = async () => {
  const carts = await fetch("http://localhost:3000/cart").then((res) =>
    res.json()
  );

  return (
    <PageCard title="Cart" subtitle="All carts in the MyShop 😎">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Lp.</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carts.map((cart: CartType, index: number) => (
            <Link
              legacyBehavior
              href={{
                pathname: `/cart/${cart._id}`,
              }}
              key={cart._id}
            >
              <TableRow className="cursor-pointer">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{cart._id.slice(-6)}</TableCell>
                <TableCell>{cart.totalCost} zł</TableCell>
                <TableCell>
                  {new Date(cart.createdAt).toLocaleString()}
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
