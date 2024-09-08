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
