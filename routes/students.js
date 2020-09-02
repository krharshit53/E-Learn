const express = require('express');
const router = express.Router();

const Class = require('../models/class');
const Student = require('../models/student');
const User = require('../models/user');
const route = require('./users');


router.get('/classes', ensureAuthenticated, function(req, res, next) {
    
 
  
   /*Model.find().where('_id').in(ids).exec((err, records) => {});*/
   /*schema.find( { '_id' : { $in: [1,2,3]} }, function(err,data){});*/
   Class.find({},(err,classes)=>
   {
       if(err)
       return res.send(err)
       

       res.render('students/classes',{classes});
   })
          
 
  
})
  
  

router.get('/myClass',ensureAuthenticated,(req,res)=>
{
  Student.findOne({username:req.user.username},(err,student)=>
  {
   let ids=[]
   for(let i=0;i<student.classes.length;i++)
   {
        
       ids.push(student.classes[i].classId)
         
   }
   console.log(ids)
  
   /*Model.find().where('_id').in(ids).exec((err, records) => {});*/
   Class.find().where('_id').in(ids).exec((err,classes)=>
   {
       if(err)
       return res.send(err)
       res.render('students/myclass',{classes})
   })
          
  })
})

route.post('/classes/:id/register',(req,res)=>
{
        console.log(req.params.id)
    Class.findById(req.params.id,(err,findClass)=>
    {
          if(err)
          {console.log('class')
          return res.send(err)
         }

          console.log(findClass)
          
          Student.findOneAndUpdate({username:req.user.username},{
              
            $push:{"classes": {
              classId: findClass._id,
              classTitle: findClass.title,
              
            }}
        }, {
            safe: true,
            upsert:true
        }, (err,student)=>
        {
              if(err)
              {
                console.log('student')
                return res.send(err)
              }
    
              res.redirect('/student/myClass')
        })
          
    })
  
        
})
router.get('/classes/:id/register', ensureAuthenticated,function(req, res){
    
  Student.findOne({username:req.user.username},(err,student)=>
  {
          if(err)
          res.send(err)
          else
          {
            console.log(req.params.id)
            console.log(student.classes)
          for(let i=0;i<student.classes.length;i++)
          {
                 
                 if(student.classes[i].classId[0].equals(req.params.id))
                {
                  req.flash("error","Already Registered Go To Your Course!")
                 return res.redirect('/student/classes')
                }
                
          }
          res.render('students/newclass',{id:req.params.id})
        }
  })
    

});

function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()){
      return next();
  }
  res.redirect('/login');
}

module.exports = router;