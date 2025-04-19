const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET } = require('../../enviroments/enviroment');

exports.authorize = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    if (!authorization.startsWith('Bearer')) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    const split = authorization.split('Bearer ');
    if (split.length !== 2) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    const token = split[1];

    try {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(401);
            }
            req.user = user;
            next();
        })
    }
    catch (err) {
        logger.log('error','Authorize catch Hatası error code:',err.code,'Error Message:',err.message);
        return res.status(401).send({ message: 'Unauthorized' });
    }
}