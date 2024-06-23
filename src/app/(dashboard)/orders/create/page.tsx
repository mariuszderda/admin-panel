import { OrderForm } from "@/components/forms/order-form";
import { PageCard } from "@/components/page-card";
import { getData, getDataWithToken } from "@/lib/api-call";
import { getSession } from "@/lib/auth";

const CreateOrderPage = async () => {
  const session = await getSession();
  const token = session?.user.token;
  const data = getDataWithToken("customers", token);
  const data1 = getData("products");
  const data2 = getData("payments");
  const data3 = getData("delivery");

  const [customers, products, payments, deliveries] = await Promise.all([
    data,
    data1,
    data2,
    data3,
  ]).then((res) => res);

  return (
    <PageCard title="Create order">
      <OrderForm
        customers={customers}
        token={token}
        products={products}
        payments={payments}
        deliveries={deliveries}
      />
    </PageCard>
  );
};

export default CreateOrderPage;
