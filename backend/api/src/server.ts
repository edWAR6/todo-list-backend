import express from 'express';
import * as dotenv from 'dotenv';
import cors from "cors";
import helmet from "helmet";
import { listRouter } from './list/list.router';
import { itemRouter } from './item/item.router';
import { getDatabase } from './database';

dotenv.config();

if (!process.env.PORT) {
  console.log('🕸 PORT environmental variable is missing.');
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('👋 Welcome to the API!');
});

app.use(getDatabase);

app.use("/api/lists", listRouter);
app.use("/api/lists/:listId/items", itemRouter);

app.listen(PORT, () => {
  console.log(`✅ The server is up and running on port ${PORT}`);
});
