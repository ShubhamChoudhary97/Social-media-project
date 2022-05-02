$(()=>{
    $('#navbar').load('/components/navbar.html',loginIfNeeded)
    $('#footer').load('/components/footer.html')
    $('#content').load('/components/all-posts.html') //this contains it's own scripts too

    //loginIfNeeded()
})

function loginIfNeeded(){
    //let currentuser = window.localStorage.user?JSON.parse(window.localStorage.user):null
    window.currentuser = window.localStorage.user?JSON.parse(window.localStorage.user):null
    if(!currentuser){
        $.post('/api/users',{},(user)=>{
             //console.log(data)
             if(user){
                 console.log('registered current user as',user.username)
                 window.localStorage.user = JSON.stringify(user)
                 currentuser = user
                 console.log($('#nav-username'))
                 $('#nav-username').text(currentuser.username)
             }
        })
    }
    else{
        console.log('resuming session as',currentuser.username)
        console.log($('#nav-username'))
        $('#nav-username').text(currentuser.username)
    }
}