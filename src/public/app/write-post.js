$(()=>{
    let title1 = $('#title')
    let body1 = $('#body')
    let btnSubmit = $('#btnSubmit')
    $('#btnSubmit').click(()=>{
        let currentuserid = window.localStorage.id
        $.post('/api/posts',{
           title: title1.val(),
           body: body1.val(),
           userId: currentuserid
        },function(data){
            window.alert("Post with "+title1.val()+" added successfully")
            $('#title').val('')
            $('#body').val('')
        })
    })
})