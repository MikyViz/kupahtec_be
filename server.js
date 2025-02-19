import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import path from 'path';
import {syncModels}  from "./database/index.js";
import UserRouter from "./routes/user-routes.js";
import OrganizationRouter from "./routes/organization-routes.js";
import OrganizationUserRouter from './routes/organizationUser-routes.js';
import DonationRauter from "./routes/donation-routes.js";

// import {fileURLToPath} from 'url';

dotenv.config();
const port = parseInt(process.env.PORT) || 8081;
// const port = process.env.PORT;
const app = express();
syncModels();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const parentDir = path.resolve(__dirname, '..');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({bro:'ALOHA!!!'});
});

app.use('/users', new UserRouter().getRouter());
app.use('/organizations', new OrganizationRouter().getRouter());
app.use('/orgsUsers', new OrganizationUserRouter().getRouter());
app.use('/donats', new DonationRauter().getRouter());

// app.use('/imgs', express.static(path.join(__dirname, 'imgs')));

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})