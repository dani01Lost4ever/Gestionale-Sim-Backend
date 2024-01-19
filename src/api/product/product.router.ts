import { Router } from "express";
import {list, get, getLessStock, create} from './product.controller';
import { validate } from "../../utils/validation.middleware";
import { QueryProductDTO } from "./product.dto";


const router = Router();

router.get('/', validate(QueryProductDTO, 'query'), list);
router.get('/:id', get);
router.get('/less-stock/:stock', getLessStock);
router.post('/', create);


export default router;