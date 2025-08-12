import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { lunchHandler } from './routes/lunch.js';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}.`);
});

app.post('/lunch', lunchHandler);

app.get('/', (req, res) => {
    res.send('Hello world!');
});
