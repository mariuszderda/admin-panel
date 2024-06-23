"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CustomerType,
  DeliveryType,
  OrderType,
  PaymentType,
  ProductItemInOrder,
  ProductType,
} from "@/types";
import { OrderSchema } from "@/types/schema/order-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

type OrderFormProps = {
  customers: CustomerType[];
  products: ProductType[];
  payments: PaymentType[];
  deliveries: DeliveryType[];
  order?: OrderType;
  token: string;
};

export const OrderForm = ({
  customers,
  products,
  payments,
  deliveries,
  order,
  token,
}: OrderFormProps) => {
  const [productsArray, setProductsArray] = useState<ProductItemInOrder[]>([]);
  const router = useRouter();
  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
  });

  const handleChangeProductList = (id: string, number: string) => {
    if (Number(number) === 0) {
      const currentList = productsArray.filter((i) => i._id !== id);
      return setProductsArray(currentList);
    }
    const currentList = productsArray.map((item) => {
      if (item._id === id) return { ...item, quantity: Number(number) };
      return item;
    });
    return setProductsArray(currentList);
  };
  const addProductsArray = (product: string) => {
    const { _id, name, reference, price } = JSON.parse(product);
    const existInArray = productsArray.filter((item) => item._id === _id);
    if (existInArray.length > 0) return;

    setProductsArray((prevState) => [
      ...prevState,
      {
        _id,
        name,
        reference,
        price,
        quantity: 1,
      },
    ]);
  };

  const onSubmit = async ({
    customer,
    // eslint-disable-next-line camelcase
    delivery_method,
    // eslint-disable-next-line camelcase
    payment_method,
  }: {
    customer: string;
    delivery_method: string;
    payment_method: string;
  }) => {
    if (productsArray.length < 1) {
      toast.error("Empty product list");
      return;
    }

    const customerData = customers.filter((c) => c._id === customer);

    const data = {
      customer: {
        first_name: customerData[0].first_name,
        last_name: customerData[0].last_name,
        email: customerData[0].email,
        telephone: customerData[0].telephone,
      },
      delivery_address: {
        street_and_number: customerData[0].delivery.street_and_number,
        city: customerData[0].delivery.city,
        zip_code: customerData[0].delivery.zip_code,
      },
      items: productsArray,
      // eslint-disable-next-line camelcase
      payment_method,
      // eslint-disable-next-line camelcase
      delivery_method,
      status: "created",
    };
    const url = order
      ? `${process.env.NEXT_PUBLIC_API_HOST}/orders/${order._id}`
      : `${process.env.NEXT_PUBLIC_API_HOST}/orders`;

    const httpMethod = order ? "PATCH" : "POST";
    try {
      const response = await fetch(url, {
        method: httpMethod,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_API_HOST}`,
        },
      });

      if (!response.ok) throw new Error("Network response was not ok");

      toast.success("Order was created successfully.");
      router.push("/orders");
    } catch (e) {
      throw new Error("Can't create a order");
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem value={customer._id} key={customer._id}>
                      {customer.first_name} {customer.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payment_method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment method</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {payments.map((payment) => (
                    <SelectItem value={payment.payment_type} key={payment._id}>
                      {payment.display_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="delivery_method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery method</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a delivery method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {deliveries.map((delivery) => (
                    <SelectItem
                      value={delivery.delivery_type}
                      key={delivery._id}
                    >
                      {delivery.display_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="">
          <h3 className="text-base font-normal">Product List</h3>
          {productsArray.map((product) => (
            <div
              key={product._id}
              className="flex justify-between items-center border-b border-gray-100 p-2"
            >
              <h4 className="text-xs pl-2">{product.name}</h4>
              <Input
                value={product.quantity}
                name={product._id}
                onChange={(e) =>
                  handleChangeProductList(e.target.name, e.target.value)
                }
                type="number"
                className="w-[100px]"
              />
            </div>
          ))}
        </div>
        <FormField
          name="products-list"
          render={() => (
            <FormItem>
              <FormLabel>Select product</FormLabel>
              <Select onValueChange={(value) => addProductsArray(value)}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a delivery method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem
                      value={JSON.stringify(product)}
                      key={product._id}
                    >
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </FormProvider>
  );
};
