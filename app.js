import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import { devHandler } from './routes/dev.js';
import { lunchMultipleHandler } from './routes/lunch-multiple.js';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}.`);
});

app.post('/lunch', lunchMultipleHandler);
app.post('/dev', devHandler);

app.get('/', (req, res) => {
    res.send("I'm alive!");
});
