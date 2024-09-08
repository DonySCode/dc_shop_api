/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 * /products:
 *   get:
 *     summary: Lists all the products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           {
 *               "name": "",
 *               "price": "2",
 *           }
 *     responses:
 *       200:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               {}
 *       500:
 *         description: Some server error
 * /products/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product response by id
 *         contents:
 *           application/json:
 *             schema:
 *               {}
 *       404:
 *         description: The product was not found
 *   put:
 *    summary: Update the product by the id
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            {}
 *    responses:
 *      200:
 *        description: The product was updated
 *        content:
 *          application/json:
 *            schema:
 *              {}
 *      404:
 *        description: The product was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */
import { Router } from 'express';
import productController from '../controller/product.controller';
const productRouter = Router();

// specifies the endpoint and the method to call
productRouter.get('/', productController.getProducts);
productRouter.get('/:uid', productController.getProduct);
productRouter.post('/', productController.addProduct);
productRouter.put('/:uid', productController.editProduct);
productRouter.delete('/:uid', productController.deleteProduct);

// export the router
export default productRouter;
