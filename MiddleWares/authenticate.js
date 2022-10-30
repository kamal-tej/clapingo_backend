const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

//Validation
const authenticate = (request, response, next) =>{
    let jwtToken;
    const header = request.headers["authorization"];
    if(header !== undefined){
        jwtToken = header.split(" ")[1];
    }
    console.log(`jwt token is ${jwtToken}`);
    if(jwtToken === undefined){
        response.status(401);
        response.send("Invalid JWT Token");
    }
    else{
        jwt.verify(jwtToken, SECRET_KEY, async(error, payload)=>{
            if(error){
                response.status(401);
                response.send(`Invalid JWT Token error ${SECRET_KEY}`);
            }
            else{
                request.ID = payload.ID;
                console.log("Successfully verified");
                next(); //upon success
            }
        })
    }
}

module.exports = authenticate;