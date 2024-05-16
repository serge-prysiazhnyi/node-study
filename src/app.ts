import express, { Request, Response } from 'express';
import users from './mocks/users.json';
import path from 'path';
import { NextFunction } from 'express';

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

app.route('/test').get((req: Request, res: Response) => {
    throw new Error('Test error');
})

app.use((req: Request, res: Response) => {
  res.status(404).send('Not found');
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(err.message);
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});