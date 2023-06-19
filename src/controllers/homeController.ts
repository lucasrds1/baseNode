import { Request, Response } from 'express';
import {sequelize} from '../instances/mysql';
import { Product } from '../models/Product';
import { User } from '../models/User';

export const home = async(req: Request, res: Response)=>{

    let users = await User.findAll();
    console.log(JSON.stringify(users));

    let data: Record<string | number, any> = {};
    data['age'] = 90;
    data['showOld'] = false

    if(data['age'] > 50) {
        data['showOld'] = true;
    }
    data['name'] = 'Lucas';
    data['list'] = Product.getAll();
    data['expensiveList'] = Product.getFromPriceAfter(12);
    res.render('pages/home', {
        data
    });
};