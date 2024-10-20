import {Request, Response} from 'express'
import { Product } from '../Models/Product'

export const getProducts = async (req : Request,  res: Response) => {
    const listProducts = await Product.findAll();
    res.json(listProducts);
}


