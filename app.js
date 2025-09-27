import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { lunchHandler } from './routes/lunch.js';
import { lunch2Handler } from './routes/lunch2.js';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}.`);
});

app.post('/lunch', lunchHandler);
app.post('/lunch-2', lunch2Handler);

app.get('/', (req, res) => {
    res.send('Hello world!');
});
