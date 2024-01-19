import { Request, Response, NextFunction } from 'express';
import cartItemService from './cart-item.service';
import productService from '../product/product.service';
import { CartItem } from './cart-item.entity';
import { TypedRequest } from '../../utils/typed-request.interface';
import { NotFoundError } from '../../errors/not-found';
import { AddCartItemDTO } from './cart-item.dto';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const list = await cartItemService.find(req.body.limit);
  res.json(list);
}

export const add = async (
  req: TypedRequest<AddCartItemDTO>,
  res: Response,
  next: NextFunction) => {
    
    try {
      
      const { product, quantity, pricePerUnit } = req.body;
      
      const productRes = await productService.getById(product);
      if (!productRes) {
        throw new NotFoundError();
      }
      
      const newItem: { product: string; quantity: number; pricePerUnit: number } = {
        product: product,
        quantity: quantity,
        pricePerUnit: pricePerUnit
      };
      const saved = await cartItemService.add(newItem);
      res.json(saved);
    } catch(err) {
      next(err);
    }
}

