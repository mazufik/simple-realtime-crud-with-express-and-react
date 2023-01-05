import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ProductRoute from './routes/ProductRoute.js';
dotenv.config();

const app = express();

//* Build Middleware
app.use(cors());
app.use(express.json());
app.use(ProductRoute);

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server up and running in http://localhost:${PORT}`);
});
