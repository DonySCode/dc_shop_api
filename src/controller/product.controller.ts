import {Request, response, Response} from 'express';
import {Product} from '../model/product';
import * as jwt from "jsonwebtoken";
import db from '../config/db';

const authenticate = (email: string, token: string) => {
    return new Promise( async (resolve, reject) => {
        try{
            let realToken: string;
            let userId: string;
            db.executeQuery(`SELECT userId FROM users WHERE email = "${email}"`)
                .then(response => {
                    console.log(response[0].userId);
                    userId = response[0].userId;
                    realToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
                    console.log(realToken)
                    console.log(token)
                    resolve(realToken === token);
                }).catch(error => reject(error))
        }catch(e){
            reject(e);
        }
    })
}

const getProducts = async (req: Request, res: Response) => {
    db.executeQuery('SELECT * FROM products')
        .then((response: Product[]) => {
            res.status(200).send({
                message: 'OK',
                result: response
            });
        }).catch(error => {
            console.log(error)
            res.status(500).send({
                message: `INTERNAL SERVER ERROR`,
                result: null
            });
    })
}

const getProduct = async (req: Request, res: Response) => {
    db.executeQuery(`SELECT * FROM products WHERE id = ${req.params.uid}`)
        .then((response: Product[]) => {
            if (response.length){
                res.status(200).send({
                    message: 'OK',
                    result: response
                });
            } else{
                res.status(404).send({
                    message: 'The product you are trying to fetch does not exists.'
                });
            }
        }).catch(error => {
        console.log(error)
        res.status(500).send({
            message: `INTERNAL SERVER ERROR`,
            result: null
        });
    })
}

const addProduct = async (req: Request, res: Response) => {
    const authenticated = await authenticate(req.body.email, req.body.token);
    if (authenticated) {
        db.executeQuery(`INSERT INTO products (name, price) VALUES ("${req.body.name}", ${req.body.price})`)
            .then((response: Product) => {
                res.status(200).send({
                    message: 'OK',
                    result: response
                });
            }).catch(error => {
            console.log(error)
            res.status(500).send({
                message: `INTERNAL SERVER ERROR`,
                result: null
            });
        })
    } else {
        res.status(401).send({
            message: `Unauthorized user`,
            result: null
        });
    }
}

const editProduct = async (req: Request, res: Response) => {
    db.executeQuery(`SELECT * FROM products WHERE id = ${req.params.uid}`)
        .then((response: []) => {
            if(response.length) {
                db.executeQuery(`UPDATE products SET name = "${req.body.name}", price = ${req.body.price} WHERE id = ${req.params.uid}`)
                    .then((response: Product) => {
                        res.status(200).send({
                            message: 'OK',
                            result: 'Record successfully updated.'
                        });
                    }).catch(error => {
                    console.log(error)
                    res.status(500).send({
                        message: `INTERNAL SERVER ERROR: ${error}`,
                        result: null
                    });
                })
            }
            else {
                res.status(404).send({
                    message: 'The product you are trying to edit does not exists.'
                });
            }
        })
}

const deleteProduct = async (req: Request, res: Response) => {
    db.executeQuery(`SELECT * FROM products WHERE id = ${req.params.uid}`)
        .then((response: []) => {
            if(response.length) {
                db.executeQuery(`DELETE FROM products WHERE id = ${req.params.uid}`)
                    .then((response: Product) => {
                        res.status(200).send({
                            message: 'OK',
                            result: response
                        });
                    }).catch(error => {
                    console.log(error)
                    res.status(500).send({
                        message: `INTERNAL SERVER ERROR: ${error}`,
                        result: null
                    });
                })
            }
            else {
                res.status(404).send({
                    message: 'The product you are trying to delete does not exists.'
                });
            }
        })
}

export default {getProducts, getProduct, addProduct, editProduct, deleteProduct}
