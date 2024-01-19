import {IsInt, Min, Max, IsMongoId, IsNumber} from "class-validator";
import { Type } from 'class-transformer';

export class AddCartItemDTO {
  @IsMongoId()
  product: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  pricePerUnit: number;
}


