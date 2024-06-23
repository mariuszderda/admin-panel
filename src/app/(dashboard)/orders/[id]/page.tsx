import { DataNotFound } from "@/components/data-not-found";
import { PageCard } from "@/components/page-card";
import { getDataById, getDataByIdWithToken } from "@/lib/api-call";
import { getSession } from "@/lib/auth";
import { OrderType } from "@/types";
import { priceWithSeparator } from "@/utils/priceWithSeparator";

const OrderDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const session = await getSession();
  const order: OrderType = await getDataByIdWithToken(
    "orders",
    id,
    session.user.token
  );

  if (!order || Object.keys(order).length === 0)
    return <DataNotFound message="Orders not found." />;

  return (
    <PageCard title="Order details">
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Information about order
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Details and resume orders.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Id
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {order._id}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Customer
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <dl>
                  <div className="px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      First name
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {order.customer.first_name}
                    </dd>
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Last name
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {order.customer.last_name}
                    </dd>
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Email
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {order.customer.email}
                    </dd>
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Telephone
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {order.customer.telephone}
                    </dd>
                  </div>
                </dl>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Delivery address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <dl>
                  <div className="px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Street and number
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {order.delivery_address.street_and_number}
                    </dd>
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      City
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {order.delivery_address.city}
                    </dd>
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Zip code
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {order.delivery_address.zip_code}
                    </dd>
                  </div>
                </dl>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Items
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <dl>
                  <div className="sm:grid sm:grid-cols-1 sm:gap-4 sm:px-0 ">
                    <div className="flex justify-between border-b border-gray-100">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Reference
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        Quantity
                      </dd>{" "}
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        Price
                      </dd>
                    </div>
                    {order.items.map((item) => (
                      <div className="flex flex justify-between" key={item._id}>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          {item.reference}
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {item.quantity}
                        </dd>{" "}
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {priceWithSeparator(item.price)}
                        </dd>
                      </div>
                    ))}
                    <div className="flex justify-between border-b border-gray-100 pt-3">
                      <dt className="text-sm font-medium leading-6 text-gray-900" />
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">
                        Total
                      </dd>{" "}
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {priceWithSeparator(order.amount)}
                      </dd>
                    </div>
                  </div>
                </dl>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Payment
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {order.payment_method}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Status
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {order.status}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </PageCard>
  );
};

export default OrderDetailPage;
