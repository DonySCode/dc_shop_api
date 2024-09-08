import * as express from 'express';
import * as dotenv  from "dotenv"
import routes from './routes/routes'

dotenv.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api', routes);

const port = parseInt(process.env.PORT as string, 10) || 3000

app.listen(port, () => {
    console.log(`This server is listening on http://localhost:${port}`)
})
