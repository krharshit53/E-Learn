const mongoose=require('mongoose')
const validator=require('validator')



const instructorSchema = mongoose.Schema({
    
    name:{
           type:String,
           trim:true
    },
    username: {
      type: String
    },
    email:
    {
      type:String,
        required:true,
        unique:true,
      
      validate: {
          validator: function(value) {
            return validator.isEmail(value);
          },
          message: "email is not valid."
        }
    },
    classes:[{
      classId:{
          type: [mongoose.Schema.Types.ObjectId],
          ref:'Class'
          
        },
      classTitle:{
          type: String
        },
    }]
  })


  const Instructor=mongoose.model('Instructor',instructorSchema)

  module.exports=Instructor