const Sequelize = require('sequelize')

/*const db = new Sequelize({
    dialect: 'mysql',
    database: 'cbsocialmediadb',
    username: 'cbsocialuser',
    password: 'cbsocialpass'
})*/

const db = new Sequelize({
    dialect: 'postgres',
    database: 'd4g5orq13tgu9r',
    username: 'ekomongyjcqgwq',
    password: '47705321040b017fee482f96cf97298172e93f683e1b1f9cdbeb522cac0922f3',
    host: 'ec2-54-165-178-178.compute-1.amazonaws.com'
})

const COL_ID_DEF = {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
}

const COL_USERNAME_DEF = {
    type: Sequelize.DataTypes.STRING(30),
    unique: true,
    allowNull: false
}

const COL_TITLE_DEF = {
    type:Sequelize.DataTypes.STRING(140),
    allowNull: false
}

const Users = db.define('user',{
    id: COL_ID_DEF,
    username: COL_USERNAME_DEF,
    email: {
       type: Sequelize.DataTypes.STRING(100)
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
})

const Posts = db.define('post',{
    id: COL_ID_DEF,
    title: COL_TITLE_DEF,
    body: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
    }
})

const Comments = db.define('comment',{
    id: COL_ID_DEF,
    title: COL_TITLE_DEF,
    body: {
        type: Sequelize.DataTypes.TEXT('tiny')
    }
})

Users.hasMany(Posts)
Posts.belongsTo(Users)

Users.hasMany(Comments)
Comments.belongsTo(Users)

Posts.hasMany(Comments)
Comments.belongsTo(Posts)

module.exports = {
    db,
    Users,
    Posts,
    Comments
}