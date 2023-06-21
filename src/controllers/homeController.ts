import { Request, Response } from 'express';
import { Op } from 'sequelize';
import {sequelize} from '../instances/mysql';
import { Product } from '../models/Product';
import { User } from '../models/User';
//sequelize documentation https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

export const home = async(req: Request, res: Response)=>{
    let data: Record<string | number, any> = {};
    data['id'] = 0;
    data['nome'] = '';
    data['idade'] = '';
    data['valSubmit'] = 'Cadastrar';

    let users = await User.findAll({
        limit: 5,
        order: [
            ['id', 'DESC']
        ] 
    });
    let idGet = parseInt(req.params.id);
    if(idGet > 0){
        let userEdit = await User.findAll({
            where:{
                id: idGet
            }
        });
        if(userEdit.length > 0){
            let i;
            for(i=0;i<userEdit.length;i++){
                data['id'] = userEdit[i].id;
                data['nome'] = userEdit[i].nome;
                data['idade'] = userEdit[i].idade;
            }
            data['valSubmit'] = 'Editar';
        }
    }

    if(users.length > 0){
        data['users'] = users;
    }
    data['age'] = 90;
    data['showOld'] = false

    if(data['age'] > 50) {
        data['showOld'] = true;
    }
    data['list'] = Product.getAll();
    data['expensiveList'] = Product.getFromPriceAfter(12);
    res.render('pages/home', {
        data
    });
};

export const saveUser = async(req: Request, res: Response)=>{
    if(req.body.id > 0){
        let update = await User.update({
            nome: req.body.nome,
            idade: req.body.idade,
        },{
            where:{id:req.body.id}
        })
    }else{
        let insert = await User.create({nome: req.body.nome, idade: req.body.idade});
        insert.save();
    }
    res.redirect('/');

}