
const express = require('express');
const router = express.Router();

const Class = require('../models/class');
const Instructor = require('../models/instructor');
const User = require('../models/user');


/*

router.get('/classes', ensureAuthenticated, function(req, res, next) {
    let query={username:req.user.username}
  Instructor.findOne(query, function(err, instructor){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      
      res.render('instructors/class', { "instructor": instructor});
    }
  });
});*/

router.get('/classes/new', ensureAuthenticated, function(req, res, next) {
    res.render('instructors/newclass',{userid:req.user._id});
});

router.post('/classes/new',ensureAuthenticated,(req,res)=>
{
        Class.create({title:req.body.title,image:req.body.image,instructor:req.user.username,description:req.body.description},
            (err,createdClass)=>
           {
             if(err)
               return res.send(err)
              
               let query={username:req.user.username}
               Instructor.findOneAndUpdate(query,{
                       
                $push:{"classes": {
                  classId: createdClass._id,
                  classTitle: createdClass.title,
                }}
              } 
                ,
                (err,instructor)=>
               {
                      if(err)
                      return res.send('err is here')
                      res.redirect('/instructor/myClass')
 
               })
        })
      })


router.get('/classes/:id/lessons/new', ensureAuthenticated, function(req, res, next) {
      res.render('instructors/newlesson', { "class_id": req.params.id});
});


router.post('/classes/:id/lessons/new', ensureAuthenticated, function(req, res, next) {

     
      console.log(req.params.id)
      Class.findOneAndUpdate({_id:req.params.id},{
        $push:{"lessons": {
          lessonNumber: req.body.lesson_number,
          lessonTitle: req.body.lesson_title,
          lessonBody: req.body.lesson_body
        }}
    }, {
        safe: true,
        upsert:true
    }, (err,createdClass)=>
    {
          if(err)
          return res.send(err)

          res.redirect('/classes/'+req.params.id)
    })

      
      
});

router.get('/myClass',ensureAuthenticated,(req,res)=>
{
         Instructor.findOne({username:req.user.username},(err,instructor)=>
         {
               
                 let ids=[]
                 for(let i=0;i<instructor.classes.length;i++)
                 {
                      
                     ids.push(instructor.classes[i].classId)
                       
                 }
                 console.log(ids)
                
                 /*Model.find().where('_id').in(ids).exec((err, records) => {});*/
                 Class.find().where('_id').in(ids).exec((err,classes)=>
                 {
                     if(err)
                     return res.send(err)
                  res.render('instructors/myclass',{classes})
                 })
                 
                
         })
})



function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()){
      return next();
  }
  res.redirect('/');
}

module.exports = router;
