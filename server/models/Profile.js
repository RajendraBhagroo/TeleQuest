const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    //Represents, if the profile belongs to a student or teacher, if false then the profile is a student
    teacher:{
        type: boolean,
        required: true
    },
    //This is the name that will be shown to the public
    name:{
        type: string,
        required: true
    },
    //Array to hold classes teaching if the profile belongs to a teacher
    classesTeaching:{
        type: Array
    },
    //Array to hold classes currently enrolled into
    classesIn:{
        type: Array
    },
    //The name of the educational institute  to which this profile is associated too
    school:{
        type: String,
        required: true
    },
    //User associated with profile
    user:{
        type:Schema.Types.ObjectId,
        ref='users'
        
    }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
