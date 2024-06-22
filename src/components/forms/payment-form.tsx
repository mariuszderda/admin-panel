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
import { PaymentType } from "@/types";
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

type PaymentFormProps = {
  token: string;
  payment?: PaymentType;
};

export const PaymentForm = ({ token, payment }: PaymentFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof PaymentSchema>>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      payment_type: payment ? payment.payment_type : "",
      display_name: payment ? payment.display_name : "",
      status: payment ? payment.status : "inactive",
    },
  });

  const onSubmit = async (data: {
    payment_type: string;
    display_name: string;
    status: string;
  }) => {
    const url = payment
      ? `${process.env.NEXT_PUBLIC_API_HOST}/payments/${payment._id}`
      : `${process.env.NEXT_PUBLIC_API_HOST}/payments`;

    const httpMethod = payment ? "PATCH" : "POST";
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

      toast.success("Payment was created successfully.");
      router.push("/payments");
    } catch (e) {
      throw new Error("Can't create a payment method");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="payment_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment type</FormLabel>
              <FormControl>
                <Input placeholder="Credit card" {...field} />
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
                <Input placeholder="Credit card" {...field} />
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
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={payment?.status}
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
        <Button type="submit">{payment ? "Update" : "Create"}</Button>
      </form>
    </FormProvider>
  );
};
