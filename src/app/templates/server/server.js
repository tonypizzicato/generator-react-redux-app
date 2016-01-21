import express from 'express';

const app = express();
const port = process.env.PORT || <%= apiServerPort %>;
const apiRouter = express.Router();

apiRouter.all('/*', (req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
 res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

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

function randomString(length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result  = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}