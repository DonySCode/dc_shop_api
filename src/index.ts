import * as express from 'express'
import * as dotenv  from "dotenv"
import routes from './routes/routes'
import * as swaggerJsdoc from 'swagger-jsdoc'
import * as swaggerUi from 'swagger-ui-express'

dotenv.config()

const app = express();

const port = parseInt(process.env.PORT as string, 10) || 3000

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "DC Shop API",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
        },
        servers: [
            {
                url: `http://localhost:${port}/api`,
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api', routes);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

app.listen(port, () => {
    console.log(`This server is listening on http://localhost:${port}`)
})
