import {FilterQuery, ObjectId, Types} from "mongoose";
import {Product} from "./product.entity";
import {Product as ProductModel} from './product.model';
import {QueryProductDTO} from "./product.dto";
import {NotFoundError} from "../../errors/not-found";

export class ProductService {

  async getAll(query: QueryProductDTO): Promise<Product[]> {
    const filterQuery: FilterQuery<Product> = {};
    if (query.title) {
      filterQuery.title = {$regex: query.title, $options: 'i'}
    }
    if (query.description) {
      filterQuery.description = {$regex: query.description, $options: 'i'}
    }
    if (query.netPrice) {
      filterQuery.netPrice = query.netPrice
    }
    if (query.stock) {
      filterQuery.stock = query.stock
    }
    if (query.limit) {
      return ProductModel.find(filterQuery).limit(query.limit);
    }
    return ProductModel.find(filterQuery);
  }
  async getById(id: string): Promise<Product | null> {
    return ProductModel.findById(id);
  }
  async create(product: Product): Promise<Product> {
      return ProductModel.create(product);
  }
  async getLessStock(stock: number): Promise<Product[]> {
      return ProductModel.find({stock: {$lt: stock}});
  }
  //update stock
    async update(id: Types.ObjectId | string | Product, data: Partial<Product>): Promise<Product> {
      console.log(id, data);
        const product = await ProductModel.findById(id)
        if (!product) {
        throw new NotFoundError();
        }
        // @ts-ignore
        data.stock += product.stock;
        Object.assign(product, data);
        await product.save();
        return product;
    }

}

export default new ProductService();