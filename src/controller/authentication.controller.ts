import {v4 as uuidv4} from "uuid";
import * as jwt from "jsonwebtoken";
import {Request, Response} from 'express';
import db from '../config/db';
import * as bcrypt from 'bcryptjs';
import {User} from "../model/user";

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// const register = async (req: Request, res: Response) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         res
//             .status(400)
//             .json({ error: "Email or Password fields cannot be empty!" });
//         return;
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const user: User = {
//         userId: uuidv4(),
//         email,
//         password: hashedPassword,
//     };
//     try {
//         const userAlreadyExists = await db.executeQuery(`SELECT * FROM users WHERE email = "${email}"`);
//         console.log(userAlreadyExists[0])
//         if (userAlreadyExists[0]) {
//             res.status(409).json({ error: "Email already exists" });
//         } else {
//             await db.executeQuery(`INSERT INTO users (userId, email, password) VALUES ("${user.userId}", "${user.email}", "${user.password}")`,)
//             res.status(201).json({ message: "User created successfully!" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res
            .status(400)
            .json({ error: "Email or Password fields cannot be empty!" });
        return;
    }

    try {
        const user: User = <User>await db.executeQuery(`SELECT *
                                                                FROM users
                                                                WHERE email = "${email}"`);

        const existingUser = user[0];

        if (existingUser) {
            if (!existingUser.password) {
                res.status(401).json({ error: "Invalid credentials" });
                return;
            }

            const passwordMatch = await bcrypt.compare(
                password,
                existingUser.password
            );

            if (passwordMatch) {
                res.status(200).json({
                    userId: existingUser.userId,
                    email: existingUser.email,
                    access_token: generateAccessToken(existingUser.userId),
                });
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { login }
