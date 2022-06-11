# Social Media Sample Project

It is Mock Social media webapp prototype using html, css, js, express js, jquery, view(hbs) and sequelize(mysql) for database.
For user authentication I used express-session and I used "bcrypt"  as cryptographic hashing algorithm for hashing the password.  

## Database Setup

```Shell
$ mysql -u root -p
```
```mysql
create database cbsocialmediadb;

create user cbsocialuser identified by 'cbsocialpass';

grant all privileges on cbsocialmediadb.* to cbsocialuser;

flush privileges;
```

## Project Structure

### Backend (Server)
```shell
src:
-> controllers   # functions to connect routes to db operations
-> db            # db connections and model definitions
-> public        # html/js/css files for static part of site
-> routes        # express middlewares routewise
-> views         # We are using handlebars(hbs) as our view for login and home page
```

### Frontend (Client Side code)
```shell
src/public
->app                # our own frontend js code
  =>all-posts.js
  =>common.js
  =>common.css
  =>write-post.js
  =>navbar.js
  =>my-posts.js
->components         # our own html snippets 
  =>navbar.html
  =>footer.html
  =>all-posts.html
  =>write-post.html
  =>my-posts.html
->css                # css libraries we are using
  =>bootstrap.css
  =>index.css        # CSS file used for signup(index) & login page 
->fonts              # fonts we are using
  =>Muli-italic.woff2
  =>muli.css
  =>Muli.woff2
->js                 # js libraries we are using
  =>bootstrap.js
  =>jquery-3.4.1.js
  =>popper.js
->index.html          # first / home page
```
## Business Logic

### Users

1. **create User**
   this will create a new user with random username

### Posts

1. **create Post**
   this will create a new post, required fields are
   - username(the author of this post)
   - title
   - body

2. **show all posts**
   list all existing posts, we should have following filtering support

   - filtering by username
   - filtering by query contained in title(search by title)

3. **edit post** `TBD`

4. **delete post** `TBD`

### Comments

1. **show all comments(of a user)**

2. **show all comments(under a post)**

3. **add a comment**

## API Documentation

### `users`

1. `POST /users`
Creates an user with random username and userid

2. `GET /users/{userid}`
Get an user with given userid

3. `GET /users/{username}`
Get an user with given username

### `posts`

1. `GET /posts`
Get all the posts

2. `POST /posts`
Creates a new post.
Required fields in body - 
```
userid = 
title = 
body = 
```