import {Request, Response} from 'express';
import {Product} from '../model/product';
import db from '../config/db';

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
}

const addProduct = async (req: Request, res: Response) => {
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
