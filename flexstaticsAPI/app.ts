import express = require('express');
import { Request, Response } from 'express';
import { NO_CONTENT, NOT_FOUND, CREATED, BAD_REQUEST, UNAUTHORIZED } from 'http-status-codes';

const app = express();
app.use(express.json());


app.post('/api/test', post);

export function post(req: Request, res: Response): void {
    res.send("Test sucessfully");
}

app.listen(6969, () => console.log('API is listening on port 6969'));