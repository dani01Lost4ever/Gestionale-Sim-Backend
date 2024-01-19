import { assign } from 'lodash';
import { CartItem } from "./cart-item.entity";
import { CartItem as CartItemModel } from './cart-item.model';
import { NotFoundError } from '../../errors/not-found';
import productService from "../product/product.service";


export class CartItemService {
  
  async find(limit : number): Promise<CartItem[]> {
    //limit the results returned
    if (limit) {
      return CartItemModel.find().limit(limit).populate('product');
    }
    return CartItemModel.find().populate('product');
  }

  async getById(id: string): Promise<CartItem | null> {
    return this._getById(id);
  }

  private async _getById(id: string) {
    return CartItemModel.findById(id).populate('product');
  }

  async add(item: CartItem): Promise<CartItem> {

    const newItem = await CartItemModel.create(item);
    await newItem.populate('product');
    const product = await productService.update(item.product, {stock: item.quantity});
    return newItem;
  }
}

export default new CartItemService();