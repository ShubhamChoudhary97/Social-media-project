function loadPosts1(){
    $.get('/api/posts',(posts)=>{
        for(let p of posts){
            if(p.user.id==window.localStorage.id){
                $('#posts-container1').append
            (`
              <div class="col-4">
              <div class="card m-2">
              <div class="card-body">
                <h5 class="card-title">${p.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${p.user.username}</h6>
                <p class="card-text">${p.body.substr(0,15)}<a href="#">...read more</a></p>
                <a href="#" class="card-link">Comment</a>
                <a href="#" class="card-link">Like</a>
              </div>
              </div>
              </div>
            `)
            //console.log(p)
            }
            
        }
    })
}