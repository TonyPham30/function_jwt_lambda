const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config()
function parse(input) {
  function parseSingle(input) {
    var parts = input.split('&'),
      part,
      record = {};

    for (var i = 0; i < parts.length; i++) {
      part = parts[i].split('=');
      record[part[0]] = part[1];
    }

    return record;
  }

  var parts = input.split('++'),
    records = [];

  for (var i = 0; i < parts.length; i++) {
    records.push(parseSingle(parts[i]));
  }

  return records;
}
module.exports.jsonWebTokenWithTravel = async (event) => {

  try {
    const requiresBody = parse(event.body)
    const jwt_data = {
      "sub": requiresBody[0].identity,
      "iss": requiresBody[0].clientId,
      "algorithm": "HS256"
    }
    console.log(jwt_data)
    const bodyJwt = jwt.sign(jwt_data, process.env.CLIENT_SECRET, { algorithm: 'HS256' });
    const response = {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        jwt: bodyJwt
      })
    }
    return response
  } catch (error) {
    console.log(error)
  }
};
