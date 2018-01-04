import * as express from 'express';

const app = express();
const port: number = 9876;

app.use(express.static('dist'));

app.listen(port);