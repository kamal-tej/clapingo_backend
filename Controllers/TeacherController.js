const Student = require("../Models/student");
const Teacher = require("../Models/teacher");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//Teacher registration
const register = async (request, response)=>{
    try{
        const {name, email, password, subject, mobile, gender} = request.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const ans = await Teacher.create(
            {
                name,email,password: hashedPassword,subject,mobile,gender
            }
        );
        response.send("inserted successfully");
        response.status(201);
    }
    catch(error){
        console.log(error.message);
    }
}


//Teacher login
const login = async (request, response)=>{
    try{

        const { email, password } = request.body;
        const query = { email };
        const ans = await Teacher.findOne(query);
        const ID = ans._id;
        if( ans === undefined ){
            response.status(400);
            response.send({ errorMsg : "Invalid user" });
        }
        else{
            const checkedPassword = await bcrypt.compare(password, ans.password);
            if(!checkedPassword){
                response.status(400);
                response.send({ errorMsg : "Invalid Password"});
            }
            else{
                const payload = { ID };
                const jwtToken = jwt.sign(payload, "clapingo");
                response.send({jwtToken});
            }
        }

    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = { register, login,  }