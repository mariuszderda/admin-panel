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
import { CustomerType, DeliveryType, PaymentType } from "@/types";
import { CustomerSchema } from "@/types/schema/customer-schema";
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

type CustomerFormProps = {
  token: string;
  customer?: CustomerType;
};

export const CustomerForm = ({ token, customer }: CustomerFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof CustomerSchema>>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      first_name: customer ? customer.first_name : "",
      last_name: customer ? customer.last_name : "",
      email: customer ? customer.email : "",
      telephone: customer ? customer.telephone : "",
      delivery: {
        street_and_number: customer ? customer.delivery.street_and_number : "",
        city: customer ? customer.delivery.city : "",
        zip_code: customer ? customer.delivery.zip_code : "",
      },
    },
  });

  const onSubmit = async (data: {
    first_name: string;
    last_name: string;
    email: string;
    telephone: string;
    delivery: {
      street_and_number: string;
      city: string;
      zip_code: string;
    };
  }) => {
    const url = customer
      ? `${process.env.NEXT_PUBLIC_API_HOST}/categories/${customer._id}`
      : `${process.env.NEXT_PUBLIC_API_HOST}/categories`;

    const httpMethod = customer ? "PATCH" : "POST";
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
      router.push("/category");
    } catch (e) {
      throw new Error("Can't create a delivery method");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="Jonh" {...field} />
              </FormControl>
              <FormDescription>This is your first name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormDescription>This is your public last name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john.doe@gmail.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your public email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telephone</FormLabel>
              <FormControl>
                <Input placeholder="+48777777777" type="tel" {...field} />
              </FormControl>
              <FormDescription>
                This is your public telephone number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-8">
          <h3 className="font-bold text-sm">Delivery address:</h3>
          <FormField
            control={form.control}
            name="delivery.street_and_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street and number</FormLabel>
                <FormControl>
                  <Input placeholder="Salot St 56" type="text" {...field} />
                </FormControl>
                <FormDescription>This is delivery street.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="delivery.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Salot St 56" type="text" {...field} />
                </FormControl>
                <FormDescription>This is delivery city.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="delivery.zip_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip code</FormLabel>
                <FormControl>
                  <Input placeholder="00-000" type="text" {...field} />
                </FormControl>
                <FormDescription>This is delivery zip code.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">{customer ? "Update" : "Create"}</Button>
      </form>
    </FormProvider>
  );
};
