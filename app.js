const express=require('express')
const app=express()
const middlewares=require('./middlewares')
const mongoose=require('mongoose')
const Class=require('./models/class')
const User=require('./models/user')
const Instructor=require('./models/instructor')
const Student=require('./models/student')
const mongodb=require('mongodb')
const userRoute=require('./routes/users')
const instructorRoute=require('./routes/instructors')
const classRoute=require('./routes/classes')
const studentRoute=require('./routes/students')
app.set(express.static(__dirname+'/public'))
app.set('view engine','ejs')


 mongoose.connect('mongodb://127.0.0.1:27017/eLearn', {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});
 
 app.use(middlewares)
 
app.use('/',userRoute)
app.use('/student',studentRoute)
app.use('/classes', classRoute);
app.use('/instructor',instructorRoute)


app.get('/',(req,res)=>
{
    res.render('index')
})






app.listen(3000,(req,res)=>
{
    console.log('http://localhost:3000')
})