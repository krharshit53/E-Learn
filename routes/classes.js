const route=require('express').Router()
const Class=require('../models/class')


route.get('/',(req,res)=>
{
        Class.find({},(err,classes)=>
        {
             if(err)
             return res.render(err)

             res.render('classes/index',{classes});
        })
})

//get class by id

route.get('/:id',isLoggedIn,(req,res)=>
{
      Class.findById(req.params.id,(err,classname)=>
      {
            if(err)
            return res.render(err)
            
            res.render('classes/class',{classname})
      })
})

// get lesson

route.get('/:class_id/lesson/:class_number',isLoggedIn,(req,res)=>
{
       Class.findById(req.params.class_id,(err,classname)=>
       {
             if(err)
             return res.render(err)
             let lesson
             for(i=0;i<classname.lessons.length;i++){
                if(classname.lessons[i].lessonNumber == req.params.class_number){
                    lesson = classname.lessons[i];
                    console.log('lesson ' + lesson);
                }
            }
            res.render('classes/lesson', {
               classname,
               lesson
          });
       })
})

function isLoggedIn(req, res, next){
      if (req.isAuthenticated()){
          return next();
      }
      res.redirect('/login');
    }

module.exports=route


