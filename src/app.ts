import express, { Request, Response } from 'express';
import users from './mocks/users.json';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/users', (req: Request, res: Response) => {
  res.json(users);
});

app.get('/download', (req: Request, res: Response) => {
  res.download(path.join(__dirname, '../public/images/logo.svg'));
})

app.get('/redirect', (req: Request, res: Response) => {
  res.redirect('https://www.google.com');
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});