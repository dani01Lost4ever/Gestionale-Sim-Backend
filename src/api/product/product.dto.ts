import { IsNumber, Min, IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer';
import { IsGreaterThan } from "../../utils/greater-than.validator";

export class QueryProductDTO {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @IsGreaterThan('0')
    @Type(() => Number)
    @Min(0)
    netPrice?: number;

    @IsOptional()
    @IsNumber()
    @IsGreaterThan('0')
    @Type(() => Number)
    @Min(0)
    stock?: number;

    @IsOptional()
    @IsNumber()
    @IsGreaterThan('0')
    @Type(() => Number)
    @Min(0)
    limit?: number;
}