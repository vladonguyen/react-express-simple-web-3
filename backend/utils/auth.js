const { sign, verify } = require("jsonwebtoken");

const KEY = "supersecret"


function createJSONwebToken(email) {
    return sign({ email }, KEY, { expiresIn: '1h' });
}

function validateJSONwebToken(token){
    return verify(token, KEY)
}

exports.createJSONwebToken = createJSONwebToken;
exports.validateJSONwebToken = validateJSONwebToken;