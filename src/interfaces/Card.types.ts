export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  stock: number;
  image: string;
}

export interface Icategory {
  id: number;
  name: string;
}

export interface IloginProps {
  email: string;
  password: string;
}
export interface IErrorsProps {
  email?: string;
  password?: string;
}
export interface IRegisterProps {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
}
export interface IRegisterErrors {
  email?: string;
  password?: string;
  name?: string;
  address?: string;
  phone?: string;
}

export interface IUserSession {
  token: string;
  user: {
    address: string;
    email: string;
    id: number;
    name: string;
    phone: string;
    role: string;
    orders: [];
  };
}

export interface IOrder {
  id: number;
  status: string;
  date: Date;
  products: IProduct[]; //12:53
}

export default IProduct;
