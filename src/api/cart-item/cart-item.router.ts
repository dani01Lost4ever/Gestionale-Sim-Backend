import { Router } from "express";
import { add, list } from "./cart-item.controller";
import { validate } from "../../utils/validation.middleware";
import { AddCartItemDTO } from "./cart-item.dto";


const router = Router();

router.get('/', list);
router.post('/', validate(AddCartItemDTO, 'body'), add);

export default router;