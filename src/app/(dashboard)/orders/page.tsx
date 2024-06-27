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
import { getDataWithToken } from "@/lib/api-call";
import { getSession } from "@/lib/auth";
import { OrderType, ProductType } from "@/types";
import { priceWithSeparator } from "@/utils/priceWithSeparator";
import Link from "next/link";

const OrderPage = async () => {
  const session = await getSession();
  const token = session.user?.token;
  const orders = await getDataWithToken("orders", token);

  if (!orders || orders.length === 0)
    return (
      <PageCard
        title="Orders"
        subtitle="All orders in your store"
        createHref="/orders/create"
      >
        <h2>List of payments method is empty</h2>
      </PageCard>
    );

  return (
    <div>
      <PageCard
        title="Orders"
        subtitle="All orders in your store"
        createHref="/orders/create"
      >
        <Table>
          <TableCaption>A list of all orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id.</TableHead>
              <TableHead>First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: OrderType, index: number) => (
              <Link
                legacyBehavior
                href={{
                  pathname: `/orders/${order._id}`,
                }}
                key={order._id}
              >
                <TableRow className="cursor-pointer">
                  <TableCell className="font-medium">
                    {order._id.slice(-6)}
                  </TableCell>
                  <TableCell>{order.customer.first_name}</TableCell>
                  <TableCell>{order.customer.last_name}</TableCell>
                  <TableCell>{order.customer.email}</TableCell>
                  <TableCell className="text-right">
                    {priceWithSeparator(order.amount)}
                  </TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </PageCard>
    </div>
  );
};

export default OrderPage;
