import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log('\x1b[36m%s\x1b[0m', `${req.method}: ${req.url}`);
    next();
};

export default logger;
