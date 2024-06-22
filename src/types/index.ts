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
  createdAt: string;
  updatedAt: string;
  createdBy: CreatedByType;
  stock: number;
};

export type ItemInCart = {
  name: string;
  reference: string;
  price: number;
  quantity: number;
  _id: string;
};

export type CartType = {
  _id: string;
  items: ItemInCart[];
  totalCost: number;
  createdAt: string;
  updatedAt: string;
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

export type PaymentsListType = {
  payments: PaymentType[];
};
