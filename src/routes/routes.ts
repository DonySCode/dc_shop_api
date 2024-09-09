import { Router } from 'express';
import productRouter from './product.route';
import authRouter from './authentication.route';
const routes = Router();
// define the base path and the router that's going to be called
routes.use('/products', productRouter);
routes.use('/', authRouter);
// export the route
export default routes;
