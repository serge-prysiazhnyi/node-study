import express, { Request, Response } from 'express';
import users from './mocks/users.json';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});