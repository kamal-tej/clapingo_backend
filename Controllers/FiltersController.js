const Student = require("../Models/student");
const Teacher = require("../Models/teacher");
const Favourite = require("../Models/favourite");


//Most Favourite Teacher
const displayMostFavourite = async (request, response)=>{
    try{
        const ans = await Favourite.aggregate([{ "$group": { _id : "$teacher_id" , "no_of_students_added" : {$sum : 1}}},
                                               { $sort : { no_of_students_added : -1}}]);
        const countVal = ans[0].no_of_students_added; //highest no of students added to favourites

        const mostFavourite = ans.filter(x => x.no_of_students_added == countVal);

        const teacherIDs = mostFavourite.map(x => x._id.valueOf());


        const teacherList = await Teacher.find({_id : {$in : teacherIDs}});

        response.send({teacherList, countVal}); //sends array of objects of teacher details and no_of_students added them to their favourites
        
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {displayMostFavourite}