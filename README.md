# E-Learn web App

### I have created a E-Learn web App where user can register as instructor or student.

### A Instructor can do the following things.
- create a course
- create lessons
- edit lessons

### A Student can do the following things.
- register for multipe courses

## Database Setup

### Models
```html
- class.js                                                                 Class Schema
- user.js                                                                  User Schema 
- instructor.js                                                            Instructor Schema 
- student.js                                                               Student Schema
```

## Routes Setup
```html
- classes.js                                                                Class Routes
- users.js                                                                  User Routes
- instructors.js                                                            Instructor Routes
- students.js                                                               Student Routes
```

## Views Setup
```html
- +---partials  
    - footer.ejs                                                             footer 
    - header.ejs                                                             header 
- +---classes
     - index.ejs                                                             all courses
     - class.ejs                                                             particular course
     - lesson.ejs                                                            lesson in course
- +---instructors                                                             
     - myclass.ejs                                                           instructor created course
     - newclass.ejs                                                          to add new course
     - newlesson.ejs                                                         to add new lesson
- +---students
     - classes.ejs                                                           all courses
     - myclass.ejs                                                           student enrolled course
     - newclass.ejs                                                          to register new course
- +---users
    - login.ejs                                                              login view 
    - signup.ejs                                                             register view 
```

## Middlewares setup
```html
 - index.js                                                                   All global middlewares 
```
## Server setup
```html
- app.js                                                                       entry point 
```
