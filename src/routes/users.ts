import express, { Request, Response } from 'express';
import users from '../mocks/users.json';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.json(users);
});

router.get('/:id', (req: Request, res: Response) => {
    const user = users.find((user) => user.id === req.params.id);

    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
});

export default router;
