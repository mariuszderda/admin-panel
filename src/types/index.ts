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
