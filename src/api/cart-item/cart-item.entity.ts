import { Types } from 'mongoose';
import { Product } from '../product/product.entity';

export interface CartItem {
  id?: string;
  purchaseid?: number;
  date?: Date;
  product: Types.ObjectId | string | Product;
  quantity: number;
  pricePerUnit: number;
}