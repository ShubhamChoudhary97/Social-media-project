const express = require('express')

const models = require('./db/models')
const {usersRoute} = require('./routes/users')
const {postsRoute} = require('./routes/posts')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/users',usersRoute)
app.use('/api/posts',postsRoute)
app.use('/',express.static(__dirname + '/public'))

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
