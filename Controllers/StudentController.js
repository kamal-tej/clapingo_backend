const Student = require("../Models/student");
const Teacher = require("../Models/teacher");
const Favourite = require("../Models/favourite");
require("dotenv").config();


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;



//Student register
const register = async (request, response)=>{
    try{
        const {name, rollNo, password, gender} = request.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const ans = await Student.create(
            {
                rollno: rollNo ,name,password: hashedPassword,gender
            }
        );
        response.send("inserted successfully");
    }
    catch(error){
        console.log(error.message);
    }
}

//Student login
const login = async (request, response)=>{
    try{

        const { rollNo, password } = request.body;
        const query = { rollno : rollNo };
        const ans = await Student.findOne(query);
        const ID = ans._id;
        if( ans === undefined ){
            response.send(400);
            response.send({ errorMsg : "Invalid user" });
        }
        else{
            const checkedPassword = await bcrypt.compare(password, ans.password);
            if(!checkedPassword){
                response.send(400);
                response.send({ errorMsg : "Invalid Password"});
            }
            else{
                const payload = { ID };
                const jwtToken = jwt.sign(payload, SECRET_KEY);
                response.send({jwtToken});
            }
        }

    }
    catch(error){
        console.log(error.message);
    }
}


//List Teachers
const displayTeachers = async (request, response)=>{

    const teachers_list = await Teacher.find();
    response.send(teachers_list);
    console.log(teachers_list.length);
}


//Adding Favourite teachers
const addFavourites = async (request, response, next) => {
    const {favList} = request.body;
    const favouriteList = [];
    const student_id = request.ID;

    const ans = await Favourite.find();
    const favIds = ans.map(x => x.teacher_id.valueOf())


    const uncommon = favList.filter(teacherId => !favIds.includes(teacherId));
    console.log(uncommon);
    

    uncommon.forEach(teacher => {
        favouriteList.push({
            student_id: student_id,
            teacher_id: teacher
        });
    });

    console.log(favouriteList);
    await Favourite.insertMany(favouriteList);
    response.status(200).send("added to favourites succesfully");
};


module.exports = { register, login, displayTeachers, addFavourites };