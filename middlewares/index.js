const session=require('express-session')
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')
const passport=require('passport')
const bcrypt=require('bcrypt')
const flash=require('connect-flash')
const route = require('../routes/users')
const LocalStrategy=require('passport-local').Strategy
const router=require('express').Router()

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())


router.use(flash())
router.use(cookieParser());
router.use(session({
      
    secret:'djvbfkjbvkfjbvkfbvkfvkfk',
    resave:false,
    saveUninitialized:false,
}))



router.use(passport.initialize());
router.use(passport.session());


router.use((req,res,next)=>{

    res.locals.currentuser=req.user
    res.locals.error=req.flash("error")
      res.locals.success=req.flash("success")
    next()
})


module.exports=router