import express from 'express';

const app = express();
const port = process.env.PORT || <%= apiServerPort %>;
const apiRouter = express.Router();

apiRouter.all('/*', (req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "X-Requested-With");

 next();
 });

 /**
 * /api router
 */
/** inject:route */

app.use('/api', apiRouter);

const server = app.listen(port, () => {
    const { host, port } = server.address();

    console.log('Example app listening at http://%s:%s', host, port)
});