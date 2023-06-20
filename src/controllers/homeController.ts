import { Request, Response } from 'express';
import { Op } from 'sequelize';
import {sequelize} from '../instances/mysql';
import { Product } from '../models/Product';
import { User } from '../models/User';

export const home = async(req: Request, res: Response)=>{

    let users = await User.findAll({
        where: {
            [Op.or]: [
                {idade: 19}
            ]
        }
    });
    console.log(JSON.stringify(users));
    //sequelize documentation https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
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