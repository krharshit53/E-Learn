const route=require('express').Router()
const Class=require('../models/class')
const User=require('../models/user')
const Instructor=require('../models/instructor')
const Student=require('../models/student')
const bcrypt=require('bcrypt')
const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy

passport.serializeUser(function(user, done){
  done(null, user._id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password!=password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
/*
Instructor.create(
  {
      name:'harshit',
      username:'harshit',
      email:'krharshit553@gmail.com'
  },(err,instructor)=>
  {
        if(err)
        return console.log(err)

        Class.create(
            {
              title:'fvjfjvl',
              image:'fvnfknvkfj',
              description:'dvjkvkjd',
              instructor:'dkjvkdvkdbk',
              lessons:[
                  {
                      lessonNumber:1,
                      lessonTitle:'fvhjfkhv',
                      lessonBody:'dkvbkdbvkdvk'
              },
              {
                  lessonNumber:2,
                  lessonTitle:'fvhjfkhv',
                  lessonBody:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
              }]
          
          },(err,classname)=>
          {
              if(err)
              console.log(err)
              else
              instructor.classes.push(classname)
          }
      )   
      })*/
  
      route.get('/register',(req,res)=>
      {
          res.render('users/signup')
      })
      route.get('/login',(req,res)=>
      {
          res.render('users/login')
      })
      route.post('/register',(req,res)=>
      {
           
            /*
            bcrypt.hash(password, 10, function(err, hash) {
              
                if(err)
                return res.send(err)
                password=hash*/
                User.create({username:req.body.username,password:req.body.password,email:req.body.email,type:req.body.type},(err,user)=>
                {
                     if(err)
                     return res.send(err)

                     if(req.body.type=='student')
                {
                    Student.create({name:req.body.name,username:req.body.username,email:req.body.email},(err,student)=>
                    {
                        if(err)
                        return res.send(err)
      
                        console.log(student)
                    })
                }
                else
                {
                    Instructor.create({name:req.body.name,username:req.body.username,email:req.body.email},(err,instructor)=>
                    {
                      if(err)
                      return res.send(err)
      
                      console.log(instructor)
                    })
                }
                req.flash("success","Register Successfully")
                res.redirect('/login')
              })
                
          })
        
     // })
     
      
     route.post('/login', 
     passport.authenticate('local', { failureRedirect: '/login' }),
     function(req, res) {
        
      req.flash("success",`Welcome ${req.user.username}`)
         if(req.user.type=='student')
         res.redirect('/student/classes')
         else if(req.user.type=='instructor')
         res.redirect('/instructor/myClass')
         
     });
    

     route.get('/logout', function(req, res){
      req.logout();
      req.flash("success","Logout Successfully")
      res.redirect('/classes');
  });

  module.exports=route









