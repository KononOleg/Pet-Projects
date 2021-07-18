import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import categories from './category/router';
import cards from './cards/router';
import login from './login/router';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use('/api/categories', categories)
app.use('/api/login', login)
app.use('/api/cards', cards);
app.listen(3000, () => console.log('Server started on http://localhost:3000'));
