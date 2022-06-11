const express = require('express')
const session = require('express-session')
const path = require('path')
const bcrypt = require('bcrypt')

const models = require('./db/models')
const {usersRoute} = require('./routes/users')
const {postsRoute} = require('./routes/posts')

const app = express()

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '123qwe456asd789zxc',
    cookie: {
        maxAge: 1000*60*60*24
    }
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs')

app.use('/api/users',usersRoute)
app.use('/api/posts',postsRoute)
app.use('/',express.static(__dirname + '/public'))
//app.use('/login',express.static(__dirname+'/public/login.html'))
//app.use('/home',express.static(__dirname+'/public/home.html'))

app.post('/',async (req,res)=>{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    const user = await models.Users.create({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    })
    //res.status(201).sendFile(path.join(__dirname+'/public/login.html'))
    res.redirect('/login')
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/login',async (req,res)=>{
    const user = await models.Users.findOne({where: { username: req.body.username}})
    if(!user){
        //return res.send('FAIL_U')
        return res.status(404).render('login',{error: 'No such Username found'})
    }
    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword){
        //return res.send('FAIL_P')
        return res.status(401).render('login',{error: 'Incorrect Password'})
    }
    req.session.userId=user.id
    //res.status(200).send('SUCCESS')
    res.redirect('/home')
})

app.get('/home',async(req,res)=>{
    if(!req.session.userId){
        return res.redirect('/login')
    }
    const user = await models.Users.findByPk(req.session.userId)
    //I am here currently.
    console.log(user)
    res.render('home',{username: user.username, id:user.id})
})

app.get('/logout',(req,res)=>{
    req.session.userId=null
    res.redirect('/login')
})

const db = models.db
//Alternative method for above 2 lines
//const {db} = require('./db/models')

db.sync()
  .then(()=>{
    app.listen('8383', ()=>{
        console.log('Server started on http://localhost:8383')
    })
}).catch((err)=>{
    console.error(new Error('Could not start the database'))
    console.error(err)
})
