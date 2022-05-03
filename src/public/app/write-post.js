$(()=>{
    let title1 = $('#title')
    let body1 = $('#body')
    let btnSubmit = $('#btnSubmit')
    $('#btnSubmit').click(()=>{
        let currentuser = JSON.parse(window.localStorage.user)
        $.post('/api/posts',{
           title: title1.val(),
           body: body1.val(),
           userId: currentuser.id
        },function(data){
            window.alert("Post with "+title1.val()+" added successfully")
            $('#title').val('')
            $('#body').val('')
        })
    })
})