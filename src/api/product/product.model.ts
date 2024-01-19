import  mongoose from 'mongoose';
import { Product as iProduct} from './product.entity';

export const productSchema = new mongoose.Schema<iProduct>({
  itemid: Number,
  title: String,
  description: String,
  netPrice: Number,
  stock: Number,
});

productSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Product').countDocuments();
    this.itemid = count + 1;
  }
  next();
});

productSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    return ret;
  }
});

export const Product = mongoose.model<iProduct>('Product', productSchema);