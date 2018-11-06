$(function(){

    $.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        success: function(info){
            if (info.error) {
                location.href = 'login.html'
            }
            else{
                $('.mui-table-view').html(template('tmp',info))
            }
            
        }
    })

    // 点击退出按钮退出
    $('.btn-logout').on('click',function(){
        $.ajax({
            type:'get',
            url:'/user/logout',
            success:function(info){
                if(info.success){
                    location.href = 'login.html'
                }
            }
        })
    })
})