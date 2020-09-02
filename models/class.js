const mongoose=require('mongoose')
const validator=require('validator')


const classSchema= new mongoose.Schema({

       title:{
           type:String,
           required:true,
           trim:true
       },
       image:{
           type:String,
           required:true,
           trim:true,
       },
       instructor:{
           type:String
       },
       description:{
           type:String,
       },
       lessons:[
           {
               lessonNumber:{type:String},
               lessonTitle:{type:String},
               lessonBody:{type:String}
           }
       ]
})



const Class=mongoose.model('Class',classSchema)
module.exports=Class

