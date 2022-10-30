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
        response.status(201);
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
                const jwtToken = jwt.sign(payload, SECRET_KEY);
                response.send({jwtToken}); //sends jwt token as response
            }
        }

    }
    catch(error){
        console.log(error.message);
    }
}


//List Teachers
const displayTeachers = async (request, response)=>{
    try{
        const teachers_list = await Teacher.find();
        response.send(teachers_list);
    }
    catch(error){
        console.log(error.message);
    }

}

//Display favourite teachers
const displayFavouriteTeachers = async (request,response)=>{
    try{
        const studentID = request.ID;
        const favList = await Favourite.find({student_id: studentID});
        response.status(200);
        response.send(favList); //sends favourite teacher details
    }
    catch(error){
        console.log(error.message);
    }
}


//Adding Favourite teachers
const addToFavourites = async (request, response, next) => {
    try{
        const {favList} = request.body;
        const favouriteList = [];
        const studentID = request.ID;
    
        const ans = await Favourite.find({student_id: studentID});
        const favIds = ans.map(x => x.teacher_id.valueOf())
    
    
        const uncommon = favList.filter(teacherID => !favIds.includes(teacherID));
    
        uncommon.forEach(teacherID => {
            favouriteList.push({
                student_id: studentID,
                teacher_id: teacherID
            });
        });

        await Favourite.insertMany(favouriteList);
        response.status(200);
        response.send("added to favourites succesfully");
    }
    catch(error){
        console.log(error.message);
    }
};

//Deleting Favourite teachers
const deleteFromFavourites = async (request, response, next) => {
    try{
        const {delList} = request.body;
        const deleteArray = [];
        const studentID = request.ID;
        await Favourite.deleteMany({student_id: studentID, teacher_id : {$in : delList}});
        response.status(200);
        response.send("deleted teachers from favourites succesfully");
    }
    catch(error){
        console.log(error.message);
    }
};


module.exports = { register, login, displayTeachers, addToFavourites, deleteFromFavourites, displayFavouriteTeachers };