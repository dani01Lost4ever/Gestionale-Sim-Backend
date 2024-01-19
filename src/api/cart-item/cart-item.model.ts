import mongoose, {Schema, Types} from "mongoose";
import { CartItem as iCartItem } from "./cart-item.entity";
import {Product} from "../product/product.entity";
import {productSchema} from "../product/product.model";

const cartItemSchema = new Schema<iCartItem>({
  purchaseid: Number,
  date: Date,
  pricePerUnit: Number,
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number
})
cartItemSchema.pre('save', async function(next) {
  if (this.isNew) {
    this.date = new Date();
    const count = await mongoose.model('CartItem').countDocuments();
    this.purchaseid = count + 1;
  }
  next();
});

cartItemSchema.pre('find', function() {
    this.populate('product');
});

cartItemSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const CartItem = mongoose.model<iCartItem>('CartItem', cartItemSchema);