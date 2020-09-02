const mongoose=require('mongoose')
const validator=require('validator')
const UserSchema=new mongoose.Schema({

      username:{
             type:String,
             trim:true,
             required:true,
      },
      password:{
          type: String,
          trim:true,
          required:true,
          validate: {
            validator: function(value) {
              return value.length>8;
            },
            message: "password should contain minimum 8 character"
          }

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
      type:{
          type:String,
          trim:true,
          require:true
        }
})



const User=mongoose.model('User',UserSchema)

module.exports=User