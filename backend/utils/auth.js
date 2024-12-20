const { sign, verify } = require("jsonwebtoken");
const { NotAuthError } = require("./errors");

const KEY = "supersecret"


function createJSONwebToken(email) {
    return sign({ email }, KEY, { expiresIn: '1h' });
}

function validateJSONwebToken(token){
    return verify(token, KEY)
}

function checkAuthMiddleware(req, res, next){
    if (req.method === "OPTIONS" || req.url == "/api/auth/login" || req.url == "/api/auth/register"){
        return next();
    }
   

    if(!req.headers.authorization){
        console.log("NO AUTH. AUTH HEADER MISSING");
        return next(new NotAuthError("Not authenticated."));
    }

    const authFragments = req.headers.authorization.split(' ');

    if(authFragments.length !== 2){
        console.log('NOT AUTH. AUTH HEADER INVALID.');
        return next(new NotAuthError('Not authenticated.'));
    }
    const authToken = authFragments[1];

    try {
        const validatedToken = validateJSONwebToken(authToken);
        req.token = validatedToken;
    } catch (error) {
        console.log("NOT AUTH. TOKEN INVALID");
        return next (new NotAuthError("Not authentificated."));
    }
    next();
}

exports.createJSONwebToken = createJSONwebToken;
exports.validateJSONwebToken = validateJSONwebToken;
exports.checkAuth = checkAuthMiddleware;