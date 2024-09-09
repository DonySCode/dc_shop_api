const express = require("express");
import auth from '../controller/authentication.controller'
const authRouter = express.Router();

// authRouter.post("/register", auth.register);
authRouter.post("/login", auth.login);

export default authRouter;
