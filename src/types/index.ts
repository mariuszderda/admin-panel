import { string } from "zod";

type CreatedByType = {
  _id: string;
  username: string;
  email: string;
};

export type ProductType = {
  _id: string;
  name: string;
  reference: string;
  price: number;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  createdBy: CreatedByType;
  stock: number;
};

export type ProductItemInOrder = {
  name: string;
  reference: string;
  price: number;
  quantity: number;
  _id: string;
};

export type CategoryType = {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: CreatedByType;
};

export type CreateProductType = {
  name: string;
  reference: string;
  price: number;
  description: string;
  stock: number;
  category: string;
};

export type UserType = {
  userId: string;
  token: string;
};

export type CustomerType = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
  delivery: {
    street_and_number: string;
    city: string;
    zip_code: string;
  };
};

export type PaymentType = {
  _id: string;
  payment_type: string;
  display_name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type DeliveryType = {
  _id: string;
  delivery_type: string;
  display_name: string;
  delivery_cost: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type DeliveriesListType = {
  deliveries: DeliveryType[];
};

export type OrderType = {
  _id: string;
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    telephone: string;
  };
  delivery_address: {
    street_and_number: string;
    city: string;
    zip_code: string;
  };
  items: [
    {
      _id: string;
      name: string;
      reference: string;
      price: 3999;
      quantity: 5;
    },
    {
      _id: string;
      name: string;
      reference: string;
      price: 3999;
      quantity: 4;
    },
  ];
  payment_method: string;
  status: string;
  amount: number;
};

export type StatisticType = {
  productsCount: number;
  totalAmount: [
    {
      total: number;
    },
  ];
  orderCount: number;
  lastOrders: {
    customer: {
      first_name: string;
      last_name: string;
      email: string;
    };
    amount: number;
    _id: string;
  }[];
  totalCustomers: number;
};
