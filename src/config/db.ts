import {createPool, PoolConnection, QueryError} from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = createPool({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

const executeQuery = (query: string) => {
    return new Promise( async (resolve, reject) => {
        const conn = await pool.getConnection();
        conn.query(query)
            .then(response => {
                pool.releaseConnection(conn)
                if(response[0]) resolve(response[0]);
                else resolve('Records added successfully.');
            }).catch(error => {
            reject(error)
        })
    })
}

export default { executeQuery };
