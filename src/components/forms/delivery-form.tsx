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
import { DeliveryType, PaymentType } from "@/types";
import { DeliverySchema } from "@/types/schema/delivery-schema";
import { PaymentSchema } from "@/types/schema/payment-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const StatusOption = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "inactive",
  },
];

type DeliveryFormProps = {
  token: string;
  delivery?: DeliveryType;
};

export const DeliveryForm = ({ token, delivery }: DeliveryFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof DeliverySchema>>({
    resolver: zodResolver(DeliverySchema),
    defaultValues: {
      delivery_type: delivery ? delivery.delivery_type : "",
      display_name: delivery ? delivery.display_name : "",
      delivery_cost: delivery ? delivery.delivery_cost : 0,
      status: delivery ? delivery.status : "inactive",
    },
  });

  const onSubmit = async (data: {
    delivery_type: string;
    display_name: string;
    delivery_cost: number;
    status: string;
  }) => {
    const url = delivery
      ? `${process.env.NEXT_PUBLIC_API_HOST}/delivery/${delivery._id}`
      : `${process.env.NEXT_PUBLIC_API_HOST}/delivery`;

    const httpMethod = delivery ? "PATCH" : "POST";
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

      toast.success("Delivery was created successfully.");
      router.push("/delivery");
    } catch (e) {
      throw new Error("Can't create a delivery method");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="delivery_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery type</FormLabel>
              <FormControl>
                <Input placeholder="inpost-courier" {...field} />
              </FormControl>
              <FormDescription>This is your reference name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input placeholder="Inpost courier" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="delivery_cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display cost</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormDescription>
                This is the price for the delivery of goods.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={delivery?.status}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status of payment" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {StatusOption.map((status) => (
                    <SelectItem value={status.value} key={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select a value.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{delivery ? "Update" : "Create"}</Button>
      </form>
    </FormProvider>
  );
};
